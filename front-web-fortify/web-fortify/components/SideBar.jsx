import Head from "next/head";

export default function Navbar() {

    return (         
        
            
        <div className="bg-[#D4DAF4] min-w-40">
            
            <div className="flex py-2 px-4 h-16  items-center justify-items-center text-violet text-sm font-bold">
                <div className="h-2 w-2 mr-1 rounded-full bg-[#5A67BA]">

                </div>
                Username
            </div>

            <hr className="w-full h-[6px] bg-grisclair"></hr> 


            <div className="p-2 ">

                <div className="text-[12px] p-1 font-light text-[#082431] ">
                    Menu
                </div>

                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className=" shadow-md rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start ">
                        <div className="h-2 w-2 mr-1 rounded-sm bg-[#5A67BA]">

                        </div>
                        DashBoard
                    </button>              
                </div>
                <div className="justify-center items-center justify-items-center  text-[#5A6ACF] text-[12px]">
                    
                    <button className="shadow-md  rounded bg-[#b8bde4] py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start ">
                        <div className="h-2 w-2 mr-1 rounded-sm bg-[#5A67BA]">

                        </div>
                        History
                    </button>              
                </div>
                

            </div>
            
        </div>
            
        
    
    )

}