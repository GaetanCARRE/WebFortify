// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
  
      // get param from url ?target_url
      const target_url = req.query.target_url;
      const project_path = req.query.project_path;
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "urls" : [
            //"http://localhost:8080/vulnerabilities/sqli/"
            target_url
        ],
        "cookie" : "",
        "options" : {
            "forms" : "true",          
             
        },
        "path":  project_path      
      
    });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      function FilterSQL(result){

        var SQLLogs = [] 

        var current_time = new Date().getTime()
        
        try{

            let URL = result[0].data[0].value.url

            let data = result[0].data[1].value[0].data


            for( const key in  data){


                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    var log = {}
                    
                    log.AttackType = "sql"
                    log.Success = true
                    log.target_url = URL + "?" + item.payload
                    log.time = current_time
                    SQLLogs.push(log)


                }
                
                
                

                
                

            }

          
        }
        catch(err){
            console.log(err)
        }

        console.log(SQLLogs)

        return SQLLogs
      }
  
  
      fetch("http://127.0.0.1:5000/sqlmap", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(FilterSQL(result)))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  