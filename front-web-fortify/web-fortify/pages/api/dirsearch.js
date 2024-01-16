// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
      // get param from url ?target_url
      const target_url = req.query.target_url;
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      function FilterDirSearch(result){

        var DirSearchLogs = []
 
        
        try{
        for (let i=1; i<result.length; i++) {

            
            var log = {}
            
            log.AttackType = "Dir Search"
            log.Success = true
            log.target_url = result[i]            

            
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
  
      //fetch(("http://127.0.0.1:5000/dirsearch?url=" + target_url), requestOptions)
      fetch(("http://127.0.0.1:5000/dirsearch?url=https://juice-shop.herokuapp.com/#/"), requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(FilterDirSearch(result)))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  