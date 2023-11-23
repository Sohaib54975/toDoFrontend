import ToDoApp from "./ToDoApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ToDoApp />} />
          <Route path="/add-task-show-model" element={<AddTaskModal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
