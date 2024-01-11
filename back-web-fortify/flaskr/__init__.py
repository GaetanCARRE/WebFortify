import os
from datetime import date
from flask import Flask, jsonify, request
from lib.XSStrike.run_xss_strike import run_xss_strike
from lib.XSStrike.testBeautifulSoup import testBeautifulSoup
import json

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
    @app.route('/beautifulsoup', methods=['GET'])
    def beautifulsoup():
        try:
            # Call the testBeautifulSoup function
            parameters = testBeautifulSoup()
            return jsonify(parameters)
        except Exception as e:
            return jsonify(
                Status="Error",
                Message=f"An error occurred: {str(e)}"
            )
    def hello():
        return 'Hello, World!'

    @app.route('/xssstrike', methods=['POST'])
    def index():
        try:
            # Extract parameters from the JSON request
            data = request.get_json()
            target_url = data.get('target_url')
            param_data = data.get('param_data')
            headers = data.get('headers')

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

    return app