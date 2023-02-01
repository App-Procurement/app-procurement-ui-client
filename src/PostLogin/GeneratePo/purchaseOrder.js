import React, { Component } from "react";
import {

  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import Loader from "react-js-loader";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import purchasedRequisitionIcon from "../../assets/images/dashbord/purchased-requisition-icon.png";
import FilterIcon from "../../assets/images/filter-icon.png";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";

class Purchase extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      rfqNo: "",
      rfqType: "",
      quotationDeadLine: "",
      formStatus: "",
      status: false,
      loadingStatus: false,
      activeindex: 0,
      requiData: {
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
      },
      formData: {
        dueDate: "yyyy-mm-dd",
        deliveryDate: "yyyy-mm-dd",
        location: "",
        Department: "",
        Request: "",
        Note: "",
      },
      columns: [
        {
          label: "S No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: "Requester",
          key: "createdBy",
        },
        {
          label: "Location",
          key: "supplier",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.city}`}>
                <span className={"department-value"}>{value.city}</span>
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
                <span className={"department-value"}>{value.name}</span>
              </td>
            );
          },
        },
        {
          label: "Total Amount",
          key: "totalAmount",
        },
        {
          label: "Creation Date",
          key: "createdOn",
        },
        {
          label: "Status",
          key: "supplier",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.status}`}>
                <Button
                  variant="outlined"
                  className={
                    value.status === "approved"
                      ? "department-value green-btn"
                      : value.status === "pending"
                      ? "department-value status-btn"
                      : "department-value onahau-btn"
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
          key: "id",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Link to={`/postlogin/purchaseorder/${value}`}>View More</Link>
              </td>
            );
          },
        },
      ],
      tableData: [],
      entireData: {},
      uploadedFileList: [],
      selectedFile: {},
      approvedPurchaseOrderCount: 0,
      pendingPurchaseOrderCount: 0,
      rejectedPurchaseOrderCount: 0,
    };
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
  }

  componentDidUpdate(prevProps) {
    let {
      approvedPurchaseOrderCount,
      pendingPurchaseOrderCount,
      rejectedPurchaseOrderCount,
    } = this.state;
    if (
      prevProps.purchase_status !== this.props.purchase_status &&
      this.props.purchase_status === status.SUCCESS
    ) {
      if (this.props.purchase_data && this.props.purchase_data.length > 0) {
        this.setState({
          loadingStatus: !this.state.loadingStatus,
        });
        let { tableData } = this.state;
        this.props.purchase_data.map((item) => {
          if (item.details.supplier.status === "approved") {
            approvedPurchaseOrderCount++;
          } else if (item.details.supplier.status === "pending") {
            pendingPurchaseOrderCount++;
          } else if (item.details.supplier.status === "rejected") {
            rejectedPurchaseOrderCount++;
          }
          let itemData = item.details;
          tableData.push({
            ...itemData,
            id: item.id,
          });
          this.setState({
            tableData,
            approvedPurchaseOrderCount,
            pendingPurchaseOrderCount,
            rejectedPurchaseOrderCount,
          });
        });
      }
    }
  }

  onClickCreateNewRequester = (id) => {
    this.props.history.push(`/postlogin/requestforpurpose/newrequest`);
  };

  handleToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  handleDates = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  handleStateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      columns,
      tableData,
      status,
      rfqNo,
      rfqType,
      quotationDeadLine,
      formStatus,
    } = this.state;

    return (
      <div className="main-content">
        <div className="purchse-order">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8 col-form-button">
                <div className="request-purpose-head-left">
                  <h3>{t("Purchase Order")}</h3>
                </div>
              </div>
              <div className="col-sm-12 col-md-5 col-lg-4 col-xl-4 col-form-button">
                <div className="request-purpose-head-right" />
              </div>
            </div>
          </div>
          <div className="progress-rfp-boxs">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">All purchase Order</div>
                    <h4>{tableData.length}</h4>
                  </div>
                  <div className="purchased-image">
                    <img src={purchaseOrder} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Approved Purchse Order</div>
                    <h4>{this.state.approvedPurchaseOrderCount}</h4>
                  </div>
                  <div className="purchased-image approved">
                    <img src={approvedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 ">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Pendding Purchse Order</div>
                    <h4>{this.state.pendingPurchaseOrderCount}</h4>
                  </div>
                  <div className="purchased-image pending">
                    <img src={pendingRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Rejected purchse Order</div>
                    <h4>{this.state.rejectedPurchaseOrderCount}</h4>
                  </div>
                  <div className="purchased-image rejected">
                    <img src={purchasedRequisitionIcon} alt="" />
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
                        className="form-control"
                        value={rfqNo}
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
                            value={rfqType}
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
                        placeholder={"YYYY-MM-DD"}
                        value={quotationDeadLine}
                        onChange={(date) =>
                          this.handleDates(date, "quotationDeadLine")
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
                            name="formStatus"
                            value={formStatus}
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
          {this.state.loadingStatus ? (
            tableData &&
            tableData.length > 0 && (
              <Table
                valueFromData={{
                  columns: columns,
                  data: tableData,
                }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                isLoading={this.props.purchase_status === status.IN_PROGRESS}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                showingLine="Showing %start% to %end% of %total% "
              />
            )
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
  const { purchase_data, purchase_status } = state.procurement;

  return { purchase_data, purchase_status };
};

const PurchaseOrder = withTranslation()(connect(mapStateToProps)(Purchase));
export default PurchaseOrder;
