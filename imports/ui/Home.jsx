import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const Home = () => {
  // return <li>{task.text}</li>;
  return (
    <div>
      <h1>Olá! {user.username}</h1>
      <p>Para acessar o To Do list app, faça login.</p>
      {/* <LoginForm /> */}
      <button
        onClick={() => window.location.replace("/login")}
        className="login-form"
        type="submit"
      >
        Login
      </button>

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#cfe8fc", padding: 2 }}>
            <p>Mensagem de teste</p>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};
