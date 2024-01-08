import Head from "next/head";

export default function Navbar() {

    return (         
        
            
        <div className="bg-purple-500 p-2">
            <div className="justify-center items-center justify-items-center">
                <button className=" rounded bg-gray-400 p-2 my-2 w-full">
                    DashBoard
                </button>              
            </div>
            <div className="justify-center items-center justify-items-center ">
                <button className=" rounded bg-gray-400 p-2 my-2 w-full">
                    History
                </button>              
            </div>
            <div className="justify-center items-center justify-items-center">
                <button className=" rounded bg-gray-400 p-2 my-2 w-full">
                    Correction
                </button>              
            </div>
        </div>
            
        
    
    )

}