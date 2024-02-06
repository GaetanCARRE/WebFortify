import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


//import "@fontsource/poppins";
import Swal from 'sweetalert2'


import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import DropDown from '../components/dropdown'

import { useEffect } from 'react'
import { useState } from 'react'

import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

import { Doughnut } from 'react-chartjs-2';



export default function Dashboard({ projects }) {

  /* LOGS */

  const [projectName, setProjectName] = useState("")

  const [scanningStatus, setScanningStatus] = useState(false)

  const [attacksLogs, setAttacksLogs] = useState([])

  const [isUsingDirSearch, setIsUsingDirSearch] = useState(false)

  const [scanID, setScanID] = useState(0)

  const [iframeurl, setIframeurl] = useState(null)

  const [isIframeOpen, setIsIframeOpen] = useState(false)


  /* END LOGS */

  /*   */

  /* HELP PAGE */
  const [isHelpPageOpen, setIsHelpPageOpen] = useState(false)

  const [url_lenght, setUrl_lenght] = useState(50)

  



  /* DROPWONW */

  const [isOpen, setIsOpen] = useState(false);

  const [selectedAttacks, setSelectedAttacks] = useState([]);

  //const AvailableAttack = ['xss', 'sql', 'dirsearch']

  const AvailableAttack = [
    {
      id: 1,
      name: 'xss',
      color: '#0F1C6080'
    },
    {
      id: 2,
      name: 'sql',
      color: '#1A559890'
    },
    {
      id: 3,
      name: 'fuzzing',
      color: '#625CCE80'
    },
    {
      id: 4,
      name: "bruteforce",
      color: '#648DE580'
    },
    {
      id: 5,
      name: "fileupload",
      color: '#89B5E580'

    }
  ]


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {

    const isSelected = selectedAttacks.includes(item);

    if (isSelected) {
      // delete item from selected items
      setSelectedAttacks(selectedAttacks.filter((i) => i !== item));
    } else {
      setSelectedAttacks([...selectedAttacks, item]);
    }


  };

  useEffect(() => {
    console.log("selectedAttacks")
    console.log(selectedAttacks);
  }
    , [selectedAttacks])

  useEffect(() => {

    // url ?projectName=ClementTest2

    if (window.location.href.split("=")[1] == undefined) {
      // redirect to /index
      window.location.href = '/'
    } else {

      setProjectName(window.location.href.split("=")[1])
      let id_max = 0
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == window.location.href.split("=")[1]) {
          for (let j = 0; j < projects[i].logs.length; j++) {
            if (projects[i].logs[j].id > id_max) {
              id_max = projects[i].logs[j].id
            }
          }
          break
        }
      }
      let logs = []
      setScanID(id_max)
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == window.location.href.split("=")[1]) {
          setProjectFolder(projects[i].folderPath)
          for (let j = 0; j < projects[i].logs.length; j++) {
            if (projects[i].logs[j].id == id_max) {
              logs.push(projects[i].logs[j])
            }

          }         

          setAttacksLogs(logs)

          break
        }
      }
    }
  }
    , []);


    useEffect(() => {
      const handleResize = () => {
          setUrl_lenght(Math.floor((window.innerWidth - 600) / 12) - 10)
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);





  /*END DROPDOWN */

  /* CONFIGURATION VARIABLES */

  const [url, setUrl] = useState('')
  const [projectFolder, setProjectFolder] = useState('')


  /* END CONFIGURATION VARIABLES */



  /* FUNCTION */

  async function AddLogsToDatabase(logs) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "projectName": projectName, "logs": logs });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("http://localhost:3000/api/addLogs", requestOptions);
      const result = await response.text();

      console.log(result);

    }
    catch (error) {
      console.error('Error:', error);
      // Throw the error to propagate it to the caller if needed
      throw error;
    }

  }

  async function ReOrderLogs(logs, offset, CurrentScanID) {

    const updatedLogs = logs.map((log, index) => ({
      ...log,
      index: index + offset,
      color: AvailableAttack.filter(attack => attack.name == log.AttackType)[0].color,
      id: CurrentScanID
    }));

    return updatedLogs;

  }

  async function LocalRequest(type, local_logs, CurrentScanID) {
    try {
      console.log("Start " + type + " Process for " + url)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var response = null
      if (type == "fuzzing") {
        response = await fetch(("http://localhost:3000/api/" + type + "?target_url=" + url + "&project_path=" + projectFolder), requestOptions);
      }
      else {
        if (isUsingDirSearch) {

          console.log(projectFolder)
          response = await fetch(("http://localhost:3000/api/" + type + "?target_url=" + "null" + "&project_path=" + projectFolder), requestOptions);

        }
        else {
          response = await fetch(("http://localhost:3000/api/" + type + "?target_url=" + url + "&project_path=" + projectFolder), requestOptions);
        }
      }

      const result = await response.text();
      if(JSON.parse(result).length == 0){
        // alert("No "+type+"  vulnerabilities found for this url: "+url)
        Swal.fire({
          title: 'No '+type+' vulnerabilities found for this url: '+url,
          icon: 'info',
          confirmButtonText: 'OK'
        })
      }
      const updatedLogs = await ReOrderLogs(JSON.parse(result), local_logs.length, CurrentScanID)
      for (let i = 0; i < updatedLogs.length; i++) {
        local_logs.push(updatedLogs[i])
      }
      setAttacksLogs(local_logs)

    } catch (error) {
      console.error('Error:', error);
      // Throw the error to propagate it to the caller if needed
      throw error;
    }
  }

  async function Run(newSelectedAttacks) {

    let locale_logs = []
    
    let CurrentScan = scanID + 1
    console.log("CurrentScan")
    console.log(CurrentScan)



    // if (attacksLogs.length > 0) {
    //   locale_logs = attacksLogs
    //   console.log("Logs already exist")
    // }

    console.log("Start Running Process")
    setScanningStatus(true)
    for (let i = 0; i < newSelectedAttacks.length; i++) {
      // console.log(newSelectedAttacks[i])

      await LocalRequest(newSelectedAttacks[i], locale_logs, CurrentScan)
    }
    console.log("attack_logs")
    console.log(locale_logs)
    /*
    await LocalRequest("test_xss", locale_logs)

    await LocalRequest("test_dirsearch", locale_logs)
    */

    setScanningStatus(false)

    await AddLogsToDatabase(locale_logs)

    setScanID(CurrentScan)

    console.log("Scan Completed")

    Swal.fire({
      title: 'Scan Completed',
      icon: 'success',
      confirmButtonText: 'OK'
    })

  }

  async function CheckFuzzingOutput() {

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(("http://localhost:3000/api/check_fuzzing_output"), requestOptions);
      const result = await response.text();

      const json_result = JSON.parse(result)

      console.log(json_result)

      return json_result.is_empty

    } catch (error) {
      console.error('Error:', error);
      // Throw the error to propagate it to the caller if needed
      throw error;
    }
  }


  async function StartRunningProcess() {

    try {

      if (url == '' && !isUsingDirSearch) {
        // alert("Please specify an URL")
        Swal.fire({
          title: 'Please specify an URL',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
      else if (selectedAttacks.length == 0) {
        // alert("Please select at least one attack")
        Swal.fire({
          title: 'Please select at least one attack',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
      else {

        let newSelectedAttacks = selectedAttacks

        const isFuzzingOutputEmpty = await CheckFuzzingOutput()

        if (isUsingDirSearch) {
          // utilisateur veut utiliser le fuzzing output
          if (isFuzzingOutputEmpty) {
            // l'utilisateur n'a pas encore fait de fuzzing
            if (url == '') {
              // alert("Please specify an URL, there are no fuzzing output")
              Swal.fire({
                title: 'Please specify an URL, there are no fuzzing output',
                icon: 'warning',
                confirmButtonText: 'OK'
              })
            }
            else {
              
              // alert("Fuzzing output is empty, we will run fuzzing first")
              Swal.fire({
                title: 'Fuzzing output is empty, we will run fuzzing first',
                icon: 'info',
                confirmButtonText: 'OK'
              })

              newSelectedAttacks = ["fuzzing", ...newSelectedAttacks,]
              
              await Run(newSelectedAttacks)
            }

          } else {
            // utilisateur a deja fait du fuzzing 
            if (url == '') {
              // l'utilisateur veut utiliser le fuzzing output mais n'a pas specifie d'url
              // alert("Fuzzing output is not empty, we will use existing output")

              Swal.fire({
                title: 'Fuzzing output is not empty, we will use existing output',
                icon: 'info',
                confirmButtonText: 'OK'
              })

              await Run(newSelectedAttacks)
            }else{
              // l'utilisateur veut utiliser le fuzzing output et a specifie une url -> une nouvelle attaque fuzzing sera lancee
              // alert("We will run a new fuzzing attack and use the output")

              Swal.fire({
                title: 'We will run a new fuzzing attack and use the output',
                icon: 'info',
                confirmButtonText: 'OK'
              })

              newSelectedAttacks = ["fuzzing", ...newSelectedAttacks,]
              await Run(newSelectedAttacks)
            }
          }

        }else{
          await Run(newSelectedAttacks)
        }
      }

    } catch (e) {
      console.log(e)
    }

  }

  function sortAttackByTime() {

    // check if the logs are already sorted by ascending time
    var OrderAscending = false

    for (let i = 0; i < attacksLogs.length - 1; i++) {
      if (attacksLogs[i].time < attacksLogs[i + 1].time) {
        OrderAscending = true
        break
      }
    }

    if (OrderAscending) {
      // sort by descending time
      const sortedLogs = [...attacksLogs].sort((a, b) => (a.time < b.time) ? 1 : -1)
      setAttacksLogs(sortedLogs)
      console.log(sortedLogs)
    } else {
      // sort by ascending time
      const sortedLogs = [...attacksLogs].sort((a, b) => (a.time > b.time) ? 1 : -1)
      console.log(sortedLogs)
      setAttacksLogs(sortedLogs)

    }

  }
   useEffect(() => {
    console.log("isUsingDirSearch")
    console.log(isUsingDirSearch)
    if (isUsingDirSearch) {
      let response = CheckFuzzingOutput()
      response.then((result) => {
        if (result.is_empty) {
          // alert("Fuzzing output is empty, we will run fuzzing first")
          // Swal.fire({
          //   title: 'Fuzzing output is empty, we will run fuzzing first',
          //   icon: 'info',
          //   confirmButtonText: 'OK'
          // })
        }else{
          // alert("Fuzzing output is not empty, if you want to run fuzzing again, please specify an URL else leave it empty")
          // Swal.fire({
          //   title: 'Fuzzing output is not empty, if you want to run fuzzing again, please specify an URL else leave it empty',
          //   icon: 'info',
          //   confirmButtonText: 'OK'
          // })
        }
      })
    }
  }
    , [isUsingDirSearch]);

  function ToggleDirSearchState() {
    setIsUsingDirSearch(!isUsingDirSearch)

  }


  



  /* END FUNCTION */

  return (
    <>
      <Header></Header>

      <div className="bg-white h-screen w-screen z-0">


        <div className="flex h-full w-full">
          <SideBar projectName={projectName}></SideBar>
          <div id="main" className="h-full w-full">

            <Navbar></Navbar>

            <hr className="w-full h-[6px] bg-grisclair"></hr>

            {
              isIframeOpen && iframeurl ?

              <div id="help" className="absolute top-[70px] left-[160px] w-[calc(100%-160px)] pt-5 h-[calc(100%-70px)] bg-white z-50 text-black opacity-[95%] ">

                <div className="flex w-full h-full justify-center">
                    
                    <div className="w-4/5 h-4/5">
                        <div className="w-full  flex justify-end items-center">
                        <button onClick={() => setIsIframeOpen(false)}
                          className="p-2 h-10 w-10 bg-violet hover:bg-slate-300 rounded-full shadow-md flex justify-center items-center justify-items-center">
                          X
                        </button>
                        </div>
                        
                        <iframe src={iframeurl} className="w-full h-full" />
                    </div>
                  
                </div>

              </div> : null
              
            }

            {
                isHelpPageOpen ?
                  <div id="help" className="absolute top-[70px] left-[160px] w-[calc(100%-160px)] h-[calc(100%-70px)] bg-white z-50 text-black opacity-70 ">

                    <div className="flex w-full h-full justify-center justify-items-center items-center">

                      <div className="w-4/5 h-4/5">
                          <div className="w-full  flex justify-end items-center">
                          <button onClick={() => setIsHelpPageOpen(false)}
                            className="p-2 h-10 w-10 bg-violet hover:bg-slate-300 rounded-full shadow-md flex justify-center items-center justify-items-center">
                            X
                          </button>
                          </div>
                          
                          <img src="/assets/icons/details.svg" className="w-full h-full" />
                      </div>

                    </div>
                    
                    
                  </div> : null  

              }

            <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)] flex"
            // if isHelpPageOpen is true, display blur effect
              style={{ filter:               
                isHelpPageOpen ? 'blur(3px)' : 'none' 
            
            }}
            >

              


              <div id="left" className="w-1/3 h-full p-2 pl-4 min-w-[400px]">

                <div id="configuration" className=" p-2 mb-1 bg-white w-full h-1/2  ">

                  <div className="flex justify-start items-start justify-items-start text-lg font-medium mb-3">
                    Dashboard
                  </div>
                  <div className="flex text-base pt-2">

                    <div className="flex w-1/2 justify-start items-center justify-items-start text-sm">
                      Configuration
                    </div>
                    <div className="flex w-1/2 justify-end items-end justify-items-end">
                      {
                        scanningStatus ?
                          <button className=" min-w-[170px] min-h-8 bg-[#DDE4F0] py-1 px-5 rounded-md text-[12px] font-thin text-violet shadow-xl flex justify-center items-center justify-items-center"
                          >
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-violet"></div>

                          </button> :

                          <button className="bg-[#DDE4F0] py-1 px-5 rounded-md text-[12px] font-thin text-violet shadow-xl"
                            onClick={StartRunningProcess}>
                            Start Running Process
                          </button>

                      }


                    </div>

                  </div>

                  <div id="allInput" className="text-xs">


                    <div className="mt-3 text-[12px] text-violet font-bold">
                      Type Attack
                    </div>

                    {/* DROPDOWN */}


                    <div className="relative inline-block text-left py-2 w-full">
                      <button
                        onClick={toggleDropdown}
                        type="button"
                        className="flex shadow-lg w-2/3 justify-start items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <div className="flex w-full">
                          <div className="w-4/5 flex justify-start">
                            {
                              selectedAttacks.length == 0 ? "Select Attack(s)" : selectedAttacks.map((item) => (item + ", "))
                            }

                          </div>
                          <div className="w-1/5 text-right flex justify-end items-center justify-items-end">
                            {
                              isOpen ? <img src="/assets/icons/up.svg" className="ml-2 w-3 h-3" /> : <img src="/assets/icons/bottom.svg" className="ml-2 w-3 h-3" />
                            }

                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="origin-top-left absolute left-0 mt-2 w-2/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          {/* Dropdown content goes here */}
                          <div className="py-1">
                            {
                              AvailableAttack.map((item) => (
                                
                                  item.name == "fuzzing" ? null :
                                    <label key={item.id} id={item.id} className="block px-4 py-2 text-sm text-gray-700">
                                      <input
                                        type="checkbox"
                                        checked={selectedAttacks.includes(item.name)}
                                        onChange={() => handleItemClick(item.name)}
                                        className="mr-2"
                                      />
                                      {item.name}
                                    </label>
                                
                                
                              ))

                            }
                            {/* Add more items as needed */}
                          </div>
                        </div>
                      )}
                    </div>
                    {/*END DROPDOWN */}
                    <div className="flex w-full items-center mt-3">

                      <div className="w-1/2 flex justify-start items-center justify-items-center text-[12px] text-violet font-bold">
                        URL to attack
                      </div>
                      <div className="w-1/2 flex justify-end items-center justify-items-center">

                        <button className="" onClick={() => setIsHelpPageOpen(true)}>
                              <img src="/assets/icons/question.svg" className="w-5 h-5 mr-1" />
                        </button>

                      </div>

                    </div>
                    
                    <input id="url" className="shadow-md mt-1 w-full p-1  rounded-md bg-grisclair" type="text" placeholder=""
                      onChange={(e) => setUrl(e.target.value)} />

                    <div className="flex w-full">

                    <div className="mt-3 text-[12px] text-violet font-bold w-1/2 flex justify-start items-center justify-items-center">
                      Use URL only
                      < input type="checkbox" className="ml-2" onChange={ToggleDirSearchState}
                        checked={!isUsingDirSearch} />
                    </div>

                    <div className="mt-3 text-[12px] text-violet font-bold w-1/2 flex justify-end items-center justify-items-center">
                      Use Fuzzing output
                      < input type="checkbox" className="ml-2" onChange={ToggleDirSearchState}
                        checked={isUsingDirSearch} />
                    </div>
                    </div>


                    <div className="mt-5 text-[12px] text-violet font-bold">
                      Project's folder path
                    </div>
                    <input id="projectfolder" className="shadow-md mt-1 w-full p-1 rounded-md  bg-grisclair" type="text" placeholder={projectFolder}
                      onChange={(e) => setProjectFolder(e.target.value)} />
                    
                  </div>
                </div>

                <hr className="w-full h-[6px] bg-grisclair rounded-sm"></hr>

                <div id="response" className="p-2 bg-white w-full h-1/2  ">

                  <div className="flex justify-start items-start justify-items-start text-sm py-5">
                    Scanning Response
                  </div>

                  <div id="PieChart" className="w-full flex items-center justify-items-center justify-center">
                    <div className="h-1/2 w-1/2 flex items-center justify-items-center justify-center">
                      {
                        /*
                         backgroundColor: [
                              'rgba(90, 106, 207, 0.5)',
                              'rgba(133, 147, 237, 0.5)',
                              'rgba(199, 206, 255, 0.5)',
                              'rgba(222, 225, 224, 0.5)',
                              
                            ],
                        */

                      }
                      {
                        // create a doughnut chart with the data from the AttacksLogs
                      }
                      <Doughnut

                        redraw={false}
                        data={{
                          labels: AvailableAttack.map((item) => (item.name)),
                          datasets: [{
                            label: 'Number of Attacks',
                            data: AvailableAttack.map((item) => (attacksLogs.filter(log => log.AttackType === item.name).length)),




                            backgroundColor: AvailableAttack.map((item) => (item.color)),


                            borderColor: AvailableAttack.map((item) => (item.color)),
                            borderWidth: 2
                          }],

                        }}
                      />

                    </div>
                  </div>

                  <div className="w-full h-auto p-2 grid grid-cols-3 gap-3">
                    {
                      // for each attack type, display the number of attacks in percentage
                      AvailableAttack.map(attack => {
                        const filteredLogs = attacksLogs.filter(log => log.AttackType === attack.name);

                        return filteredLogs.length > 0 ? (
                          <div key={attack.id} className="flex items-center justify-items-center justify-center">
                            <div className={`h-3 w-3 rounded-full mr-2`} style={{ backgroundColor: attack.color }}></div>
                            <div className={`text-sm`} style={{ color: attack.color }}>{Math.round((filteredLogs.length / attacksLogs.length) * 100)}% {attack.name.toUpperCase()}</div>
                          </div>
                        ) : null;
                      })

                    }

                  </div>


                </div>

              </div>

              <div id="right" className="w-2/3 h-full p-2 flex">

                <div className="h-full rounded-sm w-[6px] bg-grisclair mr-1">

                </div>

                <div id="logs" className="p-2 bg-white  w-full h-full ">

                  <div className="flex pt-14 justify-start items-start justify-items-start text-sm">
                    LOGS
                  </div>
                  <hr className="mt-2 mb-2 h-[3px] bg-grisclair" />
                  <div id="columnname" className="flex w-full ">

                    <div className="flex w-1/4 justify-start items-start justify-items-start"
                    >
                      Type of Attack
                    </div>
                    <div className="flex w-2/4 justify-start items-start justify-items-start">
                      URL
                    </div>
                    <div className="flex w-1/4 justify-start items-start justify-items-start">
                      Time
                      <button className="ml-2 flex justify-center items-center justify-item-center" onClick={sortAttackByTime}>
                        <img src="/assets/icons/sort_time.svg" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div id="displaylog" className="py-1 max-h-[calc(100%-171px)] overflow-auto">

                    {
                      // every time attacksLogs is updated, reload the logs display
                      attacksLogs ? attacksLogs.map((log, index) => (

                        <button key={log.index} className=" shadow-md hover:shadow-xl transition ease-in-out  duration-500 flex w-full  rounded-md my-2 py-1 px-2 text-[12px]" style={{ backgroundColor: log.color }}
                          onClick={() => { 
                            //window.location.href = ("/correction_" + log.AttackType + "?attackID=" + log.index + "&project_name=" + projectName+"&id="+log.id); 
                            setIframeurl("/correction_" + log.AttackType + "?attackID=" + log.index + "&project_name=" + projectName+"&id="+log.id)
                            setIsIframeOpen(true)
                            }} >

                          <div className="flex w-1/4 justify-start items-start justify-items-start">
                            {log.AttackType}
                          </div>

                          <a className="flex w-2/4 justify-start items-start justify-items-start"
                            href={log.target_url} target="_blank" rel="noreferrer" id = "url_display">
                            {
                              //get the widht of the <a> tag and we know that each character is 12px wide so we can calculate the number of characters that can fit in the <a> tag
                              log.target_url.length > url_lenght ? log.target_url.substring(0, url_lenght) + "..." : log.target_url                              

                            }
                          </a>
                          <div className="flex w-1/4 justify-start items-start justify-items-start">
                            {
                              // convert log.time to a date format
                              new Date(log.time).toLocaleString()
                            }
                          </div>
                        </button>
                      ))
                        : <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet"></div>

                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getProjects')
  const projects = await res.json()

  return {
    props: { projects },
  }
}