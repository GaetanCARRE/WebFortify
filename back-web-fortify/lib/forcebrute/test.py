import requests

url = "https://plusquungateau.fr/wp-login.php"

payload = 'log=a&pwd=a&wp-submit=Se%20connecter&redirect_to=https%3A%2F%2Fplusquungateau.fr%2Fwp-admin%2F&testcookie=1'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cookie': 'wordpress_test_cookie=WP%20Cookie%20check'
}

response = requests.post(url, headers=headers, data=payload)

print(response.text)
