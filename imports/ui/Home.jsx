import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { TasksCollection } from "../api/TasksCollection";
import { BorderTop } from "@mui/icons-material";

//DOCUMENTAÇAO DO MATERIAL UI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export const HomePage = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const [countCadastradas, setCountCadastradas] = useState(0);
  const [countAndamento, setCountAndamento] = useState(0);
  const [countConcluidas, setCountConcluidas] = useState(0);

  useEffect(() => {
    const cadastradas = tasks.filter(
      (task) =>
        (task.situation === "Cadastrada" && task.restrict === "Aberta") ||
        (user._id === task.userId && task.situation === "Aberta")
    ).length;
    const andamento = tasks.filter(
      (task) =>
        (task.situation === "Em Andamento" && task.restrict === "Aberta") ||
        (user._id === task.userId && task.situation === "Em Andamento")
    ).length;
    const concluidas = tasks.filter(
      (task) =>
        (task.situation === "Concluída" && task.restrict === "Aberta") ||
        (user._id === task.userId && task.situation === "Concluída")
    ).length;
    setCountCadastradas(cadastradas);
    setCountAndamento(andamento);
    setCountConcluidas(concluidas);
  }, [tasks]);

  const messages = [
    [`Total de tarefas cadastradas: ${countCadastradas}`],
    [`Total de tarefas concluídas: ${countConcluidas}`],
    [`Total de tarefas a serem concluídas: ${countAndamento}`],
    [`Visualizar Tarefas`],
  ];

  return (
    <Container>
      <div>
        <h1>
          {/* Olá! {String(user.username)} */}
          Olá! {`${user.username}`}
        </h1>
        <h3>Bem vindo(a) ao Todo App List.</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={24}>
              <Grid size={8}>
                <h2>
                  <Item>Total de tarefas cadastradas: ${countCadastradas}</Item>
                </h2>
              </Grid>
              <Grid container size={16}>
                <Grid size={12}>
                  <h2>
                    <Item>Total de tarefas concluídas: {countConcluidas} </Item>
                  </h2>
                </Grid>
              </Grid>
              <Grid size={8}>
                <Item>
                  <h2>Total de tarefas a serem concluídas: {countAndamento}</h2>
                </Item>
              </Grid>
              <Grid container columns={12} size={16}>
                <Grid size={6}>
                  <Item>
                    <h2>Visualizar Tarefas</h2>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Box> */}

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
          >
            {messages.map((message, index) => (
              <Grid
                key={index}
                size={{ xs: 2, sm: 4, md: 4 }}
                //somente a mensagem 'vizualizar tarefas' vai ter redirecionamento
                onClick={index === 3 ? () => navigate("/tasks") : undefined}
                sx={index === 3 ? { cursor: "pointer" } : {}}
              >
                <Item>
                  <h3>{message}</h3>
                </Item>
              </Grid>
            ))}
          </Grid>
        </div>

        {/*D:\ArquivosVSCODE\Synergia\treinamento\2fase\Todo_list\simple-todos-react\public\images*/}
        {/**/}
      </div>
    </Container>
  );
};
