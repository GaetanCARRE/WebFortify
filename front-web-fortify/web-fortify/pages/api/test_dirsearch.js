// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    const response = 
        [
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/Video"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/main.js"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/snippets"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/promotion"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/robots.txt"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/.well-known/security.txt"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine/juicy_malware_macos_64.url"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine/juicy_malware_linux_amd_64.url"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine/juicy_malware_linux_arm_64.url"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/legal.md"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/announcement_encrypted.md"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/incident-support.kdbx"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/acquisitions.md"
            },
            {
                "AttackType": "Dir Search",
                "Success": true,
                "target_url": "https://juice-shop.herokuapp.com/ftp/quarantine/juicy_malware_windows_64.exe.url"
            }
        ]  
      
  
    
  
      res.status(200).json(response)
      
  
  
  
        
  
    }
  
  }
  