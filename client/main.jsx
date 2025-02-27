import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
// import { UserProvider } from "/imports/ui/LoginForm";

import "../imports/api/tasksMethods";

import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "/imports/ui/SnackbarContext";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  );
});
