import { useState } from "react";
import PropTypes from "prop-types";
import "./Input.css";
const Input = ({ onSubmit, errorMessage, clearTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };



  return (
    <div className="container">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit} className="button">
          Add
        </button>
         <button onClick={clearTask} className="button">
          clear
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};


Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  clearTask: PropTypes.func
};

export default Input;
