import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";
import "../api/tasksMethods";
import { useSnackbar } from "./SnackbarContext";

import Button from "@mui/material/Button";

export const TaskForm = () => {
  const [text, setText] = useState("");
  const { addSnackbarMessage } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      text: text.trim(),
      createdAt: new Date(),
    });

    setText("");
    addSnackbarMessage("Task added successfully");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Add Task
      </Button>
    </form>
  );
};
