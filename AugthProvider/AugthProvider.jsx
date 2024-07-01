import {  createContext, useEffect, useState } from "react";
import {  GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import {  toast } from 'react-toastify';

export const AuthContext = createContext(null);
const AugthProvider = ({children}) => {
  // const location = useLocation()
  // const jabe = location?.state
  // console.log(jabe);

    const [user, setUser]= useState(null)
   
    const [location, setlocation]= useState(null)
    const [loding, setloding]= useState(true)


   
    console.log(location);


    
    const GoogleProvider = new GoogleAuthProvider();
    
    const githubprovider = new GithubAuthProvider();


   useEffect(()=> {
   const unsubscrib = onAuthStateChanged(auth, (user) => {
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
  // .then((result) => {
    
  //   toast.success("Login Successfull", {
  //     position: "top-center"
  //   });
   
  // })
  // .catch((error) => {
    
    
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   toast.error({errorMessage}, {
  //     position: "top-center"
  //   });
    
  //   // ...
  // });
  

}


const githubLogin = () => {
  setloding(true)
  return signInWithPopup(auth, githubprovider)
//   .then((result) => {
//     toast.success("Login Successfull", {
//       position: "top-center"
//     })
   
//   })
//   .catch((error) => {
    
    
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     toast.error({errorMessage}, {
//       position: "top-center"
//     });
    
//     // ...
//   });

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









function handleSignOut() {

  signOut(auth)
    .then(() => {
     
      toast.error("Sign-out successful.", {
        position: "top-left"
      });

      setloding(false)
      setUser(null)
      
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
        githubLogin,
        setlocation,
        setUser,
        loding
       
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