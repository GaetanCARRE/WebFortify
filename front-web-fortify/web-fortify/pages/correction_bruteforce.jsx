import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useState, useEffect } from 'react';

import { CopyBlock } from 'react-code-blocks';





export default function Correction() {

  const [loading, setLoading] = useState(true);


  const [projectName, setProjectName] = useState("");
  const [attackid, setAttackid] = useState("");
  const [attack, setAttack] = useState("");
  const [isOpen, setIsOpen] = useState([]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:3000/api/getProjects');
        const projects = await response.json();


        //http://localhost:3000/correction?attackID=0&project_name=gate
        setAttackid(window.location.search.split("=")[1].split("&")[0]);

        setProjectName(window.location.search.split("=")[2].split("&")[0]);

        for (var i = 0; i < projects.length; i++) {

          if (projects[i].projectName == window.location.search.split("=")[2].split("&")[0]) {
            console.log(projects[i].projectName);

            for (var j = 0; j < projects[i].logs.length; j++) {

              if (projects[i].logs[j].index == window.location.search.split("=")[1].split("&")[0] && projects[i].logs[j].id == window.location.search.split("=")[3]) {

                console.log(projects[i].logs[j]);

                let tabtmp = [];

                for (var k = 0; k < projects[i].logs[j].credentials.length; k++) {
                  tabtmp.push(false);
                }
                setIsOpen(tabtmp);


                setAttack(projects[i].logs[j]);
              }
            }
          }
        }
        await sleep(2000);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };


    fetchData();


  }, []);


  const toggleAccordeon = (index) => {


    for (var i = 0; i < isOpen.length; i++) {
      if (i == index) {
        isOpen[i] = !isOpen[i];
      }
    }

    setIsOpen([...isOpen]);
  }





  return (
    <>
      <Header></Header>

      <div className="bg-white z-0"
        style={loading ? { width: "100vw", height: "100vh" } : {}}
      >


        <div className="flex h-full w-full">
          {/* <SideBar projectName={projectName}></SideBar> */}
          <div id="main" className="h-full w-full">

            {/* <Navbar></Navbar> */}

            <hr className="w-full h-[6px] bg-grisclair"></hr>

            <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)] flex">

              {!loading ?
                <div id="main" className="p-2 bg-white  w-full h-full ">

                  <div id="header" className="flex">

                    {/* <button className="flex justify-start items-center justify-items-start "
                      onClick={() => { window.location.href = ("/dashboard?projectName=" + projectName); }} >

                      <img src="/assets/icons/back.svg" className="w-5 h-5" />

                    </button> */}

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
                        "A brute-force attack is a method of attempting to gain unauthorized access by systematically trying all possible combinations of passwords or keys. This attack aims to find the correct credentials through sheer trial and error. Attackers use automated tools to rapidly and exhaustively try different passwords until the correct one is discovered. Brute-force attacks are a common threat to password-based security systems and are countered by implementing strong password policies, account lockout mechanisms, and multi-factor authentication."
                      }

                    </div>

                    <div className="text-md mb-2 mt-5">
                      Localisation de la vulnérabilité dans votre projet
                    </div>

                    <div className="text-[12px] p-4 rounded-md shadow-md border-2  h-auto max-h-1/4 w-full">


                      the vulnerability is located in the url : <span className="font-bold">
                        {attack && attack.target_url ? attack.target_url : ""}
                      </span>


                    </div>

                    <div className="text-md mb-2 mt-5">
                      Corrections vulnérabilité
                    </div>

                    {

                      <>
                        {

                          attack && attack.credentials &&
                          attack.credentials.map((credential, index) => (
                            <div key={index} className="text-[12px]  rounded-md my-3 shadow-md  h-auto w-full border-2 border-black">

                              <button className="w-full p-4"
                                onClick={() => { toggleAccordeon(index); }}
                              >
                                <div className="flex w-full">
                                  <div className="text-md w-4/5 justify-start flex font-bold ">

                                    Credential vulnerability n°{index + 1}

                                  </div>
                                  <div className="w-1/5 text-right flex justify-end items-center justify-items-end">
                                    {
                                      isOpen[index] ? <img src="/assets/icons/up.svg" className="ml-2 w-3 h-3" /> : <img src="/assets/icons/bottom.svg" className="ml-2 w-3 h-3" />
                                    }

                                  </div>
                                </div>

                              </button>


                              {
                                // if isOpen[index] == true else: <></>

                                isOpen[index] ?
                                  <div className="bg-grisfonce">

                                    <hr className="h-[4px] bg-black " />

                                    <div className="text-[12px] p-4  w-full flex">

                                      <div className="w-full flex justify-center items-center justify-items-center">

                                        We have found a password for the username :
                                        <span className="font-bold ml-2">

                                          {
                                            credential && credential.user
                                          }

                                        </span>


                                      </div>




                                    </div>
                                  </div>
                                  :
                                  <></>



                              }

                            </div>
                          ))
                        }
                      </>

                    }






                  </div>



                </div>
                :
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-violet">
                </div>
              }



            </div>

          </div>


        </div>




      </div>



    </>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3000/api/getProjects')
//   const projects = await res.json()
//   console.log(projects)

//   return {
//     props: { projects },
//   }
// }