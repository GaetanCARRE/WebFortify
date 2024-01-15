import requests
from icecream import ic

def get_cookie_from_credentials(login, password, url):
    session = requests.Session()
    payload = {
        'login': login,
        'password': password
    }
    session.post(url, data=payload)
    return session.cookies.get_dict()
