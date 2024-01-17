// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    const response = 
    [
        [
            {
                "password": "admin",
                "url": "http://localhost/site-test/pages/brute-force.php",
                "user": "admin"
            }
        ],
        [
            {
                "password": "admin",
                "url": "http://localhost/site-test/pages/brute-force.php",
                "user": "admin"
            }
        ],
        [
            {
                "password": "admin",
                "url": "http://localhost/site-test/pages/brute-force.php",
                "user": "admin"
            }
        ]
    ]

    function FilterBrutForce(result){

        var BFLogs = []

        var current_time = new Date().getTime()
        
        try{

            
            for (var i = 0; i < result.length; i++) {

                for ( var j = 0 ; j < result[i].length; i ++){

                    var log = {}
            
                    log.AttackType = "bruteforce"
                    log.Success = true
                    log.target_url = result[i][j].url
                    log.username = result[i][j].user
                    log.password = result[i][j].password
                    log.time = current_time

                    
                    BFLogs.push(log)

                }
                
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
  