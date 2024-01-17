#!/bin/bash

# Start Flask
flask --app flaskr run --debug &

# Start sqlmapapi
python ./lib/sqlmap/sqlmapapi.py -s &

# Keep the container running
wait
