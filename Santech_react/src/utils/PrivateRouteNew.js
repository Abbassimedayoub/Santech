import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthHandler from "./AuthHandler"; // Importation du gestionnaire d'authentification
import MainComponent from "../components/MainComponent"; // Importation du composant principal qui sera rendu

/**
 * Ce composant fonctionnel crée une route privée qui nécessite une authentification.
 * Il redirige les utilisateurs non authentifiés vers la page de connexion.
 * @param {object} props - Les propriétés passées au composant, y compris 'page' et 'activepage'.
 */
export var PrivateRouteNew = ({ page, activepage, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => AuthHandler.loggedIn() ? ( // Vérifie si l'utilisateur est connecté
        // Rend le MainComponent si l'utilisateur est authentifié, en passant les props supplémentaires
        <MainComponent page={page} activepage={activepage} {...props} />
      ) : (
        // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
        <Redirect to="/" />
      )}
    />
  );
};
