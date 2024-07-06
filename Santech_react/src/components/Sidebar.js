import React from "react";
import usericon from "adminbsb-materialdesign/images/user.png";
import Config from "../utils/Config";
import { Link } from "react-router-dom";

// Composant Sidebar pour la barre latérale de l'application.
class Sidebar extends React.Component {
  state = {
    defaultClass: "btn-group user-helper-dropdown",
  };

  constructor(props) {
    super(props);
    this.divref = React.createRef(); // Référence pour le bouton de déroulement du menu.
    this.divref2 = React.createRef(); // Référence pour l'option de déconnexion.
  }

  // Ajoute un écouteur d'événement pour les clics de souris dès que le composant est monté.
  componentWillMount() {
    document.addEventListener("mousedown", this.handleMouseClick, false);
  }

  

  // Supprime l'écouteur d'événement avant que le composant ne soit démonté pour éviter des fuites de mémoire.
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleMouseClick, false);


  }

  // Gère les clics à l'extérieur des références pour fermer le menu déroulant.
  handleMouseClick = (event) => {
    if (
      event.target === this.divref.current ||
      event.target === this.divref2.current
    ) {
      console.log("Click Element");
      return;
    } else {
      console.log("Click Outside");
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  // Alterne l'état du menu déroulant lors du clic.
  showLogoutMenu = () => {
    if (this.state.defaultClass === "btn-group user-helper-dropdown") {
      this.setState({ defaultClass: "btn-group user-helper-dropdown open" });
    } else {
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  render() {
    return (
      <section>
        {/* Barre latérale contenant des informations utilisateur et des liens de navigation */}
        <aside id="leftsidebar" className="sidebar">
          <div className="user-info">
            <div className="image">
              {/* Image de l'utilisateur */}
              <img src={usericon} width="48" height="48" alt="User" />
            </div>
            <div className="info-container">
              <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ABBASSI
              </div>
              <div className="email">abbassimohamedayoub@gmail.com</div>
              <div className={this.state.defaultClass}>
                <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={this.showLogoutMenu} ref={this.divref}>
                  keyboard_arrow_down
                </i>
                <ul className="dropdown-menu pull-right">
                  <li><a href={Config.logoutPageUrl} className="waves-effect waves-block" ref={this.divref2}><i className="material-icons">input</i>Sign Out</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="menu">
            <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto" }}>
              {/* Liste des liens de navigation */}
              <ul className="list" style={{ overflow: "hidden", width: "auto" }}>
                {Config.sidebarItem.map((item) => (
                  <li key={item.index} className={item.index === this.props.activepage ? "active" : ""}>
                    <Link to={item.url} className="toggled waves-effect waves-block">
                      <i className="material-icons">{item.icons}</i>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="legal">
            {/* Informations de copyright et de version */}
            <div className="copyright">
              © 2024 <a href="#">ABBASSI - Santech</a>.
            </div>
            <div className="version">
              <b>Version: </b> 1.0
            </div>
          </div>
        </aside>
      </section>
    );
  }
}

export default Sidebar;
