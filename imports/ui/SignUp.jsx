import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Accounts } from "meteor/accounts-base";

import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [error, setError] = useState("");
  const [base64_profile, setBase64_profile] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !password ||
      !birthdate ||
      !gender ||
      !enterprise
    ) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    //esqueleto do craeteUser
    // Accounts.createUser({
    //   username: username,
    //   email: email,
    //   password: password,
    //   profile: {
    //     //publicly visible fields like firstname goes here
    //   },
    // });

    Accounts.createUser(
      {
        username,
        email,
        password,
        profile: {
          birthdate,
          gender,
          enterprise,
          base64_profile,
        },
      },
      (err) => {
        if (err) {
          console.error("Erro ao criar o usuário: ", err.message);
        } else {
          console.log("Usuário criado com sucesso!");
          navigate("/home");
        }
      }
    );
  };

  const returnToLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 300, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Birthdate"
              type="date"
              fullWidth
              margin="normal"
              value={birthdate}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Enterprise"
              type="text"
              fullWidth
              margin="normal"
              value={enterprise}
              onChange={(e) => setEnterprise(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
            <Button fullWidth sx={{ mt: 2 }} onClick={returnToLogin}>
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
