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

import { Card, CardContent, Typography } from "@mui/material";

import { Accounts } from "meteor/accounts-base";

export const EditProfile = () => {
  const user = useTracker(() => Meteor.user());

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.emails?.[0]?.address || "");
  const [birthdate, setBirthdate] = useState(user.profile?.birthdate || "");
  const [gender, setGender] = useState(user.profile?.gender || "");
  const [enterprise, setEnterprise] = useState(user.profile?.enterprise || "");

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     setUsername(user.username || "");
  //     setEmail(user.emails?.[0]?.address || "");
  //     setBirthdate(user.profile?.birthdate || "");
  //     setGender(user.profile?.gender || "");
  //     setEnterprise(user.profile?.enterprise || "");
  //   }
  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await Meteor.callAsync("user.updateInfo", {
    //   newUsername: username.trim(),
    //   newEmail: email.trim(),
    //   newBirthdate: birthdate,
    //   newGender: gender,
    //   newEnterprise: enterprise.trim(),
    // });
    setEmail(email.trim());
    setEnterprise(enterprise.trim());

    await Meteor.callAsync(
      "user.updateInfo",
      username,
      email,
      birthdate,
      gender,
      enterprise
    );

    navigate("/profile");
  };

  return (
    <Container>
      {/*  style={{
       display: "column",
       justifyContent: "center",
       alignItems: "center",
       // height: "100vh",
     }}*/}
      <Typography variant="h5" gutterBottom>
        Informações do perfil
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          disabled
          fullWidth
          margin="normal"
          value={username}
          // onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={``}
              onChange={(e) => e}
            /> */}
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
            onChange={(e) => setGender(e.target.value)}
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
        <Typography color="error" variant="body2"></Typography>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Salvar
        </Button>
        <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/profile")}>
          Cancelar
        </Button>
      </form>
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
