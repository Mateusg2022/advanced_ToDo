import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { Fragment } from "react";

import "../imports/api/tasksMethods";

import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
