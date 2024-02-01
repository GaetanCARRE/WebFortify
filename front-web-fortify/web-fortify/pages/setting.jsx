import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useEffect } from 'react'
import { useState } from 'react'





export default function Setting({ projects }) {




  const [logs, setLogs] = useState([])

  const [projectName, setProjectName] = useState("")

  const [userprojects, setUserProjects] = useState([])

  const [projectFolderPath, setProjectFolderPath] = useState("")
  


  useEffect(() => {

    // url ?projectName=ClementTest2

    if (window.location.href.split("=")[1] == undefined) {
      // redirect to /index
      window.location.href = '/'
    } else {

      setProjectName(window.location.href.split("=")[1])

      for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName == window.location.href.split("=")[1]) {
          setProjectFolderPath(projects[i].folderPath)
        }
      }

      console.log({ projects })

    }
    setUserProjects(projects)
  }
    , []);


  async function updateProject() {
    const res = await fetch('http://localhost:3000/api/updateFolderPath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectName: projectName, folderPath: projectFolderPath }),
    })
    const data = await res.json()
    console.log(data)
    //window.location.reload()
  }



  /* DROPDOWN */
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  /* END DROPDOWN */




  return (
    <>
      <Header></Header>

      <div className="bg-white h-screen w-screen z-0">


        <div className="flex h-full w-full">
          <SideBar projectName={projectName}></SideBar>
          <div id="main" className="h-full w-full">

            <Navbar></Navbar>

            <hr className="w-full h-[6px] bg-grisclair"></hr>

            <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)] flex">


              <div id="main" className="p-2 px-6 bg-white  w-full h-full ">

                <div className="flex  justify-start items-start justify-items-start text-lg">
                  Setting
                </div>




                <div id="correction" className="h-[calc(100%-18px)]">

                  <hr className="mt-1 mb-4 h-[2px] bg-grisclair" />

                  <div className="flex w-full justify-center items-center justify-items-center text-[14px] h-[calc(100%-22px)]">
                   
                    <div className="w-1/3">

                      <div className="text-[#5A6ACF] text-[14px] flex justify-center">
                          Modify you project's path folder
                      </div>

                      <input id="porjectName" className="shadow-md mt-1 w-full p-1  rounded-md bg-grisclair" type="text" value={projectFolderPath}
                            onChange={(e) => setProjectFolderPath(e.target.value)} />

                        <button
                            onClick={updateProject}
                            type="button"
                            className="flex shadow-lg w-full justify-center items-center px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                          
                          >
                            Update
                        </button>

                    </div>
                    
                    
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