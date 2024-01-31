# WebFortify: Web Vulnerability Scanner

A comprehensive tool designed for automated scanning of the most known web vulnerabilities, including XSS, SQL injections, web fuzzing and XSRF 

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

This project introduces an advanced Web Vulnerability Scanner, a powerful tool designed to detect and report potential vulnerabilities in web applications. Utilizing a Flask backend and a React frontend, our scanner automates the process of identifying common security threats thereby aiding in the reinforcement of web application security by providing corrections suggestions.

## Features

- **Automated Vulnerability Scanning:** Quickly and efficiently scans web applications for XSS, SQL injections, and command injections.
- **User-Friendly Interface:** React-based frontend for easy interaction and clear presentation of results.
- **Detailed Reporting:** Generates comprehensive reports detailing detected vulnerabilities and their potential impacts.
- **Customizable Scans:** Offers flexibility to tailor scans to specific needs or focus areas.
- **Corrections Suggestions:** Provides suggestions for correcting detected vulnerabilities.

## Technologies

- **Frontend:** NextJS for a responsive and intuitive user interface.
- **Backend:** Flask for handling backend operations and API requests.
- **Security Scanning:** Custom algorithms and techniques for detecting a wide range of web vulnerabilities.

## Installation

### Prerequisites

- [Python 3.10](https://www.python.org/downloads/release/python-3100/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

### Clone the Repository

```
git clone https://github.com/GaetanCARRE/WebFortify.git
```


### Installation Steps

1. Create a virtual environment:
   ```
   python -m venv back-web-fortify/venv
   ```
2. Then run the start script:

   On windows:
   ```
   webfortify_start.ps1
   ```
   On Unix:
   ```
   python webfortify.py
   ```

## Usage

To start using the Web Vulnerability Scanner, launch webfortify.py script. Navigate through the React application to set up and start your scans. The interface will guide you through configuring the scan parameters and initiating the scanning process.

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
