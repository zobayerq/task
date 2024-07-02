import { toast } from "react-toastify";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useState } from "react";
import { Link } from "react-router-dom";



const ManageTaskSub = ({task ,refetch }) => {
    const [openModal, setOpenModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const AxiosCommon = useAxiosCommon();
  const toggleTaskCompletion = async () => {
    try {
            if (!task.completed) {
                await AxiosCommon.put(`/tasks/toggle/${task._id}`, { completed: true })
                refetch()
                toast.success("updating task Status Completed   ", { position: "top-center" });
            }
            else{
                await AxiosCommon.put(`/tasks/toggle/${task._id}`, { completed: null })
                refetch()
                toast.success("updating task Status not Completed   ", { position: "top-center" });
       
            }
    } catch (error) {
      console.error('Error updating task:', error);
    }

  };




    // Handle user deletion
    const handleDelete = () => {
        // console.log('call delet');
        // console.log(itemToDelete);
    
            console.log('dokse');
          AxiosCommon.delete(`/tasks/delete/${task._id}`)
            .then((res) => {
              refetch();
              toast.success("Task deleted successfully!", { position: "top-center" });
              closeModal();
            })
            .catch((err) => {
              console.error(err);
            });
      
      };


      // Open modal for delete confirmation
      const openModall = (id) => {
        setItemToDelete(id);
        document.getElementById('delete_modal').showModal();
    };

    // Close modal
    const closeModal = () => {
        setItemToDelete(null);
        document.getElementById('delete_modal').close();
    };
    return (
        <div  className="bg-white shadow-md rounded-md p-4 flex justify-between pr-7">
      <div className="">
      <h2 className="text-lg font-bold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className={`text-sm font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
          Status: {task.completed ? 'Completed' : 'Not Completed'}
          <button onClick={toggleTaskCompletion} className="ml-2 text-blue-600">Toggle</button>
        </p>
      </div>
        <div className="flex gap-5 items-center ">
                       <Link to={`/ManageTask/update/${task._id}`}> <button
                       
                       className="flex h-12 w-12 justify-center items-center bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                   >
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-6 w-6"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                           strokeWidth="2"
                       >
                           <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                           />
                       </svg>
                   </button></Link>
                        <button
                            className="flex h-12 w-12 justify-center items-center bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-700 transition-all duration-300 text-white"
                            onClick={() => openModall(task._id)}
                        >
                            <img
                                className="h-7 w-7"
                                src="https://i.ibb.co/mt2k0Sr/delete.png"
                                alt=""
                            />
                        </button>
                    </div>
                    <dialog id="delete_modal" className="modal ">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">Are you sure you want to delete this Task?</p>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={handleDelete}>
                            Yes
                        </button>
                        <button className="btn btn-error" onClick={closeModal}>
                            No
                        </button>
                    </div>
                </div>
            </dialog>
                    
      </div>
    );
};

export default ManageTaskSub;