import React, { Component } from "react";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import Loader from "react-js-loader";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { invoiceAction } from "../../_actions/invoice.actions";
import { status } from "../../_constants";
import { t } from "i18next";
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import FilterIcon from "../../assets/images/filter-icon.png";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import {
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      loadingStatus: false,
      requiData: {
        status: "",
        reqNo: "",
        depart: "",
        CompletedButton: false,
        searchValue: "",
        approvedData: [],
        duplicateApprovedData: [],
        invoiceData: {},
      },
      formData: {
        dueDate: "yyyy-mm-dd",
        deliveryDate: "yyyy-mm-dd",
        location: "",
        Department: "",
        Request: "",
        Note: "",
      },
      approvedVendoreTableData: {
        columns: [
          {
            label: "S no",
            key: "sno",
            renderCallback: (value, index) => {
              return (
                <td key={`${index + 1}`}>
                  <span className={"requisitions-no"}>{index + 1}</span>
                </td>
              );
            },
          },
          {
            label: "Requester",
            key: "purchaseOrder",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value.createdBy}`}>
                  <span className={"department-value"}>{value.createdBy}</span>
                </td>
              );
            },
          },
          {
            label: "Location",
            key: "purchaseOrder",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value.supplier.city}`}>
                  <span className={"department-value"}>
                    {value.supplier.city}
                  </span>
                </td>
              );
            },
          },
          {
            label: "Supplier",
            key: "purchaseOrder",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value.supplier.name}`}>
                  <span className={"department-value"}>
                    {value.supplier.name}
                  </span>
                </td>
              );
            },
          },
          {
            label: "Total Amount",
            key: "purchaseOrder",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value.totalAmount}`}>
                  <span className={"department-value"}>
                    {value.totalAmount}
                  </span>
                </td>
              );
            },
          },
          {
            label: "Creation Date",
            key: "purchaseOrder",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value.createdOn}`}>
                  <span className={"department-value"}>{value.createdOn}</span>
                </td>
              );
            },
          },
          {
            label: "Status",
            key: "status",
            renderCallback: (index, value) => {
              return (
                <td key={`${Math.random()}_${value.status}`}>
                  <Button
                    variant="outlined"
                    className={
                      value.status === "ready"
                        ? "department-value green-btn"
                        : value.status === "outstanding"
                        ? "department-value status-btn"
                        : value.status === "rejected"
                        ? "department-value onahau-btn"
                        : "department-value magnolia-btn"
                    }
                  >
                    {value.status}
                  </Button>
                </td>
              );
            },
          },
          {
            label: "Edit",
            key: "amount",
            renderCallback: (value) => {
              return (
                <td>
                  <Link to={`#`}>View More</Link>
                </td>
              );
            },
          },
        ],
        data: [],
      },
      tableData: [],
      itemList: [],
      invoiceData: [],
      settledInvoiceCount: 0,
      readyInvoiceCount: 0,
      outstandingInvoiceCount: 0,
      rejectedInvoiceCount: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(invoiceAction.searchInvoice());
    this.props.dispatch(invoiceAction.invoicesData());
  }

  componentDidUpdate(prevProps, prevState) {
    const { approvedVendoreTableData } = this.state;
    let {
      settledInvoiceCount,
      readyInvoiceCount,
      outstandingInvoiceCount,
      rejectedInvoiceCount,
    } = this.state;
    if (
      this.props.get_invoicedata_status !== prevProps.get_invoicedata_status &&
      this.props.get_invoicedata_status === status.SUCCESS
    ) {
      if (this.props.invoice_data) {
        this.props.invoice_data.map((item) => {
          console.log(item.details.purchaseOrder.status);
          if (item.details.purchaseOrder.status === "settled") {
            settledInvoiceCount++;
          } else if (item.details.purchaseOrder.status === "ready") {
            readyInvoiceCount++;
          } else if (item.details.purchaseOrder.status === "outstanding") {
            outstandingInvoiceCount++;
          } else if (item.details.purchaseOrder.status === "rejected") {
            rejectedInvoiceCount++;
          }
        });
        this.setState({
          invoiceData: this.props.invoice_data,
          loadingStatus: !this.state.loadingStatus,
        });
        const { itemList } = this.state;

        this.props.invoice_data.map((item) => {
          let itemData = item.details;
          itemList.push({
            ...itemData,
            id: item.id,
          });
          this.setState({
            itemList,
            settledInvoiceCount,
            readyInvoiceCount,
            outstandingInvoiceCount,
            rejectedInvoiceCount,
          });
        });
      }
    }

    if (
      prevProps.search_invoice_status !== this.props.search_invoice_status &&
      this.props.search_invoice_status === status.SUCCESS
    ) {
      if (
        this.props.search_invoice_data &&
        this.props.search_invoice_data.length > 0
      ) {
        approvedVendoreTableData.data = this.props.search_invoice_data;
      }
      this.setState({
        approvedVendoreTableData,
        duplicateApprovedData: this.props.search_invoice_data,
      });
    }
  }

  handleSearchFormChanges = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  handleSearchToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  handleSearchInputDate = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };

  render() {
    const { approvedVendoreTableData, itemList, status } = this.state;

    return (
      <div className="main-content">
        <div className="invoices-content">
          <div className="invoices-head-section">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col-xl-5 col-lg-4 col-md-4 col-sm-6 col-6">
                <div className="heading">
                  <h4>Invoices List</h4>
                </div>
              </div>
              <div className="col-xl-7 col-lg-8 col-md-8 col-sm-6 col-6">
                <div className="head-right">
                  <div className="new-invoices-btn">
                    <Button
                      variant="contained"
                      className="primary-btn invoices-button"
                      onClick={() =>
                        this.props.history.push(
                          `/postlogin/invoices/createinvoice`
                        )
                      }
                    >
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
                    {<h4>{this.state.settledInvoiceCount}</h4>}
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
                    {<h4>{this.state.readyInvoiceCount}</h4>}
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
                    {<h4>{this.state.outstandingInvoiceCount}</h4>}
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
                    {<h4>{this.state.rejectedInvoiceCount}</h4>}
                  </div>
                  <div className="purchased-image rejected">
                    <img src={rejectedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-fillter-button">
            {status === false ? (
              <Button
                variant="outlined"
                onClick={this.handleSearchToggle}
                className="fillter-btn"
              >
                <span>
                  <img src={FilterIcon} alt=" " />
                </span>
                Search By Filters
              </Button>
            ) : (
              <></>
            )}
            {status && (
              <div className="search-fillter-inner">
                <div className="fillter-icon">
                  <span>
                    <img src={FilterIcon} alt=" " />
                  </span>
                  {status ? (
                    <p
                      onClick={() =>
                        this.setState({
                          status: !this.state.status,
                        })
                      }
                    >
                      Hide Filters
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group form-group-common">
                      <label className="d-block">RFQ No.</label>
                      <input
                        type="text"
                        name="rfqNo"
                        className="form-control"
                        placeholder="Product"
                        onChange={this.handleSearchFormChanges}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group form-group-common">
                      <label className="d-block">RFQ Type</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="rfqType"
                            onChange={this.handleSearchFormChanges}
                          >
                            <option value="">Main Office USA</option>
                            <option value="amazon">Amazon</option>
                            <option value="flipkart">Flipkart</option>
                            <option value="ebay">Ebay</option>
                          </NativeSelect>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="d-block">{t("Quotation Deadline")}</label>
                    <div className="d-flex align-items-center date-picker form-group">
                      <DatePicker
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) =>
                          this.handleSearchInputDate(date, "quotationDeadLine")
                        }
                      />
                      <CalendarTodayIcon className="calendar-icon" />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group form-group-common">
                      <label className="d-block">Status</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="itemSupplier"
                            onChange={this.handleSearchFormChanges}
                          >
                            <option value="">Main Office USA</option>
                            <option value="amazon">Amazon</option>
                            <option value="flipkart">Flipkart</option>
                            <option value="ebay">Ebay</option>
                          </NativeSelect>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filtter-search-btn text-center mt-2">
                  <Button className="primary-btn">Search</Button>
                </div>
              </div>
            )}
          </div>
          <div className="invoices-tabale">
            {this.state.loadingStatus ? (
              <Table
                valueFromData={{
                  columns: approvedVendoreTableData.columns,
                  data: itemList,
                }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                searchKey="RequestDepartment"
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
    get_invoicedata_status,
    invoice_data,
    approvepo_status,
    approvepo_data,
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
    get_invoicedata_status,
    invoice_data,
    approvepo_status,
    approvepo_data,
  };
}

export default connect(mapStateToProps)(Invoices);
