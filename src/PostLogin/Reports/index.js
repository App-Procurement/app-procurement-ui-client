import React, { Component } from "react";
import { FormControl, NativeSelect, Button, Avatar, Box } from "@mui/material";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities";
import { AvatarGroup } from "@mui/material";
import { reportAction } from "../../_actions";
import Loader from "react-js-loader";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      activeindex: 0,
      requiData: {
        status: "",
        reqNo: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
      },

      years: [2021, 2022, 2023, 2024],
      divisions: [1, 2, 3, 4, 5, 6],
      columns: [
        {
          label: "S.No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          key: "requisitionTypes",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"s-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Requisition Types",
          key: "requisitionDepartment",
          renderCallback: (value) => {
            return (
              <td>
                <span className="={requisitions-no}">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Last Update",
          key: "lastUpdated",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitions-no"}>
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
              </td>
            );
          },
        },
        {
          label: "Created At",
          key: "createdAt",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitions-no"}>
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
              </td>
            );
          },
        },
        {
          label: "Notification",
          key: "notifications",
          renderCallback: (value) => {
            return (
              <td>
                <Box className="reports-notification">
                  <FormControl>
                    <NativeSelect
                      defaultValue={0}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      {value.map((val, index) => (
                        <option value={index}>{val.notification}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </td>
            );
          },
        },
        {
          label: "Members",
          key: "profile",
          renderCallback: (value) => {
            return (
              <td>
                <AvatarGroup max={5}>
                  {value.map((val) => (
                    <Avatar alt="Remy Sharp" src={val.userProfile} />
                  ))}
                </AvatarGroup>
              </td>
            );
          },
        },
      ],
      tableData: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(reportAction.getRepots());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.reports_status !== prevProps.reports_status &&
      this.props.reports_status === status.SUCCESS
    ) {
      if (this.props.reports_data && this.props.reports_data.length > 0) {
        this.setState({
          loadingStatus: !this.state.loadingStatus,
          tableData: this.props.reports_data,
        });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    this.props.history.push(`/postlogin/recivedrfp/${id}`);
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };

  handleClickMethod = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      // const sendReqData = {
      //   status: requiData.status,
      //   reqNo: requiData.reqNo,
      //   depart: requiData.depart,
      // };
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      status: validObj,
      reqNo: validObj,
      depart: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { requiData } = this.state;
      if (!requiData.status) {
        retData.status = {
          isValid: false,
          message: "Filter By Status  is required",
        };
        isValid = false;
      }
      if (!requiData.reqNo) {
        retData.reqNo = {
          isValid: false,
          message: "Requisitions no is required",
        };
        isValid = false;
      }
      if (!requiData.depart) {
        retData.depart = {
          isValid: false,
          message: "Department is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const { requiData, isSubmitted, columns, tableData } = this.state;
    const errorData = this.validate(isSubmitted);

    return (
      <div className="main-content">
        <div className="reports-content">
          <div className="heading">
            <h4>Reports</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Reports Types
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect
                    name="status"
                    value={requiData.status}
                    onChange={this.handleStateChange}
                    isvalid={errorData.status.isValid}
                  >
                    <option value="">-Select-</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                <span className="d-block w-100 text-danger">
                  {errorData.status.message}
                </span>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label"></label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-button">
                <Button
                  variant="contained"
                  className="primary-btn"
                  disableElevation
                  onClick={this.handleClickMethod}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
          {this.state.loadingStatus ? (
            <Table
              valueFromData={{ columns: columns, data: tableData }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={this.props.reports_status === status.IN_PROGRESS}
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
  const { reports_status, reports_data } = state.procurement;
  return {
    reports_status,
    reports_data,
  };
};

export default connect(mapStateToProps)(Reports);
