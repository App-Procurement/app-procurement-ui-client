import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
// import { requestForPurposeAction, requestAction ,requestForQuotationAction} from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { commonFunctions } from "../../_utilities/commonFunctions";
//import purchasedRequisitionIcon from '../../assets/images/dashbord/purchased-requisition-icon.png';
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import { requestForPurposeAction, requestAction ,} from "../../_actions";
import { requestForQuotationAction } from "../../_actions";
import NativeSelect from "@material-ui/core/NativeSelect";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import FilterIcon from "../../assets/images/filter-icon.png";

class RequestForQuotation extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      requestData: {},
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
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${index}`}>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
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
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
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
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requestor"}>${value}</span>
              </td>
            );
          },
        },
        {
          label: "Quote Deadline",
          key: "Quote Deadline",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requestor"}>${value}</span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button
                  variant="outlined"
                  className="department-value status-btn"
                >
                  {value}
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
                {/* <Link to={`${value}`}> */}
                <Button variant="outlined" className="primary-btn">
                  View Response
                </Button>
                {/* </Link> */}
              </td>
            );
          },
        },
      ],
      tableData: [],
      uploadedFileList: [],
      selectedFile: {},
      status: false,
    };
    this.inputOpenFileRef = React.createRef();
  };

  // validate = (isSubmitted) => {
  //   const validObj = {
  //     isValid: true,
  //     message: "",
  //   };
  //   let isValid = true;
  //   const retData = {
  //     rfqNo: validObj,
  //     rfqType: validObj,
  //     quotationDeadline: validObj,
  //     status: validObj,
  //     isValid,
  //   };

  //   if (isSubmitted) {
  //     const { formData } = this.state;

  //     if (!formData.rfqNo) {
  //       retData.rfqNo = {
  //         isValid: false,
  //         message: "Rfq No. is required",
  //       };
  //       isValid = false;
  //     }
  //     if (!formData.rfqType) {
  //       retData.rfqType = {
  //         isValid: false,
  //         message: "Rfq Type is required",
  //       };
  //       isValid = false;
  //     }
  //     if (!formData.quotationDeadline) {
  //       retData.quotationDeadline = {
  //         isValid: false,
  //         message: "Quotation Deadline is required",
  //       };
  //       isValid = false;
  //     }
  //     if (!formData.status) {
  //       retData.status = {
  //         isValid: false,
  //         message: "Status is required",
  //       };
  //       isValid = false;
  //     }

  //   }

  //   retData.isValid = isValid;
  //   return retData;
  // };

  // onSubmitSearch = (event) => {
  //   event.preventDefault();
  //   const { formData } = this.state;

  //   this.setState({
  //     isSubmitted: true,
  //   });
  //   const errorData = this.validate(true);
  //   const { history } = this.props;


  //   if (errorData.isValid) {
  //   }
  // };

  // handleStateChange = (e) => {
  //   const { name, value } = e.target;
  //   const { requiData } = this.state;
  //   requiData[name] = value;
  //   this.setState({
  //     requiData,
  //   });
  // };

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
    this.props.dispatch(requestForQuotationAction.getRequestQuotationData());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_request_status, request_data, requiData } = this.props;

    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (this.props.request_data) {
        this.setState({ requestData: { ...this.props.request_data } });
        if (
          this.props.request_data.RQFlistData &&
          this.props.request_data.RQFlistData.length > 0
        ) {
          this.setState({
            tableData: this.props.request_data.RQFlistData,
          });
        }
      }
    }
  }
  handleToggle = () => {
    this.setState({
      status: !this.state.status,
    });
  };
  render() {
    const { columns, tableData, requestData, requiData, status, dueDate, isSubmitted } =
      this.state;
    // const errorData = this.validate(isSubmitted);
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
                          Create New RFQ{" "}
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
                    {requestData?.RFQ?.allRequest ? (
                      <>
                        <h4>{requestData.RFQ.allRequest}</h4>
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
                    {requestData?.RFQ?.approvedRequest ? (
                      <>
                        <h4>{requestData.RFQ.approvedRequest}</h4>
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
                    <div className="title">Pending Request</div>
                    {requestData?.RFQ?.pendingRequest ? (
                      <>
                        <h4>{requestData.RFQ.pendingRequest}</h4>
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
                    <div className="title">Rejected Request</div>
                    {requestData?.RFQ?.rejectedRequest ? (
                      <>
                        <h4>{requestData.RFQ.rejectedRequest}</h4>
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
                      {/* <span className="d-block w-100 text-danger">
                        {errorData.rfqNo.message}
                      </span> */}
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
                        {/* <span className="d-block w-100 text-danger">
                          {errorData.rfqType.message}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="d-block">{t("Quotation Deadline")}</label>
                    <div className="d-block">
                      <div className="d-flex align-items-center date-picker">
                        <DatePicker
                          // selected={formData.openDate}
                          placeholder={"YYYY-MM-DD"}
                          onChange={(date) => this.handleDates(date, "quotationDeadLine")}
                        />
                        <CalendarTodayTwoToneIcon className="calendar-icon" />
                      </div>
                      {/* <span className="d-block w-100 text-danger">
                        {errorData.quotationDeadline.message}
                      </span> */}
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
                        {/* <span className="d-block w-100 text-danger">
                          {errorData.status.message}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filtter-search-btn text-center mt-2">
                  <Button className="primary-btn" onClick={this.onSubmitSearch}>
                    Search</Button>
                </div>
              </div>
            )}
          </div>
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
