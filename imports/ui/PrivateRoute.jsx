import { useTracker } from "meteor/react-meteor-data";
import { Navigate } from "react-router-dom";
import React from "react";

//sempre que o usuario tenta acessar uma rota protegida, como /tasks, sem estar logado, ele será redirecionado para a tela de login
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useTracker(() => {
    const user = Meteor.user();
    const isLoading = Meteor.loggingIn();
    return { user, isLoading };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
