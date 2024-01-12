import subprocess
import os 


def run_xss_strike(target_url, dataPOST, cookies = None):
    
    file_path = './lib/XSStrike/result-XSS-Strike.json'

    # Command to call xssStrike.py with the specified arguments
    if os.path.exists(file_path):
        os.remove(file_path)
    else :
        print("The file does not exist")
    
    command = []
    
    # "txtName=er&mtxMessage=er&btnSign=Sign%20Guestbook",
    
    if dataPOST != "":
        command = [
        "python",
        "./lib/XSStrike/xsstrike.py",  # Name of the Python file to execute
        "-u", target_url,
        "--data", dataPOST,
        "--headers", cookies,
        "--skip", 
        ]
    else:
        command = [
        "python",
        "./lib/XSStrike/xsstrike.py",  # Name of the Python file to execute
        "-u", target_url,
        "--headers", cookies,
        "--skip"
        ]
    
    # display the command to execute
    print(f"Executing command: {command}")
    
    try:
        # Execute the command
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing xssStrike.py: {e}")