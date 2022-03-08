import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { DatePicker } from "@y0c/react-datepicker";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import LoopIcon from "@material-ui/icons/Loop";
import IconButton from "@material-ui/core/IconButton";
import { vendorAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";

class VendorEnroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      requiData: {
        firstName: '',
        lastName: '',
        gender: '',
        fatherName: '',
        brithDate: '',
        phoneNo: '',
        designation: '',
        companyName: '',
        RegistrationNo: '',
        directorName: '',
        address: '',
        bidder: '',
        city: '',
        establishment: '',
        state: '',
        business: '',
        postalCode: '',
        legalStatus: '',
        panNo: '',
        companyCategory: '',
        captcha: '',
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const{requiData}=this.state;
    if (prevProps.add_vendor_status !== this.props.add_vendor_status && this.props.add_vendor_status === status.SUCCESS) {
      requiData.firstName= '';
      requiData.lastName= '';
      requiData.gender= '';
      requiData.fatherName= '';
      requiData.brithDate= '';
      requiData.phoneNo= '';
      requiData.designation= '';
      requiData.companyName= '';
      requiData.RegistrationNo= '';
      requiData.directorName= '';
      requiData.address= '';
      requiData.bidder= '';
      requiData.city= '';
      requiData.establishment= '';
      requiData.state= '';
      requiData.business= '';
      requiData.postalCode= '';
      requiData.legalStatus= '';
      requiData.panNo= '';
      requiData.companyCategory= '';
      requiData.captcha= '';
      this.setState({
        requiData,
        isSubmitted: false,
      });
    }
  }

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  handleDateChange = (value) => {
    const { requiData } = this.state;
    requiData['brithDate'] = value;
    this.setState({
      requiData
    });

  }

  handleClickMethod = (event) => {
    const { requiData } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const sendReqData = {
        firstName: requiData.firstName,
        lastName: requiData.lastName,
        gender: requiData.gender,
        fatherName: requiData.fatherName,
        brithDate: requiData.brithDate,
        phoneNo: requiData.phoneNo,
        designation: requiData.designation,
        companyName: requiData.companyName,
        RegistrationNo: requiData.RegistrationNo,
        directorName: requiData.directorName,
        address: requiData.address,
        bidder: requiData.bidder,
        city: requiData.city,
        establishment: requiData.establishment,
        state: requiData.state,
        business: requiData.business,
        postalCode: requiData.postalCode,
        legalStatus: requiData.legalStatus,
        panNo: requiData.panNo,
        companyCategory: requiData.companyCategory,
        captcha: requiData.captcha,
      }
      this.props.dispatch(vendorAction.addVendor(sendReqData));
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      firstName: validObj,
      lastName: validObj,
      gender: validObj,
      fatherName: validObj,
      brithDate: validObj,
      phoneNo: validObj,
      designation: validObj,
      companyName: validObj,
      RegistrationNo: validObj,
      directorName: validObj,
      address: validObj,
      bidder: validObj,
      city: validObj,
      establishment: validObj,
      state: validObj,
      business: validObj,
      postalCode: validObj,
      legalStatus: validObj,
      panNo: validObj,
      companyCategory: validObj,
      captcha: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { requiData } = this.state;
      if (!requiData.firstName) {
        retData.firstName = {
          isValid: false,
          message: "First name is required",
        };
        isValid = false;
      }
      if (!requiData.lastName) {
        retData.lastName = {
          isValid: false,
          message: "Last name is required",
        };
        isValid = false;
      }
      if (!requiData.gender) {
        retData.gender = {
          isValid: false,
          message: "Gender is required",
        };
        isValid = false;
      }
      if (!requiData.fatherName) {
        retData.fatherName = {
          isValid: false,
          message: "Father name is required",
        };
        isValid = false;
      }
      if (!requiData.brithDate) {

        retData.brithDate = {
          isValid: false,
          message: "D. O. B is required",
        };
        isValid = false;
      }
      if (!requiData.phoneNo) {
        retData.phoneNo = {
          isValid: false,
          message: "Phone number is required",
        };
        isValid = false;
      }
      if (requiData.phoneNo.length > 13 || requiData.phoneNo.length < 10) {
        retData.phoneNo = {
          isValid: false,
          message: "Phone number is invalid"
        }
        isValid = false
      }
      if (!requiData.designation) {
        retData.designation = {
          isValid: false,
          message: "Designation is required",
        };
        isValid = false;
      }
      if (!requiData.companyName) {
        retData.companyName = {
          isValid: false,
          message: "Company name is required",
        };
        isValid = false;
      }
      if (!requiData.RegistrationNo) {
        retData.RegistrationNo = {
          isValid: false,
          message: "Registration No is required",
        };
        isValid = false;
      }
      if (!requiData.directorName) {
        retData.directorName = {
          isValid: false,
          message: "Director name is required",
        };
        isValid = false;
      }
      if (!requiData.address) {
        retData.address = {
          isValid: false,
          message: "Address is required",
        };
        isValid = false;
      }
      if (!requiData.bidder) {
        retData.bidder = {
          isValid: false,
          message: "Bidder is required",
        };
        isValid = false;
      }
      if (!requiData.city) {
        retData.city = {
          isValid: false,
          message: "city is required",
        };
        isValid = false;
      }
      if (!requiData.establishment) {
        retData.establishment = {
          isValid: false,
          message: "Establishment is required",
        };
        isValid = false;
      }
      if (!requiData.state) {
        retData.state = {
          isValid: false,
          message: "State is required",
        };
        isValid = false;
      }
      if (!requiData.business) {
        retData.business = {
          isValid: false,
          message: "Business is required",
        };
        isValid = false;
      }
      if (!requiData.postalCode) {
        retData.postalCode = {
          isValid: false,
          message: "Postal code is required",
        };
        isValid = false;
      }
      if (!requiData.legalStatus) {
        retData.legalStatus = {
          isValid: false,
          message: "Legal status is required",
        };
        isValid = false;
      }
      if (!requiData.panNo) {
        retData.panNo = {
          isValid: false,
          message: "Pan / Tan is required",
        };
        isValid = false;
      }
      if (!requiData.companyCategory) {
        retData.companyCategory = {
          isValid: false,
          message: "Company category is required",
        };
        isValid = false;
      }
      if (!requiData.captcha) {
        retData.captcha = {
          isValid: false,
          message: "Captcha is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const { requiData, isSubmitted } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="main-content">
        <div className="vendor-content">
          <div className="heading">
            <h4 className="d-block">Online Enrollment of Vendor</h4>
            <span className="d-block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </span>
          </div>
          <div className="d-inline-block vendor-enrollment">
            <div className="d-block add-contcat-heading">Parsonal Details</div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={requiData.firstName}
                    onChange={this.handleStateChange}
                    isvalid={errorData.firstName.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.firstName.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={requiData.lastName}
                    onChange={this.handleStateChange}
                    isvalid={errorData.lastName.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.lastName.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Gender</label>
                  <FormControl className="select">
                    <NativeSelect
                      name="gender"
                      value={requiData.gender}
                      onChange={this.handleStateChange}
                      isvalid={errorData.gender.isValid}
                    >
                      <option value="">-Select-</option>
                      <option value={10}>Male</option>
                      <option value={20}>Female</option>
                      <option value={30}>Other</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="text-danger">
                    {errorData.gender.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={requiData.fatherName}
                    onChange={this.handleStateChange}
                    isvalid={errorData.fatherName.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.fatherName.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">D. O. B</label>
                  <DatePicker
                    name="brithDate"
                    value={requiData.brithDate}
                    onChange={this.handleDateChange}
                    isvalid={errorData.brithDate.isValid}
                    placeholder="DD/MM/YYYY"
                  />
                  <span className="text-danger">
                    {errorData.brithDate.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNo"
                    value={requiData.phoneNo}
                    onChange={this.handleStateChange}
                    isvalid={errorData.phoneNo.isValid}
                    placeholder="+91"
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.phoneNo.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={requiData.designation}
                    onChange={this.handleStateChange}
                    isvalid={errorData.designation.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.designation.message}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block vendor-enrollment">
            <div className="d-block add-contcat-heading">Company Details</div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={requiData.companyName}
                    onChange={this.handleStateChange}
                    isvalid={errorData.companyName.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.companyName.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Registration No</label>
                  <input
                    type="text"
                    name="RegistrationNo"
                    value={requiData.RegistrationNo}
                    onChange={this.handleStateChange}
                    isvalid={errorData.RegistrationNo.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.RegistrationNo.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">
                    Named of the Partner / Director
                  </label>
                  <input
                    type="text"
                    name="directorName"
                    value={requiData.directorName}
                    onChange={this.handleStateChange}
                    isvalid={errorData.directorName.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.directorName.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Registered Address</label>
                  <input
                    type="text"
                    name="address"
                    value={requiData.address}
                    onChange={this.handleStateChange}
                    isvalid={errorData.address.isValid}
                    placeholder="Street No: 436/13"
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.address.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Bidder Type</label>
                  <RadioGroup
                    aria-label="quiz"
                    name="bidder"
                    className="bidder-box"
                    value={requiData.bidder}
                    onChange={this.handleStateChange}
                    isvalid={errorData.bidder.isValid}
                  >
                    <FormControlLabel
                      value="best"
                      control={<Radio />}
                      label="Indian"
                    />
                    <FormControlLabel
                      value="worst"
                      control={<Radio />}
                      label="Foreign"
                    />
                  </RadioGroup>
                  <span className="text-danger">
                    {errorData.bidder.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">City</label>
                  <input
                    type="text"
                    name="city"
                    value={requiData.city}
                    onChange={this.handleStateChange}
                    isvalid={errorData.city.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">{errorData.city.message}</span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Establishment Year</label>
                  <input
                    type="text"
                    name="establishment"
                    value={requiData.establishment}
                    onChange={this.handleStateChange}
                    isvalid={errorData.establishment.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.establishment.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">State</label>
                  <input
                    type="text"
                    name="state"
                    value={requiData.state}
                    onChange={this.handleStateChange}
                    isvalid={errorData.state.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">{errorData.state.message}</span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Nature of Business</label>
                  <input
                    type="text"
                    name="business"
                    value={requiData.business}
                    onChange={this.handleStateChange}
                    isvalid={errorData.business.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.business.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Postal Code </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={requiData.postalCode}
                    onChange={this.handleStateChange}
                    isvalid={errorData.postalCode.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.postalCode.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Legal Status</label>
                  <input
                    type="text"
                    name="legalStatus"
                    value={requiData.legalStatus}
                    onChange={this.handleStateChange}
                    isvalid={errorData.legalStatus.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.legalStatus.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">PAN/TAN Number</label>
                  <input
                    type="text"
                    name="panNo"
                    value={requiData.panNo}
                    onChange={this.handleStateChange}
                    isvalid={errorData.panNo.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">{errorData.panNo.message}</span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Company Category</label>
                  <input
                    type="text"
                    name="companyCategory"
                    value={requiData.companyCategory}
                    onChange={this.handleStateChange}
                    isvalid={errorData.companyCategory.isValid}
                    placeholder=""
                    className="form-control"
                  />
                  <span className="text-danger">
                    {errorData.companyCategory.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Enter Captcha</label>
                  <div className="d-flex aline-item-center captcha">
                    <input
                      type="text"
                      name="captcha"
                      value={requiData.captcha}
                      onChange={this.handleStateChange}
                      isvalid={errorData.captcha.isValid}
                      placeholder=""
                      className="form-control"
                    />
                    <div className="captcha-text">8 T 83 TY</div>
                    <IconButton className="refresh-btn">
                      <LoopIcon />
                      <span>Refresh</span>
                    </IconButton>
                  </div>
                  <span className="text-danger">
                    {errorData.captcha.message}
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6">
                <div className="form-group">
                  <Button variant="contained" className="back-btn">
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    className="submit-btn"
                    disableElevation
                    onClick={this.handleClickMethod}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { add_vendor_status, addVendor } = state.procurement;
  return {
    add_vendor_status,
    addVendor
  }
}
export default connect(mapStateToProps)(VendorEnroll);
