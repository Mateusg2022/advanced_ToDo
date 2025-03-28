import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
  ButtonGroup,
} from "@mui/material";

import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

const ProfilePic = () => {
  // const [image, setImage] = useState(null);
  const user = useTracker(() => Meteor.user());
  const [image, setImage] = useState(user.profile?.photo);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const handleUpload = () => {
    if (image) {
      Meteor.call("user.updateProfilePhoto", image, (err, res) => {
        if (err) {
          alert("Erro ao enviar a foto de perfil");
          console.error(err);
        } else {
          alert("Foto de perfil atualizada!");
          navigate("/profile");
        }
      });
    }
  };

  return (
    <Container>
      <Card sx={{ p: 3, textAlign: "center", borderRadius: 4, boxShadow: 3 }}>
        <div>
          {image && (
            <img
              src={image}
              alt="Pré-visualização"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginTop: 10,
              }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="upload-photo"
          />
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Escolha uma nova foto de perfil.
          </Typography>
          <ButtonGroup
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="span">
              <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
                Selecionar Arquivo
              </label>
            </Button>
            <Button
              onClick={handleUpload}
              /*variant="contained"*/
              // color="primary"
              disabled={!image}
            >
              Salvar Foto
            </Button>
          </ButtonGroup>

          <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/profile")}>
            Voltar
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default ProfilePic;
