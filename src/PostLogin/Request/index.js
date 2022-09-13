import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { requestForPurposeAction, requestAction } from "../../_actions";
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

class Request extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      requestData: {},
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
          key: "name",
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
          key: "location",
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
                <span className={"requestor"}>${value}</span>
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
                <span className="department-value">
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
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
      tableData: [],
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
    let { uploadedFileList, selectedFile } = this.state;

    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (
        this.props.request_data &&
        Object.keys(this.props.request_data).length > 0
      ) {
        // console.log("my requestData",this.props.request_data.myRequest)
        this.setState({ requestData: { ...this.props.request_data } });
      }
    }

    if (
      this.props.request_for_purpose_status !==
        prevProps.request_for_purpose_status &&
      this.props.request_for_purpose_status === status.SUCCESS
    ) {
      if (
        this.props.request_for_purpose_list &&
        this.props.request_for_purpose_list.length > 0
      ) {
        for (let i = 0; i < this.props.request_for_purpose_list.length; i++) {
          this.props.request_for_purpose_list[i].totalCost =
            this.props.request_for_purpose_list[i].price *
            this.props.request_for_purpose_list[i].quantity;
        }
        this.setState({ tableData: this.props.request_for_purpose_list });
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

  onClickCreateNewRequester = (id) => {
    this.props.history.push(`/postlogin/request/viewrequest`);
  };

  render() {
    const { columns, tableData, requestData } = this.state;
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-xs-6 col-sm-6 col-md-7 col-lg-8 col-xl-8 col-form-button">
                <div className="request-purpose-head-left">
                  <h4>{t("My Request")}</h4>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-5 col-lg-4 col-xl-4 col-form-button">
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
                    {requestData?.myRequest ? (
                      <>
                        <h4>{requestData.myRequest.allRequest}</h4>
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
                    {requestData?.myRequest ? (
                      <>
                        <h4>{requestData.myRequest.approvedRequest}</h4>
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
                    {requestData?.myRequest ? (
                      <>
                        <h4>{requestData.myRequest.pendingRequest}</h4>
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
                    {requestData?.myRequest ? (
                      <>
                        <h4>{requestData.myRequest.rejectedRequest}</h4>
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
          <div className="search-fillter">
            <Button variant="outlined" className="fillter-btn">
              <i className="fa fa-filter" aria-hidden="true"></i>
              Search By Filters
            </Button>
          </div>
          <Table
            valueFromData={{ columns: columns, data: tableData }}
            perPageLimit={6}
            visiblecheckboxStatus={false}
            isLoading={this.props.recieved_rfp_status === status.IN_PROGRESS}
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
