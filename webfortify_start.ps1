# Obtenir le chemin du script
$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Définir les chemins des répertoires
$frontWebFortifyPath = Join-Path $scriptDirectory "front-web-fortify\web-fortify"
$backWebFortifyPath = Join-Path $scriptDirectory "back-web-fortify"

# Exécuter les commandes pour le front-end
cd $frontWebFortifyPath
npm install
Start-Process -FilePath npm -ArgumentList "run dev" -NoNewWindow -PassThru | Out-Null

# Revenir au répertoire initial
cd $scriptDirectory

# Exécuter les commandes pour le back-end
cd $backWebFortifyPath

# Activer l'environnement virtuel venv (ne fonctionne que sous PowerShell)
. .\venv\Scripts\Activate

# Installer les dépendances du back-end
pip install -r requirements.txt

# Lancer le serveur Flask
Start-Process -FilePath flask -ArgumentList "--app flaskr run --debug" -NoNewWindow -PassThru | Out-Null


# Exécuter sqlmap dans l'environnement virtuel
Start-Process -FilePath python -ArgumentList ".\lib\sqlmap\sqlmapapi.py -s" -NoNewWindow -PassThru | Out-Null
# python .\lib\sqlmap\sqlmapapi.py -s 


# Attendre jusqu'à ce que l'utilisateur appuie sur CTRL+C
Start-Sleep(3)
Clear-Host
Write-Host "Appuyez sur CTRL+C pour arreter les services."
while ($true) {
    Start-Sleep -Seconds 1
}

# Terminer les processus npm run dev
Get-Process -Name "npm" | Where-Object { $_.MainModule.FileName -like '*\node\npm.cmd' } | Stop-Process -Force -ErrorAction SilentlyContinue

# Terminer les processus Flask
Get-Process -Name "python" | Where-Object { $_.MainModule.FileName -like '*\venv\Scripts\python.exe' } | Stop-Process -Force -ErrorAction SilentlyContinue

# Terminer les processus sqlmap
Get-Process -Name "python" | Where-Object { $_.MainModule.FileName -like '*\venv\Scripts\python.exe' -and $_.CommandLine -like '*\lib\sqlmap\sqlmapapi.py*' } | Stop-Process -Force -ErrorAction SilentlyContinue
