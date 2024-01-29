import json
import subprocess
import re
from lib.dirsearch.launch_venv import run_venv


class DirsearchScanner:
    def __init__(self):
        self.get_dirsearch_path()
        

    def run_dirsearch(self, target_url):
                # Chemin vers l'environnement virtuel
        venv_path = ".\\venv\\Scripts\\activate"

        # Commande pour activer l'environnement virtuel et exécuter le script python
        dirsearch_command = [venv_path, "&&", "python", "./lib/dirsearch/dirsearch.py"]
        dirsearch_command += ["-u", target_url]
        output_file = "./Dirsearch/output_file_dirsearch.txt"
        dirsearch_command += ["-o", output_file]
        wordlist = "./Dirsearch/wordlist_test.txt"
        dirsearch_command += ["-w", wordlist]
        dirsearch_command += ["-t", "500"]
        dirsearch_command += ["-r", "--recursion-status=200", "--deep-recursive"]
        dirsearch_command += ["--random-agent"]
        dirsearch_command += ["--crawl"]

        # Afficher la commande exécutée
        print(f"Running Dirsearch with command: {' '.join(dirsearch_command)}")
        try:
            subprocess.run(' '.join(dirsearch_command), check=True, shell=True)
            print(f"Dirsearch completed successfully")
        except :
            print(f"Error running Dirsearch: ")
        
            
    def get_dirsearch_path(self):
        try:
            # Exécuter la commande pip show dirsearch
            result = subprocess.run(['pip', 'show', 'dirsearch'], capture_output=True, text=True)

            # Rechercher le chemin d'installation dans la sortie de la commande
            match = re.search(r'Location: (.+)', result.stdout)
            if match:
                install_path = match.group(1).replace("\\", "/")
                # Construire le chemin vers le fichier dirsearch.py
                dirsearch_path = f"{install_path}/dirsearch/dirsearch.py"
                self.dirsearch_path = dirsearch_path
                print(f"Dirsearch path: {dirsearch_path}")
            else:
                raise Exception("Could not find dirsearch installation path")
        except subprocess.CalledProcessError as e:
            print(f"Dirsearch not find: {e}")
        
    def parse_output_file_dirsearch(self):
        try:
            fichier_nom = "./Dirsearch/output_file_dirsearch.txt"
            

            # Ouvrir le fichier en mode lecture
            with open(fichier_nom, 'r') as fichier:
                # Lire toutes les lignes du fichier
                lignes = fichier.readlines()

            # Filtrer les lignes commençant par "200" et extraire uniquement l'URL
            testlignes = lignes
            resultats = []
            for ligne in testlignes:
                if ligne.startswith('200'):
                    testresult = ligne.split(' ')
                    ##print(testresult)
                    resultats.append(testresult[-1])

            # Ouvrir le fichier en mode écriture pour réécrire les résultats
            with open(fichier_nom, 'w') as fichier:
                # Écrire les résultats dans le fichier
                fichier.writelines(resultats)
        except subprocess.CalledProcessError as e:
            print(f"Error to parse the file output_file_dirsearch: {e}")
            
    def convert_txt_to_json(self):
        try:
            liste_urls = []
            nom_fichier_entree = "./Dirsearch/output_file_dirsearch.txt"
            nom_fichier_sortie = "./Dirsearch/output_file_dirsearch.json"
            nom_fichier_urls_privees = "./Dirsearch/list_private_url.txt"
            
            # Lecture du fichier texte des URL privées
            with open(nom_fichier_urls_privees, 'r') as fichier_urls_privees:
                urls_privees = [url.strip() for url in fichier_urls_privees]
            
            # Lire la liste depuis le fichier texte
            with open(nom_fichier_entree, 'r', encoding='utf-8') as f:
                for ligne in f:
                    url = ligne.strip()  # Supprimer les espaces et sauts de ligne éventuels
                    # Vérifier si la fin de l'URL est dans la liste des URL privées
                    explanation_key = "explanation"
                    correction_key = "correction"
                    if any(url.endswith(private_url) for private_url in urls_privees):
                        explanation_value = "the web page found does not appear to be public"
                        correction_value = "// page_protect.php \n<?php\n// You can define a specific condition here to determine whether the page should be accessible.\n$autoriser_access = false;\nif (!$autoriser_access) {\n\t// If access is not authorized, redirect the user to another page, such as the home page.\n\theader('Location: /index.php');\n\texit(); // Be sure to terminate the script after the redirection\n}\n//The rest of your page's code will go here. Next, in each page where you want to restrict access, you include the file page_protect.php at the beginning of the script :\n\n<?php\ninclude('page_protect.php');\n?>"
                    else:
                        explanation_value = "the web page found appear to be public"
                        correction_value = ""
                    
                    # Création du dictionnaire pour chaque URL
                    url_dict = {"url": url, "corrections": {explanation_key: explanation_value,correction_key: correction_value}}
                    liste_urls.append(url_dict)

            # Écrire la liste au format JSON dans un fichier de sortie
            with open(nom_fichier_sortie, 'w', encoding='utf-8') as f_out:
                 json.dump(liste_urls, f_out, indent=2)
        except subprocess.CalledProcessError as e:
            print(f"Error to create the json file: {e}")
