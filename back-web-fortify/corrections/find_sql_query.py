import os
import re

def find_sql_queries(path, query_parameters):
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

    return sql_queries

# Usage example
path = '/Users/gaetancarre/cybersec/dvwa/vulnerabilities/sqli'
queries = find_sql_queries(path, "title")
for query in queries:
    print(f"File: {query[0]}, Line: {query[1]}, Query: {query[2]}")

            
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