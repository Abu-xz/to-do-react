import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Task.css";

function Task({ id, title, updateTitle, removeTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
  };

  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = () => {
    updateTitle(id, newTitle);
    setIsEditing(!isEditing);
  };

  const toggleCompletion = () => {
    setIsComplete((prev) => !prev);
  };

  return (
    <div
      className="task"
      ref={setNodeRef}
      {...(!isEditing && attributes)} // Only apply attributes when not editing
      {...(!isEditing && listeners)} // Only apply listeners when not editing
      style={style}
    >
      <div className="task-items">
        <img
          className="check-box"
          src={isComplete ? "/checked.png" : "/unchecked.png"}
          alt="checkbox"
          style={{ cursor: "pointer" }}
          onPointerDown={toggleCompletion}
        />

        {isEditing ? (
          <>
            <input
              className="edit-input"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus // Automatically focus the input when editing
            />
          </>
        ) : (
          <span
            style={{
              textDecoration: isComplete ? "line-through" : "none",
              color: isComplete ? "#b7b7b7" : "#000",
            }}
          >
            {title}
          </span>
        )}
      </div>

      <div className="task-options">
        {isEditing ? (
          <button className="task-button" onPointerDown={handleUpdate}>
            ✅
          </button>
        ) : (
          <>
            <button
              className="task-button"
              onPointerDown={() => setIsEditing(!isEditing)}
            >
              ✏️
            </button>
            <button className="task-button" onPointerDown={() => removeTask(id)}>
              ❌
            </button>
          </>
        )}
      </div>
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

export default Task;