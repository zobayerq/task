import useAxiosCommon from "../../hooks/useAxiosCommon";
import Lodar from "../../Lodar/Lodar";
import { useQuery } from "@tanstack/react-query";

const TaskList = () => {
  const AxiosCommon = useAxiosCommon();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await AxiosCommon(`/tasks`);
      return data;
    },
  });

  if (isLoading) {
    return <Lodar></Lodar>;
  }
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">{task.title}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <p
              className={`text-sm font-semibold ${
                task.completed ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {task.completed ? "Completed" : "Not Completed"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
