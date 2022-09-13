import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import Table from '../../Table/Table';
import 'simplebar/dist/simplebar.min.css';
import MailIcon from '@material-ui/icons/Mail';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import 'simplebar/dist/simplebar.min.css';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { invoiceAction } from '../../_actions/invoice.actions';
import { status } from '../../_constants';
import { commonFunctions } from '../../_utilities';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        status: '',
        reqNo: '',
        depart: '',
        CompletedButton: false,
        searchValue: '',
        approvedData: [],
        duplicateApprovedData: [],
      },
      approvedVendoreTableData: {
        columns: [
          {
            label: 'S.No',
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
            label: 'Requester',
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
            label: 'Location',
            key: 'dueDate',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'RequestDate'}>
                    {/* {' '}
                    <div className="graphic"></div>
                    {commonFunctions.convertDateToString(new Date(value))} */}
                    USA Office
                  </span>
                </td>
              );
            },
          },
          {
            label: 'supplier',
            key: 'RequestDepartment',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'department-value'}>
                    {/* <Button className="mailicon-btn">
                      <MailIcon />
                    </Button>
                    {value} */}
                    Ebay
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
                  <span className={'department-value'}>$8,255</span>
                </td>
              );
            },
          },
          {
            label: 'Creation Date',
            key: 'amount',
            renderCallback: (value) => {
              return (
                <td>
                  <span className={'btn details-btn'}>22/04/2022</span>
                </td>
              );
            },
          },
          {
            label: 'Status',
            key: 'status',
            renderCallback: (value, row) => {
              return (
                <td>
                  <Button
                    variant="contained"
                    className="invoices-list-btn completed-btn"
                  // onClick={() => this.onClickShowCompletedButton(row.id)}
                  >
                    <CheckIcon className="mr-2 bold" />
                    {value}
                  </Button>
                  {/* {value === 'Invoices' && (
                    <Button
                      variant="contained"
                      className="invoices-list-btn invoices-btn"
                      onClick={(id) => this.onClickShowCompletedButton(row.id)}
                    >
                      <DoneAllIcon className="mr-2" />
                      {value}
                    </Button>
                  )}
                  {value === 'Pendding' && (
                    <Button
                      variant="contained"
                      className="invoices-list-btn pendding-btn"
                      onClick={(id) => this.onClickShowCompletedButton(row.id)}
                    >
                      <WatchLaterIcon className="mr-2" />
                      {value}
                    </Button>
                  )}
                  {value === 'Invoices Sent' && (
                    <Button
                      variant="contained"
                      className="invoices-list-btn invoices-btn"
                      onClick={(id) => this.onClickShowCompletedButton(row.id)}
                    >
                      <DoneAllIcon className="mr-2" />
                      {value}
                    </Button>
                  )} */}
                </td>
              );
            },
          },
          {
            label: 'Edit',
            key: 'amount',
            renderCallback: (value) => {
              return (
                <td>
                  <Link to={`#`}>
                    View More
                  </Link>
                </td>
              );
            },
          },
        ],
        data: [],
      },
      tableData: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(invoiceAction.searchInvoice());
  }

  componentDidUpdate(prevProps) {
    const { approvedVendoreTableData } = this.state;
    if (
      prevProps.search_invoice_status !== this.props.search_invoice_status &&
      this.props.search_invoice_status === status.SUCCESS
    ) {
      if (this.props.search_invoice_data && this.props.search_invoice_data.length > 0) {
        approvedVendoreTableData.data = this.props.search_invoice_data;
      }
      this.setState({
        approvedVendoreTableData,
        duplicateApprovedData: this.props.search_invoice_data,
      });
    }
  }

  onSearchChange = (e) => {
    let { value } = e.target;
    const { duplicateApprovedData, approvedVendoreTableData } = this.state;
    let queryResult = [];
    if (duplicateApprovedData && duplicateApprovedData.length > 0) {
      if (value.trim()) {
        for (let i = 0; i < duplicateApprovedData.length; i++) {
          let approvedData = duplicateApprovedData[i];
          if (
            approvedData['RequestDepartment'].toLowerCase().indexOf(value) !== -1 ||
            approvedData['RequestDepartment'].indexOf(value) !== -1
          ) {
            queryResult.push(approvedData);
          }
        }
        approvedVendoreTableData.data = queryResult;
      } else {
        approvedVendoreTableData.data = duplicateApprovedData;
      }
    }
    this.setState({
      approvedVendoreTableData,
    });
  };

  // onClickShowCompletedButton = (id) => {
  //   this.props.history.push(`/postlogin/viewinvoice/${id}`);
  // };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  render() {
    const { columns, tableData, approvedVendoreTableData } = this.state;
    return (
      <div className="main-content">
        <div className="invoices-content">
          <div className="invoices-head-section">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-xl-5 col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="heading">
                  <h4>Invoices List</h4>
                  {/* <span>Lorem ipsum dolor sit amet</span> */}
                </div>
              </div>
              <div className="col-xl-7 col-lg-8 col-md-8 col-sm-6 col-12">
                <div className="head-right">
                  {/* <div className="search-bar">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Search here"
                        onChange={this.onSearchChange}
                      />
                      <button>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div> */}
                  <div className="new-invoices-btn">
                    <Button
                      variant="contained"
                      className="primary-btn invoices-button"
                      onClick={() => this.props.history.push(`/postlogin/invoices/createinvoice`)}
                    >
                      {/* <PersonAddIcon className="user-icon" /> */}
                      Create Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-rfp-boxs">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Settled invoice</div>
                    <h4>4256</h4>
                  </div>
                  <div className="purchased-image">
                    <img src={purchaseOrder} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Ready To Pay</div>
                    <h4>3215</h4>
                  </div>
                  <div className="purchased-image approved">
                    <img src={approvedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 ">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Outstanding Invoice</div>
                    <h4>251</h4>
                  </div>
                  <div className="purchased-image pending">
                    <img src={pendingRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Reject Invoice</div>
                    <h4>320</h4>
                  </div>
                  <div className="purchased-image rejected">
                    <img src={rejectedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-fillter">
            <Button variant="outlined" className="fillter-btn">
              <i className="fa fa-filter" aria-hidden="true"></i>
              Search By Filters
            </Button>
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    update_invoice_status,
    update_invoice,
    search_invoice_data,
    search_invoice_status,
    get_invoice_status,
    get_invoice_data,
    delete_invoice_status,
    add_invoice_status,
  } = state.procurement;
  return {
    update_invoice_status,
    update_invoice,
    search_invoice_data,
    search_invoice_status,
    get_invoice_status,
    get_invoice_data,
    delete_invoice_status,
    add_invoice_status,
  };
}
export default connect(mapStateToProps)(Invoices);
