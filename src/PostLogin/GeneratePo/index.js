import React, { Component } from "react";
import {
  Button,
  FormControl,
  NativeSelect,
  TextareaAutosize,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { RangeDatePicker, DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions/purchaseOrder.action";
import { status } from "../../_constants";
import Loader from "react-js-loader";
class GeneratePo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        status: "",
        reqNo: "",
        depart: "",
        GenerateButton: false,
      },
      tableData: [],
      columns: [
        {
          label: "S.No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td>
                <span className={"s-no"}>{index + 1} </span>
              </td>
            );
          },
        },
        {
          label: "Requisition No",
          key: "poNo",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitions-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Requestor",
          key: "createdBy",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Request Department",
          key: "department",
          renderCallback: () => {
            return <td></td>;
          },
        },
        {
          label: "Request type",
          key: "requisitionType",
          renderCallback: () => {
            return <td></td>;
          },
        },
        {
          label: "Requisition Total",
          key: "totalPrice",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Currency",
          key: "currency",
          renderCallback: () => {
            return <td></td>;
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Purchase Order",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <button
                  className="btn details-btn"
                  onClick={() => this.onClickShowGenerateButton(value)}
                >
                  Generate
                </button>
              </td>
            );
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(purchaseOrderAction.searchPurchaseOrder());
  }

  componentDidUpdate(prevProps) {
    let { tableData } = this.state;
    if (
      this.props.search_purchase_status !== prevProps.search_purchase_status &&
      this.props.search_purchase_status === status.SUCCESS
    ) {
      if (this.props.search_purchase_order) {
        tableData = this.props.search_purchase_order;
        this.setState({
          loadingStatus: !this.state.loadingStatus,
          tableData,
        });
      }
    }
  }

  onClickShowGenerateButton = (id) => {
    this.props.history.push(`/postlogin/generatepo/${id}`);
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  handleClickMethod = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      status: validObj,
      payment: validObj,
      conditionText: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { requiData } = this.state;
      if (!requiData.status) {
        retData.status = {
          isValid: false,
          message: "Filter By Status  is required",
        };
        isValid = false;
      }
      if (!requiData.payment) {
        retData.payment = {
          isValid: false,
          message: "Payment terms  is required",
        };
        isValid = false;
      }
      if (!requiData.conditionText) {
        retData.conditionText = {
          isValid: false,
          message: " Other terms and Condition is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const {
      requiData,
      isSubmitted,
      GenerateButton,
      columns,
      tableData,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="main-content">
        <div className="generate-content">
          {GenerateButton === true ? (
            <>
              <div className="generate-order">
                <div className="heading">
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="generate-list">
                      <ul>
                        <li>
                          <label>Requisition No. </label>
                          <span>19271-01</span>
                        </li>
                        <li>
                          <label>Requestor</label>
                          <span>james</span>
                        </li>
                        <li>
                          <label>Department</label>
                          <span>IT Department</span>
                        </li>
                        <li>
                          <label>Requisition Type</label>
                          <span>Purchase</span>
                        </li>
                        <li>
                          <label>Priority</label>
                          <span>Normal</span>
                        </li>
                        <li>
                          <label>Requisition Purpose</label>
                          <span>IT maintenance and Upgrading</span>
                        </li>
                        <li>
                          <label>Requisition Total</label>
                          <span>INR 1,000,00</span>
                        </li>
                        <li>
                          <label>Oversight Committee Report</label>
                          <span>Not Required</span>
                        </li>
                        <li>
                          <label>Approved Vendor</label>
                          <span>Viocom tech Limited</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="generate-list">
                      <ul>
                        <li>
                          <label>Date Created </label>
                          <span>09/03/2020 12:30:34 PM</span>
                        </li>
                        <li>
                          <label>Time Span</label>
                          <span>28 day ago</span>
                        </li>
                        <li>
                          <label>Status</label>
                          <span>Vendor Selected</span>
                        </li>
                        <li>
                          <label>Extra Budgetory</label>
                          <span>No</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="viocom-tech">
                  <div className="viocom-heading">
                    <h5>Viocom Tech Limited</h5>
                    <span>
                      Intial Quotation <b>0</b>
                    </span>
                    <span>
                      Final Quotation <b>1</b>
                    </span>
                    <p>View Documents</p>
                  </div>
                  <SimpleBar>
                    <div className="item-detail">
                      <table width="100%">
                        <thead className="item-content">
                          <tr>
                            <th>ID</th>
                            <th>Item Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody className="item-content">
                          <tr>
                            <td>29</td>
                            <td>Leptop Upgrade</td>
                            <td>1</td>
                            <td>100000</td>
                            <td>100000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </SimpleBar>
                  <div className="viocom-heading">
                    <h5>P.O Parameters</h5>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-label">
                      Start Date
                    </label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-form-field">
                      <DatePicker placeholder="10/28/2021" />
                      <CalendarTodayIcon className="calendar-icon" />
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-label">
                      Dellvery Date
                    </label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-form-field">
                      <DatePicker placeholder="10/28/2021" />
                      <CalendarTodayIcon className="calendar-icon" />
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-label">
                      Payment Terms
                    </label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-form-field">
                      <TextareaAutosize
                        name="payment"
                        className="payment-text"
                        value={requiData.payment}
                        onChange={this.handleStateChange}
                        isvalid={errorData.payment.isValid}
                        placeholder="Payment of total contract sum will be made to you after delivery"
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.payment.message}
                      </span>
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-label">
                      Other terms and Condition
                    </label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-form-field">
                      <TextareaAutosize
                        name="conditionText"
                        className="other-condition-text"
                        value={requiData.conditionText}
                        onChange={this.handleStateChange}
                        isvalid={errorData.conditionText.isValid}
                        placeholder=""
                      />
                      <span className="d-block w-100 text-danger">
                        {errorData.conditionText.message}
                      </span>
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-label"></label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9 col-form-button">
                      <Button
                        variant="contained"
                        className="primary-btn generate-btn"
                        disableElevation
                        onClick={this.handleClickMethod}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="generate-purchase">
                <div className="heading">
                  <h4>Generate Purchase Order</h4>
                  <div className="approve-button">
                    <Button
                      variant="contained"
                      className="primary-btn"
                      disableElevation
                      onClick={() =>
                        this.props.history.push("/postlogin/approvepo")
                      }
                    >
                      Approve
                    </Button>
                  </div>
                </div>
                <div className="requisitions-filter">
                  <div className="form">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                        Filter By Status
                      </label>
                      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                        <FormControl className="select-menu">
                          <NativeSelect
                            name="status"
                            value={requiData.status}
                            onChange={this.handleStateChange}
                            isValid={errorData.status.isValid}
                          >
                            <option value="">-Select-</option>
                            <option value={10}>abc</option>
                            <option value={20}>def</option>
                            <option value={30}>abc</option>
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {errorData.status.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                      Date Range
                    </label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center date-picker">
                          <RangeDatePicker
                            startPlaceholder="2021-06-01"
                            endPlaceholder="2021-06-10"
                          />
                          <CalendarTodayIcon className="calendar-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-form-group">
                    <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label"></label>
                    <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-button">
                      <Button
                        variant="contained"
                        className="primary-btn"
                        disableElevation
                        onClick={this.handleClickMethod}
                      >
                        Search
                      </Button>
                      <Button variant="contained" className="default-btn ml-2">
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.loadingStatus ? (
                <Table
                  valueFromData={{ columns: columns, data: tableData }}
                  perPageLimit={6}
                  visiblecheckboxStatus={true}
                  isLoading={
                    this.props.search_purchase_status === status.IN_PROGRESS
                  }
                  tableClasses={{
                    table: "ticket-tabel",
                    tableParent: "tickets-tabel",
                    parentClass: "all-support-ticket-tabel",
                  }}
                  searchKey="subject"
                  showingLine="Showing %start% to %end% of %total% Tickets"
                />
              ) : (
                <Loader
                  type="spinner-default"
                  bgColor={"#3244a8"}
                  color={"#3244a8"}
                  size={60}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search_purchase_order, search_purchase_status } = state.procurement;
  return { search_purchase_order, search_purchase_status };
};

export default connect(mapStateToProps)(GeneratePo);
