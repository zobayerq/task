import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../AugthProvider/AugthProvider";


const Privetrout = ({children}) => {
    const {user,loding}= useContext(AuthContext);
    const location = useLocation()
    console.log(location.state);
    
    console.log(user);

    if(loding){
        return <div className="flex w-full justify-center items-center"><div className="w-24 h-24 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div></div>
    }

    if (!user) {
        return <Navigate to={"/login"} state={location?.pathname || "/"}></Navigate>
        
    }

    return (
        <div>
            {
                children
            }
        </div>
    );
};

export default Privetrout;