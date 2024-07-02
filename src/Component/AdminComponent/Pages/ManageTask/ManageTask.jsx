// import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import Lodar from '../../../Lodar/Lodar';
import ManageTaskSub from './ManageTaskSub';

const ManageTask = () => {
  const AxiosCommon = useAxiosCommon();



  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await AxiosCommon(`/tasks`);
      return data;
    },
  });


  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await AxiosCommon.get('/tasks');
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // const toggleTaskCompletion = async (taskId) => {
  //   try {
  //     await AxiosCommon.put(`/tasks/toggle/${taskId}`, { completed: true });
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //   }
  // };

  if (isLoading) {
    return <Lodar />;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <ManageTaskSub key={task._id} task={task} refetch={refetch}  ></ManageTaskSub>
        ))}
      </div>
    </div>
  );
};

export default ManageTask;
