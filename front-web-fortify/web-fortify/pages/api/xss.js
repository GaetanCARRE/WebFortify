// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
  if (req.method === 'GET') {

    // get param from url ?target_url
    const target_url = req.query.target_url;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "target_url": target_url,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
 function FilterXSS(result) {

  var XSSLogs = []
    let i = 1;


    try{
      while (result[i].parameter != null) {

        for (let j = 0; j < result[i].payloads.length; j++) {
          //result[i].payloads[j] = result[i].payloads[j].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          var log = {}
        
          log.AttackType = "XSS"
          log.Success = true
          log.target_url = target_url + "?" + result[i].parameter + "=" + result[i].payloads[j]['payload']
          log.payloads = result[i].payloads[j]['payload']

          
          XSSLogs.push(log)
        }

        i++;       
        
        
       
        
      }

    }
    catch(err){

      console.log(err)

    }

    return XSSLogs

}



    fetch("http://127.0.0.1:5000/xsstrike", requestOptions)
      .then(response => response.json())
      .then(result => res.status(200).json(FilterXSS(result)))
      .catch(error => console.log('error', error));
    



      

  }

}
