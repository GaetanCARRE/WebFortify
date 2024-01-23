import os
import re
import json

def find_sql_queries(path, query_parameters, titles):
    sql_queries = []
    file_extensions = ['.py', '.sql', '.php']  # Add more file extensions if needed
    
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(tuple(file_extensions)):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.readlines()
                    pattern = r'((?:SELECT|INSERT|DELETE)(?![^<>]*[<>]).*?' + re.escape(query_parameters) + r'.*?;)'
                    for i, line in enumerate(content):
                        for match in re.finditer(pattern, line, re.IGNORECASE):
                            sql_queries.append((file_path, i+1, match.group(0)))
    return sql_correction(sql_queries, titles)
    # return sql_queries


def sql_correction(sql_queries, titles):
    extension = {
        "python" : [
            "py",
            "pyw",
        ],
        "php" : [
            "php",
            "phtml",
            "php3",
            "php4",
            "php5",
            "php7",
            "phps",
            "php-s",
            "pht",
            "phar"
        ],
        "java" : [
            "java"
        ],
        "javascript" : [
            "js",
            "jsx",
            "ts",
            "tsx"
        ],
    }
    

    line_vuln = []
    for query in sql_queries:
        line_vuln.append("file : " + query[0] + ", line : " + str(query[1]) + ", query : " + query[2])
        with open('./corrections/template_correction/template_sql.json', 'r') as json_file:
            sql_correction = json.load(json_file)
            print(query[0].split('.')[-1])
            print(sql_correction['corrections'][0]['code']['php'])
            if query[0].split('.')[-1] in extension['python']:
                line_correction = sql_correction['corrections'][0]['code']['python']
            elif query[0].split('.')[-1] in extension['php']:
                line_correction = sql_correction['corrections'][0]['code']['php']
            elif query[0].split('.')[-1] in extension['java']:
                line_correction = sql_correction['corrections'][0]['code']['java']
            correction_explanation = sql_correction['corrections'][0]['correction_explanation']
            description_vuln = sql_correction['corrections'][0]['description_vuln']
            description_sqli = sql_correction['description_sql_injection']
    vuln_names = []

    
    correction_dict = {
        "description_sqli" : description_sqli,
        "description_vuln" : description_vuln,
        "titles" : titles,
        "line_vuln" : line_vuln,
        "list_corrections" : [
            {
                "line_correction" : line_correction,
                "language" : query[0].split('.')[-1],
                "correction_explanation" : correction_explanation
            }
        ]
    }
    print(correction_dict)
    return correction_dict
    
    


            
def finditem(search_dict, field):
    """
    Takes a dict with nested lists and dicts,
    and searches all dicts for a key of the field
    provided.
    """
    fields_found = []

    for key, value in search_dict.items():

        if key == field:
            fields_found.append(value)

        elif isinstance(value, dict):
            results = finditem(value, field)
            for result in results:
                fields_found.append(result)

        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    more_results = finditem(item, field)
                    for another_result in more_results:
                        fields_found.append(another_result)

    return fields_found