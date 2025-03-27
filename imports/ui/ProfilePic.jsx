import { Button, Container, TextField } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

const ProfilePic = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

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
        }
      });
    }
  };

  return (
    <Container>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-photo"
        />
        <label htmlFor="upload-photo">
          Escolha uma nova foto de perfil:{" "}
          {fileName === "" ? "Nenhum arquivo selecionado" : fileName}
        </label>
        <Button variant="contained" component="span">
          <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
            Selecionar Arquivo
          </label>
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={!image}
        >
          Salvar Foto
        </Button>
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
      </div>
    </Container>
  );
};

export default ProfilePic;
