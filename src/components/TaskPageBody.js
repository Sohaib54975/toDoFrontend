import React, { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdHistory } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, updateTask } from "../features/todo/todoSlice";
function TaskPage() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
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
  const [taskID, setTaskID] = useState("");
  
  const handleEdit = (taskId) => {
    setShow(true);
    setTaskID(taskId);
    console.log("-----", taskId);

    const selectedTask = tasks.find((task) => task.id === taskId);

    // Set the taskData state with the values of the selected task
    setTaskData({
      name: selectedTask.name,
      status: selectedTask.status,
      priority: selectedTask.priority,
      disc: selectedTask.disc,
      startDate: selectedTask.startDate,
      dueDate: selectedTask.dueDate,
      tags: selectedTask.tags,
      attachment: selectedTask.attachment,
    });
  };
  const handleUpdate = () => {
    console.log("In handleUpdate taskid ", taskID);
    console.log("handleUpdate taskData ", taskData);
    dispatch(updateTask(taskID, taskData));

    setShow(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };
  const [allTasks, setAllTasks] = useState([]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    setAllTasks(allTasks.filter((task) => task.id !== taskId));
  };

  const handleHistory = () => {};
  const tasks = useSelector((state) => state.toDo.tasks.allTaskData);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagChange = (tags) => {
    if (selectedTag === tags) {
      setSelectedTag(null);
      setAllTasks(tasks);
    } else {
      setSelectedTag(tags);
      setAllTasks(tasks.filter((task) => task.tags === tags));
    }
  };

  console.log("task :: task ", tasks);

  return (
    <>
      <hr />
      <div className="tags_filter">
        <div className="hd">
          <p>Categorize Your Tasks Here:</p>
        </div>
        <div className="mx-3 tag">
          <label className="mx-3">Coding</label>
          <input
            type="checkbox"
            value="Coding"
            checked={selectedTag === "Coding"}
            onChange={() => handleTagChange("Coding")}
          />
        </div>
        <div className="mx-3 tag">
          <label className="mx-3">Testing</label>
          <input
            type="checkbox"
            value="Testing"
            checked={selectedTag === "Testing"}
            onChange={() => handleTagChange("Testing")}
          />
        </div>
        <div className="mx-3 tag">
          <label className="mx-3">Designing</label>
          <input
            type="checkbox"
            value="Designing"
            checked={selectedTag === "Designing"}
            onChange={() => handleTagChange("Designing")}
          />
        </div>
      </div>

      <div className="col-11 mt-3 p-3 rounded task_page_body">
        <div className="task_hd d-flex">
          <div className=" fw-bold col-2">
            <p>Task Name</p>
          </div>
          <div className=" fw-bold col-1">
            <p>Priority</p>
          </div>
          <div className=" fw-bold col-1">
            <p>Start Date</p>
          </div>
          <div className=" fw-bold col-1">
            <p>End Date</p>
          </div>
          <div className=" fw-bold col-1">
            <p>Status</p>
          </div>
          <div className=" fw-bold col-2">
            <p>Description</p>
          </div>
          <div className=" fw-bold col-2">
            <p>Attachements</p>
          </div>
          <div className=" fw-bold col-1">
            <p>Operations</p>
          </div>
        </div>

        <hr />
        <div>
          {allTasks?.map((task) => (
            <div className="task_hd d-flex" key={task.id}>
              <div className="col-2">
                <p>{task.name}</p>
              </div>
              <div className="col-1">
                <p>{task.priority}</p>
              </div>
              <div className="col-1">
                <p>{task.startDate}</p>
              </div>
              <div className="col-1">
                <p>{task.dueDate}</p>
              </div>
              <div className="col-1">
                <p>{task.status}</p>
              </div>
              <div className="col-2">
                <p>{task.disc}</p>
              </div>
              <div className="col-2">
                <p>{task.attachment}</p>
              </div>
              <div className="col-1 ">
                <MdHistory
                  size={25}
                  onClick={handleHistory}
                  style={{ color: "#0d6efd", cursor: "pointer" }}
                />
                <MdOutlineModeEditOutline
                  className="ms-4"
                  size={25}
                  onClick={() => {
                    handleEdit(task.id);
                  }}
                  style={{ color: "#0d6efd", cursor: "pointer" }}
                />
                <MdDeleteOutline
                  size={25}
                  className="ms-4"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                  style={{ color: "#0d6efd", cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        dialogClassName="modal-90w"
        onSubmit={handleUpdate}
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
                  value={taskData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div class="m-3 col-2">
                <label>Status </label>
                <select
                  name="status"
                  class="form-select"
                  onChange={handleInputChange}
                  value={taskData.status}
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
                  value={taskData.priority}
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
                  value={taskData.disc}
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
                  value={taskData.startDate}
                />
              </div>
              <div class="m-3 col-2">
                <label>End Date</label>
                <input
                  name="dueDate"
                  type="date"
                  class="form-control"
                  onChange={handleInputChange}
                  value={taskData.dueDate}
                />
              </div>
              <div class="m-3 col-2">
                <label>Tags</label>
                <select
                  name="tags"
                  class="form-select"
                  onChange={handleInputChange}
                  value={taskData.tags}
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
                  // value={taskData.attachment}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" class="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskPage;
