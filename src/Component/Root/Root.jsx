import { Outlet } from "react-router-dom";

import UpNavbar from "../Navigationbar/UpNavbar/UpNavbar";


const Root = () => {
    return (
        <div>
            
           <div className=" fon bangla">
           <UpNavbar></UpNavbar>
         
           </div>
            <div className="max-w-screen-xl mx-auto fon bangla ">
            <Outlet  />
            </div>
           
            
            
            
           
                    
            
        </div>
    );
};

export default Root;