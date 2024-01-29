import os
import re
import json
import difflib

# Find the file containing the parameters found by XSStrike
def find_xss_strike(path, form_parameters):
    xss_vuln = []
    file_extensions = ['.js', '.jsx', '.html', '.tsx', '.php']  # Ajoutez d'autres extensions de fichier si nécessaire
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
    return all(re.search(param['param'], content, re.IGNORECASE) for param in form_parameters)

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
            correction = add_escape_correction(list_lines, list_vulnerability, file)
            if correction:
                list_vulnerability['corrections'] = {"explanation_xss" : correction['explanation_xss'], 'line_vuln' :  correction['line_vuln'], 'list_corrections' : [{'title' : "Correction Escape the Output", 'line_correction' : correction['line_correction'], 'correction_explanation' : correction['correction_explanation']}]}
            correction = add_input_validation_correction(list_lines, file)
            list_vulnerability = add_correction_in_json("Correction Input Validation", list_vulnerability, correction)
            # get the CSP header
            correction = get_CSP_correction(file)
            list_vulnerability = add_correction_in_json("Correction CSP Configuration", list_vulnerability, correction)
    return vulnerability

# add the correction in the json variable list_vulnerability that will be stored in the json file
def add_correction_in_json(title, list_vulnerability, correction) : 
    if correction and list_vulnerability['corrections'] == {}:
        list_vulnerability['corrections'].append({"explanation_xss" : correction['explanation_xss'], 'line_vuln' :  correction['line_vuln'], 'list_corrections' : [{'title' : title,'line_correction' : correction['line_correction'], 'correction_explanation' : correction['correction_explanation']}]})
    elif correction:
        list_vulnerability['corrections']['list_corrections'].append({'title' : title, 'line_correction' : correction['line_correction'], 'correction_explanation' : correction['correction_explanation']})
    return list_vulnerability

# add the correction for the escape of the output
def add_escape_correction(list_lines, list_vulnerability, file):
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
                    # get the example of correct according to the extension
                    for code in correction_before_extension['code']:
                        if extension in code['extension'] : 
                            return {
                                'explanation_xss': template_correction['description_xss'],
                                'correction_explanation' : correction_before_extension['description_vuln'],
                                'line_vuln' : "file : "+file['file_path']+" line : "+str(list_lines['number'])+" \n"+list_lines['line_content'],
                                'line_correction' : code['example_code'],             
                            }               
    return None        

def add_input_validation_correction(list_lines, file):
    # first we check if the name or the type of the input is in the validator type of the template
    # get the name of the input and the type of the input if it exists, the variable list_lines['line_content'] contain the html line
    name_input, type_input = get_name_and_type_input(list_lines)
    if name_input is not None and type_input is not None :
        with open('./corrections/template_correction/template_xss.json', 'r') as json_file:
            template_correction = json.load(json_file)
            correction_before_extension = next((correction for correction in template_correction['corrections'] if correction['type'] == 'input_validation'), None)
            extension = os.path.splitext(file['file_path'])[1]
            for code in correction_before_extension['code']:
                if extension in code['extension'] :
                    for validator in code['list_validators']:
                        if validator['validator_type'] == name_input or validator['validator_type'] == type_input :
                            return {
                                'explanation_xss': template_correction['description_xss'],
                                'correction_explanation' : correction_before_extension['description_vuln'],
                                'line_vuln' : "file : "+file['file_path']+" line : "+str(list_lines['number'])+" \n"+list_lines['line_content'],
                                'line_correction' : validator['example_code']             
                            } 
    
# get the name of the input and the type of the input if it exists, the variable list_lines['line_content'] contain the html line    
def get_name_and_type_input(list_lines):   
    name_input_match = re.search(r'name="(.*?)"', list_lines['line_content'], re.IGNORECASE)
    type_input_match = re.search(r'type="(.*?)"', list_lines['line_content'], re.IGNORECASE)
    name_input = name_input_match.group(1) if name_input_match else None
    type_input = type_input_match.group(1) if type_input_match else None
    return name_input, type_input

# get the CSP header
def get_CSP_correction(file):
    with open(file['file_path'], 'r') as f:
        content = f.readlines()
    # Initialiser une liste pour stocker les lignes du CSP
    CSP_lines = []
    for i, line in enumerate(content, start=1):
        # Utiliser une expression régulière pour rechercher l'en-tête CSP
        if re.search(r'Content-Security-Policy', line, re.IGNORECASE):
            # Ajouter la ligne entière à la liste CSP_lines
            CSP_lines.append((i, line.strip()))
    if CSP_lines:
        # verifier que la ligne contient script-src 'self'
        for line in CSP_lines:
            if re.search(r"script-src 'self'", line[1], re.IGNORECASE) and not re.search(r"script-src 'unsafe-inline'", line[1], re.IGNORECASE) and not re.search(r"<!--", line[1], re.IGNORECASE):
                return None
    with open('./corrections/template_correction/template_xss.json', 'r') as json_file:
        template_correction = json.load(json_file)
        correction = next((correction for correction in template_correction['corrections'] if correction['type'] == 'CSP_configuration'), None)
        return {
            'explanation_xss': template_correction['description_xss'],
            'correction_explanation' : correction['description_vuln'],
            'line_vuln' : "No CSP found in file "+file['file_path'],
            'line_correction' : correction['code']             
        }
               
    
# Main function
def main_correction(project_path) : 
    vulnerabilities = []
    if(os.path.exists('./lib/XSStrike/result-XSS-Strike.json')):
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
    