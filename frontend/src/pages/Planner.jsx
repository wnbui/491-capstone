import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, createTask, deleteTask as deleteTaskApi, updateTask, getProjects, createProject } from '../services/api';
import { Layout } from '../Layout';

export const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    date: '', 
    time: '', 
    project_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    initializePlanner();
  }, []);

  const initializePlanner = async () => {
    try {
      setLoading(true);
      
      let projectsList = await getProjects(token);

      if (projectsList.length === 0) {
        const newProject = await createProject({
          name: 'Personal Tasks',
          description: 'Personal tasks and reminders',
          status: 'active'
        }, token);
        projectsList = [newProject];
      }

      setProjects(projectsList);
      
      const personalProject = projectsList.find(p => p.name === 'Personal Tasks') || projectsList[0];
      setNewTask(prev => ({ ...prev, project_id: personalProject.id }));

      const tasksData = await getTasks(token);
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load planner');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.title || !newTask.project_id) {
      setError('Please enter a title and select a project');
      return;
    }

    try {
      const taskData = {
        title: newTask.title,
        description: newTask.date && newTask.time ? `${newTask.date} ${newTask.time}` : '',
        status: 'todo',
        points: 1,
        project_id: parseInt(newTask.project_id)
      };

      const createdTask = await createTask(taskData, token);
      setTasks([createdTask, ...tasks]);
      setNewTask({ 
        title: '', 
        date: '', 
        time: '', 
        project_id: newTask.project_id
      });
      setError('');
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus }, token);
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'in_review': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  return (
    <Layout pageTitle="PLANNER">
      <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
        <div style={{ flex: 2 }}>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=aee1ab8ca0a32881ca56e0627e999f62027e86fa4b149c20b15c777dfaa35a28%40group.calendar.google.com&ctz=America%2FLos_Angeles"
            title="Planner Calendar"
            style={{
              border: '1px solid black',
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
            frameBorder="0"
          ></iframe>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            overflow: 'auto',
            borderRadius: '8px'
          }}
        >
          <h3 style={{ marginBottom: '10px', color: 'black' }}>Tasks</h3>

          {error && (
            <div style={{ 
              backgroundColor: '#f44336', 
              color: 'white', 
              padding: '8px', 
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              {error}
            </div>
          )}

          <div
            style={{
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '1px solid #ccc'
            }}
          >
            <input
              type="text"
              placeholder="Task title *"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '8px',
                border: '1px solid black',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />

            <select
              value={newTask.project_id}
              onChange={(e) => setNewTask({ ...newTask, project_id: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '8px',
                border: '1px solid black',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Project *</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
              <input
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid black',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid black',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              onClick={addTask}
              disabled={!newTask.project_id || !newTask.title}
              style={{
                width: '100%',
                padding: '10px',
                cursor: (newTask.project_id && newTask.title) ? 'pointer' : 'not-allowed',
                backgroundColor: (newTask.project_id && newTask.title) ? '#4CAF50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Add Task
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                No tasks yet. Add your first task!
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: '10px',
                    marginBottom: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '5px'
                  }}>
                    {task.title}
                  </div>
                  
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '5px',
                    fontStyle: 'italic'
                  }}>
                    📁 {getProjectName(task.project_id)}
                  </div>

                  {task.description && (
                    <div style={{
                      fontSize: '12px',
                      color: 'black',
                      marginBottom: '8px'
                    }}>
                      📅 {task.description}
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
                  }}>
                    <select
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        backgroundColor: getStatusColor(task.status),
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="in_review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        marginLeft: 'auto',
                        fontSize: '12px',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};