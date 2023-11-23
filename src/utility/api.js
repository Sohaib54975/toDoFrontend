const API_URL = "http://localhost:5000/";

export const createTaskApi = async (taskData) => {
  const response = await fetch(`${API_URL}task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

export const fetchTasksApi = async () => {
  const response = await fetch(`${API_URL}task`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

export const updateTaskApi = async (taskId, updatedTaskData) => {
  const response = await fetch(`${API_URL}task/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTaskData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
};

export const deleteTaskApi = async (taskId) => {
  const response = await fetch(`${API_URL}task/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};
