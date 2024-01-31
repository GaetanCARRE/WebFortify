// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    const response = 
    [
        {
            "credentials": [
                {
                    "password": "admin",
                    "user": "admin"
                }
            ],
            "url": "http://localhost/site-test/pages/brute-force.php"
        }
    ]

    function FilterBrutForce(result){

        var BFLogs = []

        var current_time = new Date().getTime()
        
        try{

            
            for (var i = 0; i < result.length; i++) {

               

                var log = {}
        
                log.AttackType = "bruteforce"
                log.Success = true
                log.target_url = result[i].url
                log.username = result[i].credentials
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

  
    
  
      res.status(200).json(FilterBrutForce(response))
      

    }
  
  }
  