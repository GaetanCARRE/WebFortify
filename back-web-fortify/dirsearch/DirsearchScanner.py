import subprocess
import re


class DirsearchScanner:
    def __init__(self):
        self.get_dirsearch_path()

    def run_dirsearch(self, target_url):
        dirsearch_command = ["python", self.dirsearch_path, "-u", target_url]
        output_file = "output_file_dirsearch.txt"
        dirsearch_command += ["-o", output_file]
        wordlist = "wordlist.txt"
        dirsearch_command += ["-w", wordlist]
        dirsearch_command += ["-t","100"]
        ##dirsearch_command += ["--full-url","-r","-R","1"]
        
        try:
            subprocess.run(dirsearch_command, check=True)
            print(f"Dirsearch completed successfully")
        except subprocess.CalledProcessError as e:
            print(f"Error running Dirsearch: {e}")
        
            
    def get_dirsearch_path(self):
        # Exécuter la commande pip show dirsearch
        result = subprocess.run(['py','-m','pip', 'show', 'dirsearch'], capture_output=True, text=True)

        # Rechercher le chemin d'installation dans la sortie de la commande
        match = re.search(r'Location: (.+)', result.stdout)
        if match:
            install_path = match.group(1).replace("\\", "/")
            # Construire le chemin vers le fichier dirsearch.py
            dirsearch_path = f"{install_path}/dirsearch/dirsearch.py"
            self.dirsearch_path = dirsearch_path
        else:
            raise Exception("Could not find dirsearch installation path")
        
    def parse_outut_file_dirsearch(self):
        fichier_nom = "output_file_dirsearch.txt"

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
            
##   to use the class dirsearch
#dirsearch_instance = DirsearchScanner()
#target_url="https://juice-shop.herokuapp.com/#/"
#dirsearch_instance.run_dirsearch(target_url)
#dirsearch_instance.parse_outut_file_dirsearch()