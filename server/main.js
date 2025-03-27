import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/UserMethods";
import { Accounts } from "meteor/accounts-base";

const insertTask = (taskText, user) => {
  // TasksCollection.insert({
  TasksCollection.insertAsync({
    text: taskText,
    newDescription: "",
    userID: user._id,
    createdAt: new Date(),
  });
};

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
  // insertTask("teste");
});

// Meteor.publish("nome", function () {
//   //primeiro parametro: filtro  |  segundo parametro:
//   return TasksCollection.find({}, {});
// });
