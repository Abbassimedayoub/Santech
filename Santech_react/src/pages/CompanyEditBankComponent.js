import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

// Définit un composant React pour éditer les détails bancaires d'une entreprise.
class CompanyEditBankComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);  // Lie la méthode formSubmit pour assurer le contexte 'this'.
  }


  
  // Initialisation de l'état avec des valeurs par défaut.
  state = {
    errorRes: false,  // Indique s'il y a une réponse d'erreur de l'API.
    errorMessage: "",  // Stocke le message d'erreur de l'API.
    btnMessage: 0,  // Contrôle le message ou l'état du bouton (par exemple, chargement).
    sendData: false,  // Indique si les données sont en cours d'envoi.
    ifsc_no: "",  // Stocke le code IFSC de la banque.
    bank_account_no: "",  // Stocke le numéro de compte bancaire.
  };

  // Gestionnaire d'événements pour la soumission du formulaire.
  async formSubmit(event) {
    event.preventDefault();  // Empêche le comportement par défaut de la soumission du formulaire.
    this.setState({ btnMessage: 1 });  // Définit le message du bouton pour indiquer le chargement.

    var apiHandler = new APIHandler();
    // Appelle l'API pour éditer les détails bancaires de l'entreprise en utilisant l'APIHandler.
    var response = await apiHandler.editCompanyBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      this.props.match.params.company_id,
      this.props.match.params.id
    );
    console.log(response);  // Journalise la réponse de l'API.
    this.setState({ btnMessage: 0 });  // Réinitialise le message du bouton après l'opération.
    this.setState({ errorRes: response.data.error });  // Met à jour l'état d'erreur basé sur la réponse de l'API.
    this.setState({ errorMessage: response.data.message });  // Met à jour le message d'erreur.
    this.setState({ sendData: true });  // Définit sendData à true après l'opération.
  }

  // Méthode du cycle de vie qui s'exécute après le montage du composant.
  componentDidMount() {
    this.fetchCompanyBankData();  // Récupère les détails bancaires lors du montage du composant.
  }

  // Récupère les détails bancaires d'une entreprise spécifique.
  async fetchCompanyBankData() {
    var apihandler = new APIHandler();
    // Appel API pour récupérer les détails bancaires en utilisant l'ID de l'entreprise.
    var companydata = await apihandler.fetchCompanyBankDetails(
      this.props.match.params.id
    );
    console.log(companydata);  // Journalise les données récupérées de l'entreprise.
    // Met à jour l'état avec le numéro de compte bancaire et le code IFSC récupérés.
    this.setState({ bank_account_no: companydata.data.data.bank_account_no });
    this.setState({ ifsc_no: companydata.data.data.ifsc_no });
    this.setState({ dataLoaded: true });  // Indique que les données ont été chargées.
  }



  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Edit Company Bank #{this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">Account No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Enter Company Account No."
                          defaultValue={this.state.bank_account_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">IFSC No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="ifsc_no"
                          name="ifsc_no"
                          className="form-control"
                          placeholder="Enter IFSC Code."
                          defaultValue={this.state.ifsc_no}
                        />
                      </div>
                    </div>

                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Edit Company Bank"
                        : "Edit Company Bank Please Wait.."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                        <Link
                          to={
                            "/companydetails/" +
                            this.props.match.params.company_id
                          }
                          className="btn btn-info"
                        >
                          Back to Company Details
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong>
                        {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CompanyEditBankComponent;
