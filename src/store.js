import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./features/todo/todoSlice";

const store = configureStore({
    reducer:{
        toDo:toDoReducer
    },
})

export default store    
