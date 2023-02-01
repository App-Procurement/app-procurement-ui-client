import React, { Component } from "react";
import {
  NativeSelect,
  FormControl,
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  TextareaAutosize,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import Loader from "react-js-loader";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { requestForPurposeAction, requestAction } from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import FilterIcon from "../../assets/images/filter-icon.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";

class Request extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      status: false,
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
          label: "S.no",
          key: "id",
        },
        {
          label: "Requester",
          key: "name",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requisitions-no"}>
                  {row?.details?.createdBy}
                </span>
              </td>
            );
          },
        },
        {
          label: "Location",
          key: "location",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {row?.details?.location}
                </span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
          key: "supplier",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {row.details !== null
                    ? row?.details?.products
                      ? row.details.products[0]?.item.supplier.name
                      : ""
                    : ""}
                </span>
              </td>
            );
          },
        },
        {
          label: "Total Amount",
          key: "totalCost",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {row?.details?.totalAmount}
                </span>
              </td>
            );
          },
        },
        {
          label: "Creation Date",
          key: "creationDate",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">
                  {row?.details?.createdOn}
                </span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button
                  variant="outlined"
                  className={
                    row?.details?.state === "approved"
                      ? "department-value green-btn"
                      : row?.details?.state === "pending"
                      ? "department-value status-btn"
                      : "department-value onahau-btn"
                  }
                >
                  {row?.details?.state}
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
                <Link to={`/postlogin/request/viewdetail/${value}`}>
                  View More
                </Link>
              </td>
            );
          },
        },
      ],
      requestData: [],
      approvedRequestCount: 0,
      pendingRequestCount: 0,
      rejectedRequestCount: 0,
      uploadedFileList: [],
      selectedFile: {},
    };
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(requestForPurposeAction.getRequestList());
    let id = 1234;
    this.props.dispatch(requestAction.getRequestData(id));
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      uploadedFileList,
      selectedFile,
      approvedRequestCount,
      pendingRequestCount,
      rejectedRequestCount,
    } = this.state;

    if (
      this.props.request_for_purpose_status !==
        prevProps.request_for_purpose_status &&
      this.props.request_for_purpose_status === status.SUCCESS
    ) {
      if (
        this.props.request_for_purpose_list &&
        this.props.request_for_purpose_list.length > 0
      ) {
        this.setState({
          loadingStatus: !this.state.loadingStatus,
        });
        for (let i = 0; i < this.props.request_for_purpose_list.length; i++) {
          this.props.request_for_purpose_list[i].totalCost =
            this.props.request_for_purpose_list[i].price *
            this.props.request_for_purpose_list[i].quantity;
          if (this.props.request_for_purpose_list[i].details !== null) {
            if (
              this.props.request_for_purpose_list[i].details?.state ===
              "approved"
            ) {
              approvedRequestCount++;
            } else if (
              this.props.request_for_purpose_list[i].details.state === "pending"
            ) {
              pendingRequestCount++;
            } else {
              rejectedRequestCount++;
            }
          }
        }
        this.setState({
          requestData: this.props.request_for_purpose_list,
          approvedRequestCount,
          pendingRequestCount,
          rejectedRequestCount,
        });
      }
    }
    if (
      this.props.update_document_status !== prevProps.update_document_status &&
      this.props.update_document_status === status.SUCCESS
    ) {
      if (this.props.update_document_res) {
        uploadedFileList.push(this.props.update_document_res.documentId);
        this.props.dispatch(
          requestForPurposeAction.UploadFileUrlUpdate({
            url: this.props.update_document_res.url,
            files: selectedFile,
          })
        );
        this.setState({
          uploadedFileList,
        });
      }
    }
  }

  onClickCreateNewRequester = () => {
    this.props.history.push(`/postlogin/request/viewrequest`);
  };

  filtersToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  handleFilterDate = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };

  render() {
    const { columns, requestData, status, loadingStatus } = this.state;
    let { approvedRequestCount, pendingRequestCount, rejectedRequestCount } =
      this.state;
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-6 col-xs-6 col-sm-6 col-md-7 col-lg-8 col-xl-8 col-form-button">
                <div className="request-purpose-head-left">
                  <h4>{t("My Request")}</h4>
                </div>
              </div>
              <div className="col-6 col-xs-6 col-sm-6 col-md-5 col-lg-4 col-xl-4 col-form-button">
                <div className="request-purpose-head-right">
                  <Button
                    variant="contained"
                    className="new-requisition-btn"
                    disableElevation
                    onClick={this.onClickCreateNewRequester}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Create New Requisition
                  </Button>
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
                    <h4>{requestData.length}</h4>
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
                    <h4>{approvedRequestCount}</h4>
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
                    <h4>{pendingRequestCount}</h4>
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
                    <h4>{rejectedRequestCount}</h4>
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
                onClick={this.filtersToggle}
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
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) =>
                          this.handleFilterDate(date, "quotationDeadLine")
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
          {loadingStatus ? (
            <Table
              valueFromData={{ columns: columns, data: requestData }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={
                this.props.request_for_purpose_status === status.IN_PROGRESS
              }
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
  const {
    request_for_purpose_status,
    request_for_purpose_list,
    update_document_status,
    update_document_res,
    get_request_status,
    request_data,
  } = state.procurement;

  return {
    request_for_purpose_status,
    request_for_purpose_list,
    update_document_status,
    update_document_res,
    get_request_status,
    request_data,
  };
};

const requestComponet = withTranslation()(connect(mapStateToProps)(Request));

export default requestComponet;
