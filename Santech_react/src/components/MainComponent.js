import React from "react";
import Overlay from "./Overlay";
import PageLoader from "./PageLoader"; // Assurez-vous que ce composant est utilisé ou retirez l'import si inutile.
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import GoogleFontLoader from "react-google-font-loader";
import "adminbsb-materialdesign/css/themes/all-themes.css";

// Composant principal qui gère la disposition et le thème de l'interface utilisateur.
class MainComponent extends React.Component {
  state = {
    bodyClass: "theme-red ls-closed", // Classe initiale pour le body, contrôlant le thème et l'état du menu.
    displayOverlay: "none", // Contrôle la visibilité de l'overlay.
    width: window.screen.width, // Largeur actuelle de l'écran pour les ajustements responsifs.
  };

  // Gère les clics sur la barre, toggle l'overlay et l'état du menu.
  onBarClick = () => {
    if (this.state.bodyClass == "theme-red ls-closed overlay-open") {
      this.setState({ bodyClass: "theme-red ls-closed", displayOverlay: "none" });
    } else if (this.state.bodyClass == "theme-red ls-closed") {
      this.setState({ bodyClass: "theme-red ls-closed overlay-open", displayOverlay: "block" });
    }
  };

  
  // Met à jour la largeur de l'écran dans l'état lors du redimensionnement de la fenêtre.
  onscreenresize = () => {
    console.log(window.screen.width);
    this.setState({ width: window.screen.width });
  };

  // Ajoute un écouteur pour le redimensionnement dès que le composant est monté.
  componentWillMount() {
    window.addEventListener("resize", this.onscreenresize);
  }

  // Supprime l'écouteur de redimensionnement avant que le composant soit démonté pour éviter des fuites de mémoire.
  componentWillUnmount() {
    window.removeEventListener("resize", this.onscreenresize);
  }

  // Ajoute des gestionnaires pour les événements de focus et de blur sur tous les champs de saisie.
  componentDidMount() {
    var inputall = document.querySelectorAll("input");
    inputall.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentNode.className = "form-line focused"; // Ajoute une classe pour le style focus.
      });
    });

    inputall.forEach((input) => {
      input.addEventListener("blur", function () {
        this.parentNode.className = "form-line"; // Retire la classe focus au blur.
      });
    });
  }

  // Rendu du composant, incluant les sous-composants et la logique de style conditionnel.
  render() {
    console.log(this.props);
    if (this.state.width > 1150) {
      document.getElementById("root").className = "theme-red"; // Applique un thème pour les largeurs supérieures à 1150px.
    } else {
      document.getElementById("root").className = this.state.bodyClass; // Applique un thème basé sur l'état actuel.
    }

    var Page = this.props.page; // Récupère la page à afficher passée en props.

    return (
      <React.Fragment>
        <GoogleFontLoader // Chargeur de polices Google pour Roboto et Material Icons.
          fonts={[
            { font: "Roboto", weights: [400, 700] },
            { font: "Material+Icons" },
          ]}
          subsets={["latin", "cyrillic-ext"]}
        />
        <Overlay display={this.state.displayOverlay} />
        <Navbar onBarClick={this.onBarClick} />
        <Sidebar activepage={this.props.activepage} />
        <Page {...this.props} />  {/* Affiche la page contenue en props avec toutes les props passées. */} 
      </React.Fragment>
    );
  }
}

export default MainComponent;
