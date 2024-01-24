import os
import re
import json
import difflib

# Find the file containing the parameters found by XSStrike
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

# Compare the similarity between the url targeted and the url found in the file 
def similarity_ratio(a, b):
    return difflib.SequenceMatcher(None, a, b).ratio()

# Check if the url targeted is in the list of files found
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

# add function to advice the user for corrections
def get_all_corrections(file, vulnerability):
    correction = []
    for list_vulnerability in vulnerability['list_vulnerability']:
         # get the lines of the file containing the parameter
        list_lines = [line for line in file['lines'] if list_vulnerability['parameter'] in line['line_content']]
        if list_lines: 
            list_lines = list_lines[0]
            # add the first correction
            correction = add_first_correction(list_lines, list_vulnerability, file)
            if correction:
                list_vulnerability['corrections'].append(correction)
                print(correction)
    return vulnerability

def add_first_correction(list_lines, list_vulnerability, file):
    # first check if the variable  list_lines['line_content'] contain html tags or not
    for payload in list_vulnerability['payloads']:
        if re.search(r'<.*?>', payload['payload'], re.IGNORECASE):
            # get the extension of the file
            extension = os.path.splitext(file['file_path'])[1]
            if extension is not None : 
                with open('./corrections/template_correction/template_xss.json', 'r') as json_file:
                    template_correction = json.load(json_file)
                    # get the correction with the type = "escape"
                    correction_before_extension = next((correction for correction in template_correction['corrections'] if correction['type'] == 'escape'), None)
                    if correction_before_extension is not None : 
                        # get the example of correct according to the extension
                        for code in correction_before_extension['code']:
                            if extension in code['extension'] : 
                                return {
                                    'explanation': template_correction['description_xss'] + " " + correction_before_extension['description_vuln'],
                                    'line_vuln' : "file : "+file['file_path']+" line : "+str(list_lines['number'])+" \n"+list_lines['line_content'],
                                    'line_correction' : code['example_code'],             
                                }
                        
                      
    return None        

# Main function
def main_correction(project_path) : 
    vulnerabilities = []
    with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
        vulnerabilities = json.load(json_file)
    index = 0
    for vulnerability in vulnerabilities:
        url = vulnerability['url']
        list_parameters = []
        for list_vulnerability in vulnerability['list_vulnerability']:
            list_parameters.append({'param' : 'name="'+list_vulnerability['parameter']+ '"'})
        result = find_xss_strike(project_path, list_parameters)
        file = ""
        if len(result) > 1:
            is_match, file = condition_multiple_links(result, url)
            if not is_match:
                print("No match found for " + url)   
        elif len(result) == 1:
            file = result[0]
        vulnerability = get_all_corrections(file, vulnerability)
        index += 1
    with open('./lib/XSStrike/result-XSS-Strike.json', 'w') as json_file:
        json_file.write(json.dumps(vulnerabilities, indent=2))
    