// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    var current_time = new Date().getTime();

    const response = 
    [
        {
          "url": "http://localhost/WebFortify/site-test/pages/file_upload.php",
          "corrections": {
            "explanation": "the web page found appear to be public",
            "correction": ""
          }
        }
      ]
      
      function FilterDirSearch(result){

        var DirSearchLogs = []

        var current_time = new Date().getTime()
 
        
        try{
        for (let i=1; i<result.length; i++) {

            
            var log = {}
            
            
            log.AttackType = "fuzzing"
            log.Success = true
            log.target_url = result[i].url 
            log.time = current_time  
            log.corrections = result[i].corrections


            
            DirSearchLogs.push(log)
        }

        }
        catch(err){
            console.log(err)
        }

        return DirSearchLogs
      }
  
    
  
      res.status(200).json(response)
      
  
  
  
        
  
    }
  
  }
  