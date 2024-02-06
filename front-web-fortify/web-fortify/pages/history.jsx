import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useEffect } from 'react'
import { useState } from 'react'





export default function History({ projects }) {


  const [project, setProject] = useState("Select Project");

  const [logs, setLogs] = useState([])

  const [projectName, setProjectName] = useState("")

  const [userprojects, setUserProjects] = useState([])

  const [url_lenght, setUrl_lenght] = useState(0)

  const [isIframeOpen, setIsIframeOpen] = useState(false)

  const [iframeurl, setIframeurl] = useState("")


  useEffect(() => {

    // url ?projectName=ClementTest2

    if (window.location.href.split("=")[1] == undefined) {
      // redirect to /index
      window.location.href = '/'
    } else {

      setProjectName(window.location.href.split("=")[1])

      for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == window.location.href.split("=")[1]) {
          setLogs(projects[i].logs)
        }
      }

      console.log({ projects })


    }
    // setUserProjects(projects)
  }
    , []);


    useEffect(() => {
      const handleResize = () => {
          setUrl_lenght(Math.floor((window.innerWidth - 200) / 12) - 10)
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
  }, []);



  /* DROPDOWN */
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    toggleDropdown();
    setProject(item);
    for (let i = 0; i < userprojects.length; i++) {
      if (userprojects[i].projectName == item) {
        setLogs(userprojects[i].logs)
      }
    }
  };
  useEffect(() => {
    console.log(project)
  }
    , [project]);

  /* END DROPDOWN */

  function sortAttackByTime() {

    // check if the logs are already sorted by ascending time
    var OrderAscending = false

    for (let i = 0; i < logs.length - 1; i++) {
      if (logs[i].time < logs[i + 1].time) {
        OrderAscending = true
        break
      }
    }

    if (OrderAscending) {
      // sort by descending time
      const sortedLogs = [...logs].sort((a, b) => (a.time < b.time) ? 1 : -1)
      setLogs(sortedLogs)
      console.log(sortedLogs)
    } else {
      // sort by ascending time
      const sortedLogs = [...logs].sort((a, b) => (a.time > b.time) ? 1 : -1)
      console.log(sortedLogs)
      setLogs(sortedLogs)

    }

  }


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


            <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)] flex">


              <div id="main" className="p-2 px-6 bg-white  w-full h-full ">

                <div className="flex  justify-start items-start justify-items-start text-lg">
                  History
                </div>



                

                <div id="correction" className="h-[calc(100%-18px)]">

                 

                  <hr className="mt-1 mb-4 h-[2px] bg-grisclair" />

                   {/*

                  <div className="text-md mb-2 text-[#333333]">
                    Projects
                  </div>


                  


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
                      <div className="origin-top-left absolute left-0 mt-2 w-1/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">


                        <div className="py-1">

                          {
                            userprojects.map((userproject) => (
                              <button key={userproject.projectName} className="w-full flex justify-start px-4 py-2 text-sm text-gray-700"
                                onClick={() => handleItemClick(userproject.projectName)} >

                                {userproject.projectName}
                              </button>
                            ))
                          }


                        </div>
                      </div>
                    )}
                  </div>



                

                  <hr className="mt-4 mb-2 h-[2px] bg-grisclair" />

                */}

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

                  <div id="displayproject" className="py-1 max-h-[calc(100%-171px)] overflow-auto">


                    {
                      // every time attacksLogs is updated, reload the logs display
                      logs ? logs.map((log, index) => (

                        <button key={index} className=" shadow-md hover:shadow-xl transition ease-in-out  duration-500 flex w-full  rounded-md my-2 py-1 px-2 text-[12px]" style={{ backgroundColor: log.color }}
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
                        : <div></div>

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

// get static props
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/getProjects')
  const projects = await res.json()
  console.log(projects)

  return {
    props: { projects },
  }
}