import requests
from difflib import unified_diff
from bs4 import BeautifulSoup
import forms.forms as forms

class Bruteforce:
    def __init__(self, url, method, headers, payload_info, scan_level, cookies = None):
        self.url = url
        self.method = method
        self.headers = headers
        self.payload_info = payload_info
        self.scan_level = scan_level
        self.cookies = cookies
        if scan_level == 0:
            self.wordlist_passwd = "./lib/forcebrute/wordlists/password_small.txt"
            self.wordlist_user = "./lib/forcebrute/wordlists/user_small.txt"
        elif scan_level == 1:
            self.wordlist_passwd = "./lib/forcebrute/wordlists/password_medium.txt"
            self.wordlist_user = "./lib/forcebrute/wordlists/user_medium.txt"
        elif scan_level == 2:
            self.wordlist_passwd = "./lib/forcebrute/wordlists/password_big.txt"
            self.wordlist_user = "./lib/forcebrute/wordlists/user_big.txt"
    
    def get_request(self, user_from_list, password_from_list):
        formatted_url = f"{self.url}?{self.payload_info['login_name']}={user_from_list}&{self.payload_info['password_name']}={password_from_list}&{self.payload_info['submit_name']}={self.payload_info['submit_value']}"
        return requests.get(formatted_url, headers=self.headers, allow_redirects=False, cookies=self.cookies)
        
    def post_request(self, user_from_list, password_from_list):
        payload = {
            self.payload_info["login_name"] : user_from_list,
            self.payload_info["password_name"] : password_from_list,
            self.payload_info["submit_name"] : self.payload_info["submit_value"]
        }
        print(payload)
        return requests.post(self.url, headers=self.headers, data=payload, allow_redirects=False, cookies=self.cookies)
    
    def run(self):
        print("failed message")
        print(self.find_failed_message())
        failed_message = self.find_failed_message()[0]
        print(f"Failed message: {failed_message}")
        if not failed_message:
            raise Exception("Failed message not found")
        with open(self.wordlist_user, "r") as f:
            users = f.readlines()
        with open(self.wordlist_passwd, "r") as f:
            passwords = f.readlines()
        for user in users:
            for password in passwords:
                user = user.strip()
                password = password.strip()
                if self.method.lower() == "get":
                    response = self.get_request(user, password)
                    if failed_message.replace(" ", "") not in response.text.replace(" ", ""):
                        print(f"Found user: {user} and password: {password}")
                        return {"user": user, "password": password, "url": self.url}
                elif self.method.lower() == "post":
                    response = self.post_request(user, password)
                    if failed_message.replace(" ", "") not in response.text.replace(" ", ""):
                        print(f"Found user: {user} and password: {password}")
                        return {"user": user, "password": password, "url": self.url }

        return {"user": None, "password": None , "url": self.url}

    def get_added_content(self, old_html, new_html):
        # Parse the HTML content
        soup_old = BeautifulSoup(old_html, 'html.parser')
        soup_new = BeautifulSoup(new_html, 'html.parser')
        print(f"Old html: {soup_old}")
        print(f"New html: {soup_new}")


        # Get the string representations of the parsed HTML
        str_old = str(soup_old)
        str_new = str(soup_new)

        # Compute the differences
        diff = unified_diff(str_old.splitlines(), str_new.splitlines(), lineterm='')
        # Extract added lines
        added_lines = [line[1:] for line in diff if line.startswith('+') and not line.startswith('+++')]

        # Return the added content as a string
        print(f"Added lines: {added_lines}")
        return added_lines

    
    def find_failed_message(self):
        # make a get request on login page
        response = requests.get(self.url, cookies=self.cookies, allow_redirects=False)
        # make a request with a wrong password
        print(self.method)
        if self.method.lower() == "get":
            response_failed = self.get_request("wrong_login", "wrong_password")
        elif self.method.lower() == "post":
            print("----- sending post request ----")
            response_failed = self.post_request("wrong_login", "wrong_password")
        # compare the responses
        return self.get_added_content(response.text, response_failed.text)





