import React from "react";
import APIHandler from "../utils/APIHandler";

class EmployeeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);  // Lie la méthode formSubmit pour garantir le contexte 'this'.
  }

  // Initialisation de l'état avec des valeurs par défaut.
  state = {
    errorRes: false,  // Indique s'il y a une réponse d'erreur de l'API.
    errorMessage: "",  // Stocke le message d'erreur de l'API.
    btnMessage: 0,  // Contrôle le message ou l'état du bouton (par exemple, chargement).
    sendData: false,  // Indique si les données sont en cours d'envoi.
    employeeList: [],  // Stocke la liste des employés.
    dataLoaded: false,  // Indique si les données initiales sont chargées.
  };

  // Gestionnaire d'événements pour la soumission du formulaire.
  async formSubmit(event) {
    event.preventDefault();  // Empêche le comportement par défaut de la soumission du formulaire.
    this.setState({ btnMessage: 1 });  // Définit le message du bouton pour indiquer le chargement.

    var apiHandler = new APIHandler();
    // Appelle l'API pour sauvegarder les données de l'employé en utilisant l'APIHandler.
    var response = await apiHandler.saveEmployeeData(
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value
    );
    console.log(response);  // Journalise la réponse de l'API.
    this.setState({ btnMessage: 0 });  // Réinitialise le message du bouton après l'opération.
    this.setState({ errorRes: response.data.error });  // Met à jour l'état d'erreur basé sur la réponse de l'API.
    this.setState({ errorMessage: response.data.message });  // Met à jour le message d'erreur.
    this.setState({ sendData: true });  // Définit sendData à true après l'opération.
    this.updateDataAgain();  // Récupère les données mises à jour des employés.
  }

  // Cette méthode fonctionne lorsque notre page est prête.
  componentDidMount() {
    this.fetchEmployeeData();  // Récupère les données des employés lors du montage du composant.
  }

  // Récupère les données des employés depuis l'API.
  async fetchEmployeeData() {
    this.updateDataAgain();  // Appelle la méthode pour mettre à jour les données.
  }

  // Met à jour les données des employés.
  async updateDataAgain() {
    var apihandler = new APIHandler();
    var employeeDataList = await apihandler.fetchEmployee();  // Appel API pour récupérer les employés.
    this.setState({ employeeList: employeeDataList.data.data });  // Met à jour l'état avec les données des employés.
    this.setState({ dataLoaded: true });  // Indique que les données ont été chargées.
  }

  // Affiche les détails de l'employé en redirigeant vers la page de détails de l'employé.
  ShowEmpDetails = (eid) => {
    this.props.history.push("/employeedetails/" + eid);
  };
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE Employee</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Employee</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Name</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Joining Date</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="joining_date"
                              name="joining_date"
                              className="form-control"
                              placeholder="Enter Date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Phone</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter Phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Address</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter Address"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Employee"
                        : "Adding Employee Please Wait.."}
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
                  <h2>All Employee Data</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Joining Date</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeList.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.joining_date}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.address}</td>
                          <td>
                            {new Date(employee.added_on).toLocaleString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => this.ShowEmpDetails(employee.id)}
                            >
                              VIEW
                            </button>
                          </td>
                        </tr>
                      ))}
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

export default EmployeeComponent;
