import React, { Component } from "react";
import {
  NativeSelect,
  FormControl,
  Button,
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { RangeDatePicker } from "@y0c/react-datepicker";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../../Table/Table";
import { requistionAction } from "../../../_actions";
import { connect } from "react-redux";
import { status } from "../../../_constants";
import { commonFunctions, requisitionStatus } from "../../../_utilities";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

class RequisitionTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        status: "",
        requisitionNo: "",
        department: "",
        fromDate: "",
        toDate: "",
      },
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
          label: "Requisitions No",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                {value && <span className={"requisitions-no"}>{value}</span>}
              </td>
            );
          },
        },
        {
          label: "Request Date",
          key: "createdOn",
          renderCallback: (value) => {
            return (
              <td>
                {value && (
                  <span className={"date"}>
                    {commonFunctions.convertDateToString(new Date(value))}
                  </span>
                )}
              </td>
            );
          },
        },
        {
          label: "Request Department",
          key: "department",
          renderCallback: (value) => {
            return (
              <td>
                {value && value.name && (
                  <span className={"department-value"}>{value.name}</span>
                )}
              </td>
            );
          },
        },
        {
          label: "Requestor",
          key: "createdBy",
          renderCallback: (value) => {
            return (
              <td>{value && <span className={"requestor"}>{value}</span>}</td>
            );
          },
        },
        {
          label: "Requisitions Total",
          key: "totalPrice",
          renderCallback: (value, row) => {
            return (
              <td>
                {value && row && row.currency && row.currency.code && (
                  <span className="price">
                    {row.currency.code} {value}
                  </span>
                )}
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            return <td>{value && <span className="status">{value}</span>}</td>;
          },
        },
        {
          label: "Action",
          key: "id",
          renderCallback: (value, row) => {
            return (
              <td>
                {row && (
                  <Button
                    className="secondary-btn"
                    onClick={() => this.onClickApproveReq(row)}
                  >
                    <ThumbUpIcon /> Approve
                  </Button>
                )}
              </td>
            );
          },
        },
      ],
      requistionList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(requistionAction.getRequisitions());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.requisition_status !== this.props.requisition_status &&
      this.props.requisition_status === status.SUCCESS
    ) {
      this.setState({
        requistionList: this.props.requisition_list,
      });
    }
    if (
      prevProps.approve_requisition_status !==
        this.props.approve_requisition_status &&
      this.props.approve_requisition_status === status.SUCCESS
    ) {
      this.props.dispatch(requistionAction.getRequisitions());
    }
  }

  onClickApproveReq = (data) => {
    this.props.dispatch(
      requistionAction.approveRequisition({
        requisitionId: data.id,
        roleName: data.roleName,
      })
    );
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      status: validObj,
      requisitionNo: validObj,
      department: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { requiData } = this.state;
      if (!requiData.status) {
        retData.status = {
          isValid: false,
          message: "Filter By Status is required",
        };
        isValid = false;
      }
      if (!requiData.requisitionNo) {
        retData.requisitionNo = {
          isValid: false,
          message: "Requisitions no is required",
        };
        isValid = false;
      }
      if (!requiData.department) {
        retData.department = {
          isValid: false,
          message: "Department is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { searchData } = this.state;
    searchData[name] = value;
    this.setState({
      searchData,
    });
  };

  onClickSearch = (event) => {
    const { searchData } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const sendReqData = {
      status: searchData.status,
      requisitionNo: searchData.requisitionNo,
      department: searchData.department,
      fromDate: searchData.fromDate,
      toDate: searchData.toDate,
    };
    this.props.dispatch(requistionAction.getRequisitions(sendReqData));
  };

  clearSearch = () => {
    const { searchData } = this.state;
    searchData.status = "";
    searchData.requisitionNo = "";
    searchData.department = "";
    searchData.fromDate = "";
    searchData.toDate = "";
    this.setState({
      searchData,
    });
    this.props.dispatch(requistionAction.getRequisitions({}));
  };

  renderDepartments = () => {
    const { department_list } = this.props;
    let retData = [];
    if (department_list) {
      for (let i = 0; i < department_list.length; i++) {
        retData.push(
          <option key={department_list[i].id} value={department_list[i].id}>
            {department_list[i].name}
          </option>
        );
      }
    }
    return retData;
  };

  handleDatePicker = (start, end) => {
    const { searchData } = this.state;
    if (start) {
      let startDate = commonFunctions.convertDateToString(start);
      searchData.fromDate = startDate;
    }
    if (end) {
      let endDate = commonFunctions.convertDateToString(end);
      searchData.toDate = endDate;
    }
    this.setState({
      searchData,
    });
  };

  render() {
    const { searchData } = this.state;
    const { requisition_status } = this.props;
    return (
      <div className="main-content">
        <div className="requisitions-tracker">
          <div className="heading">
            <h4>{t("Requisitions Tracker")}</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Filter By Status")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect
                    name="status"
                    value={searchData.status}
                    onChange={this.handleStateChange}
                  >
                    <option value="">-Select-</option>
                    <option value={requisitionStatus.ACTIVE}>ACTIVE</option>
                    <option value={requisitionStatus.DEACTIVE}>DEACTIVE</option>
                    <option value={requisitionStatus.DRAFT}>DRAFT</option>
                    <option value={requisitionStatus.APPROVED}>APPROVED</option>
                  </NativeSelect>
                </FormControl>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Requisitions no")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <input
                  placeholder="621345"
                  name="requisitionNo"
                  value={searchData.requisitionNo}
                  onChange={this.handleStateChange}
                  className="light-input"
                />
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Date Range")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-picker">
                    <RangeDatePicker
                      startText="Start"
                      endText="End"
                      onChange={this.handleDatePicker}
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Department")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <FormControl className="select-menu filter-status">
                  <NativeSelect
                    name="department"
                    value={searchData.department}
                    onChange={this.handleStateChange}
                  >
                    <option value="">-Select-</option>
                    {this.renderDepartments()}
                  </NativeSelect>
                </FormControl>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label"></label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-button">
                <Button
                  variant="contained"
                  className="primary-btn"
                  disableElevation
                  onClick={this.onClickSearch}
                  disabled={requisition_status === status.IN_PROGRESS}
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  onClick={this.clearSearch}
                  className="default-btn ml-2"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <Table
            valueFromData={{
              columns: this.state.columns,
              data: this.state.requistionList,
            }}
            perPageLimit={6}
            visiblecheckboxStatus={false}
            isLoading={this.props.requisition_status === status.IN_PROGRESS}
            tableClasses={{
              table: "ticket-tabel",
              tableParent: "tickets-tabel",
              parentClass: "all-support-ticket-tabel",
            }}
            searchKey="subject"
            showingLine="Showing %start% to %end% of %total% Tickets"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    approve_requisition_status,
    approve_requisition,
    requisition_status,
    requisition_list,
  } = state.procurement;
  const { department_status, department_list } = state.procurement;
  return {
    approve_requisition_status,
    approve_requisition,
    requisition_status,
    requisition_list,
    department_status,
    department_list,
  };
}

const connectedRequisitionTracker = withTranslation()(
  connect(mapStateToProps)(RequisitionTracker)
);

export default connectedRequisitionTracker;
