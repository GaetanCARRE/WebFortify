// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
    if (req.method === 'GET') {
  
  
      // get param from url ?target_url
      const target_url = req.query.target_url;
      const project_path = req.query.project_path;
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw;

      console.log(target_url)

      if (target_url == "null") {
  
        raw = JSON.stringify({
          "url" : "",
            "project_path": project_path
        });

      } else {
        raw = JSON.stringify({
          "url" : target_url,
            "project_path": project_path
        
        });
      }
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      function FilterFileUpload(result){

        var FileUpload = []

        var current_time = new Date().getTime()
 
        
        try{

        for (let i=0; i<result.length; i++) {

            
            var log = {}
            
            log.AttackType = "fileupload"
            log.Success = true
            log.target_url = result[i].url
            log.time = current_time  
            log.corrections = result[i].correction
            log.title = result[i].title
            log.extensions = result[i].extensions


            
            FileUpload.push(log)
        }

        }
        catch(err){
            console.log(err)
        }

        return FileUpload
      }
  
  
  
      fetch("http://127.0.0.1:5000/file_upload", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(FilterFileUpload(result)))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  