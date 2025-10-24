import { Layout } from '../Layout';
import { useState } from 'react';

export const ProjectManager = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' }
    ],
    inProgress: [
      { id: 3, name: 'Task 3' }
    ],
    finished: [
      { id: 4, name: 'Task 4' }
    ]
  });

  const [newTask, setNewTask] = useState({ todo: '', inProgress: '', finished: '' });

  const addTask = (column) => {
    if (newTask[column].trim() === '') return;
    
    const newId = Math.max(...Object.values(tasks).flat().map(t => t.id)) + 1;
    setTasks({
      ...tasks,
      [column]: [...tasks[column], { id: newId, name: newTask[column] }]
    });
    setNewTask({ ...newTask, [column]: '' });
  };

  const removeTask = (column, id) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter(t => t.id !== id)
    });
  };

  return (
    <Layout pageTitle="PROJECT MANAGER">
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', width: '100%' }}>
        {/* To Do Column */}
        <div style={{ flex: 1, border: '2px solid black', padding: '10px', minHeight: '300px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>To Do</h3>
          <div style={{ marginBottom: '10px' }}>
            {tasks.todo.map(task => (
              <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
                <span>{task.name}</span>
                <button onClick={() => removeTask('todo', task.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="text"
              placeholder="New task"
              value={newTask.todo}
              onChange={(e) => setNewTask({ ...newTask, todo: e.target.value })}
              style={{ flex: 1, padding: '5px', border: '1px solid black' }}
            />
            <button onClick={() => addTask('todo')} style={{ padding: '5px 10px', cursor: 'pointer' }}>+ Add</button>
          </div>
        </div>

        {/* In Progress Column */}
        <div style={{ flex: 1, border: '2px solid black', padding: '10px', minHeight: '300px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>In Progress</h3>
          <div style={{ marginBottom: '10px' }}>
            {tasks.inProgress.map(task => (
              <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
                <span>{task.name}</span>
                <button onClick={() => removeTask('inProgress', task.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="text"
              placeholder="New task"
              value={newTask.inProgress}
              onChange={(e) => setNewTask({ ...newTask, inProgress: e.target.value })}
              style={{ flex: 1, padding: '5px', border: '1px solid black' }}
            />
            <button onClick={() => addTask('inProgress')} style={{ padding: '5px 10px', cursor: 'pointer' }}>+ Add</button>
          </div>
        </div>

        {/* Finished Column */}
        <div style={{ flex: 1, border: '2px solid black', padding: '10px', minHeight: '300px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Finished</h3>
          <div style={{ marginBottom: '10px' }}>
            {tasks.finished.map(task => (
              <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
                <span>{task.name}</span>
                <button onClick={() => removeTask('finished', task.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="text"
              placeholder="New task"
              value={newTask.finished}
              onChange={(e) => setNewTask({ ...newTask, finished: e.target.value })}
              style={{ flex: 1, padding: '5px', border: '1px solid black' }}
            />
            <button onClick={() => addTask('finished')} style={{ padding: '5px 10px', cursor: 'pointer' }}>+ Add</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};