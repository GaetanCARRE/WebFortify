// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    if (req.method === 'GET') {
        
    var current_time = new Date().getTime();

    const response = 
    [
        {
            "correction": {
                "example_code": "$allowed_extensions = array('jpg', 'jpeg', 'png', 'pdf'); // Liste des extensions autorisÃ©es \n  function get_file_extension($filename) \n{\nreturn pathinfo($filename, PATHINFO_EXTENSION);\n}\nfunction is_valid_extension($filename, $allowed_extensions)\n{\n$file_extension = get_file_extension($filename);\nreturn in_array($file_extension, $allowed_extensions);\n}",
                "explanation": "Filtering allowed file extensions in an <strong>input type='file'</strong> is a pivotal security measure for web applications. By restricting the types of files users can upload, developers can mitigate potential security risks and safeguard against malicious activities. This practice prevents the inadvertent upload of harmful scripts, malware, or exploits, enhancing the overall integrity of the system. Furthermore, it contributes to a seamless user experience by providing clear guidelines on acceptable file formats, reducing the likelihood of errors and ensuring a standardized data structure. Implementing such controls not only fortifies the application against vulnerabilities but also aligns with industry standards and regulatory requirements for data protection. In essence, filtering allowed file extensions is a fundamental aspect of web development, striking a balance between security and user-friendly functionality.",
                "line_vuln": "file : C:\\wamp64\\www\\site-test\\pages\\file_upload.php, line : 59 <input name=\"uploaded\" type=\"file\"><br>",
                "title": "Correction Uploading File"
            },
            "extensions": [
                "jpg",
                "png",
                "jpe",
                "tiff",
                "tif",
                "svg",
                "svgz",
                "jpeg",
                "mvg",
                "gif",
                "ico",
                "asc",
                "bmp",
                "text",
                "pot",
                "brf",
                "pdf",
                "txt",
                "ppt",
                "pps",
                "pptx",
                "xls",
                "xlb",
                "srt",
                "odt",
                "doc",
                "xlsx",
                "mpg",
                "mpeg",
                "mpe",
                "dot",
                "mpga",
                "mpega",
                "mp2",
                "m4a",
                "mp3",
                "m3u",
                "wav",
                "avi",
                "psd",
                "mp4",
                "tar",
                "gz",
                "flv",
                "xlt",
                "rar",
                "iso",
                "jar",
                "7z",
                "rss",
                "csv",
                "html",
                "torrent",
                "htm",
                "shtml",
                "otf",
                "ttf",
                "com",
                "exe",
                "bat",
                "zip",
                "qt",
                "css",
                "mov",
                "vcd",
                "~",
                "%",
                "bak",
                "cbr",
                "old",
                "sik",
                "bin",
                "msu",
                "mid",
                "deploy",
                "midi",
                "kar",
                "cer",
                "sdf",
                "sd",
                "sdf",
                "vcf",
                "vcard",
                "c++",
                "cpp",
                "cxx",
                "h",
                "cc",
                "swf",
                "kmz",
                "deb",
                "ddeb",
                "udeb",
                "deb",
                "dll",
                "js",
                "msp",
                "udeb",
                "swfl"
            ],
            "title": "Upload file Vulnerability",
            "url": "http://localhost/site-test/pages/file_upload.php"
        }
    ]
      
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
  
    
  
      res.status(200).json(FilterFileUpload(response))
      

    }
  
  }
  