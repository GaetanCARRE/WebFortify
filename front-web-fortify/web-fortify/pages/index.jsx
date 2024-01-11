import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'


//import "@fontsource/poppins";


import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'

export default function Home() {
  return (
    <>
      <Header></Header>

      <div className="bg-slate-700 h-screen w-screen">

        <Navbar></Navbar>
        <div className="flex h-[calc(100%-48px)] w-full">
            <SideBar></SideBar>
            <div>
              Main
            </div>

        </div>
        
    
        

      </div>

      
           
    </>
  )
}
