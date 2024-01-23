import os
import re

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

# Exemple d'utilisation
path = r'C:\wamp64\www\WebFortify'  # Utilisez 'r' avant le chemin pour éviter les caractères d'échappement
form_parameters = [{'param': 'name="title"'}, {'param': 'name="content"'}]
result = find_xss_strike(path, form_parameters)
print(f"Found {len(result)} files containing the specified form parameters:")
for item in result:
    print(f"File: {item['file_path']}")
    for line_entry in item['lines']:
        print(f"  Line: {line_entry['number']}, Param: {line_entry['param']}, Content: {line_entry['line_content']}")
    
