import { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./Components/Column/Column";
import Input from "./Components/Input/Input";
import ConfirmationModal from "./Components/confirmationModal/ConfirmationModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "clean kitchen" },
    { id: 2, title: "Hit the Gym" },
    { id: 3, title: "Walk the dog" },
  ]);

  const [error, setError] = useState("");
  const [warning, setWarning] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTasks = (title) => {
    if (title.length < 30) {
      setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
      setError("");
    } else {
      setError("Task title is too long...");
    }
  };

  const updateTitle = (id, newTitle) => {
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      );
    });
  };

  const removeTask = (id) => {
    setWarning(true);
    setTaskToDelete(id);
  };

  const deleteTask = () => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskToDelete);
    });
    setWarning(false);
    setTaskToDelete(null);
  };

  const cancelRemove = () => {
    setWarning(false);
    setTaskToDelete(null);
  };

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="app">
      <ConfirmationModal
        warning={warning}
        deleteTask={deleteTask}
        cancelRemove={cancelRemove}
      />
      <div className="wrapper">
        <div className="header">
          <h1>TO-DO LIST</h1>
          <img className="icon" src="./icon.png" alt="To-Do list icon"></img>
        </div>
        <Input onSubmit={addTasks} errorMessage={error} />
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          {tasks.length ? (
            <Column
              tasks={tasks}
              updateTitle={updateTitle}
              removeTask={removeTask}
            />
          ) : (
            <></>
          )}
        </DndContext>
      </div>
    </div>
  );
}

export default App;
