// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {

  if (req.method === 'GET') {


    // get param from url ?target_url
    const target_url = req.query.target_url;
    const project_path = req.query.project_path;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw;

    if (target_url == "null") {

      raw = JSON.stringify({
        "urls": [
        ],
        "cookie": "",
        "options": {
          "forms": "true",

        },
        "path": project_path

      });

    } else {
      raw = JSON.stringify({
        "urls": [
          target_url
        ],
        "cookie": "",
        "options": {
          "forms": "true",

        },
        "path": project_path

      });
    }



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    function FilterSQL(result) {

      var SQLLogs = []

      var current_time = new Date().getTime()


      try {

        for (let i = 0; i < result.length; i++) {
          if (result[i].data.length == 0) {
            continue
          } else {

            let URL = result[i].data[0].value.url

            let Query = result[i].data[0].value.query

            let data = result[i].data[1].value[0].data

            let correction = result[i].corrections


            for (const key in data) {


              if (data.hasOwnProperty(key)) {
                const item = data[key];
                var log = {}

                log.AttackType = "sql"
                log.Success = true
                log.target_url = URL + "?" + Query
                log.payload = item.payload
                log.time = current_time
                log.corrections = correction
                SQLLogs.push(log)


              }







            }

          }

        }
        SQLLogs = SQLLogs.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.target_url === thing.target_url
          ))
        )

      }
      catch (err) {
        console.log(err)
      }

      console.log(SQLLogs)

      return SQLLogs
    }



    fetch("http://127.0.0.1:5000/sqlmap", requestOptions)
      .then(response => response.json())
      .then(result => res.status(200).json(FilterSQL(result)))
      .catch(error => console.log('error', error));






  }

}
