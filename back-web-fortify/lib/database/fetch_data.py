import os
import json
from datetime import datetime
from flask import jsonify, request


def InsertLogInDataBase(projectName, logs):
     # check if projects.json exists
    
    if(os.path.exists('./lib/database/projects.json') == False):
        with open('./lib/database/projects.json', 'w') as json_file:
            json.dump([], json_file)

    # read projects.json
    with open('./lib/database/projects.json', 'r') as json_file:
        result_json = json.load(json_file)

    # append project object to projects.json
    for project in result_json:
        if(project['projectName'] == projectName):
            project['logs'] = logs          
            """for log in logs:
                project['logs'].append(log)
            """
            break

    # write to projects.json
    with open('./lib/database/projects.json', 'w') as json_file:
        json.dump(result_json, json_file)



def createProject(projectName, folderPath):
    try:
      

        # create project object
        project = {
            "projectName": projectName,
            "folderPath": folderPath,
            "logs": [],
        }
        print(project)

        alreadyExists = False

        # check if projects.json exists
        if(os.path.exists('./lib/database/projects.json') == False):
            with open('./lib/database/projects.json', 'w') as json_file:
                json.dump([], json_file)

        # check if project already exists
        with open('./lib/database/projects.json', 'r') as json_file:
            result_json = json.load(json_file)
            for each in result_json:
                if(each['projectName'] == projectName):
                    alreadyExists = True
                    return True
                

        # read projects.json
        if alreadyExists == False:
            with open('./lib/database/projects.json', 'r') as json_file:
                result_json = json.load(json_file)

            # append project object to projects.json
            print(project)
            result_json.append(project)

            # write to projects.json
            with open('./lib/database/projects.json', 'w') as json_file:
                json.dump(result_json, json_file)

            return False
        
    except Exception as e:
        return jsonify(
            Status="Error",
            Message=f"An error occurred: {str(e)}"
        )