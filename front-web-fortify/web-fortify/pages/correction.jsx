import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useEffect } from 'react'
import { useState } from 'react'





export default function Correction() {

  
  const [attack, setAttack] = useState("null");

  



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

                
                <div id="main" className="p-2 bg-white  w-full h-full ">

                  <div id="header" className="flex">

                    <button className="flex justify-start items-center justify-items-start "
                    onClick={ () => {  window.location.href = "/dashboard"; } } >

                      <img src="/assets/icons/back.svg" className="w-5 h-5" />

                    </button>

                    <div className="flex px-6 justify-start items-start justify-items-start text-lg">
                      Correction Attaque { attack }
                    </div>


                  </div>


                  <div id="correction" className="px-10 h-[calc(100%-18px)]">

                    <hr className="mt-1 mb-4 h-[2px] bg-grisclair" />

                    <div className="text-md mb-2">
                          Explication de l'attaque
                    </div>

                    <div className="text-[12px] p-4 rounded-md shadow-md bg-grisclair min-h-20 max-h-1/4 w-full">

                        
                    </div>

                    <div className="text-md mb-2 mt-5">
                        Localisation de la vulnérabilité dans votre projet
                    </div>

                    <div className="text-[12px] p-4 rounded-md shadow-md bg-grisclair min-h-20 max-h-1/4 w-full">

                    </div>


                    <div className="text-md mb-2 mt-5">
                        Corrections vulnérabilité
                    </div>

                    <div className="text-[12px] p-4 rounded-md shadow-md bg-grisclair min-h-20 max-h-1/4 w-full">

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