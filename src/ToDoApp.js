import React from "react";
import TaskPageHeader from "./components/TaskPageHeader";
import TaskPageBody from "./components/TaskPageBody";

function ToDoApp() {
  return (
    <>
      <div className="d-flex  align-items-center flex-column">
        <TaskPageHeader />
        <TaskPageBody />
      </div>
    </>
  );
}

export default ToDoApp;
