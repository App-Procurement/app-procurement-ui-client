import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { RangeDatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { recievedrfpAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities";
// import { th } from "date-fns/locale";

class RecievedRfp extends Component {
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
      columns: [
        {
          label: "S No",
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
          label: "Request Dept",
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
          label: "Requisition Type",
          key: "requisitionType",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
                <span className={"department-text"}></span>
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
                <span className={"requestor"}>
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
              </td>
            );
          },
        },
        {
          label: "Requisitions Total",
          key: "totalPrice",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Currency",
          key: "currency",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value.code}</span>
              </td>
            );
          },
        },
        {
          label: "Details",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <button
                  className="btn details-btn"
                  onClick={() => this.onClickShowViewDetails(value)}
                >
                  View Details
                </button>
              </td>
            );
          },
        },
      ],
      tableData: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(recievedrfpAction.searchRecievedRFP());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.recieved_rfp_status !== prevProps.recieved_rfp_status &&
      this.props.recieved_rfp_status === status.SUCCESS
    ) {
      if (
        this.props.recieved_rfp_list &&
        this.props.recieved_rfp_list.length > 0
      ) {
        this.setState({ tableData: this.props.recieved_rfp_list });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    let url = this.props.match.params.url;
    this.props.history.push(`/postlogin/frp/${url}/${id}`);
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
    const { requiData } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const sendReqData = {
        status: requiData.status,
        reqno: requiData.reqno,
        depart: requiData.depart,
      };
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
      reqno: validObj,
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
      if (!requiData.reqno) {
        retData.reqno = {
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
        <div className="recieved">
          <div className="heading">
            <h4>Recieved RFP</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Filter By Status
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
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                Date Range
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-picker">
                    <RangeDatePicker
                      startPlaceholder="2021-06-01"
                      endPlaceholder="2021-06-10"
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
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
  const { recieved_rfp_status, recieved_rfp_list } = state.procurement;
  return {
    recieved_rfp_status,
    recieved_rfp_list,
  };
};
export default connect(mapStateToProps)(RecievedRfp);
