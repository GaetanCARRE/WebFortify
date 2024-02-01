// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
  
      // get param from url ?target_url
      const target_url = req.query.target_url;
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw;

      console.log(target_url)

      if (target_url == "null") {
  
        raw = JSON.stringify({
          "urls" : [
          ],
        
        });

      } else {
        raw = JSON.stringify({
          "urls" : [
              target_url
          ],
        
        });
      }
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      function FilterBrutForce(result){

        var BFLogs = []

        var current_time = new Date().getTime()
        
        try{

            
            for (var i = 0; i < result.length; i++) {

               

                var log = {}
        
                log.AttackType = "bruteforce"
                log.Success = true
                log.target_url = result[i].url
                log.credentials = result[i].credentials
                log.time = current_time

                
                BFLogs.push(log)

              
                
            }


        }
        catch(err){
            console.log(err)
        }

       
        console.log(BFLogs)

        return BFLogs
      }
  
  
      fetch("http://127.0.0.1:5000/bruteforce", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(FilterBrutForce(result)))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  