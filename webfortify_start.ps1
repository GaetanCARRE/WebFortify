# Obtenir le chemin du script
$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Définir les chemins des répertoires
$frontWebFortifyPath = Join-Path $scriptDirectory "front-web-fortify\web-fortify"
$backWebFortifyPath = Join-Path $scriptDirectory "back-web-fortify"

# Exécuter les commandes pour le front-end
cd $frontWebFortifyPath
npm install

# Lancer npm run dev en arrière-plan sans nouvelle fenêtre
$npmProcess = Start-Process -FilePath npm -ArgumentList "run dev" -NoNewWindow -PassThru | Out-Null

# Revenir au répertoire initial
cd $scriptDirectory

# Exécuter les commandes pour le back-end
cd $backWebFortifyPath

# Activer l'environnement virtuel venv (ne fonctionne que sous PowerShell)
. .\venv\Scripts\Activate

# Installer les dépendances du back-end
pip install -r requirements.txt

# Lancer le serveur Flask en arrière-plan
Start-Process -FilePath flask -ArgumentList "--app flaskr run --debug" -NoNewWindow -PassThru | Out-Null

# Lancer sqlmap en arrière-plan
Start-Process -FilePath python -ArgumentList ".\lib\sqlmap\sqlmapapi.py -s" -NoNewWindow -PassThru | Out-Null

# Attendre jusqu'à ce que l'utilisateur appuie sur CTRL+C
Write-Host "Appuyez sur CTRL+C pour arreter les services."
while ($true) {
    Start-Sleep -Seconds 1
}

# Terminer les processus npm run dev, Flask et sqlmap
$npmProcess | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "python" | Where-Object { $_.MainModule.FileName -like '*\venv\Scripts\python.exe' } | Stop-Process -Force -ErrorAction SilentlyContinue
