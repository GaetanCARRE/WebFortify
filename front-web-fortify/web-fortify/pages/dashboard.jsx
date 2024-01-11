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

import { Doughnut, Pie } from 'react-chartjs-2';



export default function DashBoard() {

  /* LOGS */

  const [logs, setLogs] = useState([{AttackType:'XSS', Succes:false, URL:'localhost:8080', time:32212, color:0},
                                    {AttackType:'SQL Injection', Succes:false, URL:'localhost:8080', time:441322212, color:1},
                                    {AttackType:'CSRF', Succes:false, URL:'localhost:8080', time:11322212, color:0},
                                    {AttackType:'LFI', Succes:true, URL:'localhost:8080', time:1212, color:1},
                                    {AttackType:'RFI', Succes:false, URL:'localhost:8080', time:13212, color:0},
                                    {AttackType:'RCE', Succes:false, URL:'localhost:8080', time:132212, color:1}    
]) // [{AttackType:CSS, Succes:false, URL: localhost:8080, time:1322212},{},]


  /* END LOGS */
 

  /* DROPWONW */

  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedAttacks, setSelectedAttacks] = useState([]);


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
    console.log(selectedAttacks)
  }
  , [selectedAttacks])

  /*END DROPDOWN */

  /* CONFIGURATION VARIABLES */

  const [url, setUrl] = useState('')
  const [port, setPort] = useState('')
  const [projectFolder, setProjectFolder] = useState('')


  /* END CONFIGURATION VARIABLES */



  /* FUNCTION */

  async function StartRunningProcess() {
    console.log("Start Running Process")
    console.log(selectedAttacks)
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
                            <button className="bg-[#DDE4F0] py-1 px-5 rounded-md text-[12px] font-thin text-violet shadow-xl"
                              onClick={StartRunningProcess}>
                                Start Running Process
                            </button>
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
                              Select Attack(s)
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
                              <label id="1" className="block px-4 py-2 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  checked={selectedAttacks.includes('Item 1')}
                                  onChange={() => handleItemClick('Item 1')}
                                  className="mr-2"
                                />
                                Item 1
                              </label>
                              <label id="2" className="block px-4 py-2 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  checked={selectedAttacks.includes('Item 2')}
                                  onChange={() => handleItemClick('Item 2')}
                                  className="mr-2"
                                />
                                Item 2
                              </label>
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
                        Specify Port
                      </div>

                      <input id="port" className="shadow-md mt-1 w-full p-1  rounded-md  bg-grisclair" type="text" placeholder="" 
                        onChange={(e) => setPort(e.target.value)} />

                      <div className="mt-3 text-[12px] text-violet font-bold">
                        Project's folder path
                      </div>
                      <input id="projectfolder" className="shadow-md mt-1 w-full p-1 rounded-md  bg-grisclair" type="text" placeholder=""
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
                          <Doughnut data={{
                            labels: ['XSS', 'SQL Injection', 'CSRF', 'LFI', 'RFI', 'RCE'],
                            datasets: [
                              {
                                label: '# of Votes',
                                data: [12, 19, 3, 5],
                                backgroundColor: [
                                  'rgba(90, 106, 207, 0.5)',
                                  'rgba(133, 147, 237, 0.5)',
                                  'rgba(199, 206, 255, 0.5)',
                                  'rgba(222, 225, 224, 0.5)',
                                  
                                ],
                                borderWidth: 0,
                              },
                            ],
                          }}  />
                      </div>
                      



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

                        <div className="flex w-1/4 justify-start items-start justify-items-start">
                            Type of Attack
                        </div>
                        <div className="flex w-1/4 justify-start items-start justify-items-start">
                            Success
                        </div>
                        <div className="flex w-1/4 justify-start items-start justify-items-start">
                            URL
                        </div>
                        <div className="flex w-1/4 justify-start items-start justify-items-start">
                            Time
                        </div>                   


                      </div>

                      <div id="displaylog" className="py-1">

                          {logs.map((log) => (
                            // if log.color is 0 display bg-white else display bg-grisclair

                            <div key={log.time} className="shadow-md hover:shadow-xl transition ease-in-out  duration-500 flex w-full  rounded-md my-2 py-1 px-2 text-[12px]" style={{backgroundColor: log.color == 0 ? '#C8CBD9' : '#D6D2D2'}}>

                              <div className="flex w-1/4 justify-start items-start justify-items-start">
                                  {log.AttackType}
                              </div>
                              <div className="flex w-1/4 justify-start items-center justify-items-start">
                                  {
                                    // if log.Succes is true display a green dot else display a red dot
                                    log.Succes ? <div className="h-3 w-3 rounded-full bg-green-500"></div> : <div className="h-3 w-3 rounded-full bg-red-500"></div>

                                  
                                  }
                              </div>
                              <div className="flex w-1/4 justify-start items-start justify-items-start">
                                  {log.URL}
                              </div>
                              <div className="flex w-1/4 justify-start items-start justify-items-start">
                                  {log.time}
                              </div>

                              <button className="absolute right-10 ">
                                <img src="/assets/icons/right.svg" className="w-4 h-4 " />
                              </button>

                            </div>
                          ))}



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