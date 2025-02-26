import React from "react";
import { LoginForm } from "./LoginForm";

export const Home = () => {
  // return <li>{task.text}</li>;
  return (
    <div>
      <h1>Olá!</h1>
      <p>Para acessar o To Do list app, faça login.</p>
      {/* <LoginForm /> */}
      <button
        onClick={() => window.location.replace("/login")}
        className="login-form"
        type="submit"
      >
        Login
      </button>
    </div>
  );
};
