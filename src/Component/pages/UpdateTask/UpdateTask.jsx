import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useParams } from "react-router";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const UpdateTask = () => {
  const AxiosCommon = useAxiosCommon();

    const Id =useParams()
   
    const taskId=Id.id;
    
  const [formData, setFormData] = useState({
    taskId: null,
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    if (taskId) {
      setFormData({ ...formData, taskId }); // Trigger useEffect to fetch task details
    }
  }, []);

  useEffect(() => {
    if (taskId) {
      AxiosCommon.get(`/tasks/${taskId}`)
        .then(response => {
          const { title, description, completed } = response.data;
          setFormData({ ...formData, title, description, completed });
        })
        .catch(error => {
          console.error('Error fetching task:', error);
          toast.error('Failed to fetch task details');
        });
    }
  }, [taskId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
        // Update existing task
        await AxiosCommon.put(`/tasks/update/${taskId}`, formData);
        toast.success('Task updated successfully');
  

    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{taskId ? 'Edit Task' : 'Add Task'}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input  p-4 border border-custom-bg mt-1 block w-full  rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea p-4 border border-custom-bg mt-1 block w-full  rounded-md shadow-sm"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={e => setFormData(prevState => ({ ...prevState, completed: e.target.checked }))}
            className="form-checkbox h-6 w-6 text-custom-bg"
          />
          <label htmlFor="completed" className="ml-2 text-sm font-medium text-gray-700">
            Completed
          </label>
        </div>
        <button
          type="submit"
          className="bg-custom-bg hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {taskId ? 'Update Task' : 'Save Task'}
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
