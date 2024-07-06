import React from "react";

// Composant Navbar pour la barre de navigation supérieure de l'application.
class Navbar extends React.Component {
  render() {
    return (
      // Définit la barre de navigation de l'application.
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* Bouton pour déclencher des actions définies dans le composant parent, généralement pour gérer l'affichage du menu */}
            <a href="#" className="bars" onClick={this.props.onBarClick}></a>
            {/* Lien du logo ou de la marque qui redirige vers la page d'accueil */}
            <a className="navbar-brand" href="index.html">
              Santech
            </a>
          </div>
        </div>
      </nav>
    );
  }

  
}

export default Navbar;
