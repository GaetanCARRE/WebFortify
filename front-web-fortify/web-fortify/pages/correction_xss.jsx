import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'



import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'


import { useState, useEffect } from 'react';

import { CopyBlock } from 'react-code-blocks';





export default function Correction( { projects } ) {

  
  const [projectName, setProjectName] = useState("");
  const [ attackid , setAttackid ] = useState("");
  const [ attack , setAttack ] = useState("");
  const [ isOpen , setIsOpen ] = useState([]);


  useEffect(() => {
    console.log("isOpen");
    console.log(isOpen);
  }, [isOpen]);

  useEffect(() => {

    
    //http://localhost:3000/correction?attackID=0&project_name=gate
    setAttackid(window.location.search.split("=")[1].split("&")[0]);
    
    setProjectName(window.location.search.split("=")[2]);

    for (var i = 0; i < projects.length; i++) {

      if (projects[i].projectName == window.location.search.split("=")[2]) {
        console.log(projects[i].projectName);

        for(var j = 0; j < projects[i].logs.length; j++){

          if(projects[i].logs[j].index == window.location.search.split("=")[1].split("&")[0]){

            console.log(projects[i].logs[j]);
            // file : C:\wamp64\www\site-test\pages\xss.php line : 40 <input type="text" id="title" name="title" required><br><br>
            
           

            var line = projects[i].logs[j].corrections.line_vuln;
            // Define the regular expression pattern
              var pattern = /file : (.*) line : (.*) ([\s\S]*)/;

              // Perform the regular expression match
              var matches = line.match(pattern);

              // Check if there is a match
              if (matches) {
                  // Extracted information
                  var path = matches[1].trim();
                  var lineNumber = matches[2].trim();
                  var codeExtract = matches[3].trim();

                  projects[i].logs[j].corrections.path = path;
                  projects[i].logs[j].corrections.lineNumber = lineNumber;
                  projects[i].logs[j].corrections.codeExtract = codeExtract;

                  // Output the results
                  /*console.log("Path: " + path);
                  console.log("Line Number: " + lineNumber);
                  console.log("Code Extract: " + codeExtract);*/
              } else {
                  // If no match is found
                  console.log("No match found.");
              }
         
            
              

            let tab = [];
            for(var k = 0; k < projects[i].logs[j].corrections.list_corrections.length; k++){
              
              tab.push(false);
              
            }
            setIsOpen(tab)
          
            
            setAttack(projects[i].logs[j]);
          }
        }
      }
    }


  }, []);

  const toggleAccordeon = (index) => {

       
    for (var i = 0; i < isOpen.length; i++) {
      if(i == index){
        isOpen[i] = !isOpen[i];
      }
    }
  
    setIsOpen( [...isOpen] );
  }


  



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

                    <div className="flex px-6 justify-start items-start justify-items-start text-lg ">
                      Correction d'une attaque 
                      
                      {
                        attack && attack.AttackType ?
                        <div className="flex">
                          <div className="font-bold mx-2">
                            { // uppercase the word
                              " " + attack.AttackType.toUpperCase()
                            }
                          </div>
                          avec le payload
                          <div className="font-bold mx-2">
                            { attack.payload }
                          </div>
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
                          attack && attack.corrections
                          && attack.corrections.explanation_xss
                          
                        }
                        
                    </div>

                    <div className="text-md mb-2 mt-5">
                        Localisation de la vulnérabilité dans votre projet
                    </div>

                    <div className="text-[12px] p-4 rounded-md shadow-md border-2  h-auto max-h-1/4 w-full">


                      {
                        <>
                            Path :
                          <span className="font-bold">
                            {
                              attack && attack.corrections && 
                              attack.corrections.path

                            }
                          </span>
                          <br />
                          Line Number :
                          <span className="font-bold">
                          {
                            attack && attack.corrections && 
                            attack.corrections.lineNumber
                          }

                          </span>

                          <div>
                            <CopyBlock text={
                              attack && attack.corrections &&
                              attack.corrections.codeExtract
                            } language="html" theme="dracula"
                            showLineNumbers={true}
                            wrapLines={true}
                            codeBlock
                            />
                          </div>
                        </>
                      }

                     
                        
                        
                        
                    </div>


                    <div className="text-md mb-2 mt-5">
                        Corrections vulnérabilité
                    </div>

                    {
                      
                        <>
                        {
                        
                          attack && attack.corrections && attack.corrections.list_corrections &&
                          attack.corrections.list_corrections.map((correction, index) => (
                            <div key={index} className="text-[12px]  rounded-md my-3 shadow-md  h-auto w-full border-2 border-black">
    
                              <button className="w-full p-4"
                              onClick={ () => { toggleAccordeon(index); } }
                              >
                                <div className="flex w-full">
                                  <div className="text-md w-4/5 justify-start flex font-bold ">
                                    
                                    { correction.title }
                                    
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
    
                                  <div className="text-[12px] p-4  w-full">
                                    { correction.correction_explanation }
                                  </div>
                                  <hr className="my-2 h-[2px] bg-black px-5" />
                                  <div className="text-[12px] p-4   w-full">
    
                                 <CopyBlock text={
                                    correction.line_correction
                                  } language="js" theme="dracula"
                                  showLineNumbers={true}
                                  wrapLines={true}
                                  codeBlock
                                  />
                               
                                    
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