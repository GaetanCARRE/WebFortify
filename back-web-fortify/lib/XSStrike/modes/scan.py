import copy
import re
from urllib.parse import urlparse, quote, unquote
import os.path
from core.checker import checker
from core.colors import end, green, que
import core.config
from core.config import xsschecker, minEfficiency
from core.dom import dom
from core.filterChecker import filterChecker
from core.generator import generator
from core.htmlParser import htmlParser
from core.requester import requester
from core.utils import getUrl, getParams, getVar
from core.wafDetector import wafDetector
from core.log import setup_logger
import json

logger = setup_logger(__name__)


result_json = []

def scan(target, paramData, encoding, headers, delay, timeout, skipDOM, skip):
    GET, POST = (False, True) if paramData else (True, False)
    # If the user hasn't supplied the root url with http(s), we will handle it
    if not target.startswith('http'):
        try:
            response = requester('https://' + target, {},
                                 headers, GET, delay, timeout)
            target = 'https://' + target
        except:
            target = 'http://' + target
    logger.debug('Scan target: {}'.format(target))
    response = requester(target, {}, headers, GET, delay, timeout).text

    list_vulnerability = []

    if not skipDOM:
        logger.run('Checking for DOM vulnerabilities')
        highlighted = dom(response)
        if highlighted:
            logger.good('Potentially vulnerable objects found')
            logger.red_line(level='good')
            for line in highlighted:
                logger.no_format(line, level='good')
                list_vulnerability.append({'vulnerability': "line : "+ line.replace('\033[92m', '').replace('\033[0m', '').replace('\u001b[93m', '').replace('\u001b[91m', '')})
            logger.red_line(level='good')
            result_json.append({'vulnerabilities': list_vulnerability})
    host = urlparse(target).netloc  # Extracts host out of the url
    logger.debug('Host to scan: {}'.format(host))
    url = getUrl(target, GET)
    logger.debug('Url to scan: {}'.format(url))
    params = getParams(target, paramData, GET)
    logger.debug_json('Scan parameters:', params)
    if not params:
        logger.error('No parameters to test.')
        quit()
    WAF = wafDetector(
        url, {list(params.keys())[0]: xsschecker}, headers, GET, delay, timeout)
    if WAF:
        logger.error('WAF detected: %s%s%s' % (green, WAF, end))
    else:
        logger.good('WAF Status: %sOffline%s' % (green, end))

    testIsVulnerable = 0
    list_vulnerability = []
    for paramName in params.keys():
        paramsCopy = copy.deepcopy(params)
        logger.info('Testing parameter: %s' % paramName)
        if encoding:
            paramsCopy[paramName] = encoding(xsschecker)
        else:
            paramsCopy[paramName] = xsschecker
        response = requester(url, paramsCopy, headers, GET, delay, timeout)
        occurences = htmlParser(response, encoding)
        positions = occurences.keys()
        logger.debug('Scan occurences: {}'.format(occurences))
        if not occurences:
            logger.error('No reflection found')
            continue
        else:
            logger.info('Reflections found: %i' % len(occurences))

        logger.run('Analysing reflections')
        efficiencies = filterChecker(
            url, paramsCopy, headers, GET, delay, occurences, timeout, encoding)
        logger.debug('Scan efficiencies: {}'.format(efficiencies))
        logger.run('Generating payloads')
        vectors = generator(occurences, response.text)
        total = 0
        for v in vectors.values():
            total += len(v)
        if total == 0:
            logger.error('No vectors were crafted.')
            continue
        logger.info('Payloads generated: %i' % total)
        progress = 0
        limit = 0
        list_payloads = []
        for confidence, vects in vectors.items():   
            for vect in vects:
                if(limit >15):
                    break
                if core.config.globalVariables['path']:
                    vect = vect.replace('/', '%2F')
                loggerVector = vect
                progress += 1
                limit += 1
                logger.run('Progress: %i/%i\r' % (progress, total))
                if not GET:
                    vect = unquote(vect)
                efficiencies = checker(
                    url, paramsCopy, headers, GET, delay, vect, positions, timeout, encoding)
                if not efficiencies:
                    for i in range(len(occurences)):
                        efficiencies.append(0)
                bestEfficiency = max(efficiencies)
                if bestEfficiency == 100 or (vect[0] == '\\' and bestEfficiency >= 95):
                    logger.red_line()
                    logger.good('Payload: %s' % loggerVector)
                    loggerVector = clean_payload(loggerVector)
                    list_payloads.append({'payload': loggerVector})
                    testIsVulnerable = 1
                    if not skip:
                        choice = input(
                            '%s Would you like to continue scanning? [y/N] ' % que).lower()
                        if choice != 'y':
                            quit()
                elif bestEfficiency > minEfficiency:
                    logger.red_line()
                    loggerVector = clean_payload(loggerVector)
                    list_payloads.append({'payload': loggerVector})
                    testIsVulnerable = 1
                    
        list_vulnerability.append({'payloads': list_payloads, "parameter": paramName, "corrections": {}})   
        list_payloads = []
        logger.no_format('')
    if testIsVulnerable == 1:
        content_file = []
        if os.path.exists('./lib/XSStrike/result-XSS-Strike.json'):
            with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
                content_file = json.load(json_file)
        content_file.append({"url" : target.split('?')[0], "list_vulnerability" : list_vulnerability})
        json_data = json.dumps(content_file, indent=2)
        with open('./lib/XSStrike/result-XSS-Strike.json', 'w') as json_file:
            json_file.write(json_data + '\n')  # Ajoutez une nouvelle ligne entre chaque enregistrement JSON   


def param_to_remove(remove, loggerVector) : 
    try:
       return re.sub(r''+remove, ' ', loggerVector) 
    except Exception as e:
        return loggerVector
    
def clean_payload(loggerVector):
    try:
        loggerVector = unquote(loggerVector)
        loggerVector = loggerVector.lower()
        # remove the \r \rx \t \n \f \+\ and + from the payload
        loggerVector = param_to_remove('[\rx\t\n\f]', loggerVector)
        # replace the + with a space
        loggerVector = param_to_remove('/\+/', loggerVector)
        # Remplace les occurrences de '+' par un espace
        loggerVector = param_to_remove('\+', loggerVector)
        return loggerVector
    except Exception as e:
        return loggerVector