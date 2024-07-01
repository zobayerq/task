


import { NavLink } from "react-router-dom";

import {  FaHouseMedical } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { MdMenuBook } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { FaRegImages, FaUsers } from "react-icons/fa";


const AdminMenu = () => {
    const {  handleSignOut } =useAuth() ;
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-gray-300">
                <ul className="menu p-4">
                     <li>
                        <NavLink to="/dashboard/ManageUser">
                        <FaUsers />
                        Manage User</NavLink>
                    </li>
                     <li>
                        <NavLink to="/dashboard/AddContest">
                        <MdMenuBook />
                        Add Courses </NavLink>
                    </li>
                     <li>
                        <NavLink to="/dashboard/Slidersimg">
                        <FaRegImages />
                        Slidersimg </NavLink>
                    </li>
               
                  
                    <div className="divider mb-48"></div>
                    <li>
                        <NavLink to="/">
                            <FaHouseMedical></FaHouseMedical>
                            Home</NavLink>
                    </li>
                    <li>
                    <div className=""> <button onClick={handleSignOut} className="text-3xl btn">
              <TbLogout />
            </button></div>
        
                    </li>
                    
                </ul>
            </div>
           
           
        </div>
    );
};

export default AdminMenu;