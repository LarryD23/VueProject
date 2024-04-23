import axios from 'axios';

const getTasks = async function() {
    const response = await axios.get('http://localhost:8888/tasks');
    return response.data; // make sure to return the tasks
  }

  const deleteTask = async function (taskId) {
    try {
      await axios.delete(`http://localhost:8888/tasks/${taskId}`);
      // No need to manipulate the tasks array here; handle it in the component
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error; // Re-throw the error to handle it elsewhere
    }
  };

  const addTasks = async function (taskData) {
    try {
      const response = await axios.post('http://localhost:8888/tasks', taskData);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error adding task:', error);
      throw error; // Re-throw the error to handle it elsewhere
    }
  };
  

export const data = {
    getTasks, addTasks, deleteTask

    
};