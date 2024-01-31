# WebFortify: Web Vulnerability Scanner

WebFortify is an open-source web vulnerability scanner that combines existing open-source tools with custom-developed features. It offers a comprehensive suite of vulnerability scanning capabilities, including SQL injections, XSS injections, web brute-forcing, fuzzing with eResearch tools, and XSRF vulnerability detection.

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

WebFortify is a powerful tool designed for developers to scan and fortify web applications against potential vulnerabilities. Built with a NextJS frontend and Flask backend, this application is ideal for local testing of web projects during development.

## Features

- **SQL Injections:** Detect and report SQL injection vulnerabilities.
- **XSS Injections:** Identify and address cross-site scripting vulnerabilities.
- **Web Brute-Force:** Conduct web brute-force attacks to assess security resilience.
- **Fuzzing with eResearch:** Utilize eResearch tools for effective fuzzing and vulnerability detection.
- **XSRF Vulnerability Detection:** Identify and mitigate Cross-Site Request Forgery vulnerabilities.

## Technologies

- **Frontend:** NextJS for a responsive and intuitive user interface.
- **Backend:** Flask for handling backend operations and API requests.
- **Security Scanning:** Integration of open-source tools and custom algorithms.

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

2. Run the start script:

   On Windows:

   ```
   webfortify_start.ps1
   ```

   On Unix:

   ```
   python webfortify.py
   ```

## Usage

To initiate the Web Vulnerability Scanner, run the `webfortify.py` script. Navigate through the React application to configure and start scans. The user-friendly interface guides you through setting scan parameters and initiating the scanning process.

## API Documentation

The Flask backend provides RESTful API endpoints for initiating scans, retrieving results, and managing configurations. Full documentation on these endpoints is available within the application.

## Contributing

We welcome contributions from developers interested in enhancing the Web Vulnerability Scanner. Current contributors include Gaetan, Yara, Julie, Martin, Clément, and Ludo. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit changes and open a pull request.
4. Your pull request will be reviewed by project maintainers.

Adhere to coding standards and guidelines provided in the repository.

## License

This project is released under a standard open-source license. For details, refer to the LICENSE file in the repository.