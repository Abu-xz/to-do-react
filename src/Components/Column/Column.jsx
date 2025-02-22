import PropTypes from "prop-types";
import "./Column.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";



function Column({ tasks, removeTask, updateTitle }) {
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            key={task.id}
            removeTask={removeTask}
            updateTitle={updateTitle}
          />
        ))}
      </SortableContext>
    </div>
  );
}

Column.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  removeTask: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
};

// ✅ Prevents `undefined` errors
Column.defaultProps = {
  tasks: [],
};

export default Column;
