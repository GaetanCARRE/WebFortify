import json
import os
from datetime import date
from flask import Flask, jsonify, request
from dirsearch.DirsearchScanner import DirsearchScanner

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
            data = request.get_json()
            target_url = data.get('target_url')
            dirsearch_instance = DirsearchScanner()
            dirsearch_instance.run_dirsearch(target_url)
            dirsearch_instance.parse_outut_file_dirsearch()
            dirsearch_instance.lire_liste_txt_et_convertir_en_json()
            
            with open('..dirsearch/output_file_dirsearch.json', 'r') as json_file:
                result_json = json.load(json_file)
            return jsonify(result_json)
        except Exception as e:
            return jsonify(
                Status="Error",
                Message=f"An error occurred: {str(e)}"
            )

    return app