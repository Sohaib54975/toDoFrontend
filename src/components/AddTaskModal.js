import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/todo/todoSlice";
function AddTaskModal() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const [taskData, setTaskData] = useState({
    name: "",
    status: "",
    priority: "",
    disc: "",
    startDate: "",
    dueDate: "",
    tags: "",
    attachment: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Data is Submitted", taskData);
    dispatch(createTask(taskData));
    navigate("/");
  };

  console.log("taskData == ", taskData);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-90w"
        onSubmit={handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex ">
              <div class="m-3 col-2">
                <label>Task Name</label>
                <input
                  name="name"
                  type="text"
                  class="form-control"
                  // value={taskData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div class="m-3 col-2">
                <label>Status </label>
                <select
                  name="status"
                  class="form-select"
                  onChange={handleInputChange}
                >
                  <option select></option>
                  <option value="Completed">Completed</option>
                  <option value="InComplete">InComplete</option>
                </select>
              </div>
              <div class="m-3 col-2">
                <label>Priority Lavel</label>
                <select
                  name="priority"
                  class="form-select"
                  onChange={handleInputChange}
                >
                  <option select></option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div class="m-3 col-4">
                <label>Description</label>
                <textarea
                  name="disc"
                  class="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="d-flex">
              <div class="m-3 col-2">
                <label>Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  class="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div class="m-3 col-2">
                <label>End Date</label>
                <input
                  name="dueDate"
                  type="date"
                  class="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div class="m-3 col-2">
                <label>Tags</label>
                <select
                  name="tags"
                  class="form-select"
                  onChange={handleInputChange}
                >
                  <option select></option>
                  <option value="Coding">Coding</option>
                  <option value="Testing">Testing</option>
                  <option value="Designing">Designing</option>
                </select>
              </div>
              <div class="m-3 col-3">
                <label>Attachements</label>
                <input
                  name="attachment"
                  type="file"
                  class="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;
