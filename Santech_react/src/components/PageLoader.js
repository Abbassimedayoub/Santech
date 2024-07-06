import React from "react";

// Composant PageLoader qui affiche une animation de chargement lors du chargement des pages ou des données.
class PageLoader extends React.Component {
  render() {
    return (
      // Le conteneur principal du loader, initialement non affiché (style display à 'none').
      <div className="page-loader-wrapper" style={{ display: "none" }}>
        {/* Div principal pour l'animation de chargement */}
        <div className="loader">
          {/* Animation de préchargement avec des cercles rotatifs */}
          <div className="preloader">
            {/* Couche de l'animation avec la couleur personnalisée 'pl-red' */}
            <div className="spinner-layer pl-red">
              {/* Clipper gauche pour la partie gauche du cercle animé */}
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              {/* Clipper droit pour la partie droite du cercle animé */}
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
            
          </div>
          {/* Message affiché pour indiquer à l'utilisateur d'attendre pendant le chargement */}
          <p>Please wait...</p>
        </div>
      </div>
    );
  }
}

export default PageLoader;
