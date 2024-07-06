import React from "react";

// Composant Overlay qui sert de couche de superposition opaque ou transparente, utilisée pour atténuer l'interface sous-jacente.
class Overlay extends React.Component {
  render() {
    return (
      // Div qui représente l'overlay. La visibilité est contrôlée par la prop 'display'.
      <div className="overlay" style={{ display: this.props.display }}></div>
    );
  }
}

export default Overlay;
