import React, { Fragment, useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../api/TasksCollection";

import { useNavigate } from "react-router-dom";

import { Button, Container } from "@mui/material";

//useParams é um hook para conseguir acessar um valor de parametro da url. Em App.jsx, o caminho esta como Edit/:id
import { useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const ViewTask = () => {
  const { id } = useParams();

  // const user = useTracker(() => Meteor.user());

  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Cadastrada");
  const [date, setDate] = useState("");

  const task = useTracker(() => TasksCollection.findOne({ _id: id }), [id]);

  const navigate = useNavigate();

  const handleEdit = (task) => {
    navigate(`/edit/${task._id}`);
  };

  const handleClick = () => {
    navigate("/tasks");
  };

  useEffect(() => {
    if (task) {
      setUser(task.user);
      setText(task.text);
      setDescription(task.description);
      setStatus(task.situation || "Cadastrada");
      setDate(task.createdAt.toLocaleDateString());
    }
  }, [task]);

  if (!task) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "35px",
          marginBottom: "35px",
        }}
      >
        <Fragment>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Criada por {user} em: {date}
                </Typography>
                <Typography variant="h5" component="div">
                  {text}
                  <br />
                </Typography>
                <Typography sx={{ color: "text.secondary", marginTop: "10px" }}>
                  {status}
                  <br />
                  <Divider variant="middle" />
                </Typography>
                <br />
                <Typography variant="body2">{description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Button size="small" onClick={handleClick}>
                  Back to Tasks
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Fragment>
      </Container>
    </Container>
  );
};
