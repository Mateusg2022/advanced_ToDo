import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export const Profile = () => {
  const user = useTracker(() => Meteor.user());
  return (
    //tela de bem vindo, usuario já logado
    <div>
      <h1>Olá! {user.username} </h1>
      <h3>Este é o seu Perfil no To Do list app. </h3>
      <p> - {user.username} </p>
      <p> - E-mail </p>
      <p> - Data de nascimento</p>
      <p> - Sexo </p>
      <p> - Empresa </p>
    </div>
  );
};
