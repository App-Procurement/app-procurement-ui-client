import React, { Component } from "react";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { t } from "i18next";
import Attachments from "./components/Attachments";
import Comments from "./components/Comments";
import SupplierInfo from "./components/SupplierInfo";
import ActivityLogs from "./components/ActivityLogs";
import RequestorDetails from "./components/RequestorDetails";
import RequestTimeline from "./components/RequestTimeline";
import RequestOverviewHead from "./components/RequestOverviewHead";
import { commonFunctions } from "../../_utilities/commonFunctions";
import Button from "@material-ui/core/Button";
import { purchaseOrderAction, requestAction } from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Table from "../../Table/Table";

class ViewDetails extends Component {
  inputOpenFileRef;
  requestNav;
  constructor(props) {
    super(props);
    this.state = {
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
      entireData: {},
      uploadedFileList: [],
      selectedFile: {},
      activeKey: 0,
      requestData: {},
      columns: [
        {
          label: "Name",
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
          label: "Category",
          key: "createdBy",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requisitions-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
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
          label: "Quantity",
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
          label: "Unit",
          key: "totalPrice",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requestor"}>${value}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "createdOn",
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
          label: "Total Cost",
          key: "status",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button
                  variant="outlined"
                  className="department-value status-btn "
                >
                  {value}
                </Button>
              </td>
            );
          },
        },
        // {
        //   label: 'Edit',
        //   key: 'id',
        //   renderCallback: (value) => {
        //     return (
        //       <td key={`${Math.random()}_${value}`}>
        //         <Link to={`/postlogin/purchaseorder/${value}`}>View Details</Link>
        //       </td>
        //     );
        //   },
        // },
      ],
      tableData: [],
    };
    this.inputOpenFileRef = React.createRef();
    this.requestNav = [
      {
        name: "Request Overview",
        id: 5,
        component: RequestorDetails,
        dataKey: "requestOverView",
      },
      {
        name: "Attachments",
        id: 1,
        component: Attachments,
        dataKey: "requestAttachMents",
      },
      {
        name: "Comments",
        id: 2,
        component: Comments,
        dataKey: "requestComment",
      },
      {
        name: "Supplier Info",
        id: 3,
        component: SupplierInfo,
        dataKey: "requestSupplierInfo",
      },
      {
        name: "Activity Logs",
        id: 4,
        component: ActivityLogs,
        dataKey: "activityLogs",
      },
    ];
  }

  onClickCreateNewRequester = (id) => {
    this.props.history.push(`/postlogin/requestforpurpose/newrequest`);
  };

  handelKey = (type) => {
    this.setState({ activeKey: type });
  };

  componentDidMount() {
    let id = 1234;
    this.props.dispatch(requestAction.getRequestData(id));
    if (this.props.approvepo_data) {
      this.setState({
        entireData: this.props.approvepo_data,
        tableData: this.props.approvepo_data.requisitionList,
      });
    } else {
      this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (
        this.props.request_data &&
        Object.keys(this.props.request_data).length > 0
      ) {
        this.setState({ requestData: { ...this.props.request_data } });
      }
    }

    if (
      prevProps.approvepo_status !== this.props.approvepo_status &&
      this.props.approvepo_status === status.SUCCESS
    ) {
      if (
        this.props.approvepo_data &&
        this.props.approvepo_data.requisitionList
      ) {
        this.setState({
          entireData: this.props.approvepo_data,
          tableData: this.props.approvepo_data.requisitionList,
        });
      }
    }
  }

  render() {
    const { activeKey, tableData, columns, requestData } = this.state;
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="view-details-contant">
            <div className="request-head">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-button">
                  <div className="request-purpose-head-left">
                    <h3>{t("Request")}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="request-content-left">
                  <RequestOverviewHead
                    activeKey={activeKey}
                    handelKey={this.handelKey}
                    requestNav={this.requestNav}
                    requestData={requestData}
                  />

                  <div className="overview-tabs-contant active">
                    {this.requestNav ? (
                      this.requestNav.map((value, index) => (
                        <>
                          {index === activeKey &&
                          requestData &&
                          requestData[value.dataKey] ? (
                            <value.component
                              requestData={requestData[value.dataKey]}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <></>
                    )}
                    {activeKey === 0 && (
                      <>
                        <div className="order-item-table">
                          <div className="order-item-head">
                            <h4>Order Line Items</h4>
                          </div>
                          {tableData && tableData.length > 0 && (
                            <Table
                              valueFromData={{
                                columns: columns,
                                data: tableData,
                              }}
                              perPageLimit={6}
                              visiblecheckboxStatus={false}
                              isLoading={
                                this.props.recieved_rfp_status ===
                                status.IN_PROGRESS
                              }
                              tableClasses={{
                                table: "ticket-tabel",
                                tableParent: "tickets-tabel",
                                parentClass: "all-support-ticket-tabel",
                              }}
                              showingLine="Showing %start% to %end% of %total% "
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {requestData?.requestTimeline ? (
                <RequestTimeline requestData={requestData.requestTimeline} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { approvepo_data, approvepo_status, get_request_status, request_data } =
    state.procurement;
  return { approvepo_data, approvepo_status, get_request_status, request_data };
};

ViewDetails = withTranslation()(connect(mapStateToProps)(ViewDetails));

export default ViewDetails;
