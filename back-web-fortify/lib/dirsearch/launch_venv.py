import json
import subprocess
import re


def run_venv():
    command_venv= [".\\venv\\Scripts\\activate"]

    print(f"Running Venv with command: {command_venv}")
    # try:
    subprocess.run('.\venv\Scripts\activate', check=True)
