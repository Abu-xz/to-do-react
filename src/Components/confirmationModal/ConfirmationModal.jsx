import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./ConfirmationModal.css";
import PropTypes from "prop-types";

function ConfirmationModal({ warning, cancelRemove, deleteTask }) {
  return (
    warning && (
      <div className="confirm-container">
        <div className="confirm-wrapper">
          <div className="warning-icon">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ color: "#ff0000" }}
            />
          </div>
          <div className="warning-text">
            <h2>Delete Task</h2>
            <p>Are you sure to remove task?</p>
          </div>
          <div className="warning-button">
            <button className="cancel-button" onClick={cancelRemove}>
              Cancel
            </button>
            <button className="delete-button" onClick={deleteTask}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

ConfirmationModal.propTypes = {
  warning: PropTypes.bool,
  cancelRemove: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default ConfirmationModal;
