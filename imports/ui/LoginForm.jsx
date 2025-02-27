import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

import Alert from "@mui/material/Alert";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error instanceof Meteor.Error) {
          console.error("Erro ao fazer login:", error.reason);
        } else {
          console.error("Erro ao fazer login:", error.message);
        }
      } else {
        console.log("Login bem-sucedido!");
        setLoginSuccess(true);
        setTimeout(() => {
          window.location.replace("/TasksPage");
        }, 2000);
      }
    });
  };

  return (
    <div>
      {loginSuccess && <Alert severity="success">Login bem-sucedido!</Alert>}
      <form onSubmit={submit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>

          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};
