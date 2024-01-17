import requests

class SQLMapConnector:
    def __init__(self, cookie, url, options):
        self.cookie = cookie
        self.url = url
        self.options = options

    def create_task(self):
        resp = requests.get("http://127.0.0.1:8775/task/new")
        return resp.json()['taskid']
    
    def set_scan_options(self, taskid):
        resp = requests.post(f"http://127.0.0.1:8775/option/{taskid}/set", json=self.options)
        return resp.json()

    def start_scan(self):
        taskid = self.create_task()
        print(self.set_scan_options(taskid))
        print(self.list_options(taskid))
        data = {
            'url': self.url,
            'cookie': self.cookie
        }
        resp = requests.post(f"http://127.0.0.1:8775/scan/{taskid}/start", json=data)
        return taskid
    
    def get_scan_status(self, taskid):
        resp = requests.get(f"http://127.0.0.1:8775/scan/{taskid}/status")
        #print(resp.json())
        return resp.json()['status']
                            
    def get_scan_data(self, taskid):
        resp = requests.get(f"http://127.0.0.1:8775/scan/{taskid}/data")
        return resp.json()
    
    def list_options(self, taskid):
        resp = requests.get(f"http://127.0.0.1:8775/option/{taskid}/list")
        return resp.json()
    