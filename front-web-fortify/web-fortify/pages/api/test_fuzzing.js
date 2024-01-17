// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    var current_time = new Date().getTime();

    const response = 
        [
            {
                "AttackType": "fuzzing",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/Video",
                "time" : current_time
            },
            
            {
                "AttackType": "fuzzing",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine/juicy_malware_windows_64.exe.url",
                "time" : current_time
            }
        ]  
      
  
    
  
      res.status(200).json(response)
      
  
  
  
        
  
    }
  
  }
  