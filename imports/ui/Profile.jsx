import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  ButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export const Profile = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleChangePhoto = () => {
    navigate("/changephoto");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, textAlign: "center", borderRadius: 4, boxShadow: 3 }}>
        <Avatar
          alt="Profile Picture"
          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
          src={user.profile?.photo}
        />
        <Typography variant="h5" fontWeight="bold">
          Olá, {user.username || "Usuário"}!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Este é o seu perfil no To-Do List App.
        </Typography>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Divider />
          <ListItem>
            <ListItemText primary="Usuário" secondary={user.username} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="E-mail"
              secondary={user.emails?.[0]?.address || "Não informado"}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Data de nascimento"
              secondary={user.profile?.birthdate || "Não informado"}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Sexo"
              secondary={user.profile?.gender || "Não informado"}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Empresa"
              secondary={user.profile?.enterprise || "Não informado"}
            />
          </ListItem>
          <Divider />
        </List>

        <Box sx={{ mt: 3 }}>
          <ButtonGroup fullWidth>
            <Button onClick={handleEditProfile} variant="contained">
              Editar Perfil
            </Button>
            <Button onClick={handleChangePhoto} /*color="secondary"*/>
              Mudar Foto
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    </Container>
  );
};
