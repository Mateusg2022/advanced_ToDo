import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Container, Button } from "@mui/material";

import { TextField, Card, CardContent, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// Accounts.createUser(
//       {
//         username,
//         email,
//         password,
//         profile: {
//           birthdate: birthdate,
//           gender: gender,
//           enterprise: enterprise,
//         },
//       },

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const Profile = () => {
  const user = useTracker(() => Meteor.user());

  if (!user) return <Typography>Carregando...</Typography>;

  const navigate = useNavigate();

  const handleImageInput = (event) => {};

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleChangePhoto = () => {
    navigate("/changephoto");
  };

  return (
    <Container>
      <div>
        <Typography>
          Olá, {typeof user.username === "string" ? user.username : "Usuário"} !
        </Typography>
        <Div style={{ marginBottom: "20px" }}>
          {`Este é o seu Perfil no To Do list app. :)`}{" "}
        </Div>

        <List sx={style}>
          <ListItem>
            <ListItemText primary={`- Usuário: ${user.username}`} />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText primary={`- E-mail: ${user.emails?.[0]?.address} `} />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText
              primary={`- Data de nascimento: ${user.profile?.birthdate}`}
            />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText primary={`- Sexo: ${user.profile?.gender}`} />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText primary={`- Empresa: ${user.profile?.enterprise}`} />
          </ListItem>
        </List>
        <Button
          onClick={handleEditProfile}
          color="primary"
          style={{ marginTop: "20px", marginRight: "10px" }}
        >
          Editar perfil
        </Button>
        <Button
          onClick={handleChangePhoto}
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Mudar Foto de perfil
        </Button>
        {/* <input
          type="file"
          accept="image/png, image/jpeg"
          className="profile_photo"
          onChange={handleImageInput}
        />
        <span className="photo_"></span> */}
      </div>
    </Container>
  );
};
