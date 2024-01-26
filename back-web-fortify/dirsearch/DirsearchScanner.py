import json
import subprocess
import re


class DirsearchScanner:
    def __init__(self):
        self.get_dirsearch_path()

    def run_dirsearch(self, target_url):
        dirsearch_command = ["python", self.dirsearch_path, "-u", target_url]
        output_file = "./Dirsearch/output_file_dirsearch.txt"
        dirsearch_command += ["-o", output_file]
        wordlist = "./Dirsearch/wordlist_test.txt"
        dirsearch_command += ["-w", wordlist]
        dirsearch_command += ["-t","500"]
        dirsearch_command += ["-r","--recursion-status=200","--deep-recursive"]
        dirsearch_command += ["--random-agent"]
        dirsearch_command += ["--crawl"]
        
        try:
            subprocess.run(dirsearch_command, check=True)
            print(f"Dirsearch completed successfully")
        except subprocess.CalledProcessError as e:
            print(f"Error running Dirsearch: {e}")
        
            
    def get_dirsearch_path(self):
        try:
            # Exécuter la commande pip show dirsearch
            result = subprocess.run(['py','-m','pip', 'show', 'dirsearch'], capture_output=True, text=True)

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
                    correction = "the web page found does not appear to be public" if any(url.endswith(private_url) for private_url in urls_privees) else ""
                    # Création du dictionnaire pour chaque URL
                    url_dict = {"url": url, "correction": correction}
                    liste_urls.append(url_dict)

            # Écrire la liste au format JSON dans un fichier de sortie
            with open(nom_fichier_sortie, 'w', encoding='utf-8') as f_out:
                 json.dump(liste_urls, f_out, indent=2)
        except subprocess.CalledProcessError as e:
            print(f"Error to create the json file: {e}")

