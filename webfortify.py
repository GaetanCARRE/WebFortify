import subprocess
import signal
import os

FRONTEND_PATH = "front-web-fortify/web-fortify"
BACKEND_PATH = "back-web-fortify"
VENVPATH = os.path.join(BACKEND_PATH, "venv")  # Chemin vers l'environnement virtuel
SQLMAP_API_PATH = os.path.join(BACKEND_PATH, "lib", "sqlmap")

def activate_venv():
    print("Activation de l'environnement virtuel...")
    activate_script = "activate" if os.name == "nt" else "activate"
    activate_path = os.path.join(VENVPATH, "Scripts", activate_script) if os.name == "nt" else os.path.join(VENVPATH, "bin", activate_script)
    activate_cmd = f"source {activate_path}" if os.name != "nt" else f"{activate_path}"
    activate_cmd = f"bash -c '{activate_cmd}'" if os.name != "nt" else f"{activate_cmd}"
    subprocess.run(activate_cmd, shell=True)

def install_dependencies():
    activate_venv()  # Activation de l'environnement virtuel
    print("Installation des dépendances du front-end...")
    subprocess.run(["npm", "install"], cwd=FRONTEND_PATH)

    print("Installation des dépendances du backend...")
    subprocess.run(["pip", "install", "-r", "requirements.txt"], cwd=BACKEND_PATH)

def start_services():
    activate_venv()  # Activation de l'environnement virtuel
    print("Démarrage du front-end...")
    subprocess.Popen(["npm", "run", "dev"], cwd=FRONTEND_PATH)

    print("Démarrage du backend...")
    subprocess.Popen(["flask", "--app", "flaskr", "run", "--debug"], cwd=BACKEND_PATH)

    print("Démarrage de l'API sqlmap...")
    subprocess.Popen(["python", "sqlmapapi.py", "-s"], cwd=SQLMAP_API_PATH)

def stop_services(signum, frame):
    print("Arrêt des services...")
    os.system(f"pkill -f 'npm run dev' -P {os.getpgid(0)}")
    os.system(f"pkill -f 'flask run' -P {os.getpgid(0)}")
    os.system(f"pkill -f 'python sqlmapapi.py -s' -P {os.getpgid(0)}")
    exit()

if __name__ == "__main__":
    # Installation des dépendances
    install_dependencies()

    # Démarrage des services
    start_services()

    # Attente de la commande CTRL+C pour terminer les services
    signal.signal(signal.SIGINT, stop_services)

    # Attendre indéfiniment (le script reste actif jusqu'à ce que vous fassiez CTRL+C)
    signal.pause()
