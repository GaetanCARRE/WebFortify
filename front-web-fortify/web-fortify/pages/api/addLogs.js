// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
    if (req.method === 'POST') {

        
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json"); 
 
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(req.body),
        redirect: 'follow'
      };     
   
  
      fetch("http://127.0.0.1:5000/addLogs", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json(result))
        .catch(error => console.log('error', error));
      
  
  
  
        
  
    }
  
  }
  