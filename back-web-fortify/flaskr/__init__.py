import json
import os
from datetime import date
from flask import Flask, jsonify, request
import threading
from Dirsearch.DirsearchScanner import DirsearchScanner
from lib.XSStrike.run_xss_strike import run_xss_strike
from lib.XSStrike.filter_web_pages import filter_web_pages
import json
from connector.sqlmapconnector import SQLMapConnector
import forms.forms as forms
import forms.parseCookie as parseCookie
from lib.forcebrute.bruteforce import Bruteforce
from icecream import ic
from corrections.find_sql_query import find_sql_queries, finditem
from corrections.correction_xsstrike import main_correction

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
    def test():
        try:
            
            file_path = './lib/XSStrike/result-XSS-Strike.json'
            # Command to call xssStrike.py with the specified arguments
            if os.path.exists(file_path):
                os.remove(file_path)
            else :
                print("The file does not exist")
        
            link_web_pages = filter_web_pages()
            # Extract parameters from the JSON request
            for link_web_page in link_web_pages:
                data = request.get_json()
                cookies = parseCookie.parse_cookie_string(data.get('cookie'))
                project_path = data.get('project_path')
                # Call the testBeautifulSoup function to get the parameters
                list_forms = forms.main(link_web_page, cookies=cookies)
                if(len(list_forms) != 0):
                    dataPOST = ""
                    # get the first form of the list
                    if len(list_forms) > 0:
                        form = list_forms[0]
                        if form['method'] == 'GET' or form['method'] == 'get': # add to the url the parameters like "name1=value1&name2=value2"
                            parameters = ""
                            # Get the parameters from the list of forms
                            for form in list_forms:
                                for input in form['inputs']:
                                    if(input['name'] != None) :
                                        parameters += input['name'] + "=test&"
                            parameters = parameters[:-1]
                            link_web_page = link_web_page + "?" + parameters
                        elif form['method'] == 'POST' or form['method'] == 'post': # get a list of parameters like "name1=value1&name2=value2"
                            for input in form['inputs']:
                                if(input['name'] != None) :
                                    dataPOST += input['name'] 
                                    if(input['value'] == "") :
                                        dataPOST += "=test&"
                                    else:
                                        dataPOST+= "="+ input['value'] + "&"           
                            dataPOST = dataPOST[:-1]
                                
                    # Call the run_xss_strike function
                    run_xss_strike(link_web_page, dataPOST, "Cookie: "+ data.get('cookie'))
            main_correction(project_path)
            if os.path.exists(file_path):
                with open('./lib/XSStrike/result-XSS-Strike.json', 'r') as json_file:
                    result_json = json.load(json_file)
                return jsonify(result_json)
            else : # I want to return a empty json like []
                return jsonify({})
           
        except Exception as e:
            return jsonify(
                Status="Error",
                Message=f"An error occurred: {str(e)}"
            )
    
    @app.route('/sqlmap', methods=['POST'])
    def sqlmap():
        urls = request.json.get('urls')
        options = request.json.get('options')
        cookie = request.json.get('cookie')
        path = request.json.get('path')
        
        if not urls:
            with open('./Dirsearch/output_file_dirsearch.json', 'r') as json_file:
                result_json = json.load(json_file)
            print(f"result_json: {result_json}")
            urls = result_json
        results = []
        for url in urls:
            connector = SQLMapConnector(cookie, url, options)
            scanid = connector.start_scan()
            while True:
                status = connector.get_scan_status(scanid)
                if status == "terminated":
                    break
                sleep(1)

            data = connector.get_scan_data(scanid)
            results.append(data)
            # print(f"results -1 : {results[-1]}")
            parameter = finditem(results[-1], 'parameter')
            print(parameter)
            # try:
            print(f"results data : {results[-1]['data']}")
            ic(find_sql_queries(path, parameter[0]))
            results[-1]['corrections'] = find_sql_queries(path, parameter[0])
            # except:
        
        return jsonify(results)
    
    @app.route('/bruteforce', methods=['POST'])
    def bruteforce():

        urls = request.json.get('urls')
            
        if not urls:
            with open('./Dirsearch/output_file_dirsearch.json', 'r') as json_file:
                result_json = json.load(json_file)
            print(f"result_json: {result_json}")
            urls = result_json
        results = {}
        for url in urls:
            is_login_form = False
            cookies = request.json.get('cookie')
            if cookies:
                cookies_list = cookies.split("; ")
                formatted_cookies = {}
                for cookie in cookies_list:
                    name, value = cookie.split("=")
                    formatted_cookies[name] = value
            else:
                formatted_cookies = None
            print(formatted_cookies)
            forms_info = forms.main(url, cookies=formatted_cookies)
            print(forms_info)
            
            for form in forms_info:
                get_or_post = form['method']
                for i in form['inputs']:
                    if i['type'] == "text":
                        login_name = i['name']
                    elif i['type'] == "password":
                        password_name = i['name']
                        is_login_form = True
                        ic("Login form found")
    
            if is_login_form:
                payload_info = {
                    "login_name" : login_name,
                    "password_name" : password_name,
                    "submit_name" : forms_info[0]["submit"]["name"],
                    "submit_value" : forms_info[0]["submit"]["value"]
                }

                brute = Bruteforce(url,get_or_post, {'Content-Type': 'application/x-www-form-urlencoded'}, payload_info , 0, formatted_cookies)

                results[url] = brute.run()

        return jsonify(results)

        
    return app