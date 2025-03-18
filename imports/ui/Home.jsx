import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export const HomePage = () => {
  const user = useTracker(() => Meteor.user());
  return (
    //tela de bem vindo, usuario já logado
    <div>
      <h1>Olá! {user.username}</h1>
      <h3>Está é a tela inicial do seu perfil no Todo App List.</h3>
      <p> - Home </p>
      <p> - Perfil </p>
      <p> - Listar tarefas (botão)</p>
    </div>
  );
};
