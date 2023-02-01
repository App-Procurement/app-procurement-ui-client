import React, { Component } from "react";
import {
  Button,
  FormControl,
  NativeSelect,
  Select,
  MenuItem,
} from "@mui/material";
import Loader from "react-js-loader";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import { requestForQuotationAction } from "../../_actions";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterIcon from "../../assets/images/filter-icon.png";

class RequestForQuotation extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      quotationData: [],
      requiData: {
        budgetType: 10,
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
        budgetData: {},
        activeStatus: -1,
        status: false,
      },
      formData: {
        rfqNo: "",
        rfqType: "",
        quotationDeadline: "",
        status: "",
      },
      columns: [
        {
          label: "RFQ No.",
          key: "id",
        },
        {
          label: "Requester",
          key: "Requester",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requisitions-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Location",
          key: "Location",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${index}`}>
                <span className={"department-value"}>
                  {value.details.location}
                </span>
              </td>
            );
          },
        },
        {
          label: "Supplier Count",
          key: "Supplier Count",
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
          key: "Total Amount",
          renderCallback: (index, value) => {
            const products = value.details.products;
            let itemsTotal = 0;
            products?.map((item) => {
              if (item.item) {
                itemsTotal += item.item.details?.price * item.quantity;
              } else if (item.price) {
                itemsTotal += item.price * item.quantity;
              }
            });
            return (
              <td key={`${Math.random()}_${index}`}>
                <span className={"requestor"}>${itemsTotal}</span>
              </td>
            );
          },
        },
        {
          label: "Quote Deadline",
          key: "Quote Deadline",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${index}`}>
                <span className={"requestor"}>
                  {value.details.requiredDeliveryDate}
                </span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value.details.status}`}>
                <Button
                  variant="outlined"
                  className={
                    value.details.status === "approved"
                      ? "department-value green-btn"
                      : value.details.status === "pending"
                      ? "department-value status-btn"
                      : "department-value onahau-btn"
                  }
                >
                  {value.details.status}
                </Button>
              </td>
            );
          },
        },
        {
          label: "Action",
          key: "id",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button variant="outlined" className="primary-btn">
                  View Response
                </Button>
              </td>
            );
          },
        },
      ],
      tableData: [],
      uploadedFileList: [],
      selectedFile: {},
      status: false,
      approvedPurchaseOrderCount: 0,
      pendingPurchaseOrderCount: 0,
      rejectedPurchaseOrderCount: 0,
    };
    this.inputOpenFileRef = React.createRef();
  }

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };

  componentDidMount() {
    this.props.dispatch(requestForQuotationAction.searchRequestQuotationData());
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      approvedPurchaseOrderCount,
      pendingPurchaseOrderCount,
      rejectedPurchaseOrderCount,
    } = this.state;
    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (this.props.request_data) {
        this.props.request_data.map((item) => {
          if (item.details.status === "approved") {
            approvedPurchaseOrderCount++;
          } else if (item.details.status === "pending") {
            pendingPurchaseOrderCount++;
          } else if (item.details.status === "rejected") {
            rejectedPurchaseOrderCount++;
          }
        });
        this.setState({ quotationData: [...this.props.request_data] });
        this.setState({
          tableData: [...this.props.request_data],
          loadingStatus: !this.state.loadingStatus,
          approvedPurchaseOrderCount,
          pendingPurchaseOrderCount,
          rejectedPurchaseOrderCount,
        });
      }
    }
  }

  handleToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  render() {
    const { columns, tableData, quotationData, requiData, status } = this.state;

    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-6 col-sm-6 col-md-7 col-lg-8 col-xl-6 col-form-button">
                <div className="request-purpose-head-left">
                  <h4>{t("RFQ")}</h4>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-5 col-lg-4 col-xl-6 col-form-button">
                <div className="request-purpose-head-right">
                  <FormControl className="new-budget-btn">
                    <Select
                      id="demo-simple-select"
                      name="budgetType"
                      value={requiData.budgetType}
                      onChange={(e) => this.handleStateChange(e)}
                    >
                      <MenuItem value={10}>New RFQ</MenuItem>
                      <MenuItem value={20}>
                        <Link to={`/postlogin/requestforquotation/createrfq`}>
                          Create New RFQ
                        </Link>
                      </MenuItem>
                      <MenuItem value={30}>Import Budget </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-rfp-boxs">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">All Request</div>
                    {quotationData ? (
                      <>
                        <h4>{quotationData.length}</h4>
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
                    <div className="title">Approved Request</div>
                    {<h4>{this.state.approvedPurchaseOrderCount}</h4>}
                  </div>
                  <div className="purchased-image approved">
                    <img src={approvedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 ">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Pending Request</div>
                    {<h4>{this.state.pendingPurchaseOrderCount}</h4>}
                  </div>
                  <div className="purchased-image pending">
                    <img src={pendingRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Rejected Request</div>
                    {<h4>{this.state.rejectedPurchaseOrderCount}</h4>}
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
                className="fillter-btn"
                onClick={this.handleToggle}
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
                    <div className="d-block">
                      <div className="d-flex align-items-center date-picker">
                        <DatePicker
                          placeholder={"YYYY-MM-DD"}
                          onChange={(date) =>
                            this.handleDates(date, "quotationDeadLine")
                          }
                        />
                        <CalendarTodayIcon className="calendar-icon" />
                      </div>
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
                  <Button className="primary-btn" onClick={this.onSubmitSearch}>
                    Search
                  </Button>
                </div>
              </div>
            )}
          </div>
          {this.state.loadingStatus ? (
            <Table
              valueFromData={{ columns: columns, data: tableData }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={this.props.get_request_status === status.IN_PROGRESS}
              tableClasses={{
                table: "ticket-tabel",
                tableParent: "tickets-tabel",
                parentClass: "all-support-ticket-tabel",
              }}
              showingLine="Showing %start% to %end% of %total% "
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
    );
  }
}

const mapStateToProps = (state) => {
  const { get_request_status, request_data } = state.procurement;

  return {
    get_request_status,
    request_data,
  };
};

const requestComponent = withTranslation()(
  connect(mapStateToProps)(RequestForQuotation)
);

export default requestComponent;
