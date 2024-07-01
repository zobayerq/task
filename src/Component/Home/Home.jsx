import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import TaskList from "../pages/TaskList/TaskList";




// import Title from "../Title/Title";





const Home = () => {


  return (
    <div>
      <Helmet>
        <title>HomeFixer || Home</title>
      </Helmet>

       <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Task Management Application</h1>
        <p className="text-lg mb-4">Welcome to our task management app. Manage your tasks efficiently!</p>
        <div className="flex space-x-4">
          <Link
           to={"/alltask"}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-lg font-semibold"
          >
            Go to Task List
          </Link>
          <Link
            to={"/AddContest"}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-lg font-semibold"
          >
            Add New Task
          </Link>
        </div>
      </div>
    </div>
  

     


     <TaskList></TaskList>
     
    
    </div>
  );
};

export default Home;
