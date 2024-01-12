# the cookie must have the format "NAME=VALUE" and the value 

def parse_cookie_string(cookie_string):
    cookies = {}
    if '=' in cookie_string:
        name, value = cookie_string.split('=', 1)
        cookies[name.strip()] = value.strip()
        return cookies
    else :
        return ""
   