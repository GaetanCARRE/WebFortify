import json
import os
from datetime import date
from flask import Flask, jsonify, request
import threading
from Dirsearch.DirsearchScanner import DirsearchScanner
from lib.XSStrike.run_xss_strike import run_xss_strike
from lib.XSStrike.testBeautifulSoup import testBeautifulSoup
from connector.sqlmapconnector import SQLMapConnector
import forms.forms as forms

version = "0.0.1"


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    @app.route('/')
    def index():
        return jsonify(
            Status="Running",
            Version=version,
            date=date.today(),
        )
        
    @app.route('/dirsearch', methods=['POST'])
    def dirsearch():
        try:
            # Extract parameters from the JSON request
            target_url = request.args.get('url')
            dirsearch_instance = DirsearchScanner()
            thread = threading.Thread(target=dirsearch_instance.run_dirsearch(target_url))
            thread.start()
            thread.join()
            dirsearch_instance.parse_output_file_dirsearch()
            dirsearch_instance.lire_liste_txt_et_convertir_en_json()
            with open('./Dirsearch/output_file_dirsearch.json', 'r') as json_file:
                result_json = json.load(json_file)
            return jsonify(result_json)
        except Exception as e:
            return jsonify(
                Status="Error",
                Message=f"An error occurred: {str(e)}"
            )


    @app.route('/xsstrike', methods=['POST'])
    def XSStrike():
        try:
            # Extract parameters from the JSON request
            data = request.get_json()
            target_url = data.get('target_url')
            param_data = data.get('param_data')
            headers = data.get('headers')
            
            # Call the testBeautifulSoup function to get the parameters
            list_forms = forms.main(target_url)
            parameters = ""
            
            # Get the parameters from the list of forms
            for form in list_forms:
                for input in form['inputs']:
                    if(input['name'] != None) :
                        parameters += input['name'] + "=test&"
            parameters = parameters[:-1]
            target_url = target_url + "?" + parameters
            
            # Call the run_xss_strike function
            run_xss_strike(target_url, param_data, headers)

            with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
                result_json = json.load(json_file)
            return jsonify(result_json)
           
        except Exception as e:
            return jsonify(
                Status="Error",
                Message=f"An error occurred: {str(e)}"
            )
    
    @app.route('/sqlmap', methods=['POST'])
    def sqlmap():
        url = request.json.get('url')
        options = request.json.get('options')
        cookie = request.json.get('cookie')
        
        connector = SQLMapConnector(cookie, url, options)
        scanid = connector.start_scan()
        while True:
            status = connector.get_scan_status(scanid)
            if status == "terminated":
                break
        data = connector.get_scan_data(scanid)
        return jsonify(data)

    return app