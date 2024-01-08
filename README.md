# Project Name: Web Vulnerability Scanner

A comprehensive tool designed for automated scanning of the most known web vulnerabilities, including XSS, SQL injections, and command injections.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project introduces an advanced Web Vulnerability Scanner, a powerful tool designed to detect and report potential vulnerabilities in web applications. Utilizing a Flask backend and a React frontend, our scanner automates the process of identifying common security threats, such as Cross-Site Scripting (XSS), SQL Injection, and Command Injection vulnerabilities, thereby aiding in the reinforcement of web application security.

## Features

- **Automated Vulnerability Scanning:** Quickly and efficiently scans web applications for XSS, SQL injections, and command injections.
- **User-Friendly Interface:** React-based frontend for easy interaction and clear presentation of results.
- **Detailed Reporting:** Generates comprehensive reports detailing detected vulnerabilities and their potential impacts.
- **Customizable Scans:** Offers flexibility to tailor scans to specific needs or focus areas.

## Technologies

- **Frontend:** React.js for a responsive and intuitive user interface.
- **Backend:** Flask for handling backend operations and API requests.
- **Security Scanning:** Custom algorithms and techniques for detecting a wide range of web vulnerabilities.

## Installation

### React Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the application:
   ```
   npm start
   ```

### Flask Backend

1. Create a virtual environment:
   ```
   python -m venv venv
   ```
2. Activate the virtual environment:
   - For Linux/macOS:
     ```
     . venv/bin/activate
     ```
   - For Windows:
     ```
     venv\Scripts\activate
     ```
3. Install required packages:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application in debug mode:
   ```
   flask --app flaskr run --debug
   ```

## Usage

To start using the Web Vulnerability Scanner, launch both the React frontend and the Flask backend. Navigate through the React application to set up and start your scans. The interface will guide you through configuring the scan parameters and initiating the scanning process.

## API Documentation

The Flask backend provides a set of RESTful API endpoints for initiating scans, retrieving scan results, and managing scan configurations. Full documentation on these endpoints is available within the application.

## Contributing

We welcome contributions to the Web Vulnerability Scanner! Current contributors to the project include Gaetan, Yara, Julie, Martin, Clément, and Ludo. If you're interested in contributing, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and open a pull request.
4. Your pull request will be reviewed by one of the project maintainers.

For any contributions, please adhere to the coding standards and guidelines provided in the repository.

## License

This project is released under a standard open-source license. For more information, please see the LICENSE file in the repository.
