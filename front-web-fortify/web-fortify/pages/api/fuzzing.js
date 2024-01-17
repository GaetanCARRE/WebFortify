// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
      // get param from url ?target_url
      const target_url = req.query.target_url;
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      function FilterDirSearch(result){

        var DirSearchLogs = []

        var current_time = new Date().getTime()
 
        
        try{
        for (let i=1; i<result.length; i++) {

            
            var log = {}
            
            
            log.AttackType = "fuzzing"
            log.Success = true
            log.target_url = result[i]   
            log.time = current_time         

            
            DirSearchLogs.push(log)
        }

        }
        catch(err){
            console.log(err)
        }

        return DirSearchLogs
      }
  
   
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch(("http://127.0.0.1:5000/dirsearch?url=" + target_url), requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(FilterDirSearch(result)))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  