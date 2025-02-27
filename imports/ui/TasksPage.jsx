import React from "react";
import { Fragment } from "react";
import { TaskForm } from "./TaskForm";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import { Task } from "./Task";
import { Meteor } from "meteor/meteor";
import { useState } from "react";
import { useSubscribe } from "meteor/react-meteor-data";
import { useSnackbar } from "./SnackbarContext";

import Button from "@mui/material/Button";

import MenuAppBar from "./MenuAppBar";

export const TasksPage = () => {
  const user = useTracker(() => Meteor.user());
  const { addSnackbarMessage } = useSnackbar();

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const isLoading = useSubscribe("tasks").isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(hideCompletedFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const handleToggleChecked = ({ _id, isChecked }) => {
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  };

  const handleDelete = ({ _id }) => {
    Meteor.callAsync("tasks.delete", { _id });
    addSnackbarMessage("Task Deleted");
  };

  const logout = () => Meteor.logout();

  return (
    <Fragment>
      <div className="user" onClick={logout}>
        {user.username} 🚪
      </div>

      <TaskForm />

      <div className="filter">
        <Button
          variant="contained"
          onClick={() => setHideCompleted(!hideCompleted)}
        >
          {hideCompleted ? "Show All" : "Hide Completed"}
        </Button>
      </div>

      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            username={user.username}
            key={task._id}
            task={task}
            onCheckboxClick={handleToggleChecked}
            onDeleteClick={handleDelete}
          />
        ))}
      </ul>
    </Fragment>
  );
};
