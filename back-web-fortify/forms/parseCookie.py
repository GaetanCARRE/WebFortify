# the cookie must have the format "{NAME : VALUE}" and the value 

def parse_cookie_string(cookie_string):
    cookies = {}

    # split string by ';'
    cookie_string = cookie_string.split(';')
    # if the cookie_string is empty
    if cookie_string == ['']:
        return ""
    for cookie in cookie_string:
        # split the cookie by '='
        cookie = cookie.split('=')
        # get the name of the cookie
        name = cookie[0].strip()
        # get the value of the cookie
        value = cookie[1].strip()
        # add the cookie to the dictionary
        cookies[name] = value
    return cookies
