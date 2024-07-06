import React from "react";
import APIHandler from "../utils/APIHandler";

// Composant pour la fonctionnalité de saisie automatique des noms de médicaments.
class AutoCompleteMedicine extends React.Component {
  state = {
    onFocus: false,  // Suivi de l'état de focus du champ de saisie.
    datalist: [],    // Liste des données pour les suggestions de saisie automatique.
  };

  constructor(props) {
    super(props);
    this.loadDataMedicine = this.loadDataMedicine.bind(this);  // Liaison de loadDataMedicine pour assurer le contexte 'this'.
    this.inputData = React.createRef();  // Référence pour accéder à l'élément DOM de l'input.
  }

  // Gestionnaire d'événements pour définir l'état de focus à vrai.
  onFocusChange = () => {
    this.setState({ onFocus: true });
  };

  // Gestionnaire d'événements pour définir l'état de focus à faux.
  onBlurChange = () => {
    this.setState({ onFocus: false });
  };

  // Charge les données des médicaments de manière asynchrone en fonction de la saisie de l'utilisateur.
  async loadDataMedicine(event) {
    var apiHandler = new APIHandler();
    var dataresponse = await apiHandler.fetchMedicineByName(event.target.value);
    this.setState({ datalist: dataresponse.data });
  }

  // Affiche l'élément sélectionné dans l'input et passe l'item au parent via une fonction prop.
  onShowItem = (item) => {
    console.log(item);
    this.inputData.current.value = item.name;
    this.props.showDataInInputs(this.props.itemPostion, item);
    this.onBlurChange();
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          id="medicine_name"
          name="medicine_name"
          className="form-control"
          placeholder="Enter Medicine Name"
          onFocus={this.onFocusChange}
          autoComplete="off"
          onChange={this.loadDataMedicine}
          ref={this.inputData}
        />
        {this.state.onFocus == true ? (
          <div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey",
                position: "absolute",
                width: "100%",
                zIndex: 1,
                background: "white",
              }}
            >
              {this.state.datalist.map((item, index) => (
                <li
                  key={index}
                  style={{ padding: 5, borderBottom: "1px solid lightgrey" }}
                  onClick={() => this.onShowItem(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AutoCompleteMedicine;
