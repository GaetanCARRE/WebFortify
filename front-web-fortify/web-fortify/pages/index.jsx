import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


//import "@fontsource/poppins";


import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useEffect } from 'react'
import { useState } from 'react'

export default function Home({ projects }) {

  const [userprojects, setUserProjects] = useState([])

  const [projectName , setProjectName] = useState("")

  const [folderPath , setFolderPath] = useState("")

  async function createProject() {
    const res = await fetch('http://localhost:3000/api/createProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectName: projectName, folderPath: folderPath }),
    })
    const data = await res.json()
    console.log(data)
    window.location.reload()
  }

  useEffect(() => {
    console.log( {projects} )

    setUserProjects(projects)
  }
  , []);

  return (
    <>
      <Header></Header>

      <div className=" h-screen w-screen">

        <Navbar></Navbar>
        <hr className="w-full h-[6px] bg-grisclair"></hr>
        <div className="flex h-[calc(100%-70px)] w-full">            
            <div className="flex w-full items-center justify-center justify-items-center">

                <div>
                    <div className="text-2xl font-bold text-[#082431]">
                        Welcome to WebFortify
                    </div>
                    <div className="text-[#5A6ACF] text-[12px] flex justify-center">
                        Select a project to start
                    </div>

                    <div className="justify-center items-center justify-items-center">

                        {
                          userprojects.map((item, index) => (
                            <button key={item.projectName} className="shadow-md hover:shadow-xl hover:scale-105  justify-center transition ease-in-out  duration-500 rounded bg-grisclair py-2 px-4 my-3 w-full flex  items-center "
                            onClick={ () => {  window.location.href = ("/dashboard?projectName=" + item.projectName); } } >                       
                                {item.projectName}
                            </button>              
                          ))
                        }

                    </div>

                    <div className="text-[#5A6ACF] text-[12px] flex justify-center">
                        or create a new one
                    </div>

                    <div className="justify-center items-center justify-items-center">
                      <div className="mt-3 text-[12px] text-violet font-bold">
                          Project Name
                        </div>
                        <input id="porjectName" className="shadow-md mt-1 w-full p-1  rounded-md bg-grisclair" type="text" placeholder=""
                          onChange={(e) => setProjectName(e.target.value)} />

                        <div className="mt-3 text-[12px] text-violet font-bold">
                          Project's Folder Path
                        </div>
                        <input id="porjectName" className="shadow-md mt-1 w-full p-1  rounded-md bg-grisclair" type="text" placeholder=""
                          onChange={(e) => setFolderPath(e.target.value)} />


                        <button
                          onClick={createProject}
                          type="button"
                          className="flex shadow-lg w-full justify-center items-center px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                          id="options-menu"
                          aria-haspopup="true"
                          aria-expanded="true"
                        
                        >

                    
                        <div className="flex justify-center w-full">
                          Create
                        </div>

                        
                        </button>
                      
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