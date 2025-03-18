import React, { useState } from "react";
// import { TasksCollection } from "../api/TasksCollection";
import "../api/tasksMethods";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

import { useTracker } from "meteor/react-meteor-data";

import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const CreateTask = () => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Cadastrada");

  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync("tasks.insert", {
      user: user.username,
      text: text.trim(),
      //aqui eu posso criar um campo description para a descrião da tarefa e acessa-lo na pagina de ediçao
      description: description.trim(),
      situation: status.trim(),
      createdAt: new Date(),
    });

    setText("");
    setDescription("");
    setStatus("Cadastrada");
    navigate("/tasks");
  };

  const handleClick = () => {
    navigate("/tasks");
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginLeft: "25px",
      }}
    >
      <h2> Criando nova Tarefa </h2>
      {/**FormControl*/}
      <FormControl sx={{ width: "150px" }}>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Categoria"
          onChange={handleStatusChange}
        >
          <MenuItem value="Cadastrada">Cadastrada</MenuItem>
          <MenuItem value="Em Andamento">Em Andamento</MenuItem>
          <MenuItem value="Concluída">Concluída</MenuItem>
        </Select>
      </FormControl>
      {/** */}
      <Divider variant="middle" />
      {/* <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /> */}
      <TextField
        id="outlined-required"
        type="text"
        placeholder="Type to add task's title"
        label="Required"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        sx={{ width: "700px" }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Descrição (opicional)"
        multiline
        rows={4}
        // defaultValue="Type to add a task's description"
        placeholder="Type to add a task's description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ width: "700px" }}
      />
      {/* <TextField
        id="outlined"
        type="text"
        placeholder="Type to add a task's description "
        label="Task's description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}

      <Button variant="contained" type="submit" sx={{ width: "150px" }}>
        Add new task
      </Button>
      <Button size="small" onClick={handleClick} sx={{ width: "150px" }}>
        Cancel
      </Button>
    </form>
  );
};
