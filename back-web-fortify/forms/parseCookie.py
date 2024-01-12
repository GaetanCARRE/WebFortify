# the cookie must have the format "{NAME : VALUE}" and the value 

def parse_cookie_string(cookie_string):
    cookies = {}
    # j'ai par exemple un string de cookie de la forme "PHPSESSID=123456; security=low"
    # je veux un dictionnaire de la forme {PHPSESSID : 123456, security : low} en fonction du nombre de paramètres
    # je split d'abord le string par ';'
    cookie_string = cookie_string.split(';')
    # je parcours le tableau de string
    if cookie_string == ['']:
        return ""
    for cookie in cookie_string:
        # je split le string par '='
        cookie = cookie.split('=')
        # je récupère le nom du cookie
        name = cookie[0].strip()
        # je récupère la valeur du cookie
        value = cookie[1].strip()
        # j'ajoute le cookie au dictionnaire
        cookies[name] = value
    return cookies
    
    # if '=' in cookie_string:
    #     name, value = cookie_string.split('=', 1)
    #     cookies[name.strip()] = value.strip()
    #     return cookies
    # else :
    #     return ""
   