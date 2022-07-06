import React, { Component } from 'react';
import { FormControl, NativeSelect, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { DatePicker } from '@y0c/react-datepicker';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { commonFunctions } from '../../_utilities/commonFunctions';
import { connect } from 'react-redux';
import { settingAction } from '../../_actions';
import { status } from '../../_constants';
class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        authenticationActivate:false,
        accountHolderName: '',
        companyName: '',
        country: '',
        state: '',
        emailAddress: '',
        contactNo: '',
        dateFormat: '',
        address: '',
      },
      isSubmitted: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { create_company_profile_status } = this.props
    if (create_company_profile_status !== prevProps.create_company_profile_status && create_company_profile_status === status.SUCCESS) {
      this.clearFormData()
    }
  }

  handleStateChange = (e) => {
    const { name, value, checked } = e.target;
    let { formData } = this.state;
    if(name==="authenticationActivate"){
      formData.authenticationActivate=checked
    }else{
    formData[name] = value
    
    }
    this.setState({ formData });
  };
  clearFormData = () => {
    let { formData } = this.state;
    formData = {
      accountHolderName: '',
      companyName: '',
      country: '',
      state: '',
      emailAddress: '',
      contactNo: '',
      dateFormat: '',
      address: '',
    }
    this.setState({ formData, isSubmitted: false });
  }
  handleDate = (date) => {
    let { formData } = this.state;
    formData.dateFormat = commonFunctions.convertDateToString(new Date(date))
    this.setState({ formData });
  }
  companyProfileUpdate = () => {
    const { formData } = this.state;
    this.setState({ isSubmitted: true });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      this.props.dispatch(settingAction.createCompanyProfile({ ...formData }))

    }
  };


  validate = (isSubmited) => {
    const { formData } = this.state;
    let validObj = {
      isValid: '',
      message: '',
    };
    const retData = {
      accountHolderName: validObj,
      companyName: validObj,
      country: validObj,
      state: validObj,
      emailAddress: validObj,
      contactNo: validObj,
      address: validObj,
      dateFormat: validObj,
      isValid: true,
    };
    let isValid = true;
    if (isSubmited) {
      if (!formData.accountHolderName) {
        retData.accountHolderName = {
          isValid: false,
          message: 'Account Holder Name is Required',
        };
        isValid = false;
      }
      if (!formData.companyName) {
        retData.companyName = {
          isValid: false,
          message: 'Company Name is Required',
        };
        isValid = false;
      }
      if (!formData.country) {
        retData.country = {
          isValid: false,
          message: 'Country is Required',
        };
        isValid = false;
      }
      if (!formData.state) {
        retData.state = {
          isValid: false,
          message: 'State is Required',
        };
        isValid = false;
      }
      if (!formData.emailAddress) {
        retData.emailAddress = {
          isValid: false,
          message: 'Email Address is Required',
        };
        isValid = false;
      } else if (formData.emailAddress && !commonFunctions.validateEmail(formData.emailAddress)) {
        retData.emailAddress = {
          isValid: false,
          message: 'Email Address is valid',
        };
        isValid = false;
      }
      if (!formData.contactNo) {
        retData.contactNo = {
          isValid: false,
          message: 'Contact No is Required',
        };
        isValid = false;
      } else if (formData.contactNo && !commonFunctions.validateNumeric(formData.contactNo) ) {
        retData.contactNo = {
          isValid: false,
          message: 'Contact No must be in digts',
        };
        isValid = false;
      }else if (formData.contactNo && (formData.contactNo.length>=12 || formData.contactNo.length<=9)) {
        retData.contactNo = {
          isValid: false,
          message: 'Contact No is not valid ',
        };
        isValid = false;
        
      }
      if (!formData.address) {
        retData.address = {
          isValid: false,
          message: 'Address is Required',
        };
        isValid = false;
      }
      if (!formData.dateFormat) {
        retData.dateFormat = {
          isValid: false,
          message: 'Date Format is Required',
        };
        isValid = false;
      }

    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const {
      formData,
      isSubmitted,
    } = this.state;
    let errorMessage = this.validate(isSubmitted);
    return (
      <div className="setting-right-content active">
        <div className="company-profile-content">
          <div className="heading">
            <h4>Company Profile</h4>
          </div>
          <div className="profile-form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Account Holder Name</label>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    className="form-control"
                    onChange={this.handleStateChange}
                  />
                  {errorMessage && errorMessage.accountHolderName && errorMessage.accountHolderName.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.accountHolderName.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    name="companyName"
                    placeholder="Synectiks IT & Consult"
                    className="form-control"
                    onChange={this.handleStateChange}
                  />
                  {errorMessage && errorMessage.companyName && errorMessage.companyName.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.companyName.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Country</label>
                  <div className="new-requeust-massge">
                    <FormControl className="select-menu">
                      <NativeSelect name="country" value={formData.country} onChange={this.handleStateChange}>
                        <option value="">USA</option>
                        <option value={'10'}>abc</option>
                        <option value={'20'}>def</option>
                        <option value={'30'}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    {errorMessage && errorMessage.country && errorMessage.country.message && (
                      <span className="d-block w-100 text-danger">{errorMessage.country.message} </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">State</label>
                  <div className="new-requeust-massge">
                    <FormControl className="select-menu">
                      <NativeSelect name="state" value={formData.state} onChange={this.handleStateChange}>
                        <option value="">India</option>
                        <option value={'10'}>abc</option>
                        <option value={'20'}>def</option>
                        <option value={'30'}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    {errorMessage && errorMessage.state && errorMessage.state.message && (
                      <span className="d-block w-100 text-danger">{errorMessage.state.message} </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Email Address</label>
                  <input
                    type="text"
                    value={formData.emailAddress}
                    name="emailAddress"
                    placeholder="james@example.com"
                    className="form-control"
                    onChange={this.handleStateChange}
                  />
                  {errorMessage && errorMessage.emailAddress && errorMessage.emailAddress.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.emailAddress.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Contact No.</label>
                  <input
                    type="text"
                    value={formData.contactNo}
                    name="contactNo"
                    placeholder="040-457845"
                    className="form-control"
                    onChange={this.handleStateChange}
                  />
                  {errorMessage && errorMessage.contactNo && errorMessage.contactNo.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.contactNo.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Date Format</label>
                  <DatePicker
                    name="dateFormat"
                    value={formData.dateFormat}
                    placeholder="DD/MM/YYYY"
                    // selected={formData.dateFormat}
                    onChange={(date) => this.handleDate(date)}
                  />
                  {errorMessage && errorMessage.dateFormat && errorMessage.dateFormat.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.dateFormat.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <label className="d-block">Address</label>
                  <textarea
                    type="text"
                    value={formData.address}
                    name="address"
                    placeholder=""
                    className="form-control"
                    onChange={this.handleStateChange}
                  />
                  {errorMessage && errorMessage.address && errorMessage.address.message && (
                    <span className="d-block w-100 text-danger">{errorMessage.address.message} </span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-common">
                  <FormControlLabel
                  onChange={this.handleStateChange}
                    control={<Checkbox checked={formData.authenticationActivate} name="authenticationActivate" color="primary" />}
                    label="Activate 2 - Factor Authentication"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="company-profile-buttons">
          <div className="submit-btn">
            <Button variant="contained" className="submit" onClick={this.companyProfileUpdate}>
              Submit
            </Button>
          </div>
          <div className="cancel-btn">
            <Button variant="contained" className="cancel" onClick={this.clearFormData}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { create_company_profile_status } = state.procurement
  return { create_company_profile_status }
}
export default connect(mapStatetoProps)(CompanyProfile);
