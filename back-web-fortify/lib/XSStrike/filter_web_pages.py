from urllib.parse import urlparse
import os.path
import json


def filter_web_pages():
    allowed_extensions = ['.html', '.php', '.js', '']  # Extensions autorisées, y compris pas d'extension

    filtered_urls = []
    
    with open('./Dirsearch/output_file_dirsearch.json', 'r') as json_file:
        urls = json.load(json_file)
        for url in urls:
            parsed_url = urlparse(url['url'])
            path, ext = os.path.splitext(parsed_url.path)

            # Vérifier si l'extension est autorisée
            if ext.lower() in allowed_extensions:
                filtered_urls.append(url['url'])
        

    return filtered_urls