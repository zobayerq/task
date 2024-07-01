import {  createContext, useEffect, useState } from "react";
import {   GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,  updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import {  toast } from 'react-toastify';
import axios from "axios";

export const AuthContext = createContext(null);
const AugthProvider = ({children}) => {


    const [user, setUser]= useState(null)
   
    const [location, setlocation]= useState(null)
    const [loding, setloding]= useState(true)
    const [darkMode, setDarkMode] = useState(() => {
      // Initialize dark mode from localStorage or default to false
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      return savedDarkMode;
    });


   
    console.log(location);


    
    const GoogleProvider = new GoogleAuthProvider();
    



   useEffect(()=> {
   const unsubscrib = onAuthStateChanged(auth, currentUser  => {
   
  
    setUser(currentUser);

    if (currentUser) {
      getToken(currentUser.email)
      saveUser(currentUser)
    }
        if (user) {

      
      setUser(user)
      setloding(false)
          
        } 
        else{
          setloding(false)
        }






      });
      return () =>unsubscrib()
   },[user]

   )

   useEffect(() => {
    // Save dark mode preference to localStorage when it changes
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);


 


  //  email password login System.........

const rigisterEmailpass = (email, password) =>{
  setloding(true)
    
 return createUserWithEmailAndPassword(auth, email, password)


}


const loginUser =(email, password)=>{
  setloding(true)
   return signInWithEmailAndPassword(auth, email, password)
  
}




const GoogleLogin = () => {
  setloding(true)
  return signInWithPopup(auth, GoogleProvider)


}



// update information 

 const updateUser =(displayName,photoURL)=>{
  updateProfile(auth.currentUser, {
     displayName: `${displayName}`, photoURL: `${photoURL}`
  }).then(() => { 
    setUser({displayName : displayName, photoURL : photoURL})
    
     toast.success("Update Successfull", {
     position: "top-center"
   });
 }).catch((error) => {
   toast.error({error}, {
      position: "top-center"
    });
   });
 }



 const getToken = async email => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/jwt`,
    { email },
    { withCredentials: true }
  )
  return data
}




 // save user
 const saveUser = async user => {
  const currentUser = {
    email: user?.email,
    name: user?.displayName,
    role: 'User',
    status: 'normal',
  }
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_URL}/user`,
    currentUser
  )
  return data
}






function handleSignOut() {

  signOut(auth)
    .then(async() => {
     
      toast.error("Sign-out successful.", {
        position: "top-left"
      });

      setloding(false)
      setUser(null)
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      })
      
     })
    .catch((error) => {
    
      console.error("Error signing out:", error);
    });
}




    const authinfo ={
        rigisterEmailpass,
        GoogleLogin,
        user,
        loginUser,
        handleSignOut,
        updateUser,
        setloding,
        setlocation,
        setUser,
        loding,
        setDarkMode,
        darkMode
       
    }

    return (
        <div>
            <AuthContext.Provider value={authinfo}>
                {
                    children
                }
            </AuthContext.Provider>
            
        </div>
    );
};

export default AugthProvider;