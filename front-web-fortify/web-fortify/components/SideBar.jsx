import Head from "next/head";

export default function Navbar({projectName}) {
console.log(projectName)
    return (         
        
            
        <div className="bg-[#D4DAF4] min-w-40">
            
            <button className="flex py-2 px-4 h-16  items-center justify-items-center text-violet text-sm font-bold"
            onClick={ () => {  window.location.href = "/"; } } >
                <div className="h-2 w-2 mr-1 rounded-full bg-[#5A67BA]">

                </div>
                Home
            </button>

            <hr className="w-full h-[6px] bg-grisclair"></hr> 


            <div className="p-2 ">

                <div className="text-[12px] p-1 font-light text-[#082431] ">
                    Menu
                </div>

                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className=" shadow-md hover:shadow-xl  transition ease-in-out  duration-500 rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                     onClick={ () => {  window.location.href = ("/dashboard?projectName="+projectName); } } >                        
                        <div className="">
                            <img src="/assets/icons/dash.svg" className="w-4 h-4 mr-1" />
                        </div>
                        DashBoard
                    </button>              
                </div>
                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    onClick={ () => {  window.location.href = "/history?projectName="+projectName; } } > 
                        <div className="">
                            <img src="/assets/icons/hist.svg" className="w-4 h-4 mr-1" />
                        </div>
                        History
                    </button>              
                </div>
                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    onClick={ () => {  window.location.href = "/documentation?projectName="+projectName; } } > 
                        <div className="">
                            <img src="/assets/icons/documentation.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Documentation
                    </button>              
                </div>
                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    onClick={ () => {  window.location.href = "/setting?projectName="+projectName; } } > 
                        <div className="">
                            <img src="/assets/icons/settings.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Setting
                    </button>              
                </div>

                

            </div>
            
        </div>
            
        
    
    )

}