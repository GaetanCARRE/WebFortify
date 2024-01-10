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

import { Pie } from 'react-chartjs-2';



export default function DashBoard() {

  const [logs, setLogs] = useState([{AttackType:'XSS', Succes:false, URL:'localhost8080', time:1322212}]) // [{AttackType:CSS, Succes:false, URL: localhost:8080, time:1322212},{},]




  return (
    <>
      <Header></Header>

      <div className="bg-slate-700 h-screen w-screen z-0">

        <Navbar></Navbar>
        <div className="flex h-[calc(100%-48px)] w-full">
            <SideBar></SideBar>
            <div id="main" className=" bg-purple-300 w-full h-full flex">

                

                <div id="left" className="w-1/3 h-full p-2 pl-4 min-w-[400px]">

                  <div id="configuration"  className=" p-2 mb-1 bg-orange-300 w-full h-1/2  ">

                    <div className="flex justify-start items-start justify-items-start text-xl mb-3">
                        Dashboard
                    </div>
                    <div className="flex text-base pt-4">

                      <div className="flex w-1/2 justify-start items-start justify-items-start">
                            Configuration
                      </div>
                      <div className="flex w-1/2 justify-end items-end justify-items-end">
                            <button className="bg-blue-500 p-1 rounded-md text-sm">
                                Start Running Process
                            </button>
                      </div>

                    </div>

                    <div id="allInput" className="text-xs">

                    
                      <div className="mt-3">
                          Type Attack
                      </div>

                      <DropDown></DropDown>

                      <div className="mt-3 ">
                        URL to attack
                      </div>
                      <input id="url" className="mt-1 w-full p-1  rounded-md border-2 border-gray-300" type="text" placeholder="specify url" />
                      

                      <div className="mt-3 ">
                        Specify port
                      </div>

                      <input id="port" className="mt-1 w-full p-1 rounded-md border-2 border-gray-300" type="text" placeholder="specify port" />

                      <div className="mt-3 ">
                        Project's folder path
                      </div>
                      <input id="projectfolder" className="mt-1 w-full p-1 rounded-md border-2 border-gray-300" type="text" placeholder="specify path" />

                    </div>
                    


                  </div>

                  <div id="response" className="p-2 mt-1 bg-orange-800 w-full h-1/2  ">

                    <div className="flex justify-start items-start justify-items-start text-xl pt-5 mb-3 h-auto">
                      Scanning Response
                    </div>

                    <div id="PieChart" className="w-full flex items-center justify-items-center justify-center">
                      <div className="h-1/2 w-1/2 flex items-center justify-items-center justify-center">
                          <Pie data={{
                            labels: ['XSS', 'SQL Injection', 'CSRF', 'LFI', 'RFI', 'RCE'],
                            datasets: [
                              {
                                label: '# of Votes',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                  'rgba(255, 99, 132, 0.2)',
                                  'rgba(54, 162, 235, 0.2)',
                                  'rgba(255, 206, 86, 0.2)',
                                  'rgba(75, 192, 192, 0.2)',
                                  'rgba(153, 102, 255, 0.2)',
                                  'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                  'rgba(255, 99, 132, 1)',
                                  'rgba(54, 162, 235, 1)',
                                  'rgba(255, 206, 86, 1)',
                                  'rgba(75, 192, 192, 1)',
                                  'rgba(153, 102, 255, 1)',
                                  'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                              },
                            ],
                          }}  />
                      </div>
                      



                    </div>
                    

                  </div>

                </div>

                <div id="right" className="w-2/3 h-full p-2">

                  <div id="logs" className="p-2 bg-blue-300  w-full h-full ">

                      <div className="flex pt-14 justify-start items-start justify-items-start">
                          LOGS
                      </div>
                      <hr className="mt-2 mb-2" />
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
                            <div id={log.time} className="flex w-full bg-gray-500 rounded-md py-1">

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

                              <div className="absolute right-10 ">
                                  -
                              </div>

                            </div>
                          ))}



                        </div>
                        

                  </div>

                </div>

                
              
            </div>

        </div>
        
    
        

      </div>

      
           
    </>
  )
}