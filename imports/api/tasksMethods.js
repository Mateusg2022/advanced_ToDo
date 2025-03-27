import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
  // "tasks.toggleChecked"({ _id, isChecked }) {
  //   return TasksCollection.updateAsync(_id, {
  //     $set: { isChecked: !isChecked },
  //   });
  // },
  "tasks.toggleChecked"({ _id, isChecked }) {
    return TasksCollection.updateAsync(_id, {
      $set: { isChecked },
    });
  },

  "tasks.update"({
    _id,
    newUser,
    newText,
    newDescription,
    newSituation,
    newRestrict,
  }) {
    return TasksCollection.updateAsync(_id, {
      $set: {
        user: newUser,
        text: newText,
        description: newDescription,
        situation: newSituation,
        restrict: newRestrict,
      },
    });
  },

  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
});
