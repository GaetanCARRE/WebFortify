// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    if (req.method === 'GET') {

        const response =
            [
                {
                    "data": [],
                    "error": [],
                    "success": true
                },
                {
                    "data": [],
                    "error": [],
                    "success": true
                },
                {
                    "data": [],
                    "error": [],
                    "success": true
                },
                {
                    "data": [],
                    "error": [],
                    "success": true
                },
                {
                    "corrections": {
                        "description_sqli": "SQL injection is a security vulnerability that occurs when an attacker can manipulate an application's SQL query by injecting malicious SQL code. This can lead to unauthorized access, data manipulation, and potential data breaches.",
                        "description_vuln": "Your code is vulnerable to SQL injection as it directly includes user input in the SQL query.",
                        "line_vuln": [
                            "file : C://wamp64/www/site-test\\pages\\sql-injection.php, line : 13, query : SELECT first_name, last_name FROM user WHERE id = '$id';"
                        ],
                        "list_corrections": [
                            {
                                "correction_explanation": "To mitigate this risk, it's recommended to use parameterized queries.",
                                "language": "php",
                                "line_correction": "$stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');\n$stmt->bind_param('s', $userInput);\n$stmt->execute();\n$result = $stmt->get_result();"
                            }
                        ]
                    },
                    "data": [
                        {
                            "status": 1,
                            "type": 0,
                            "value": {
                                "data": null,
                                "query": "user_id=tbnN&Submit=Submit",
                                "url": "http://localhost/site-test/pages/sql-injection.php"
                            }
                        },
                        {
                            "status": 1,
                            "type": 1,
                            "value": [
                                {
                                    "clause": [
                                        1,
                                        2,
                                        3,
                                        8,
                                        9
                                    ],
                                    "conf": {
                                        "code": null,
                                        "notString": null,
                                        "optimize": null,
                                        "regexp": null,
                                        "string": null,
                                        "textOnly": null,
                                        "titles": null
                                    },
                                    "data": {
                                        "2": {
                                            "comment": "",
                                            "falseCode": null,
                                            "matchRatio": 0.471,
                                            "payload": "user_id=bvWH' AND EXTRACTVALUE(7674,CONCAT(0x5c,0x716a6b6a71,(SELECT (ELT(7674=7674,1))),0x717a6a7a71)) AND 'xqYO'='xqYO&Submit=Submit",
                                            "templatePayload": null,
                                            "title": "MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXTRACTVALUE)",
                                            "trueCode": null,
                                            "vector": "AND EXTRACTVALUE([RANDNUM],CONCAT('\\','[DELIMITER_START]',([QUERY]),'[DELIMITER_STOP]'))",
                                            "where": 1
                                        },
                                        "6": {
                                            "comment": "[GENERIC_SQL_COMMENT]",
                                            "falseCode": null,
                                            "matchRatio": 0.471,
                                            "payload": "user_id=bvWH' UNION ALL SELECT CONCAT(0x716a6b6a71,0x6e58504772656d41764f6f43454751726c75514f774a6955447853534f465644485174646c595461,0x717a6a7a71),NULL-- -&Submit=Submit",
                                            "templatePayload": null,
                                            "title": "Generic UNION query (NULL) - 1 to 20 columns",
                                            "trueCode": null,
                                            "vector": [
                                                0,
                                                2,
                                                "[GENERIC_SQL_COMMENT]",
                                                "'",
                                                " AND '[RANDSTR]'='[RANDSTR]",
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
                                        ">= 5.1"
                                    ],
                                    "notes": [],
                                    "os": null,
                                    "parameter": "user_id",
                                    "place": "GET",
                                    "prefix": "'",
                                    "ptype": 2,
                                    "suffix": " AND '[RANDSTR]'='[RANDSTR]"
                                }
                            ]
                        }
                    ],
                    "error": [],
                    "success": true
                },
                {
                    "data": [],
                    "error": [],
                    "success": true
                }
            ]

        function FilterSQL(result) {

            var SQLLogs = []

            var current_time = new Date().getTime()


            try {

                for (let i = 0; i < result.length; i++) {
                    if (result[i].data.length == 0) {
                        continue
                    } else {

                        let URL = result[i].data[0].value.url

                        let data = result[i].data[1].value[0].data

                        let correction = result[i].corrections


                        for (const key in data) {


                            if (data.hasOwnProperty(key)) {
                                const item = data[key];
                                var log = {}

                                log.AttackType = "sql"
                                log.Success = true
                                log.target_url = URL + "?" + item.payload
                                log.time = current_time
                                log.corrections = correction
                                SQLLogs.push(log)


                            }







                        }

                    }

                }


            }
            catch (err) {
                console.log(err)
            }

            console.log(SQLLogs)

            return SQLLogs
        }




        res.status(200).json(FilterSQL(response))






    }

}
