"use client"
import { useEffect, useState } from 'react';

async function loadTask() {
  try {
    const res = await fetch('http://localhost:8000/api/tasks/');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const tasks = await res.json();
    return tasks;
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};

async function updateTask(id, newData) {
  try {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Update failed:', error);
    return false;
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
}

export default function ListTask() {
  const [tasks, setTasks] = useState(null);
  const [editableTaskId, setEditableTaskId] = useState(null); 
  const [newTaskData, setNewTaskData] = useState({ title: "", description: "" }); 

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await loadTask();
      setTasks(tasksData);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTask(id);
    if (success) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  const handleUpdate = async (id) => {
    const success = await updateTask(id, newTaskData);
    if (success) {
    
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, ...newTaskData } : task
      );
      setTasks(updatedTasks);
      setEditableTaskId(null);
    }
  };

  const handleCancelUpdate = () => {
    setEditableTaskId(null); 
  };

  return (
    <div className="bg-gray-200 p-7">
      <h2 className="text-black font-bold w-full">List Task</h2>
      {tasks === null ? (
        <p>Cargando tareas...</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="bg-slate-500 px-4 py-3">
            {editableTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={newTaskData.title}
                  onChange={e => setNewTaskData({ ...newTaskData, title: e.target.value })}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 mb-2 w-full text-gray-700"
                />
                <textarea
                  value={newTaskData.description}
                  onChange={e => setNewTaskData({ ...newTaskData, description: e.target.value })}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full text-gray-700"
                />
                <div className="flex justify-end mt-2">
                  <button onClick={() => handleUpdate(task.id)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
                    Actualizar
                  </button>
                  <button onClick={handleCancelUpdate} className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setEditableTaskId(task.id);
                      setNewTaskData({ title: task.title, description: task.description }); 
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Actualizar
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
  
};