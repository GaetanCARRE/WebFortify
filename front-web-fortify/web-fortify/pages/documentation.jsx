import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { useEffect, useState } from 'react'


export default function Documentation() {
    const [projectName, setProjectName] = useState("")

    useEffect(() => {
        // url ?projectName=ClementTest2
        if (window.location.href.split("=")[1] == undefined) {
            // redirect to /index
            window.location.href = '/'
        } else {
            setProjectName(window.location.href.split("=")[1])
        }
    }
        , []);

    return (
        <div className='h-screen'>
            <Header />
            <div className="bg-white h-full w-full">
                <div className="flex h-full w-full">
                    <SideBar projectName={projectName} />
                    <div id="main" className="h-full w-full">
                        <Navbar />
                        <hr className="w-full h-[6px] bg-grisclair"></hr>
                        <div id="dashboard" className=" bg-white w-full h-[calc(100%-76px)]">
                            <div id="main" className="p-2 px-6 bg-white w-full h-full overflow-auto ">
                                <div className="flex justify-start items-start justify-items-start text-lg">
                                    Documentation
                                </div>
                                <hr className="mt-1 h-[2px] bg-grisclair" />

                                <div id="correction" className="h-[calc(100%-18px)] w-full  ">
                                    <div className="flex justify-center items-center justify-items-center">
                                        <div className='grid grid-cols-2 gap-4 w-[80%] justify-center justify-items-center items-center'>
                                            <label className='text-9xl text-gray-800 mt-[20%] mb-[20%] hover:scale-105  transition ease-in-out  duration-1000 text-center'> XSS </label>
                                            <div className='flex flex-col text-xl mt-[20%] mb-[20%]'>
                                                <label >is a security exploit which allows an attacker to <br />inject into a website malicious client-side code.</label>
                                                <br /><a href="https://owasp.org/www-community/attacks/xss/" target="_blank" className="text-blue-500">What is XSS </a>
                                                <br /><a href="https://owasp.org/www-community/attacks/xss/" target="_blank" className="text-blue-500">Coding Habit to prevent XSS attack </a>
                                            </div>
                                            <hr className="mt-5 w-full h-[2px] bg-grisclair col-span-2" />
                                            <div className='flex flex-col text-xl mt-[20%] mb-[20%]'>
                                            <label >is a security testing technique that involves systematically probing a web server for hidden or vulnerable directories and files by injecting unexpected or random input.</label>
                                            <br /><a href="https://owasp.org/www-community/attacks/Forced_browsing" target="_blank" className="text-blue-500">What is Directory Fuzzing </a>
                                                <br /><a href="https://learn.snyk.io/lesson/xss/#step-f6b1999f-0358-4cbf-de4b-3db4f38850e0" target="_blank" className="text-blue-500">Coding Habit to prevent Directory Fuzzing attack </a>
                                            </div>
                                            <label className='text-9xl text-gray-800 mt-[20%] mb-[20%] hover:scale-105  transition ease-in-out  duration-1000 text-center'> Directory Fuzzing </label>
                                            <hr className="mt-5 w-full h-[2px] bg-grisclair col-span-2" />
                                            <label className='text-9xl text-gray-800 mt-[20%] mb-[20%] hover:scale-105  transition ease-in-out  duration-1000 text-center'> SQLi </label>
                                            <div className='flex flex-col text-xl mt-[20%] mb-[20%]'>
                                                <label >is a cybersecurity vulnerability that occurs when malicious SQL (Structured Query Language) code is injected into a database query, allowing unauthorized access, retrieval, or manipulation of sensitive data.</label>
                                                <br /><a href="https://owasp.org/www-community/attacks/SQL_Injection" target="_blank" className="text-blue-500">What is SQL Injection </a>
                                                <br /><a href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" target="_blank" className="text-blue-500">Coding Habit to prevent SQL Injection attack </a>
                                            </div>
                                            <hr className="mt-5 w-full h-[2px] bg-grisclair col-span-2" />
                                            <div className='flex flex-col text-xl mt-[20%] mb-[20%]'>
                                                <label >is a cybersecurity attack method where an attacker systematically attempts all possible combinations of passwords or encryption keys until the correct one is found, exploiting vulnerabilities through sheer trial and error.</label>
                                                <br /><a href="https://owasp.org/www-community/attacks/Brute_force_attack" target="_blank" className="text-blue-500">What is brute force</a>
                                                <br /><a href="https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks" target="_blank" className="text-blue-500">Coding Habit to prevent brute force attack </a>
                                            </div>
                                            <label className='text-9xl text-gray-800 mt-[20%] mb-[20%] hover:scale-105  transition ease-in-out  duration-1000 text-center'> Brute Force </label>
                                            <hr className="mt-5 w-full h-[2px] bg-grisclair col-span-2" />
                                            <label className='text-9xl text-gray-800 mt-[20%] mb-[20%] hover:scale-105  transition ease-in-out  duration-1000 text-center'> File Upload </label>
                                            <div className='flex flex-col text-xl mt-[20%] mb-[20%]'>
                                                <label >occurs when an attacker exploits vulnerabilities in a web application's file upload functionality to upload malicious files, potentially leading to unauthorized access, execution of malicious code, or other security breaches.</label>
                                                <br /><a href="https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload" target="_blank" className="text-blue-500">What is file upload attack</a>
                                                <br /><a href="https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html" target="_blank" className="text-blue-500">Coding Habit to prevent file upload attack </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
