import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Table from "../../Table/Table";
import { t } from "i18next";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// import Autocomplete from "@mui/material/Autocomplete";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";

export class AddSupplierContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        contactName: "",
        contactNo: "",
        emailAddress: "",
        adderss: "",
      },
      supplier: [],
      selectedData: [],
      value: null,
    };
  }

  componentDidMount = () => {
    if (
      this.props.requestDetailsData &&
      this.props.requestDetailsData.Supplier &&
      this.props.requestDetailsData.Supplier.length > 0
    ) {
      this.setState({
        supplier: this.props.requestDetailsData.Supplier,
      });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  handleSubmit = () => {
    const { formData, value } = this.state;
    this.props.parentCallback(
      // [
      // ...this.state.selectedData,
      value,
      // ]
    );
  };

  render() {
    const { formData, value } = this.state;

    const {
      openModulRfqAddSupplier,
      openAddNewItemPopupSupplier,
      requestDetailsData,
    } = this.props;

    return (
      <Dialog
        open={openModulRfqAddSupplier}
        onClose={openAddNewItemPopupSupplier}
        aria-labelledby="form-dialog-title"
        className="rfq-add-supplier-dialog create-step-dialog"
      >
        {openModulRfqAddSupplier}
        <div className="custom-dialog-head">
          <DialogTitle id="form-dialog-title" className="dialog-heading">
            Add Supplier
          </DialogTitle>
          <Button
            onClick={openAddNewItemPopupSupplier}
            className="modal-close-btn"
          >
            <CloseIcon />
          </Button>
        </div>

        <div className="custom-dialog-content">
          <div className="search-bar">
            <div className="form-group">
              <Autocomplete className="p-0"
                freeSolo
                value={value}
                onChange={(event, newValue) => {
                  this.setState({
                    value: newValue,
                    selectedData: [...this.state.selectedData, newValue],
                  });

                }}
                id="free-solo-2-demo"
                style={{ width: "100%" }}
                disableClearable
                options={this.state.supplier.map((option) => option.Email)}
                renderInput={(params) => (
                  <TextField className="search-supplier"
                    {...params}
                    // label="Search input"
                    margin="normal"
                    variant="outlined"
                    placeholder="Search"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />

              {/* <button className="search-icon">
                <i className="fas fa-search"></i>
              </button> */}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group row form-group">
                <label className="col-12 col-form-label">Contact Name</label>
                <div className="col-12 col-form-field">
                  <input
                    type="text"
                    name="contactName"
                    placeholder=" "
                    className="form-control"
                    onChange={this.handleChange}
                    value={formData.contactName}
                  />
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-12 col-form-label">Contact No.</label>
                <div className="col-12 col-form-field">
                  <input
                    type="text"
                    name="contactNo"
                    placeholder=" "
                    className="form-control"
                    onChange={this.handleChange}
                    value={formData.contactName}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group row form-group">
                <label className="col-12 col-form-label">Email Address</label>
                <div className="col-12 col-form-field">
                  <input
                    type="text"
                    name="emailAddress"
                    placeholder=""
                    className="form-control"
                    onChange={this.handleChange}
                    value={formData.emailAddress}
                  />
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-12 col-form-label">Address</label>
                <div className="col-12 col-form-field">
                  <input
                    type="text"
                    name="address"
                    placeholder=" "
                    className="form-control"
                    onChange={this.handleChange}
                    value={formData.address}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-block text-center pt-2">
            <Button className="primary-btn" onClick={this.handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AddSupplierContent;
