import { Outlet } from "react-router-dom";
import Menubar from "../AdminComponent/Menubar/Menubar";


const Dashbord = () => {
    return (
        <div className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-4 ">
            <Menubar></Menubar>
           
        <div className='lg:col-span-3 md:col-span-3'>
        <div className="">
                <Outlet></Outlet>
            </div>
        </div>
      </div>
       
    );
};

export default Dashbord;