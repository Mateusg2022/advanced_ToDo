import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";
import "../api/tasksMethods";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { useTracker } from "meteor/react-meteor-data";

import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const user = useTracker(() => Meteor.user());

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/newTask");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      user: user.username,
      text: text.trim(),
      //aqui eu posso criar um campo description para a descrião da tarefa e acessa-lo na pagina de ediçao
      description: description.trim(),
      situation: status,
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /> */}
      <TextField
        id="outlined-required"
        type="text"
        placeholder="Type to add new tasks"
        label="Required"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <TextField
        id="outlined"
        type="text"
        placeholder="Type to add a task's description "
        label="Task's description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Add Task
      </Button>
      <Button variant="contained" onClick={() => handleClick()}>
        Create New Task
      </Button>
    </form>
  );
};
