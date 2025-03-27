import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection.js";
import { TaskForm } from "./TaskForm";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import React, { useState, Fragment } from "react";

import { Routes, Route } from "react-router-dom";
// import { Home } from "./Home";
import { TasksPage } from "./TasksPage";
import { Profile } from "./Profile";
import { SignUp } from "./SignUp";
import { EditTask } from "./EditTask";
import { ViewTask } from "./ViewTask";
import { CreateTask } from "./CreateTask";
import MenuAppBar from "./MenuAppBar.jsx";
import { EditProfile } from "./EditProfile";
import { HomePage } from "./Home";
import ProfilePic from "./ProfilePic";

import { Container, Typography } from "@mui/material";

import PrivateRoute from "./PrivateRoute";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const App = () => {
  // when subscribing to a publication using useSubscribe you'll get a isLoading function, that you can use
  // to render some loading component before the data is ready.
  const isLoading = useSubscribe("tasks").isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = useTracker(() => Meteor.user());

  return (
    // <Container maxWidth="xl">
    <div className="app">
      <header>{<MenuAppBar />}</header>

      <div className="main" style={{ marginTop: "35px" }}>
        <Routes>
          {user === null ? (
            <>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          ) : (
            <>
              {/*rotas protegidas, acesso somente aos usuarios logados*/}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editprofile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TasksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <EditTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/view/:id"
                element={
                  <PrivateRoute>
                    <ViewTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/newTask"
                element={
                  <PrivateRoute>
                    <CreateTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/changephoto"
                element={
                  <PrivateRoute>
                    <ProfilePic />
                  </PrivateRoute>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </div>
    // </Container>
  );
};

// const user = useTracker(() => Meteor.user());

// const [hideCompleted, setHideCompleted] = useState(false);

// const hideCompletedFilter = { isChecked: { $ne: true } };

// //o hook useTracker garante que o componente seja re-renderizado sempre que os dados na TasksCollection mudarem
// const tasks = useTracker(() => {
//   if (!user) {
//     return [];
//   }

//   return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
//     sort: { createdAt: -1 },
//   }).fetch();
// });

// const pendingTasksCount = useTracker(() => {
//   if (!user) {
//     return 0;
//   }
//   return TasksCollection.find(hideCompletedFilter).count();
// });

// const pendingTasksTitle = `${
//   pendingTasksCount ? ` (${pendingTasksCount})` : ""
// }`;

// const handleToggleChecked = ({ _id, isChecked }) => {
//   Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
// };

// const handleDelete = ({ _id }) => {
//   Meteor.callAsync("tasks.delete", { _id });
// };

// const logout = () => Meteor.logout();
