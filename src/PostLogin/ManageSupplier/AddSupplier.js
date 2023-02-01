import React, { Component } from "react";
import { manageSupplierAction } from "../../_actions";
import { connect } from "react-redux";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import {
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  RadioGroup,
  NativeSelect,
} from "@mui/material";
class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDetails: {
        name: "",
        email: "",
        contactNo: "",
        phoneNo: "",
        designation: "",
      },
      companyDetail: {
        name: "",
        registrationNo: "",
        city: "",
        state: "",
        postalcode: "",
        country: "",
        address: "",
        paymentTerm: "",
        supplierCategory: "",
        automatedPurchseOrder: "",
      },
      bankDetail: {
        name: "",
        acNo: "",
        bankName: "",
        taxId: "",
        bankCode: "",
        currency: "",
      },
      isSubmit: false,
      uploadFile: {},
    };
  }

  handleStateChange = (e, type) => {
    const { accountDetails, companyDetail, bankDetail } = this.state;
    const { name, value } = e.target;
    if (type == "account") {
      accountDetails[name] = value;
    } else if (type == "bank") {
      bankDetail[name] = value;
    } else if (type == "company") {
      companyDetail[name] = value;
    }
    this.setState({
      accountDetails,
      bankDetail,
      companyDetail,
    });
  };

  handleUploadFile = (e) => {
    const { name, files } = e.target;
    this.setState({
      [name]: files[0],
    });
  };

  addSupplier = () => {
    const {
      accountDetails,
      companyDetail,
      bankDetail,
      uploadFile,
    } = this.state;
    let formData = new FormData();
    let validate = this.validateForm(true);
    this.setState({ isSubmit: true });
    if (validate.isValid) {
      formData.append("accountDetail", accountDetails);
      formData.append("companyDetail", companyDetail);
      formData.append("bankDetail", bankDetail);
      formData.append("uploadFile", uploadFile);
      this.props.dispatch(manageSupplierAction.addSupplier(formData));
    }
  };

  validateForm = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      name: validObj,
      email: validObj,
      contactNo: validObj,
      phoneNo: validObj,
      designation: validObj,
      companyName: validObj,
      registrationNo: validObj,
      city: validObj,
      state: validObj,
      postalcode: validObj,
      country: validObj,
      address: validObj,
      paymentTerm: validObj,
      supplierCategory: validObj,
      automatedPurchseOrder: validObj,
      bankHolderName: validObj,
      acNo: validObj,
      bankName: validObj,
      taxId: validObj,
      bankCode: validObj,
      currency: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { accountDetails, bankDetail, companyDetail } = this.state;
      if (!accountDetails.name) {
        retData.name = {
          isValid: false,
          message: "Account holder name is required",
        };
        isValid = false;
      }
      if (!accountDetails.email) {
        retData.email = {
          isValid: false,
          message: "Account holder email is required",
        };
        isValid = false;
      }
      if (!accountDetails.contactNo) {
        retData.contactNo = {
          isValid: false,
          message: "Requester Contact Number is Required",
        };
        isValid = false;
      }
      if (!accountDetails.phoneNo) {
        retData.phoneNo = {
          isValid: false,
          message: "Phone number is Required",
        };
        isValid = false;
      }
      if (!accountDetails.designation) {
        retData.designation = {
          isValid: false,
          message: "designation is Required",
        };
        isValid = false;
      }
      if (!companyDetail.name) {
        retData.companyName = {
          isValid: false,
          message: "Company name is Required",
        };
        isValid = false;
      }
      if (!companyDetail.registrationNo) {
        retData.registrationNo = {
          isValid: false,
          message: "Registration number is Required",
        };
        isValid = false;
      }
      if (!companyDetail.city) {
        retData.city = {
          isValid: false,
          message: "City is Required",
        };
        isValid = false;
      }
      if (!companyDetail.state) {
        retData.state = {
          isValid: false,
          message: "State is Required",
        };
        isValid = false;
      }
      if (!companyDetail.postalcode) {
        retData.postalcode = {
          isValid: false,
          message: "Postal code is Required",
        };
        isValid = false;
      }
      if (!companyDetail.country) {
        retData.country = {
          isValid: false,
          message: "Country is Required",
        };
        isValid = false;
      }
      if (!companyDetail.address) {
        retData.address = {
          isValid: false,
          message: "Address is Required",
        };
        isValid = false;
      }
      if (!companyDetail.paymentTerm) {
        retData.paymentTerm = {
          isValid: false,
          message: "PaymentTerm is Required",
        };
        isValid = false;
      }
      if (!companyDetail.automatedPurchseOrder) {
        retData.automatedPurchseOrder = {
          isValid: false,
          message: "Automate sending Purchase Order is Required",
        };
        isValid = false;
      }

      if (!companyDetail.supplierCategory) {
        retData.supplierCategory = {
          isValid: false,
          message: "Supplier Category is Required",
        };
        isValid = false;
      }
      if (!bankDetail.name) {
        retData.bankHolderName = {
          isValid: false,
          message: "Bank holder name is Required",
        };
        isValid = false;
      }
      if (!bankDetail.acNo) {
        retData.acNo = {
          isValid: false,
          message: "Account number is Required",
        };
        isValid = false;
      }
      if (!bankDetail.bankName) {
        retData.bankName = {
          isValid: false,
          message: "Bank name is Required",
        };
        isValid = false;
      }
      if (!bankDetail.taxId) {
        retData.taxId = {
          isValid: false,
          message: "Text id is Required",
        };
        isValid = false;
      }
      if (!bankDetail.bankCode) {
        retData.bankCode = {
          isValid: false,
          message: "Bank code is Required",
        };
        isValid = false;
      }
      if (!bankDetail.currency) {
        retData.currency = {
          isValid: false,
          message: "Currency is Required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleRadioButton = (e) => {
    let { companyDetail } = this.state;
    companyDetail.automatedPurchseOrder = e.target.value;
    this.setState({ companyDetail });
  };

  render() {
    const { accountDetails, bankDetail, companyDetail, isSubmit } = this.state;
    let errorData = this.validateForm(isSubmit);

    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-button">
                <div className="request-purpose-head-left">
                  <h3>Add Supplier</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="add-supplier-details">
            <div className="account-holder-details">
              <div className="detail-heading">
                <h4>Account Holder Details</h4>
              </div>
              <div className="requisitions-filter">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={(e) => this.handleStateChange(e, "account")}
                        value={accountDetails.name}
                        placeholder="enter supplier name"
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.name.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter supplier email"
                        name="email"
                        onChange={(e) => this.handleStateChange(e, "account")}
                        value={accountDetails.email}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.email.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Contact</label>
                      <input
                        type="number"
                        name="contactNo"
                        className="form-control"
                        placeholder="enter contact number"
                        onChange={(e) => this.handleStateChange(e, "account")}
                        value={accountDetails.contactNo}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.contactNo.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Phone No.</label>
                      <input
                        type="number"
                        name="phoneNo"
                        className="form-control"
                        placeholder="enter phone number"
                        onChange={(e) => this.handleStateChange(e, "account")}
                        value={accountDetails.phoneNo}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.phoneNo.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        className="form-control"
                        placeholder="enter designation number"
                        onChange={(e) => this.handleStateChange(e, "account")}
                        value={accountDetails.designation}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.designation.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-holder-details">
              <div className="detail-heading">
                <h4>Company Details</h4>
              </div>
              <div className="requisitions-filter">
                <div className="row d-flex align-items-center justify-content-start">
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Company Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="enter company name"
                        onChange={(e) => this.handleStateChange(e, "company")}
                        value={companyDetail.name}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.companyName.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Registration No.</label>
                      <input
                        type="text"
                        name="registrationNo"
                        className="form-control"
                        placeholder="enter regstration number"
                        value={companyDetail.registrationNo}
                        onChange={(e) => this.handleStateChange(e, "company")}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.registrationNo.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">
                        Automate sending Purchase Order
                      </label>
                      <RadioGroup
                        aria-label="quiz"
                        name="bidder"
                        className="bidder-box"
                        onChange={this.handleRadioButton}
                        isvalid={errorData.automatedPurchseOrder.isValid}
                      >
                        <FormControlLabel
                          value="best"
                          control={<Radio />}
                          label="yes"
                        />
                        <FormControlLabel
                          value="worst"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                      <span className="d-block w-100 text-danger">
                        {errorData.automatedPurchseOrder.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">City</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="city"
                            value={companyDetail.city}
                            onChange={(e) =>
                              this.handleStateChange(e, "company")
                            }
                          >
                            <option value="">Main Office USA</option>
                            <option value={10}>abc</option>
                            <option value={20}>def</option>
                            <option value={30}>abc</option>
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {errorData.city.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">State</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="state"
                            value={companyDetail.state}
                            onChange={(e) =>
                              this.handleStateChange(e, "company")
                            }
                          >
                            <option value="">Main Office USA</option>
                            <option value={10}>abc</option>
                            <option value={20}>def</option>
                            <option value={30}>abc</option>
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {errorData.state.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Postal Code</label>
                      <input
                        type="text"
                        name="postalcode"
                        className="form-control"
                        placeholder="enter postal code"
                        value={companyDetail.postalcode}
                        onChange={(e) => this.handleStateChange(e, "company")}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.postalcode.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-4 ">
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Country</label>
                            <div className="new-requeust-massge">
                              <FormControl className="payment-select-menu">
                                <NativeSelect
                                  name="country"
                                  value={companyDetail.country}
                                  onChange={(e) =>
                                    this.handleStateChange(e, "company")
                                  }
                                >
                                  <option value="">Main Office USA</option>
                                  <option value={10}>abc</option>
                                  <option value={20}>def</option>
                                  <option value={30}>abc</option>
                                </NativeSelect>
                              </FormControl>
                              <span className="d-block w-100 text-danger">
                                {errorData.country.message}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Payment Terms.</label>
                            <div className="new-requeust-massge">
                              <FormControl className="payment-select-menu">
                                <NativeSelect
                                  name="paymentTerm"
                                  value={companyDetail.paymentTerm}
                                  onChange={(e) =>
                                    this.handleStateChange(e, "company")
                                  }
                                >
                                  <option value="">Main Office USA</option>
                                  <option value={10}>abc</option>
                                  <option value={20}>def</option>
                                  <option value={30}>abc</option>
                                </NativeSelect>
                              </FormControl>
                              <span className="d-block w-100 text-danger">
                                {errorData.paymentTerm.message}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Supplier Category</label>
                            <input
                              type="text"
                              name="supplierCategory"
                              className="form-control"
                              placeholder="enter supplier category"
                              value={companyDetail.supplierCategory}
                              onChange={(e) =>
                                this.handleStateChange(e, "company")
                              }
                            />
                            <span className="d-block w-100 text-danger">
                              {errorData.supplierCategory.message}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-8">
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Address</label>
                            <div className="new-requeust-massge ">
                              <textarea
                                name="address"
                                value={companyDetail.address}
                                onChange={(e) =>
                                  this.handleStateChange(e, "company")
                                }
                              />
                              <span className="d-block w-100 text-danger">
                                {errorData.address.message}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-holder-details">
              <div className="detail-heading">
                <h4>Bank Details</h4>
              </div>
              <div className="requisitions-filter">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Account Holder Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="enter account holder name"
                        onChange={(e) => this.handleStateChange(e, "bank")}
                        value={bankDetail.name}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.bankHolderName.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Account No.</label>
                      <input
                        type="text"
                        name="acNo"
                        className="form-control"
                        placeholder="enter account nummber"
                        onChange={(e) => this.handleStateChange(e, "bank")}
                        value={bankDetail.acNo}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.acNo.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Bank</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="bankName"
                            value={companyDetail.bankName}
                            onChange={(e) => this.handleStateChange(e, "bank")}
                          >
                            <option value="">Main Office USA</option>
                            <option value={10}>abc</option>
                            <option value={20}>def</option>
                            <option value={30}>abc</option>
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {errorData.bankName.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Tax Id</label>
                      <input
                        type="taxId"
                        name="taxId"
                        className="form-control"
                        placeholder="enter tax id"
                        onChange={(e) => this.handleStateChange(e, "bank")}
                        value={bankDetail.taxId}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.taxId.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Bank Code</label>
                      <input
                        type="text"
                        name="bankCode"
                        className="form-control"
                        placeholder="enter bank code"
                        onChange={(e) => this.handleStateChange(e, "bank")}
                        value={bankDetail.bankCode}
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.bankCode.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Currancy</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="currency"
                            value={companyDetail.currency}
                            onChange={(e) => this.handleStateChange(e, "bank")}
                          >
                            <option value="">Main Office USA</option>
                            <option value={10}>abc</option>
                            <option value={20}>def</option>
                            <option value={30}>abc</option>
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {errorData.currency.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-holder-details">
              <div className="detail-heading">
                <h4>Attach Documents</h4>
              </div>
              <div className="attach">
                <input
                  type="file"
                  placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                  accept=" .pdf , .doc , .ppt , .jpg , .png"
                  name="requisitionFile"
                  onChange={this.handleUploadFile}
                  multiple
                />
                <CloudUploadIcon className="icon" />
                <div className="file-content">
                  <p>Upload file</p>
                </div>
              </div>
              <div className="create-btn">
                <Button
                  variant="outlined"
                  className="primary-btn"
                  onClick={this.addSupplier}
                >
                  <span className="MuiButton-label">Create</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { add_supplier_status, add_supplier_res } = state.procurement;
  return {
    add_supplier_status,
    add_supplier_res,
  };
};

export default connect(mapStateToProps)(AddSupplier);
