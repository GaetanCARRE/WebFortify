import subprocess
import os 


def run_xss_strike(target_url, dataPOST, cookies = None):
    
    command = []
        
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