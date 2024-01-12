import json
import os
from datetime import date
from flask import Flask, jsonify, request
import threading
from Dirsearch.DirsearchScanner import DirsearchScanner
from lib.XSStrike.run_xss_strike import run_xss_strike
import json
from connector.sqlmapconnector import SQLMapConnector
import forms.forms as forms
import forms.parseCookie as parseCookie

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


    @app.route('/xssstrike', methods=['POST'])
    def test():
        try:
            # Extract parameters from the JSON request
            data = request.get_json()
            target_url = data.get('target_url')
            cookies = parseCookie.parse_cookie_string(data.get('cookie')) 
               
            # Call the testBeautifulSoup function to get the parameters
            list_forms = forms.main(target_url, cookies=cookies)
            dataPOST = ""
            # get the first form of the list
            if len(list_forms) > 0:
                form = list_forms[0]
                if form['method'] == 'GET' or form['method'] == 'get':
                    parameters = ""
                    # Get the parameters from the list of forms
                    for form in list_forms:
                        for input in form['inputs']:
                            if(input['name'] != None) :
                                parameters += input['name'] + "=test&"
                    parameters = parameters[:-1]
                    target_url = target_url + "?" + parameters
                elif form['method'] == 'POST' or form['method'] == 'post':
                    for input in form['inputs']:
                        if(input['name'] != None) :
                            dataPOST += input['name'] 
                            if(input['value'] == "") :
                                dataPOST += "=test&"
                            else:
                                dataPOST+= "="+ input['value'] + "&"
                            
                    dataPOST = dataPOST[:-1]
                         
            # Call the run_xss_strike function
            run_xss_strike(target_url, dataPOST, data.get('cookie'))

            with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
                result_json = json.load(json_file)
            return jsonify(list_forms)
           
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