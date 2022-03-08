import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { RangeDatePicker, DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../../Table/Table";
import "simplebar/dist/simplebar.min.css";
import { Link } from "react-router-dom";
import { requistionAction } from "../../../_actions";
import { connect } from "react-redux";
import { status } from "../../../_constants";
import { commonFunctions, requisitionStatus } from "../../../_utilities";

class ApprovedRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        requisitionNo: "",
        department: "",
        fromDate: "",
        toDate: "",
        status: requisitionStatus.APPROVED,
      },
      columns: [
        {
          label: 'S.No',
          key: 'sno',
          renderCallback: (value, index) => {
            return <td><span className={'s-no'}>{index + 1} </span></td>
          }
        },
        {
          label: "Requisition No",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitions-no"}>{value}</span>
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
                <span className={"date"}>
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
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
                <span className={"department-value"}>{value.name}</span>
              </td>
            );
          },
        },
        {
          label: "Requestor",
          key: "roleName",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Requisition Total",
          key: "totalPrice",
          renderCallback: (value, row) => {
            return (
              <td>
                <span className="btn details-btn">
                  {row.currency.code} {value}
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
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Action",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <Link
                  to={`/postlogin/viewdetails/${value}`}
                  className="btn details-btn"
                >
                  {"View Details"}
                </Link>
              </td>
            );
          },
        },
      ],
      isLoading: true,
      requistionList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(
      requistionAction.getRequisitions({ status: requisitionStatus.APPROVED })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.requisition_status !== this.props.requisition_status && this.props.requisition_status === status.SUCCESS) {
      this.setState({
        requistionList: this.props.requisition_list,
        isLoading: false,
      });
    }
  }

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
      requisitionNo: searchData.requisitionNo,
      department: searchData.department,
      fromDate: searchData.fromDate,
      toDate: searchData.toDate,
      status: searchData.status,
    };
    this.props.dispatch(requistionAction.getRequisitions(sendReqData));
  };

  clearSearch = () => {
    const { searchData } = this.state;
    searchData.requisitionNo = "";
    searchData.department = "";
    searchData.fromDate = "";
    searchData.toDate = "";
    this.setState({
      searchData,
    });
    this.props.dispatch(
      requistionAction.getRequisitions({ status: searchData.status })
    );
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

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      status: validObj,
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
    }
    retData.isValid = isValid;
    return retData;
  };

  renderDepartments = () => {
    const { department_list } = this.props;
    let retData = [];
    if (department_list) {
      for (let i = 0; i < department_list.length; i++) {
        retData.push(
          <option value={department_list[i].id}>{department_list[i].name}</option>
        );
      }
    }
    return retData;
  };

  render() {
    const { searchData, isLoading } = this.state;
    const { requisition_status } = this.props;
    return (
      <div className="main-content">
        <div className="approved-content">
          <div className="heading">
            <h4>Approved Requisitions</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Requisitions no
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <input
                  placeholder="647598"
                  name="requisitionNo"
                  value={searchData.requisitionNo}
                  onChange={this.handleStateChange}
                  className="light-input"
                />
                {/* <span className="d-block w-100 text-danger">{errorData.requisitionNo.message}</span> */}
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Date Range
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-picker">
                    <RangeDatePicker
                      startText="Start"
                      endText="End"
                      onChange={this.handleDatePicker}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Department
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
                {/* <span className="d-block w-100 text-danger">{errorData.department.message}</span> */}
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
            isLoading={this.props.requisition_status === status.IN_PROGRESS}
            perPageLimit={6}
            visiblecheckboxStatus={false}
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

const connectedApprovedRequisition = connect(mapStateToProps)(
  ApprovedRequisition
);
export default connectedApprovedRequisition;
