import { FaRegUser, FaTiktok } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

import { TbLogout } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";


const UpNavbar = () => {
    const { user, handleSignOut} = useAuth();
    return (
      <div className="  mb-4 pop">
          <div className=" md:flex lg:flex justify-between  max-w-screen-xl mx-auto py-3   space-y-2">
            <div className="text-2xl flex gap-4 mx-3 items-center justify-center  ">
                <a href="" className="hover:text-green-700"> <IoLogoYoutube /></a>
                <a href="" className="hover:text-green-700"> <FaInstagram/></a>
                <a href="" className="hover:text-green-700"> <FaFacebook></FaFacebook></a>
                <a href="" className="hover:text-green-700"> <FaLinkedin /></a>
                <a href="" className="hover:text-green-700"> <FaTiktok /></a>

            </div>

            <div className=" md:flex lg:flex space-y-2  lg:space-y-0 md:space-y-0 gap-8 ">
                <div className=" flex gap-1 items-center justify-center">
                <div className=" hidden lg:flex">
        {/* Main navigation */}
        <ul className="flex gap-7 font-semibold items-center">
        <NavLink
              to="/"
              className={({ isActive, isPending }) =>
            isPending ? "  text-lg  font-medium" : isActive ? "  border-b-[3px] border-custom-bg text-lg  font-medium  " :"text-lg  font-medium group flex  cursor-pointer flex-col"
            }
            >
            Home
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-custom-bg transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
        <NavLink
              to="/AddContest"
              className={({ isActive, isPending }) =>
            isPending ? "  text-lg  font-medium" : isActive ? "  border-b-[3px] border-custom-bg text-lg  font-medium  " :"text-lg  font-medium group flex  cursor-pointer flex-col"
            }
            >
            Add Task
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-custom-bg transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

        <NavLink
              to="/ManageTask"
              className={({ isActive, isPending }) =>
            isPending ? "  text-lg  font-medium" : isActive ? "  border-b-[3px] border-custom-bg text-lg  font-medium  " :"text-lg  font-medium group flex  cursor-pointer flex-col"
            }
            >
            Manage Task
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-custom-bg transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
         
            
        </ul>
      </div>
        </div>
                </div>
                {user ? (
                    <div className="flex justify-center gap-4">
                        {user.photoURL ? (
                            <div className="dropdown dropdown-bottom dropdown-end z-50"> {/* Higher z-index */}
                              <div className="flex gap-1">
                                <div tabIndex={0} role="button">
                                <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full" />
                                 </div>
                                <div className=""> <button onClick={handleSignOut} className="text-3xl btn">
                                <TbLogout />
                                  </button></div>
                                </div>
                                    <ul className="dropdown-content z-50 menu p-2 space-y-3 font-medium shadow bg-base-100 rounded-box w-52 text-black">
                                    <li className="text-lg">{user?.displayName}</li>
                                   <li className="">{user?.email}</li>
           <Link to={"/dashboard"} >
             <li className="hover:bg-[#bd202c] px-2 py-3 text-center "> Dashboard</li>
              </Link>  
          <li>
            <button onClick={handleSignOut} className="text-3xl btn">
              <TbLogout />
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <div className="dropdown dropdown-bottom dropdown-end z-50"> {/* Higher z-index */}
        <div className="flex gap-1">
        <div tabIndex={0} role="button">
          <img src="https://i.ibb.co/gv6gcNR/image.png" alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className=""> <button onClick={handleSignOut} className="text-3xl btn">
              <TbLogout />
            </button></div>
        </div>
        <ul className="dropdown-content z-50 menu p-2 space-y-3 font-medium shadow bg-base-100 rounded-box w-52">
          <li className="text-lg">{user?.displayName}</li>
          <li className="">{user?.email}</li>
          <li>
            <button onClick={handleSignOut} className="text-3xl btn">
              <TbLogout />
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
) : (
  <div className="flex gap-2 justify-center   ">
    <Link to={"/login"}>
      <button className="rounded-lg border-2  px-4 py-2 font-medium text-lg flex gap-1 items-center text-center">
      <FaRegUser /> <span className="text-center">Login</span>
      </button>
    </Link>
   
  </div>
)}

            </div>
            
        </div>
    
    );
};

export default UpNavbar;