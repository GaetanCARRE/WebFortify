import os
import re
import json
import difflib

def find_xss_strike(path, form_parameters):
    xss_vuln = []
    file_extensions = ['.php', '.js', '.jsx', '.html', '.tsx']  # Ajoutez d'autres extensions de fichier si nécessaire
    
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(tuple(file_extensions)):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()
                    if all_parameters_found(form_parameters, content):
                        for i, line in enumerate(content.splitlines(), start=1):
                            # If at least one parameter is found in the line
                                found_param = next((param['param'] for param in form_parameters if re.search(re.escape(param['param']), line, re.IGNORECASE)), None)
                                if found_param:
                                    # Check if the file is already in xss_vuln
                                    xss_vuln = add_file_content(file_path, i, line, found_param, xss_vuln)
    return xss_vuln

# verify that all parameters are found in the file
def all_parameters_found(form_parameters, content):
    return all(re.search(re.escape(param['param']), content, re.IGNORECASE) for param in form_parameters)

# add file path and content in xss_vuln
def add_file_content(file_path, line_number, line_content, param, xss_vuln):
    for item in xss_vuln:
        if item['file_path'] == file_path:
            # If the file is already in the list, add a new line entry
            item['lines'].append({
                'number': line_number,
                'param': param,
                'line_content': line_content
            })
            return xss_vuln

    # If the file is not in the list, add a new entry with the file path and the first line entry
    xss_vuln.append({
        'file_path': file_path,
        'lines': [{
            'number': line_number,
            'param': param,
            'line_content': line_content
        }]
    })
    return xss_vuln

def condition_multiple_links(result, url) :
    if(len(result) > 0) :
        for item in result:
            if(item['file_path'] == url) :
                return True
    
def similarity_ratio(a, b):
    return difflib.SequenceMatcher(None, a, b).ratio()

def condition_multiple_links(result, url):
    best_match = None
    best_ratio = 0.0

    for item in result:
        file_path = item['file_path']
        ratio = similarity_ratio(file_path, url)
        
        # Choisissez le meilleur match avec la plus grande similarité
        if ratio > best_ratio:
            best_ratio = ratio
            best_match = item

    if best_match:
        return True, best_match
    else:
        return False, None

def main_correction(project_path) : 
    vulnerabilities = []
    with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
        vulnerabilities = json.load(json_file)
    for vulnerability in vulnerabilities:
        url = vulnerability['url']
        list_parameters = []
        for list_vulnerability in vulnerability['list_vulnerability']:
            list_parameters.append({'param' : 'name="'+list_vulnerability['parameter']+ '"'})
        result = find_xss_strike(project_path, list_parameters)
        file_path = ""
        if len(result) > 1:
            is_match, file_path = condition_multiple_links(result, url)
            if is_match:
                file_path = file_path['file_path']
            else:
                print("No matching file found.")         
        elif len(result) == 1:
            file_path = result[0]['file_path']
        print(result)
     
    