from bs4 import BeautifulSoup
import requests
def testBeautifulSoup():
    try:
        # Obtenir le contenu HTML de la page
        response = requests.get('https://brutelogic.com.br/gym.php')
        response.raise_for_status()

        # Analyser le HTML avec Beautiful Soup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Trouver tous les formulaires dans la page
        forms = soup.find_all('form')

        # Dictionnaire pour stocker les paramètres
        parameters = {}

        for form in forms:
            # Extraire les paramètres du formulaire
            for input_tag in form.find_all('input'):
                param_name = input_tag.get('name')
                if param_name:
                    parameters[param_name] = None

        return parameters

    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la récupération de la page : {e}")
        return None