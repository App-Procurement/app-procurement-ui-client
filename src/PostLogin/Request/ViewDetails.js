import React, { Component } from "react";
import { Button } from "@mui/material";
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
import {
  purchaseOrderAction,
  requestAction,
  requestForPurposeAction,
} from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

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
      fakerData: {},
      columns: [
        {
          label: "Name",
          key: "name",
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
          key: "category",
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
          label: "Quantity",
          key: "quantity",
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
          key: "unit",
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
          key: "price",
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
          key: "totalCost",
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
      ],
      tableData: [],
      requestData: [],
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

  handleTabKey = (type) => {
    this.setState({ activeKey: type });
  };

  setCurrentRequestData = () => {
    const { requestData } = this.state;

    let filteredItem = requestData.filter((item) => {
      return item.id === Number(this.props.match.params.id);
    });
    filteredItem = filteredItem[0];
    if (filteredItem) {
      return filteredItem;
    }
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(requestAction.getRequestData(id));
    if (this.props.approvepo_data) {
      this.setState({
        entireData: this.props.approvepo_data,
        tableData: this.props.approvepo_data.requisitionList,
      });
    } else {
      this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
    }
    this.props.dispatch(requestForPurposeAction.getRequestList());
  }

  componentDidUpdate(prevProps, prevState) {
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
        this.setState({
          requestData: this.props.request_for_purpose_list,
        });
      }
    }

    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (
        this.props.request_data &&
        Object.keys(this.props.request_data).length > 0
      ) {
        this.setState({ fakerData: { ...this.props.request_data } });
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
    const { activeKey, fakerData } = this.state;
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
                    handleTabKey={this.handleTabKey}
                    requestNav={this.requestNav}
                    currentItemData={this.setCurrentRequestData()}
                  />
                  <div className="overview-tabs-contant active">
                    {this.requestNav ? (
                      this.requestNav.map((value, index) => (
                        <>
                          {index === activeKey &&
                          fakerData &&
                          fakerData[value.dataKey] ? (
                            <value.component
                              fakerData={fakerData[value.dataKey]}
                              requestData={this.setCurrentRequestData()}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {fakerData?.requestTimeline ? (
                <RequestTimeline fakerData={fakerData.requestTimeline} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    request_for_purpose_status,
    request_for_purpose_list,
    approvepo_data,
    approvepo_status,
    get_request_status,
    request_data,
  } = state.procurement;
  return {
    request_for_purpose_status,
    request_for_purpose_list,
    approvepo_data,
    approvepo_status,
    get_request_status,
    request_data,
  };
};

ViewDetails = withTranslation()(connect(mapStateToProps)(ViewDetails));

export default ViewDetails;
