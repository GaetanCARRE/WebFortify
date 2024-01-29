import os
from urllib.parse import urlparse
import json 
import re
import difflib

# get the correction of the vulnerability upload file
def main_correction_upload_file(webpage, input_form, path) :
    line_vuln = find_file_vulnerability(webpage, input_form, path)
    print(line_vuln)
    extension = os.path.splitext(webpage)[1]
    with open('./corrections/template_correction/template_upload_file.json', 'r') as f:
        content = json.load(f)
        for correct in content['correction'] : 
            if extension in correct['langage']:
                return {"explanation" : content['explanation'], "line_vuln" : line_vuln, "title" : content['title'], "example_code" : correct['example_code']}


def find_file_vulnerability(webpage, input_form, path) :
    parameters = [{'param': key} for key in input_form]
    file_extensions = ['.php', '.js', '.jsx', '.html', '.tsx']  # Ajoutez d'autres extensions de fichier si nécessaire
    match_file = []
    for root, dirs, files in os.walk(path):
        for file in files:        
            if file.endswith(tuple(file_extensions)):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    if all_parameters_found(content, parameters):
                        matches_with_line_numbers = []
                        for line_number, line_content in enumerate(content.splitlines(), start=1):
                            # Check if the pattern is found in the line
                            if re.search(r'type=["\']file["\']', line_content, re.IGNORECASE):
                                matches_with_line_numbers.append((line_number, line_content.strip()))   
                        # Process the matches
                        for line_number, match_content in matches_with_line_numbers:
                            match_file.append({"file":os.path.join(root, file),"line_number" : str(line_number), "line" : match_content})
    error = False
    if len(match_file) > 1:
        # filter on the name of the web page
        error, match_file = condition_multiple_links(match_file, webpage) 
    elif len(match_file) == 1:
        match_file = match_file[0]
    return "file : "+match_file['file']+", line : "+match_file['line_number']+" "+match_file['line']
    
# verify that all parameters are found in the file
def all_parameters_found(content, parameters):
    return all(re.search(re.escape(param['param']), content, re.IGNORECASE) for param in parameters)


# Compare the similarity between the url targeted and the url found in the file 
def similarity_ratio(a, b):
    return difflib.SequenceMatcher(None, a, b).ratio()

# Check if the url targeted is in the list of files found
def condition_multiple_links(result, url):
    best_match = None
    best_ratio = 0.0
    for item in result:
        file_path = item['file']
        ratio = similarity_ratio(file_path, url)
        
        # Choisissez le meilleur match avec la plus grande similarité
        if ratio > best_ratio:
            best_ratio = ratio
            best_match = item

    if best_match:
        return True, best_match
    else:
        return False, None
    