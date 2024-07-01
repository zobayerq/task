import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const Addtask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, formData);

      if (response.status === 200) {
        toast.success('Task added successfully');
        setFormData({ title: '', description: '', completed: false }); // Reset form fields
      } else {
        toast.error('Error adding task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('An error occurred while adding the task.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add/Edit Task</h1>
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
            className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="form-checkbox h-6 w-6 text-indigo-600"
          />
          <label htmlFor="completed" className="ml-2 text-sm font-medium text-gray-700">
            Completed
          </label>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default Addtask;
