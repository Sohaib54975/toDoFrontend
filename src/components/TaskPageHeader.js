import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function TaskPageHeader() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate(); 

  const showModelHandler = () => {
    navigate("/add-task-show-model")
  };

  return (
    <>
      <div className="d-flex justify-content-between  align-items-center col-11 mt-5 p-3 rounded task_page_header">
        <div>
          <p className="m-0 fs-3 fw-bold">To Do App</p>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary fw-bold"
            onClick={showModelHandler} >
            Add Task
            <span className="ms-3">
              <IoIosAddCircleOutline size={30} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskPageHeader;
