import { toast } from "react-toastify";
import useAxiosCommon from "../../../hooks/useAxiosCommon";



const ManageTaskSub = ({task ,refetch }) => {
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
    return (
        <div  className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-bold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className={`text-sm font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
          Status: {task.completed ? 'Completed' : 'Not Completed'}
          <button onClick={toggleTaskCompletion} className="ml-2 text-blue-600">Toggle</button>
        </p>
      </div>
    );
};

export default ManageTaskSub;