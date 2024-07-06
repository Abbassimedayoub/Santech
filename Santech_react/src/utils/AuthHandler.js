import axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class AuthHandler {
  //  Méthode pour la connexion des utilisateurs
  static login(username, password, callback) {
    // Envoi des identifiants au serveur pour vérifier la connexion
    axios
      .post(Config.loginUrl, { username: username, password: password })
      .then(function (response) {
        // Si la réponse est 200, la connexion est réussie
        if (response.status === 200) {
          // Sauvegarde des tokens d'accès et de rafraîchissement dans le stockage local
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
          // Appel de la fonction de rappel sans erreur
          callback({ error: false, message: "Login Successfull..." });
        }
      })
      .catch(function (error) {
        // En cas d'erreur, appeler la fonction de rappel avec un message d'erreur
        callback({
          error: true,
          message: "Error During Login Invalid Login Details..",
        });
      });
  }

  // Vérifie si l'utilisateur est déjà connecté
  static loggedIn() {
    // Vérifie la présence des tokens dans le stockage local
    return reactLocalStorage.get("token") && reactLocalStorage.get("refresh");
  }

  // Récupère le token d'accès depuis le stockage local
  static getLoginToken() {
    return reactLocalStorage.get("token");
  }

  // Récupère le token de rafraîchissement depuis le stockage local
  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }

  // Méthode pour déconnecter l'utilisateur
  static logoutUser() {
    // Suppression des tokens du stockage local
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("refresh");
  }

  // Vérifie si le token a expiré
  static checkTokenExpiry() {
    var expire = false;
    var token = this.getLoginToken();
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1]));
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp *1000;
    } else {
      expire = false;
    }

    // Retourne true si la date courante est supérieure à la date d'expiration du token
    return !expire ? false : Date.now() > expire;
  }
}

export default AuthHandler;
