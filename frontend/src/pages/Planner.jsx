import { Layout } from '../Layout';
import { useState } from 'react';

export const Planner = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Meeting with team', date: '2025-10-15', time: '10:00 AM' },
    { id: 2, title: 'Project deadline', date: '2025-10-18', time: '5:00 PM' },
    { id: 3, title: 'Review documents', date: '2025-10-20', time: '2:00 PM' }
  ]);

  const [newTask, setNewTask] = useState({ title: '', date: '', time: '' });

  const addTask = () => {
    if (newTask.title && newTask.date) {
      setTasks([...tasks, { id: Math.random(), ...newTask }]);
      setNewTask({ title: '', date: '', time: '' });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Layout pageTitle="PLANNER">
      <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
        <div style={{ flex: 2 }}>
          <iframe 
            src="https://calendar.google.com/calendar/embed?src=aee1ab8ca0a32881ca56e0627e999f62027e86fa4b149c20b15c777dfaa35a28%40group.calendar.google.com&ctz=America%2FLos_Angeles" 
            style={{ border: '1px solid black', width: '100%', height: '100%' }} 
            frameBorder="0">
          </iframe>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid black', padding: '10px', backgroundColor: '#f9f9f9', overflow: 'auto' }}>
          <h3 style={{ marginBottom: '10px', color:'black'}}>Tasks</h3>
          
          <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{ width: '100%', padding: '5px', marginBottom: '5px', border: '1px solid black' }}
            />
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              style={{ width: '100%', padding: '5px', marginBottom: '5px', border: '1px solid black' }}
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              style={{ width: '100%', padding: '5px', marginBottom: '5px', border: '1px solid black' }}
            />
            <button onClick={addTask} style={{ width: '100%', padding: '8px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
              Add Task
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ padding: '10px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{task.title}</div>
                <div style={{ fontSize: '12px', 
                color: 'black', marginBottom: '3px' }}>{task.date} {task.time}</div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  style={{ fontSize: '12px', padding: '3px 8px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};