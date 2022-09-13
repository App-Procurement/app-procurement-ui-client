import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'simplebar/dist/simplebar.min.css';
import { DatePicker } from '@y0c/react-datepicker';
import 'rc-calendar/assets/index.css';
import { t } from 'i18next';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Link } from "react-router-dom";
import Table from '../../Table/Table';
import CheckIcon from '@material-ui/icons/Check';
import { status } from '../../_constants';
// import DoneAllIcon from '@material-ui/icons/DoneAll';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import SaveAltIcon from '@material-ui/icons/SaveAlt';
// import PrintIcon from '@material-ui/icons/Print';
// import Logo from '../../assets/images/logo.png';
// import HuntImg from '../../assets/images/hunt-img.png';
import { connect } from 'react-redux';
// import { invoiceAction } from '../../_actions/invoice.actions';
// import { status } from '../../_constants';
// import { commonFunctions } from '../../_utilities';

class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedData: {},
      formData: {
        dueDate: 'yyyy-mm-dd',
        deliveryDate: 'yyyy-mm-dd',
        location: '',
        department: '',
        request: '',
        note: '',
      },
      approvedVendoreTableData: {
        columns: [
          {
            label: 'Sno',
            key: 'sno',
            renderCallback: (index) => {
              return (
                <td>
                  <span className={'s-no'}>01</span>
                </td>
              );
            },
          },
          {
            label: 'Purchase Order No.',
            key: 'invoiceNo',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'s-no'}>William James</span>
                </td>
              );
            },
          },
          {
            label: 'PO Date',
            key: 'dueDate',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'department-value'}>
                    29/05/2022
                  </span>
                </td>
              );
            },
          },
          {
            label: 'Deparment',
            key: 'RequestDepartment',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'department-value'}>
                    Management
                  </span>
                </td>
              );
            },
          },
          {
            label: 'Total Amount',
            key: 'Requestor',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'department-value'}>$1900</span>
                </td>
              );
            },
          },
          // {
          //   label: 'Status',
          //   key: 'amount',
          //   renderCallback: (value) => {
          //     return (
          //       <td>
          //         <span className={'btn details-btn'}>22/04/2022</span>
          //       </td>
          //     );
          //   },
          // },
          {
            label: 'Status',
            key: 'status',
            renderCallback: (value, row) => {
              return (
                <td>
                  <Button
                    variant="contained"
                    className="invoices-list-btn completed-btn"
                  >
                    Approve
                  </Button>
                </td>
              );
            },
          },
          {
            label: '',
            key: 'amount',
            renderCallback: (value) => {
              return (
                <td>
                  <span className='delete-icon'><i class="fas fa-trash-alt"></i></span>
                </td>
              );
            },
          },
        ],
        data: [
          {
            sno: 'sno',
            invoiceNo: 'invoiceNo',
            dueDate: 'dueDate',
            RequestDepartment: 'RequestDepartment',
            Requestor: 'Requestor',
            status: 'status'
          },
          {
            sno: 'sno',
            invoiceNo: 'invoiceNo',
            dueDate: 'dueDate',
            RequestDepartment: 'RequestDepartment',
            Requestor: 'Requestor',
            status: 'status'
          },
        ],
      },
      tableData: [{}],
      purchaseOrder: false
    };
  }

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    let isValid = true;
    const retData = {
      dueDate: validObj,
      deliveryDate: validObj,
      location: validObj,
      department: validObj,
      request: validObj,
      note: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { formData } = this.state;
      if (!formData.dueDate) {
        retData.dueDate = {
          isValid: false,
          message: 'Due date is required',
        };
        isValid = false;
      }
      if (!formData.deliveryDate) {
        retData.deliveryDate = {
          isValid: false,
          message: 'Delivery date is required',
        };
        isValid = false;
      }
      if (!formData.location) {
        retData.location = {
          isValid: false,
          message: 'Location is required',
        };
        isValid = false;
      }
      if (!formData.department) {
        retData.department = {
          isValid: false,
          message: 'Department is required',
        };
        isValid = false;
      }
      if (!formData.request) {
        retData.request = {
          isValid: false,
          message: 'Purchase product name is required',
        };
        isValid = false;
      }
      if (!formData.note) {
        retData.note = {
          isValid: false,
          message: 'Note for requester is required',
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };
  onClickPurchaseOrder = () => {
    this.setState({
      purchaseOrder: !this.state.purchaseOrder,
    });
  }
  render() {
    const {
      dueDate,
      deliverDate,
      approvedVendoreTableData,
      purchaseOrder
    } = this.state;
    return (
      <div className="main-content">
        <div className="invoices-content">
          <div className="invoices-head-section">
            <div className="row d-flex justify-content-start align-items-center ">
              <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="heading">
                  <h4>Invoices</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="create-invoice-contant">
            <div className="create-invoice-form">
              <div className="form-group row col-form-group">
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <label className="d-block">{t('Invoice Issue Date')}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={dueDate}
                      placeholder={'YYYY-MM-DD'}
                      onChange={(date) => this.handleDates(date, 'dueDate')}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <label className="d-block">{t('Invoice Due Date')}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={deliverDate}
                      placeholder={'YYYY-MM-DD'}
                      onChange={(date) => this.handleDates(date, 'deliveryDate')}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Supplier</label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="city"
                          onChange={(e) => this.handleStateChange(e, 'company')}
                        >
                          <option value="">Main Office USA</option>
                          <option value={10}>abc</option>
                          <option value={20}>def</option>
                          <option value={30}>abc</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row col-form-group">
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Department</label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="city"
                          onChange={(e) => this.handleStateChange(e, 'company')}
                        >
                          <option value="">Main Office USA</option>
                          <option value={10}>abc</option>
                          <option value={20}>def</option>
                          <option value={30}>abc</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Invoice Amount</label>
                    <input
                      type="text"
                      name="postalcode"
                      className="form-control"
                      placeholder="enter postal code"
                      // value={companyDetail.postalcode}
                      onChange={(e) => this.handleStateChange(e, 'company')}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Currency </label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="city"
                          onChange={(e) => this.handleStateChange(e, 'company')}
                        >
                          <option value="">Main Office USA</option>
                          <option value={10}>abc</option>
                          <option value={20}>def</option>
                          <option value={30}>abc</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row col-form-group">
                <div className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Tax</label>
                    <input
                      type="text"
                      name="postalcode"
                      className="form-control"
                      placeholder="enter postal code"
                      // value={companyDetail.postalcode}
                      onChange={(e) => this.handleStateChange(e, 'company')}
                    />
                  </div>
                </div>
              </div>
            </div>
            {purchaseOrder == false &&
              <div className="add-purchase-order-btn text-center mt-5">
                <Button
                  variant="contained"
                  className="primary-btn invoices-button"
                  onClick={() => this.onClickPurchaseOrder("order")}>
                  <i class="fas fa-plus-circle"></i>
                  Add Purchase Order
                </Button>
              </div>
            }
            {purchaseOrder &&
              <div className="add-purchase-order-inner-contant">
                <div className="inner-head my-4">
                  <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-6">
                      <div className="head-left">
                        <h4>Purchase Order</h4>
                      </div>
                    </div>
                    <div className="col-6 text-md-right text-sm-right">
                      <div className="head-right">
                        <Button
                          variant="contained"
                          className="primary-btn invoices-button"
                          onClick={() => this.props.history.push(`/postlogin/invoices/createinvoicepurchaseorder`)}
                        >
                          <i class="fas fa-plus-circle"></i>
                          Add Purchase Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoices-tabale">
                  <Table
                    valueFromData={{
                      columns: approvedVendoreTableData.columns,
                      data: approvedVendoreTableData.data,
                    }}
                    searchValue={this.state.searchValue}
                    perPageLimit={6}
                    visiblecheckboxStatus={false}
                    isLoading={this.props.search_invoice_status === status.IN_PROGRESS}
                    tableClasses={{
                      table: 'ticket-tabel',
                      tableParent: 'tickets-tabel',
                      parentClass: 'all-support-ticket-tabel',
                    }}
                    searchKey="RequestDepartment"
                    showingLine="Showing %start% to %end% of %total% Tickets"
                  />
                </div>
                <div className="create-btn text-center">
                  <Button
                    variant="contained"
                    className="primary-btn invoices-button">
                    Create
                  </Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { get_invoice_status, get_invoice_data } = state.procurement;
//   return {
//     get_invoice_status,
//     get_invoice_data,
//   };
// };
export default CreateInvoice;
