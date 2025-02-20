import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../api/TasksCollection.js";
import { TaskForm } from "./TaskForm";
import { Meteor } from "meteor/meteor";
import { LoginForm } from "./LoginForm";
import React, { useState, Fragment } from "react";
//dados para teste antes de conectar ao banco de dados
// const tasks = [
//   { _id: 1, text: "First Task" },
//   { _id: 2, text: "Second Task" },
//   { _id: 3, text: "Third Task" },
// ];

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  //o hook useTracker garante que o componente seja re-renderizado sempre que os dados na TasksCollection mudarem
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });
  // when subscribing to a publication using useSubscribe you'll get a isLoading function, that you can use
  // to render some loading component before the data is ready.
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
  };

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do list app
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user != null ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>

            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={handleToggleChecked}
                  onDeleteClick={handleDelete}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
