import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useState, useEffect } from 'react';

import { CopyBlock } from 'react-code-blocks';





export default function Correction({ projects }) {


  const [projectName, setProjectName] = useState("");
  const [attackid, setAttackid] = useState("");
  const [attack, setAttack] = useState("");

  useEffect(() => {


    //http://localhost:3000/correction?attackID=0&project_name=gate
    setAttackid(window.location.search.split("=")[1].split("&")[0]);

    setProjectName(window.location.search.split("=")[2]);

    for (var i = 0; i < projects.length; i++) {

      if (projects[i].projectName == window.location.search.split("=")[2]) {
        console.log(projects[i].projectName);

        for (var j = 0; j < projects[i].logs.length; j++) {

          if (projects[i].logs[j].index == window.location.search.split("=")[1].split("&")[0]) {

            console.log(projects[i].logs[j]);


            setAttack(projects[i].logs[j]);
          }
        }
      }
    }


  }, []);





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
                    onClick={() => { window.location.href = "/dashboard"; }} >

                    <img src="/assets/icons/back.svg" className="w-5 h-5" />

                  </button>

                  <div className="flex px-6 justify-start items-start justify-items-start text-lg ">
                    Correction d'une attaque

                    {
                      attack && attack.AttackType ?
                        <div className="font-bold mx-2">
                          { // uppercase the word
                            " " + attack.AttackType.toUpperCase()
                          }
                        </div>
                        : <></>
                    }



                  </div>


                </div>


                <div id="correction" className="px-10 h-[calc(100%-18px)]">

                  <hr className="mt-1 mb-4 h-[2px] bg-grisclair" />

                  <div className="text-md mb-2">
                    Explication de l'attaque
                  </div>

                  <div className="text-[12px] p-4 rounded-md shadow-md border-2 h-auto w-full">

                    {
                      "Fuzzing is a testing method injecting unexpected data to uncover vulnerabilities. File fuzzing targets input files, testing how apps handle them, revealing potential issues. Automated fuzzers generate random inputs to detect abnormal behaviors, widely used in cybersecurity to find bugs, especially in software handling external inputs like file parsers or protocol decoders."

                    }

                  </div>

                  <div className="text-md mb-2 mt-5">
                    Localisation de la vulnérabilité dans votre projet
                  </div>

                  <div className="text-[12px] p-4 rounded-md shadow-md border-2  h-auto max-h-1/4 w-full">



                    {
                      attack && attack.corrections &&
                      attack.corrections.explanation
                    } : <br />

                    <a className="font-bold"
                      href={
                        attack && attack.target_url
                      }
                      target="_blank"
                    >
                      {
                        attack && attack.target_url
                      }
                    </a>


                  </div>

                  {
                    attack && attack.corrections && attack.corrections.correction != "" ?
                      <>

                        <div className="text-md mb-2 mt-5">
                          Corrections vulnérabilité
                        </div>


                        <div className="text-[12px]  rounded-md my-3 shadow-md  h-auto w-full border-2 border-black p-4">
                          

                          <CopyBlock
                            text={
                              attack && attack.corrections && attack.corrections.correction
                            }
                            language={'php'}
                            showLineNumbers={true}
                            theme={undefined}
                            wrapLines={true}
                            codeBlock
                            

                          />

                        </div>

                      </> :
                      <></>
                  }



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