import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import "simplebar/dist/simplebar.min.css";
import MailIcon from "@material-ui/icons/Mail";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import "simplebar/dist/simplebar.min.css";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckIcon from "@material-ui/icons/Check";
import { connect } from "react-redux";
import { invoiceAction } from "../../_actions/invoice.actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { t } from "i18next";
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import { manageSupplierAction, purchaseOrderAction } from "../../_actions";
import FilterIcon from "../../assets/images/filter-icon.png";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import { PageItem } from "react-bootstrap";

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
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
            key: "requester",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value}`}>
                  <span className={"department-value"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Location",
            key: "city",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value}`}>
                  <span className={"department-value"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Supplier",
            key: "supplier",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value}`}>
                  <span className={"department-value"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Total Amount",
            key: "totalAmount",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value}`}>
                  <span className={"department-value"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Creation Date",
            key: "creationDate",
            renderCallback: (value) => {
              return (
                <td key={`${Math.random()}_${value}`}>
                  <span className={"department-value"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Status",
            key: "status",
            renderCallback: (value, row) => {
              return (
                <td>
                  <Button
                    variant="contained"
                    className="invoices-list-btn completed-btn"
                  >
                    <CheckIcon className="mr-2 bold" />
                    {value}
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
    };
  }

  componentDidMount() {
    this.props.dispatch(invoiceAction.searchInvoice());
    this.props.dispatch(invoiceAction.invoicesData());
    // this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
  }

  componentDidUpdate(prevProps, prevState) {
    const { approvedVendoreTableData } = this.state;

    if (
      this.props.get_invoicedata_status !== prevProps.get_invoicedata_status &&
      this.props.get_invoicedata_status === status.SUCCESS
    ) {
      if (this.props.invoice_data) {
        this.setState({
          invoiceData: this.props.invoice_data,
        });

        let invoiceData = this.state.invoiceData;
        let resultantData = {};
        const { itemList } = this.state;
        console.log("invoice data", this.props.invoice_data);
        this.props.invoice_data.map((item) => {
          let itemData = item.details;
          console.log("hello", itemData);
           resultantData.totalAmount = itemData.purchaseOrder.totalAmount;
          resultantData.requester = itemData.purchaseOrder.supplier.name;
          resultantData.creationDate = itemData.invoiceDueDate;
          // resultantData.supplier = itemData.purchaseOrder.supplier.name;
          resultantData.supplier = itemData.purchaseOrder.supplier.name;
          resultantData.status = itemData.purchaseOrder.status;
          resultantData.city = itemData.purchaseOrder.supplier.city;

          itemList.push(resultantData);
          this.setState({
            itemList,
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

  onSearchChange = (e) => {
    let { value } = e.target;
    const { duplicateApprovedData, approvedVendoreTableData } = this.state;
    let queryResult = [];
    if (duplicateApprovedData && duplicateApprovedData.length > 0) {
      if (value.trim()) {
        for (let i = 0; i < duplicateApprovedData.length; i++) {
          let approvedData = duplicateApprovedData[i];
          if (
            approvedData["RequestDepartment"].toLowerCase().indexOf(value) !==
              -1 ||
            approvedData["RequestDepartment"].indexOf(value) !== -1
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

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  handleToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };

  render() {
    const {
      columns,
      tableData,
      approvedVendoreTableData,
      invoiceData,
      itemList,
      status,
    } = this.state;
    console.log("itemlist", itemList);
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

                    {invoiceData?.settledInvoice ? (
                      <>
                        <h4>{invoiceData.settledInvoice}</h4>
                      </>
                    ) : (
                      <></>
                    )}
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
                    {invoiceData?.readyToPay ? (
                      <>
                        <h4>{invoiceData.readyToPay}</h4>
                      </>
                    ) : (
                      <></>
                    )}
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
                    {invoiceData?.outStandingInvoice ? (
                      <>
                        <h4>{invoiceData.outStandingInvoice}</h4>
                        {/* <h4>{requestData.myRequest.allRequest}</h4> */}
                      </>
                    ) : (
                      <></>
                    )}
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

                    {invoiceData?.rejectedInvoice ? (
                      <>
                        <h4>{invoiceData.rejectedInvoice}</h4>
                        {/* <h4>{requestData.myRequest.allRequest}</h4> */}
                      </>
                    ) : (
                      <></>
                    )}
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
                onClick={this.handleToggle}
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
                        // value={item.itemType}
                        className="form-control"
                        placeholder="Product"
                        onChange={this.handleStateChange}
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
                            onChange={this.handleStateChange}
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
                        // selected={formData.openDate}
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) =>
                          this.handleDates(date, "quotationDeadLine")
                        }
                      />
                      <CalendarTodayTwoToneIcon className="calendar-icon" />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group form-group-common">
                      <label className="d-block">Status</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="itemSupplier"
                            onChange={this.handleStateChange}
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
            <Table
              valueFromData={{
                columns: approvedVendoreTableData.columns,
                data: itemList,
              }}
              // valueFromData={{

              //   columns: approvedVendoreTableData.columns,
              //   data: this.state.itemList,
              // }}
              // searchValue={this.state.searchValue}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              // isLoading={
              //   this.props. get_invoicedata_status === status.IN_PROGRESS
              // }
              tableClasses={{
                table: "ticket-tabel",
                tableParent: "tickets-tabel",
                parentClass: "all-support-ticket-tabel",
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
