export const BASE_URL = "http://localhost:9889/client/api/v1/";

export const apiList = {
  // AUTH APIS - Login , Register
  login: `${BASE_URL}auth/login`,
  register: `${BASE_URL}auth/register`,

  // Task
  createTask: `${BASE_URL}task/create`,
  getTaskById: (taskId) => `${BASE_URL}task/${taskId}`,
  getAllTask: `${BASE_URL}task/all`,
  updateTask: (taskId) => `${BASE_URL}task/update/${taskId}`,
  deleteTask: (taskId) => `${BASE_URL}task/delete/${taskId}`,
};
