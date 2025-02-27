import React from "react";
import Button from "@mui/material/Button";

export const Task = ({ username, task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>
        <h3>{task.text}</h3>
      </span>
      <p style={{ marginRight: "15px" }}>
        {username}
        {"  "}
      </p>
      {/* <button onClick={() => onDeleteClick(task)}>&times;</button> */}
      <Button variant="contained" onClick={() => onDeleteClick(task)}>
        &times;
      </Button>
    </li>
  );
};
