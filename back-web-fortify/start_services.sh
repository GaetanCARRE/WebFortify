#!/bin/bash

# Start Flask app
flask --app flaskr run --debug &

# Start sqlmap API server
python lib/sqlmap/sqlmapapi.py -s &
