import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useEffect } from 'react'
import { useState } from 'react'





export default function History() {

  
  const [project, setProject] = useState("Select Project");

  const [logs, setLogs] = useState([])

  const [userprojects, setUserProjects] = useState([

    { 
      projectname: 'Project 1',
      projectid: 1,
      logs: [
        {AttackType:'XSS', Succes:true, URL:'localhost:8080', time:32212, color:0},
        {AttackType:'SQL Injection', Succes:false, URL:'localhost:8080', time:441322212, color:1}
      ]
    },

    {
      projectname: 'Project 2',
      projectid: 2,
      logs: [
        {AttackType:'Brut Force', Succes:true, URL:'localhost:8080', time:7652, color:0},
        {AttackType:'Terminator', Succes:false, URL:'localhost:8080', time:441322212, color:1}
      ]
    },
  ]);
  



  /* DROPDOWN */
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    toggleDropdown();
    setProject(item);
    for (let i = 0; i < userprojects.length; i++) {
      if (userprojects[i].projectname == item) {
        setLogs(userprojects[i].logs)
      }
    }
  };
  useEffect(() => {
    console.log(project)
  }
  , [project]);

  /* END DROPDOWN */



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

                
                <div id="main" className="p-2 px-6 bg-white  w-full h-full ">

                    <div className="flex  justify-start items-start justify-items-start text-lg">
                      History
                    </div>




                  <div id="correction" className="h-[calc(100%-18px)]">

                    <hr className="mt-1 mb-4 h-[2px] bg-grisclair" />

                    <div className="text-md mb-2 text-[#333333]">
                        Projects
                    </div>


                    {/* DROPDOWN */}


                    <div className="relative inline-block text-left py-2 w-full">
                        <button
                          onClick={toggleDropdown}
                          type="button"
                          className="flex shadow-lg w-1/3 justify-start items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                          id="options-menu"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <div className="flex w-full">
                            <div className="w-4/5 flex justify-start">
                              {project}
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
                         
                         
                            <div className="py-1">
                              
                              {
                                userprojects.map((userproject) => (
                                  <button key={userproject.projectid} id={userproject.projectid} className="w-full flex justify-start px-4 py-2 text-sm text-gray-700"
                                    onClick={() => handleItemClick(userproject.projectname)} >
                                    
                                    {userproject.projectname}
                                  </button>
                                ))
                              }

                             
                            </div>
                          </div>
                        )}
                      </div>


                      {/*END DROPDOWN */}

                      <hr className="mt-4 mb-2 h-[2px] bg-grisclair" />

                      <div id="displayproject" className="py-1">

                          { logs.map((log) => (
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

                              <button className="absolute right-10 "
                              onClick={ () => {  window.location.href = "/correction?attackID=765"; } }>
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