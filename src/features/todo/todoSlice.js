// todoSlice.js (Redux slice)

import { createSlice } from "@reduxjs/toolkit";
import {
  createTaskApi,
  fetchTasksApi,
  updateTaskApi,
  deleteTaskApi,
} from "../../utility/api.js";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    createTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createTaskStart,
  createTaskSuccess,
  createTaskFailure,
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
} = todoSlice.actions;

export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch(createTaskStart());
    const newTask = await createTaskApi(taskData);
    dispatch(createTaskSuccess(newTask));
  } catch (error) {
    dispatch(createTaskFailure(error.message));
    console.log("Error in creating the Task");
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(fetchTasksStart());
    const tasks = await fetchTasksApi();
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  try {
    dispatch(updateTaskStart());
    const updatedTask = await updateTaskApi(taskId, updatedTaskData);
    
    dispatch(updateTaskSuccess(updatedTask));
    // dispatch(fetchTasks());
  } catch (error) {
    dispatch(updateTaskFailure(error.message));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(deleteTaskStart());
    await deleteTaskApi(taskId);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.message));
  }
};

export default todoSlice.reducer;
