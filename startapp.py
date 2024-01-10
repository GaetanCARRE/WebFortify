import subprocess
import os

def run_command(command, cwd=None):
    """Exécute une commande dans un chemin spécifié en arrière-plan."""
    try:
        return subprocess.Popen(command, cwd=cwd, shell=True)
    except Exception as e:
        print(f"Erreur lors de l'exécution de la commande {command}: {e}")
        return None

# Lancer le frontend
frontend_process = run_command('npm start &', cwd='./front-web-fortify')

# Lancer le flask
# Note : L'activation de l'environnement virtuel doit se faire dans le même shell que les commandes Flask et sqlmapapi
flask_process = run_command('source venv/bin/activate && flask --app flaskr run --debug &', cwd='./back-web-fortify')

# Lancer sqlmapapi
sqlmapapi_process = run_command('python sqlmapapi.py -s &', cwd='./back-web-fortify/lib/sqlmap')

