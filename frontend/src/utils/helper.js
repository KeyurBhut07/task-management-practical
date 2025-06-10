export const getToken = () => {
  const data = localStorage.getItem("task");
  return data ? JSON.parse(data).token : null;
};