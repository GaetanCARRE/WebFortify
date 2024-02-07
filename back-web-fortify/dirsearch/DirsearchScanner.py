import json
import subprocess
import re
from lib.dirsearch.launch_venv import run_venv
from urllib.parse import urlparse
import os 
import difflib

class DirsearchScanner:
    def __init__(self):
        self.get_dirsearch_path()
        

    def run_dirsearch(self, target_url):
                # Chemin vers l'environnement virtuel
        linux_venv_path = ". venv/bin/activate"
        venv_path = ".\\venv\\Scripts\\activate"

        if os.name == 'posix':
            venv_path = linux_venv_path

        # Commande pour activer l'environnement virtuel et exécuter le script python
        dirsearch_command = [venv_path, "&&", "python", "./lib/dirsearch/dirsearch.py"]
        dirsearch_command += ["-u", target_url]
        output_file = "./Dirsearch/output_file_dirsearch.txt"
        dirsearch_command += ["-o", output_file]
        wordlist = "./Dirsearch/wordlist_oral.txt"
        dirsearch_command += ["-w", wordlist]
        dirsearch_command += ["-t", "500"]
        dirsearch_command += ["-r", "--recursion-status=200"]
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
            resultats = filter_result(resultats)
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
            
def filter_result(resultats):
    extensions = [".html", ".htm", ".php", ".jsp", ".aspx", ".css", ".js", ".json", ".xml", ".cgi", ".pl", ".py", ".rb", ".aspx", ".cfm", ".jsp", ".cf", ".jspx", ".rss", ".atom", ".svg"]
    filter_result = []
    add_to_filter = True
    for i, result in enumerate(resultats):
        add_to_filter = True
        for j, searchequal in enumerate(resultats):
            if i != j and url_difference(result, searchequal) in extensions:
                if(len(searchequal) > len(result)):
                    add_to_filter = False
        if(add_to_filter == True):
            filter_result.append(result)

    return filter_result

def url_difference(url1, url2):
    # Calculate the difference between the two URLs using difflib
    diff = ""
    if(len(url2) > len(url1)):
        diff = difflib.ndiff(url2, url1)
    else:
        diff = difflib.ndiff(url1, url2)
    # Extract the differences
    differences = [d[2:] for d in diff if d.startswith('- ')]
    
    # Join the differences to get the absolute difference
    absolute_difference = ''.join(differences).strip("/")
    
    return absolute_difference

# def url_difference(url1, url2):
#     # Parse the URLs to extract their paths
#     path1 = urlparse(url1).path
#     path2 = urlparse(url2).path
    
#     # Find the common prefix of the paths
#     common_prefix = os.path.commonprefix([path1, path2])
#     difference1 = path1[len(common_prefix):].strip("/")
#     difference2 = path2[len(common_prefix):].strip("/")
#     # Calculate the difference by removing the common prefix
#     # enlever les espaces dans les différences
#     difference1 = difference1.replace(" ", "")
#     difference2 = difference2.replace(" ", "")
#     print("the length is "+str(len(difference1))+" and "+str(len(difference2)) +"for "+difference1+"and"+difference2+"top")
#     # if difference1 == ".php" or difference1 == ".php":
        
#     return difference1, difference2
