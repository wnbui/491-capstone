import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
const getAuthHeader = (token) => ({
  'x-access-token': token,
});

// Auth APIs
export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await api.get('/auth/me', {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const logoutUser = async (token) => {
  const response = await api.post('/auth/logout', {}, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

// Project APIs
export const getProjects = async (token) => {
  const response = await api.get('/projects', {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const getProject = async (projectId, token) => {
  const response = await api.get(`/projects/${projectId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const createProject = async (projectData, token) => {
  const response = await api.post('/projects', projectData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const updateProject = async (projectId, projectData, token) => {
  const response = await api.patch(`/projects/${projectId}`, projectData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const deleteProject = async (projectId, token) => {
  const response = await api.delete(`/projects/${projectId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const getProjectTasks = async (projectId, token) => {
  const response = await api.get(`/projects/${projectId}/tasks`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const getProjectPoints = async (projectId, token) => {
  const response = await api.get(`/projects/${projectId}/points`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

// Task APIs
export const getTasks = async (token, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.project_id) params.append('project_id', filters.project_id);
  
  const response = await api.get(`/tasks?${params.toString()}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const getTask = async (taskId, token) => {
  const response = await api.get(`/tasks/${taskId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const createTask = async (taskData, token) => {
  const response = await api.post('/tasks', taskData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const updateTask = async (taskId, taskData, token) => {
  const response = await api.patch(`/tasks/${taskId}`, taskData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const deleteTask = async (taskId, token) => {
  const response = await api.delete(`/tasks/${taskId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

// Event APIs
export const getEvents = async(token) => {
  const response = await api.get('/events', {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const getEvent = async(eventId, token) => {
  const response = await api.patch(`/events/${eventId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await api.post('/events', eventData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const updateEvent = async (eventId, eventData, token) => {
  const response = await api.patch(`/events/${eventId}`, eventData, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export const deleteEvent = async (eventId, token) => {
  const response = await api.delete(`/events/${eventId}`, {
    headers: getAuthHeader(token),
  });
  return response.data;
};

export default api;