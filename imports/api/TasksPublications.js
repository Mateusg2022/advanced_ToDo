import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  // const UserId = this.userId;
  const UserId = Meteor.userId();
  if (!UserId) return this.ready();

  //mudança para que as tarefas sejam visivedfis para todos os usuarios
  // + mudança para que tarefas privadas sejam visiveis somente para seus criadores
  const restrictFilter = {
    $or: [
      { restrict: "Aberta" },
      { $and: [{ restrict: "Pessoal" }, { userId: Meteor.userId() }] },
    ],
  };

  return TasksCollection.find(restrictFilter, {
    sort: { createdAt: -1 },
  });

  //mudança para que as tarefas sejam visiveis para todos os usuarios
  // return TasksCollection.find({ userId });
  // return TasksCollection.find();
});

// Meteor.publish("tasks", function () {
//   const userId = this.userId;
//   if (!userId) return this.ready();

//   const restrictFilter = {
//     $or: [
//       { restrict: "Aberta" },
//       { $and: [{ restrict: "Pessoal" }, { userId: userId }] },
//     ],
//   };

//   //mudança para que as tarefas sejam visiveis para todos os usuarios
//   // + mudança para que tarefas privadas sejam visiveis somente para seus criadores
//   return TasksCollection.find();
//   return TasksCollection.find(restrictFilter, {
//     sort: { createdAt: -1 },
//   });
//   // return TasksCollection.find({ userId });
//   // return TasksCollection.find();
// });
