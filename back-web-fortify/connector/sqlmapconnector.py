import requests

class SQLMapConnector:
    def __init__(self, cookie, url, parameter):
        self.cookie = cookie
        self.url = url
        self.parameter = parameter

    def create_task(self):
        resp = requests.get("http://127.0.0.1:8775/task/new")
        return resp.json()['taskid']

    def start_scan(self):
        taskid = self.create_task()
        data = {
            'url': self.url,
            'p': self.parameter,
            'cookie': self.cookie
        }
        resp = requests.post(f"http://127.0.0.1:8775/scan/{taskid}/start", json=data)
        return taskid
    
    def get_scan_status(self, taskid):
        resp = requests.get(f"http://127.0.0.1:8775/scan/{taskid}/status")
        print(resp.json())
        return resp.json()['status']
                            
    def get_scan_data(self, taskid):
        resp = requests.get(f"http://127.0.0.1:8775/scan/{taskid}/data")
        return resp.json()