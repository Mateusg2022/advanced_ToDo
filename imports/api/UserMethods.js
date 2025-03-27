import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "user.updateInfo"(
    newUsername,
    newEmail,
    newBirthdate,
    newGender,
    newEnterprise
  ) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "Usuário não está autenticado.");
    }
    try {
      const result = Meteor.users.updateAsync(this.userId, {
        $set: {
          username: newUsername,
          "emails.0.address": newEmail,
          "profile.birthdate": newBirthdate,
          "profile.gender": newGender,
          "profile.enterprise": newEnterprise,
        },
      });

      console.log(`[SERVER] Resultado da atualização: ${result}`);
      return result;
    } catch (error) {
      console.error("[SERVER] Erro ao atualizar usuário:", error);
      throw new Meteor.Error(
        "update-failed",
        "Erro ao atualizar informações do usuário."
      );
    }
  },

  "user.updateProfilePhoto"(base64Image) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "Usuário não está autenticado.");
    }

    try {
      const result = Meteor.users.updateAsync(this.userId, {
        $set: { "profile.photo": base64Image },
      });

      console.log(
        `[SERVER] Foto de perfil atualizada para o usuário ${this.userId}`
      );
      return result;
    } catch (error) {
      console.error("[SERVER] Erro ao atualizar foto de perfil:", error);
      throw new Meteor.Error(
        "update-failed",
        "Erro ao atualizar foto de perfil."
      );
    }
  },
  "user.changeName"(newName) {
    const result = Meteor.users.updateAsync(this.userId, {
      $set: { username: newName },
    });
    console.log(`[SERVER] Resultado da atualização: ${result}`);
  },
});
