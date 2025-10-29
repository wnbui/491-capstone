import { Layout } from '../Layout';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, updateTask, deleteTask as deleteTaskApi } from '../services/api';

export const ProjectManager = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    done: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const allTasks = await getTasks(token);
      
      // Group tasks by status - treat in_review as in_progress
      const grouped = {
        todo: allTasks.filter(t => t.status === 'todo'),
        in_progress: allTasks.filter(t => t.status === 'in_progress' || t.status === 'in_review'),
        done: allTasks.filter(t => t.status === 'done')
      };
      
      setTasks(grouped);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { status: newStatus }, token);
      
      // Update local state
      const allTasks = Object.values(tasks).flat();
      const taskToMove = allTasks.find(t => t.id === taskId);
      
      if (taskToMove) {
        const oldColumn = taskToMove.status === 'todo' ? 'todo' : 
                         taskToMove.status === 'done' ? 'done' : 'in_progress';
        const newColumn = newStatus === 'todo' ? 'todo' : 
                         newStatus === 'done' ? 'done' : 'in_progress';
        
        setTasks({
          ...tasks,
          [oldColumn]: tasks[oldColumn].filter(t => t.id !== taskId),
          [newColumn]: [...tasks[newColumn], { ...taskToMove, status: newStatus }]
        });
      }
    } catch (err) {
      setError('Failed to move task');
      console.error(err);
    }
  };

  const removeTask = async (taskId, column) => {
    try {
      await deleteTaskApi(taskId, token);
      setTasks({
        ...tasks,
        [column]: tasks[column].filter(t => t.id !== taskId)
      });
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const renderColumn = (columnKey, title) => (
    <div style={{ 
      flex: 1, 
      border: '2px solid black', 
      padding: '10px', 
      minHeight: '400px',
      backgroundColor: '#fafafa',
      borderRadius: '8px'
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        {title} ({tasks[columnKey].length})
      </h3>
      
      <div style={{ marginBottom: '10px' }}>
        {tasks[columnKey].map(task => (
          <div 
            key={task.id} 
            style={{ 
              marginBottom: '10px', 
              padding: '10px', 
              backgroundColor: 'white', 
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '5px',
              fontSize: '14px'
            }}>
              {task.title}
            </div>
            
            {task.description && (
              <div style={{ 
                fontSize: '12px', 
                color: '#666',
                marginBottom: '8px'
              }}>
                {task.description}
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              gap: '5px',
              flexWrap: 'wrap',
              marginTop: '8px'
            }}>
              {columnKey !== 'todo' && (
                <button 
                  onClick={() => moveTask(task.id, 'todo')}
                  style={{ 
                    fontSize: '11px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    backgroundColor: '#9E9E9E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px'
                  }}
                >
                  ← To Do
                </button>
              )}
              
              {columnKey !== 'in_progress' && (
                <button 
                  onClick={() => moveTask(task.id, 'in_progress')}
                  style={{ 
                    fontSize: '11px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    backgroundColor: '#FF9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px'
                  }}
                >
                  → In Progress
                </button>
              )}
              
              {columnKey !== 'done' && (
                <button 
                  onClick={() => moveTask(task.id, 'done')}
                  style={{ 
                    fontSize: '11px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px'
                  }}
                >
                  ✓ Finished
                </button>
              )}
              
              <button 
                onClick={() => removeTask(task.id, columnKey)}
                style={{ 
                  marginLeft: 'auto',
                  fontSize: '11px',
                  padding: '4px 8px',
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
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout pageTitle="PROJECT MANAGER">
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading tasks...</div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="PROJECT MANAGER">
      {error && (
        <div style={{ 
          backgroundColor: '#f44336', 
          color: 'white', 
          padding: '10px', 
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'space-around', 
        width: '100%',
        overflowX: 'auto'
      }}>
        {renderColumn('todo', 'To Do')}
        {renderColumn('in_progress', 'In Progress')}
        {renderColumn('done', 'Finished')}
      </div>
    </Layout>
  );
};