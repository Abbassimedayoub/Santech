import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class CustomerRequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);  // Lier la méthode formSubmit pour garantir le contexte 'this'.
    this.completeCustomerRequestDetails = this.completeCustomerRequestDetails.bind(this);  // Lier la méthode completeCustomerRequestDetails.
    this.formRef = React.createRef();  // Créer une référence pour le formulaire.
  }

  // Initialisation de l'état avec des valeurs par défaut.
  state = {
    errorRes: false,  // Indique s'il y a une réponse d'erreur de l'API.
    errorMessage: "",  // Stocke le message d'erreur de l'API.
    btnMessage: 0,  // Contrôle le message ou l'état du bouton (par exemple, chargement).
    sendData: false,  // Indique si les données sont en cours d'envoi.
    customerRequestDataList: [],  // Stocke la liste des demandes de clients.
    dataLoaded: false,  // Indique si les données initiales sont chargées.
  };

  

  // Gestionnaire d'événements pour la soumission du formulaire.
  async formSubmit(event) {
    event.preventDefault();  // Empêche le comportement par défaut de la soumission du formulaire.
    this.setState({ btnMessage: 1 });  // Définit le message du bouton pour indiquer le chargement.

    var apiHandler = new APIHandler();
    // Appelle l'API pour sauvegarder les données de la demande de client en utilisant l'APIHandler.
    var response = await apiHandler.saveCustomerRequestData(
      event.target.name.value,
      event.target.phone.value,
      event.target.medicine_details.value,
      event.target.prescription.files[0]
    );
    console.log(response);  // Journalise la réponse de l'API.
    this.setState({ btnMessage: 0 });  // Réinitialise le message du bouton après l'opération.
    this.setState({ errorRes: response.data.error });  // Met à jour l'état d'erreur basé sur la réponse de l'API.
    this.setState({ errorMessage: response.data.message });  // Met à jour le message d'erreur.
    this.setState({ sendData: true });  // Définit sendData à true après l'opération.
    this.fetchCustomerRequestData();  // Récupère les données mises à jour des demandes de clients.
    this.formRef.current.reset();  // Réinitialise les champs du formulaire.
  }

  // Cette méthode fonctionne lorsque notre page est prête.
  componentDidMount() {
    this.fetchCustomerRequestData();  // Récupère les données des demandes de clients lors du montage du composant.
  }

  // Récupère les données des demandes de clients depuis l'API.
  async fetchCustomerRequestData() {
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.fetchAllCustomerRequest();  // Appel API pour récupérer toutes les demandes de clients.
    console.log(customerRequestData);  // Journalise les données récupérées des demandes de clients.
    // Met à jour l'état avec les données récupérées des demandes de clients.
    this.setState({ customerRequestDataList: customerRequestData.data.data });
    this.setState({ dataLoaded: true });  // Indique que les données ont été chargées.
  }

  // Complète et met à jour les détails de la demande de client.
  async completeCustomerRequestDetails(customer_id, name, phone, medicine_details) {
    console.log(customer_id);  // Journalise l'ID du client.
    var apihandler = new APIHandler();
    // Appel API pour mettre à jour les détails de la demande de client.
    var customerRequestData = await apihandler.updateCustomerRequest(
      customer_id,
      name,
      phone,
      medicine_details
    );
    console.log(customerRequestData);  // Journalise la réponse de l'API.
    this.fetchCustomerRequestData();  // Récupère les données mises à jour des demandes de clients.
  }
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE CUSTOMER MEDICINE REQUEST</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add CUSTOMER REQUEST</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="email_address">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Customer Name"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Phone.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Enter Phone No."
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Medicine Details</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Enter Medicine Details"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Prescription</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="file"
                          id="prescription"
                          name="prescription"
                          className="form-control"
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
                        ? "Add Customer Request"
                        : "Adding Customer Request Please Wait.."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
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
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded == false ? (
                    <div className="text-center">
                      <div className="preloader pl-size-xl">
                        <div className="spinner-layer">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>All Customer Medicine Request</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>NAME</th>
                        <th>Phone</th>
                        <th>Medicine Details</th>
                        <th>PRESCRIPTION</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map(
                        (CustomerRequest) => (
                          <tr key={CustomerRequest.id}>
                            <td>{CustomerRequest.id}</td>
                            <td>{CustomerRequest.customer_name}</td>
                            <td>{CustomerRequest.phone}</td>
                            <td>{CustomerRequest.medicine_details}</td>
                            <td>
                              {CustomerRequest.prescription == null ? (
                                ""
                              ) : (
                                <img
                                  src={CustomerRequest.prescription}
                                  style={{ width: 100, height: 100 }}
                                />
                              )}
                            </td>
                            <td>
                              {CustomerRequest.status == 0
                                ? "Pending"
                                : "Completed"}
                            </td>
                            <td>
                              {new Date(
                                CustomerRequest.added_on
                              ).toLocaleString()}
                            </td>
                            <td>
                              {CustomerRequest.status == 0 ? (
                                <button
                                  className="btn btn-block btn-warning"
                                  onClick={() =>
                                    this.completeCustomerRequestDetails(
                                      CustomerRequest.id,
                                      CustomerRequest.customer_name,
                                      CustomerRequest.phone,
                                      CustomerRequest.medicine_details
                                    )
                                  }
                                >
                                  COMPLETE?
                                </button>
                              ) : (
                                <button className="btn btn-block btn-success">
                                  COMPLETED
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CustomerRequestComponent;
