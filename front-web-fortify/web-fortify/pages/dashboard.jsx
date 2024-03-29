import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


//import "@fontsource/poppins";


import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import DropDown from '../components/dropdown'

import { useEffect } from 'react'
import { useState } from 'react'

import { Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

import { Doughnut } from 'react-chartjs-2';



export default function Dashboard({ projects }) {

  /* LOGS */

  const [projectName , setProjectName] = useState("")

  const [scanningStatus, setScanningStatus] = useState(false)

  const [attacksLogs, setAttacksLogs] = useState([]) 

  const [isUsingDirSearch, setIsUsingDirSearch] = useState(false)


  /* END LOGS */

  /*   */
  
 

  /* DROPWONW */

  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedAttacks, setSelectedAttacks] = useState([]);

  //const AvailableAttack = ['xss', 'sql', 'dirsearch']

  const AvailableAttack = [
    {
      id: 1,
      name: 'xss',
      color : 'rgba(90, 106, 207, 0.5)'
    },
    {
      id: 2,
      name: 'sql',
      color : 'rgba(133, 147, 237, 0.5)'
    },
    {
      id: 3,
      name: 'fuzzing',
      color : 'rgba(199, 206, 255, 0.75)'
    },
    {
      id: 4,
      name: "bruteforce",
      color : 'rgba(147, 225, 224, 0.5)'
    },
    {
      id: 5,
      name: "fileupload",
      color : 'rgba(222, 225, 224, 0.5)'
      
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
    console.log(selectedAttacks);
  }
  , [selectedAttacks])

  useEffect(() => {

    // url ?projectName=ClementTest2

    if(window.location.href.split("=")[1] == undefined){
      // redirect to /index
      window.location.href = '/'
    }else{

      setProjectName(window.location.href.split("=")[1])

      console.log( {projects} )

      for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == window.location.href.split("=")[1]) {
          setProjectFolder(projects[i].folderPath)
          //console.log(projects[i].folderPath)
          setAttacksLogs(projects[i].logs)
        }
      }
    }
  }
  , []);



 

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
  
        var raw = JSON.stringify({"projectName":projectName,"logs":logs});

        console.log(projectName)
        console.log(logs)

  
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

  async function ReOrderLogs(logs , offset) {

    const updatedLogs = logs.map((log, index) => ({
       ...log,
       index: index + offset,
       color: (index + offset) % 2 === 0 ? 0 : 1,
    }));
    
    return updatedLogs;  
    
 }

  async function LocalRequest(type, local_logs) {
    try {
       var myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");
 
       var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
       };

       var response = null

       if(isUsingDirSearch){
          console.log(projectFolder)
          response = await fetch(("http://localhost:3000/api/" + type + "?target_url=" + "null" + "&project_path=" + projectFolder), requestOptions);

       }
       else{
         response = await fetch(("http://localhost:3000/api/" + type + "?target_url=" + url + "&project_path=" + projectFolder), requestOptions);
      }
       const result = await response.text();

       
 
       const updatedLog = await ReOrderLogs( JSON.parse(result) , local_logs.length)

        for (let i = 0; i < updatedLog.length; i++) {
          local_logs.push(updatedLog[i])
        }

       
        setAttacksLogs( await local_logs)   

    } catch (error) {
       console.error('Error:', error);
       // Throw the error to propagate it to the caller if needed
       throw error;
    }
 }
 
 async function Run(newSelectedAttacks){

  let locale_logs = []


        if(attacksLogs.length > 0){
          locale_logs = attacksLogs
          console.log("Logs already exist")
        }

        console.log("Start Running Process")
        setScanningStatus(true)
        
        
        for (let i = 0; i < newSelectedAttacks.length; i++) {
          console.log(newSelectedAttacks[i])
          
          await LocalRequest(newSelectedAttacks[i], locale_logs)
        }

        /*
        await LocalRequest("test_xss", locale_logs)

        await LocalRequest("test_dirsearch", locale_logs)
        */
        
        setScanningStatus(false)

        await AddLogsToDatabase(locale_logs)

        console.log("XSS Done")

 }

 async function CheckFuzzingOutput(){
  
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

    try{

      
      if(url == '' && !isUsingDirSearch){
        alert("Please specify an URL")
      }else if( selectedAttacks.length == 0){
        alert("Please select at least one attack")
      }
      
      else{

          let newSelectedAttacks = selectedAttacks

          const isFuzzingOutputEmpty = await CheckFuzzingOutput()
          
          if(isUsingDirSearch){
            if(isFuzzingOutputEmpty){
                alert("Fuzzing output is empty, we will run fuzzing first")
               newSelectedAttacks = ["fuzzing", ...newSelectedAttacks, ]
            }else{
              alert("Fuzzing output is not empty, we will use existing output")
            }
          

          }else{

          }

          await Run(newSelectedAttacks)


        

      }

    }catch(e){
      console.log(e)
    }



    
  }

  function sortAttackByTime(){

    // check if the logs are already sorted by ascending time
    var OrderAscending = false

    for (let i = 0; i < attacksLogs.length - 1; i++) {
      if(attacksLogs[i].time < attacksLogs[i+1].time){
        OrderAscending = true
        break
      }
    }

    console.log(OrderAscending)

    if (OrderAscending){
      // sort by descending time
      const sortedLogs = [...attacksLogs].sort((a, b) => (a.time < b.time) ? 1 : -1)
      setAttacksLogs(sortedLogs)
      console.log(sortedLogs)
    }else{
      // sort by ascending time
      const sortedLogs = [...attacksLogs].sort((a, b) => (a.time > b.time) ? 1 : -1)
      console.log(sortedLogs)
      setAttacksLogs(sortedLogs)

    }    
    
  }


  function ToggleDirSearchState(){
    setIsUsingDirSearch(!isUsingDirSearch)
  }

  /* END FUNCTION */



  return (
    <>
      <Header></Header>

      <div className="bg-white h-screen w-screen z-0">

        
        <div className="flex h-full w-full">
            <SideBar></SideBar>
            <div id="main" className="h-full w-full">

              <Navbar></Navbar>

              <hr className="w-full h-[6px] bg-grisclair"></hr> 

              <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)] flex">

                
                <div id="left" className="w-1/3 h-full p-2 pl-4 min-w-[400px]">

                  <div id="configuration"  className=" p-2 mb-1 bg-white w-full h-1/2  ">

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


                      <div className="mt-3 text-[12px] text-violet font-bold">
                        URL to attack
                      </div>
                      <input id="url" className="shadow-md mt-1 w-full p-1  rounded-md bg-grisclair" type="text" placeholder=""
                        onChange={(e) => setUrl(e.target.value)} />
                      

                      

                      <div className="mt-3 text-[12px] text-violet font-bold">
                        Project's folder path
                      </div>
                      <input id="projectfolder" className="shadow-md mt-1 w-full p-1 rounded-md  bg-grisclair" type="text" placeholder={projectFolder}
                        onChange={(e) => setProjectFolder(e.target.value)} />


                      <div className="flex w-full">

                      <div className="mt-3 text-[12px] text-violet font-bold w-1/2">
                        Use URL only
                        < input type="checkbox" className="ml-2" onChange={ToggleDirSearchState} 
                        checked={!isUsingDirSearch} />
                      </div>

                      <div className="mt-3 text-[12px] text-violet font-bold w-1/2">
                        Use Fuzzing output
                        < input type="checkbox" className="ml-2" onChange={ToggleDirSearchState}
                        checked={isUsingDirSearch} />
                      </div>

                      </div>
                      
                            







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
                          attacksLogs ? attacksLogs.map((log) => (  
                            
                            <button key={log.index} className="shadow-md hover:shadow-xl transition ease-in-out  duration-500 flex w-full  rounded-md my-2 py-1 px-2 text-[12px]" style={{backgroundColor: log.color == 0 ? '#C8CBD9' : '#D6D2D2'}}
                              onClick={ () => {  window.location.href = ("/correction_" + log.AttackType  + "?attackID=" + log.index + "&project_name=" + projectName); } } >
                              
                              <div className="flex w-1/4 justify-start items-start justify-items-start">
                                  {log.AttackType}
                              </div>
                              
                              <a className="flex w-2/4 justify-start items-start justify-items-start"
                                href={log.target_url} target="_blank" rel="noreferrer">
                                  {
                                    // if target_url is too long display only the 13 first characters and add "..." at the end
                                    log.target_url.length > 40 ? log.target_url.substring(0, 40) + "..." : log.target_url
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
                          :  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet"></div>

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
  console.log(projects)

  return {
    props: { projects },
  }
}