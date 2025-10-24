import React, { useState, useEffect } from "react";
import axios from "axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // --- No changes to your logic, it's already correct ---
 const addTask = async () => {
    if (newTodo.trim() === "") {
      return;
    }
    const newTask = { task: newTodo };

    // --- ADD THIS TRY...CATCH BLOCK ---
    try {
      // 1. POST the new task
      await axios.post("http://localhost:3000/list", newTask, {
        headers: getAuthHeaders()
      });

      // 2. Re-fetch the list (this part is fine)
      const response = await axios.get("http://localhost:3000/list", {
        headers: getAuthHeaders()
      });
      setTodos(response.data);
      setNewTodo("");

    } catch (error) {
      // 3. This will now show you the error from the backend!
      console.error("Error adding task:", error.response.data);
      // You could also show an alert to the user here
    }
    // --- END OF BLOCK ---
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/list", {
        headers: getAuthHeaders()
      });
      setTodos(response.data);
    };
    fetchData();
  }, []);

  const deleteTask = async (removeIndex) => {
    await axios.delete(`http://localhost:3000/list/${removeIndex}`, {
        headers: getAuthHeaders()
      });
    let updatedTodo = todos.filter((todo) => todo._id !== removeIndex);
    setTodos(updatedTodo);
  };
  // --- End of logic section ---

  return (
    // Main container: Dark background, full screen, white text, padding
    <div className="bg-gray-900 min-h-screen text-white p-8">
      
      {/* Input section: Centered, with margin at the bottom */}
      <div className="flex justify-center items-center mb-8">
        <label className="text-lg font-semibold mr-4">Task :</label>
        <input
          type="text"
          className="p-2 bg-gray-700 text-white rounded-lg border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-purple-500" // Purple flair on focus
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        {/* Add Button: Purple flair */}
        <button
          className="mx-3 px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold 
                     hover:bg-purple-700 transition duration-200"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Todo List Container: Centered with a max width */}
      <div className="max-w-xl mx-auto">
        <ul className="space-y-3"> {/* Adds nice spacing between items */}
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <span className="text-lg">{todo.task}</span>
              <button
                className="bg-red-500 text-white font-bold py-1 px-3 rounded-full 
                           hover:bg-red-600 transition duration-200 text-sm"
                onClick={() => deleteTask(todo._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;