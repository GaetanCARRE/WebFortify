import subprocess
import os 
import requests
from bs4 import BeautifulSoup
from difflib import unified_diff
import json
from corrections.correction_upload_file import main_correction_upload_file


class FileUpload:
    def __init__(self, url, method, input_form,  cookies = None):
        self.url = url
        self.method = method
        self.cookies = cookies
        self.input_form = input_form
       
    def filter_input_form(self):
        filter_input = {}
        for input in self.input_form:
            if input.get('type') == 'file':
                filter_input[input['name']] = '0'
            elif input['value'] != '' : 
                filter_input[input['name']] = input['value']
            else:
                filter_input[input['name']] = 'test'
        self.input_form = filter_input                
            
              
    def get_request(self):
        return requests.post(self.url, allow_redirects=False, cookies=self.cookies)
    
    def get_failed_request(self):
        try:
            response = requests.post(self.url, data=self.input_form, allow_redirects=False)
            response.raise_for_status()  # Lèvera une exception si la requête a échoué (code HTTP différent de 2xx)
            return response
        except requests.exceptions.RequestException as e:
            print(f"Erreur lors de la requête : {e}")
            return None  # Ou renvoyez ce que vous voulez en cas d'erreur

    

    def get_error_message(self):
        self.filter_input_form()
        response_failed = self.get_failed_request()
        response_menu = self.get_request()
        fail_message = self.get_added_content(response_menu.text, response_failed.text)
        # remove the html tags from the strings in the list
        fail_message = [BeautifulSoup(line, 'html.parser').get_text() for line in fail_message]
        if len(fail_message) > 0:
            return fail_message[0]
        else:
            return None
    
    def get_added_content(self, old_html, new_html):
        # Parse the HTML content
        soup_old = BeautifulSoup(old_html, 'html.parser')
        soup_new = BeautifulSoup(new_html, 'html.parser')

        # Get the string representations of the parsed HTML
        str_old = str(soup_old)
        str_new = str(soup_new)
        # Compute the differences
        diff = unified_diff(str_old.splitlines(), str_new.splitlines(), lineterm='')
        # # Extract added lines
        added_lines = [line[1:] for line in diff if line.startswith('+') and not line.startswith('+++')]
        # Return the added content as a string
        return added_lines

    def run_fuxploider(self):
        # remove the file if it exists that contain the extensions
        if os.path.exists('./lib/fuploader/valid_extension.txt'):
            os.remove('./lib/fuploader/valid_extension.txt')
        
        error_message = self.get_error_message()
        command = [
        "python",
        "./lib/fuploader/fuxploider.py",  # Name of the Python file to execute
        "--url", self.url,
        "--not-regex", error_message,
        ]
        # display the command to execute
        print(f"Executing command: {command}")
        
        try:
            # Execute the command
            subprocess.run(command, check=True, text=True, input='n\n')
            print("Command executed successfully")
        except subprocess.CalledProcessError as e:
            print(f"Error executing fuxploider.py: {e}")
        
    def write_result_in_json(self, path) : 
        extensions = []
        with open('./lib/fuploader/valid_extension.txt', 'r') as f:
            for extension in f.readlines():
                extensions.append(extension.strip())
        content_file = []
        if os.path.exists('./lib/fuploader/result_upload_file.json'):
            with open('./lib/fuploader/result_upload_file.json', 'r') as f:
                content_file = json.load(f)   
        # get the correction
        correction = main_correction_upload_file(self.url,self.input_form, path)   
        
        # add the result in the json file
        content_file.append({"url" : self.url, "extensions" : extensions, "title": "Upload file Vulnerability", "correction" : correction})
        json_data = json.dumps(content_file, indent=2)     
        with open('./lib/fuploader/result_upload_file.json', 'w') as json_file:
            json_file.write(json_data + '\n')
        
                     
