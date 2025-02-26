import React from "react";
import { LoginForm } from "./LoginForm";

export const Home = ({ user }) => {
  // return <li>{task.text}</li>;
  return user != null ? (
    <div>
      <h1>Olá, {user.username}!</h1>
      <p>Seja bem-vindo ao To Do list app.</p>
    </div>
  ) : (
    <div>
      <h1>Olá!</h1>
      <p>Para acessar o To Do list app, faça login.</p>
      {/* <LoginForm /> */}
      <button
        onClick={() => window.location.replace("/login")}
        style={{
          backgroundColor: "grey",
          color: "black",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
};
