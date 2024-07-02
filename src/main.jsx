import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Component/Root/Root';
import Home from './Component/Home/Home';
import Dashbord from './Component/Dashbord/Dashbord';


import ManageUser from './Component/AdminComponent/Pages/ManageUser/ManageUser';

import Login from './Component/Login/Login';
import Registation from './Component/Registation/Registation';
import Error from './Component/Error/Error';
import AugthProvider from './Component/AugthProvider/AugthProvider';

import { HelmetProvider } from 'react-helmet-async';


import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'


import { ToastContainer } from 'react-toastify';

import Addtask from './Component/AdminComponent/Pages/Addtask/Addtask';
import TaskList from './Component/pages/TaskList/TaskList';
import ManageTask from './Component/AdminComponent/Pages/ManageTask/ManageTask';
import UpdateTask from './Component/pages/UpdateTask/UpdateTask';


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/Rejistition",
        element:<Registation></Registation>,
      },
      {
        path: "/alltask",
        element:<TaskList></TaskList>,
      },
     
      {
        path: "/AddContest",
        element: <Addtask></Addtask>,
      },
     
      {
        path: "/ManageTask",
        element: <ManageTask></ManageTask>,
      },
     
      {
        path: "/ManageTask/update/:id",
        element: <UpdateTask></UpdateTask>,
      },
     
      
    
      
     
    
   
    
     
     
     
    ],
    errorElement: <Error></Error>,
  },
  {
    path: "/dashboard",
    element:<Dashbord></Dashbord>,
    children: [
      // {
      //   index: true,
      //   element: <AdminHome></AdminHome>,
      // },
   
      {
        path: "AddContest",
        element: <Addtask></Addtask>,
      },
      
    
      
    
    
      ////-----------Admin---------
      {
        path: "ManageUser",
        element:<ManageUser></ManageUser>,
      },
     
     


      ///----------user ---------
     
     
    
  
     
     
    ],
    errorElement: <Error></Error>,
  },


 





]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <AugthProvider>
    <ToastContainer /> 
     <RouterProvider router={router} />
     
    </AugthProvider>
    </QueryClientProvider>
    </HelmetProvider>
   
    
  </React.StrictMode>,
)
