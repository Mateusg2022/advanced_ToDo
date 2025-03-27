import React, { Fragment, useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../api/TasksCollection";

import { useNavigate } from "react-router-dom";

import { Button, Container } from "@mui/material";

//useParams é um hook para conseguir acessar um valor de parametro da url. Em App.jsx, o caminho esta como Edit/:id
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

export const EditTask = () => {
  const { id } = useParams();
  const user = useTracker(() => Meteor.user());

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Cadastrada");
  const [errorMessage, setErrorMessage] = useState("");
  const [restricao, setRestricao] = useState("Aberta");

  const task = useTracker(() => TasksCollection.findOne({ _id: id }), [id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDescription(task.description);
      setStatus(task.situation || "Cadastrada");
      setRestricao(task.restrict);
    }
  }, [task]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (newStatus === "Concluída" && status !== "Em Andamento") {
      console.log(
        "Não é possível marcar uma tarefa como 'Concluída' se seu status for diferente de 'Em Andamento'."
      );
      setErrorMessage(
        "Não é possível marcar uma tarefa como 'Concluída' se seu status for diferente de 'Em Andamento'."
      );
      return;
    } else if (newStatus == "Em Andamento" && status !== "Cadastrada") {
      console.log(
        "Não é possível marcar uma tarefa como 'Em Andamento' se seu status for diferente de 'Cadastrada'."
      );
      setErrorMessage(
        "Não é possível marcar uma tarefa como 'Em Andamento' se seu status for diferente de 'Cadastrada'."
      );
      setStatus("Cadastrada");
      return;
    } else {
      setErrorMessage("");
      setStatus(newStatus);
    }
    setStatus(newStatus);
  };

  const handleRestrictChange = (event) => {
    if (event.target.value == "Pessoal") setRestricao("Pessoal");
    else setRestricao("Aberta");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    if (status === "Concluída" && task.situation !== "Em Andamento") {
      console.log(
        "Não é possível marcar uma tarefa como 'Concluída' se seu status anterior não for 'Em Andamento'."
      );
      setErrorMessage(
        "Não é possível marcar uma tarefa como 'Concluída' se seu status anterior não for 'Em Andamento'."
      );
      return;
    }

    await Meteor.callAsync("tasks.update", {
      _id: id,
      user: user.username,
      newText: text.trim(),
      newDescription: description.trim(),
      newSituation: status,
      newRestrict: restricao,
    });

    setText("");
    setDescription("");

    if (!task) {
      return <div>Loading...</div>;
    }

    navigate("/tasks");
  };

  const handleClick = () => {
    navigate("/tasks");
  };

  return (
    <Container
      maxWidth="xl"
      // style={{ display: "flex", justifyContent: "center" }}
    >
      <Fragment>
        <form
          className="task-form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "left",
            flexDirection: "column",
            gap: "10px",
            marginLeft: "25px",
          }}
        >
          <div>
            <h2> Edição </h2>
            {/**FormControl*/}
            <FormControl
              sx={{ width: "150px", marginRight: "10px" }}
              error={!!errorMessage}
            >
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Categoria"
                onChange={handleStatusChange}
                renderValue={(value) =>
                  errorMessage ? `⚠️  - ${value}` : value
                }
              >
                <MenuItem value="Cadastrada">Cadastrada</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="Concluída">Concluída</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "150px" }}>
              <InputLabel id="demo-simple-select-label">Restrição:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={restricao}
                label="Categoria"
                onChange={handleRestrictChange}
              >
                <MenuItem value="Aberta">Aberta</MenuItem>
                <MenuItem value="Pessoal">Pessoal</MenuItem>
              </Select>

              {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
          </div>
          {/** */}
          <Divider variant="middle" style={{ width: "670px" }} />
          <TextField
            type="text"
            id="filled-multiline-flexible"
            label="Task"
            value={text}
            placeholder="Task Title"
            multiline
            maxRows={4}
            variant="filled"
            onChange={(e) => setText(e.target.value)}
            sx={{ width: "700px" }}
          />
          <TextField
            type="text"
            id="filled-textarea"
            label="Task's Description"
            value={description}
            placeholder="Description"
            multiline
            rows={4}
            variant="filled"
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: "700px" }}
          />

          <Button variant="contained" type="submit" sx={{ width: "120px" }}>
            Edit Task
          </Button>
          <Button size="small" onClick={handleClick} sx={{ width: "120px" }}>
            Cancelar
          </Button>
        </form>
      </Fragment>
    </Container>
  );
};

{
  /**
  <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Situação</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={status}
          name="radio-buttons-group"
          onChange={handleStatusChange}
        >
          <FormControlLabel
            value="Cadastrada"
            control={<Radio />}
            label="Cadastrada"
          />
          <FormControlLabel
            value="Em Andamento"
            control={<Radio />}
            label="Em Andamento"
          />
          <FormControlLabel
            value="Concluída"
            control={<Radio />}
            label="Concluída"
          />
        </RadioGroup>
      </FormControl> */
}
