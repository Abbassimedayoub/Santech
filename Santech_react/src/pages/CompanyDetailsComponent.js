import React from "react";
import APIHandler from "../utils/APIHandler";

class CompanyDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    console.log(props.match.params.id); // Logging the company ID for debugging
  }
  
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBank: [], // Stores bank details
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    try {
      var response = await apiHandler.editCompanyData(
        event.target.name.value,
        event.target.license_no.value,
        event.target.address.value,
        event.target.contact_no.value,
        event.target.email.value,
        event.target.description.value,
        this.props.match.params.id
      );

      console.log(response); // Logging response for debugging
      this.setState({
        btnMessage: 0,
        errorRes: response.data.error,
        errorMessage: response.data.message,
        sendData: true
      });
    } catch (error) {
      console.error('Error updating company data:', error);
      this.setState({
        btnMessage: 0,
        errorRes: true,
        errorMessage: "Failed to update data",
        sendData: true
      });
    }
  }

  componentDidMount() {
    this.fetchCompanyData();
  }

  async fetchCompanyData() {
    var apiHandler = new APIHandler();
    try {
      var companydata = await apiHandler.fetchCompanyDetails(this.props.match.params.id);
      console.log(companydata); // Logging data for debugging
      this.setState({
        companyBank: Array.isArray(companydata.data.data.company_bank) ? companydata.data.data.company_bank : [],
        name: companydata.data.data.name,
        license_no: companydata.data.data.license_no,
        address: companydata.data.data.address,
        contact_no: companydata.data.data.contact_no,
        email: companydata.data.data.email,
        description: companydata.data.data.description,
        dataLoaded: true,
      });
    } catch (error) {
      console.error("Failed to fetch company details:", error);
      this.setState({
        dataLoaded: true,
        errorMessage: "Failed to load data"
      });
    }
  }

  AddCompanyBank = () => {
    this.props.history.push("/addCompanyBank/" + this.props.match.params.id);
  };

  deleteCompanyBank = async (company_bank_id) => {
    var apiHandler = new APIHandler();
    try {
      await apiHandler.deleteCompanyBank(company_bank_id);
      this.fetchCompanyData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting bank account:', error);
    }
  };

  EditCompanyBank = (company_bank_id) => {
    console.log(company_bank_id); // Logging for debugging
    this.props.history.push("/editcompanybank/" + this.props.match.params.id + "/" + company_bank_id);
  };

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
                  {this.state.dataLoaded == false ? (
                    <div className="text-center">
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>EDIT Company</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Company Name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">License No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Enter License No."
                          defaultValue={this.state.license_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter Company Address"
                          defaultValue={this.state.address}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Contact No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Enter Contact No."
                          defaultValue={this.state.contact_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Company Email"
                          defaultValue={this.state.email}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          defaultValue={this.state.description}
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
                        ? "Edit Company"
                        : "Editing Company Please Wait.."}
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
        </div>
      </section>
    );
  }
}

export default CompanyDetailsComponent;
