import os
from datetime import date
from flask import Flask, jsonify, request
from connector.sqlmapconnector import SQLMapConnector
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