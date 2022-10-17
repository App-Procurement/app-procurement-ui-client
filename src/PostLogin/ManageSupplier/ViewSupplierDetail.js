import React, { Component } from 'react';
import { manageSupplierAction } from '../../_actions';
import { connect } from 'react-redux';
import { status } from '../../_constants';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class ViewSupplierDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDetails: {},
      companyDetail: {},
      bankDetail: {},
      isSubmit: false,
      uploadFile: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(manageSupplierAction.getSupplierDetail({ id: 1 }));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.supplier_detail_status !== prevProps.supplier_detail_status &&
      this.props.supplier_detail_status === status.SUCCESS
    ) {
      if (this.props.supplier_detail_data && this.props.supplier_detail_data) {
        this.setState({
          accountDetails: this.props.supplier_detail_data.accountDetails,
          companyDetail: this.props.supplier_detail_data.companyDetail,
          bankDetail: this.props.supplier_detail_data.bankDetail,
        });
      }
    }
  }

  render() {
    const { accountDetails, bankDetail, companyDetail } = this.state;
    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
          <div className="supplier-added-heading">
            <h5>Your supplier has been added successfully</h5>
          </div>
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4">
                <div className="request-purpose-head-left">
                  <h3>Add Supplier</h3>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8">
                <div className="request-purpose-head-right">
                  <div className="add-Supplier-button">
                    <ul>
                      <li>
                        <Button variant="contained" className="head-right-btn">
                          <i class="fas fa-edit"></i>
                        </Button>
                      </li>
                    </ul>
                    <Link to="/postlogin/activeproductcatalogue">
                      <Button variant="contained" disableElevation className="new-requisition-btn">
                        Add Product
                      </Button>
                    </Link>
                  </div>
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
                      <span className="d-block w-100">{accountDetails.name}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Email</label>
                      <span className="d-block w-100">{accountDetails.email}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Contact</label>
                      <span className="d-block w-100">{accountDetails.contactNo}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Phone No.</label>
                      <span className="d-block w-100">{accountDetails.phoneNo}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Designation</label>
                      <span className="d-block w-100">{accountDetails.designation}</span>
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
                      <span className="d-block w-100">{companyDetail.name}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Registration No.</label>
                      <span className="d-block w-100">{companyDetail.registrationNo}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Automate sending Purchase Order</label>
                      <RadioGroup aria-label="quiz" name="bidder" className="bidder-box" readonly>
                        <FormControlLabel value="best" control={<Radio />} label="yes" />
                        <FormControlLabel value="worst" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">City</label>
                      <span className="d-block w-100">{companyDetail.city}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">State</label>
                      <span className="d-block w-100">{companyDetail.state}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Postal Code</label>
                      <span className="d-block w-100">{companyDetail.postalcode}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-4 ">
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Country</label>
                            <span className="d-block w-100">{companyDetail.country}</span>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Payment Terms.</label>
                            <span className="d-block w-100">{companyDetail.paymentTerm}</span>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Supplier Category</label>
                            <span className="d-block w-100">{companyDetail.supplierCategory}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-8">
                        <div className="col-12 px-0">
                          <div className="form-group form-group-common">
                            <label className="d-block">Address</label>
                            <span className="d-block w-100">{companyDetail.address}</span>
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
                      <span className="d-block w-100">{bankDetail.name}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Account No.</label>
                      <span className="d-block w-100">{bankDetail.acNo}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Bank</label>
                      <span className="d-block w-100">{bankDetail.bankName}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Tax Id</label>
                      <span className="d-block w-100">{bankDetail.taxId}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Bank Code</label>
                      <span className="d-block w-100">{bankDetail.bankCode}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Currancy</label>
                      <span className="d-block w-100">{bankDetail.currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-holder-details">
              <div className="detail-heading">
                <h4>Attach Documents</h4>
              </div>
              <div className="">
                <Button variant="outlined" className="primary-btn">
                  <span className="MuiButton-label">Download File</span>
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
  const { supplier_detail_status, supplier_detail_data } = state.procurement;
  return {
    supplier_detail_status,
    supplier_detail_data,
  };
};
export default connect(mapStateToProps)(ViewSupplierDetail);
