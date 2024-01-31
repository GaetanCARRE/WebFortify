// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
  if (req.method === 'GET') {


    // get param from url ?target_url
    const target_url = req.query.target_url;
    const project_path = req.query.project_path;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw;

    if (target_url == "null"){
      raw = JSON.stringify({
        "cookie": "",
        "project_path": project_path,
        "url": ""
      });

    }else{

      raw = JSON.stringify({
        "cookie": "",
        "project_path": project_path,
        "url": target_url
      });

    }

    

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
 function FilterXSS(result) {

    var XSSLogs = []

    var current_time = new Date().getTime()

    try{

      // loop all payloads and add them into XSSLogs with a dict format

      for (var i = 0; i < result.length; i++) {
          
          for (var j = 0; j < result[i].list_vulnerability.length; j++) {
  
            for (var k = 0; k < result[i].list_vulnerability[j].payloads.length; k++) {
  
              XSSLogs.push({
                "target_url": result[i].url + "?" + result[i].list_vulnerability[j].parameter + "=",
                "AttackType": "xss",
                "payload": result[i].list_vulnerability[j].payloads[k].payload,
                "Success": true,
                "corrections": result[i].list_vulnerability[j].corrections,
                "time": current_time
              })
  
            }
  
          }
  
        }

        // delete all duplicate logs for the same target_url

        XSSLogs = XSSLogs.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.target_url === thing.target_url
        ))
      )
      

    }
    catch(err){

      console.log(err)

    }

    return XSSLogs

}


    fetch("http://127.0.0.1:5000/xsstrike", requestOptions)
      .then(response => response.json())
      .then(result => res.status(200).json(FilterXSS(result)))
      .catch(error => console.log('error', error));
    



      

  }

}
