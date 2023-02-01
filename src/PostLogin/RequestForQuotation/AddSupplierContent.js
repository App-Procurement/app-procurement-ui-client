import React, { Component } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  Dialog,
  DialogTitle,
  Button,
  Autocomplete,
} from "@mui/material";
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
    const { value } = this.state;
    this.props.parentCallback(value);
  };

  render() {
    const { formData, value } = this.state;

    const { openModulRfqAddSupplier, openAddNewItemPopupSupplier } = this.props;

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
              <Autocomplete
                className="p-0"
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
                options={this.props.searchSupplierListData.map(
                  (option) => option.details.email
                )}
                renderInput={(params) => (
                  <TextField
                    className="search-supplier"
                    {...params}
                    margin="normal"
                    variant="outlined"
                    placeholder="Search"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
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
