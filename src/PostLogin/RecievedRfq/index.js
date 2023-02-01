import React, { Component } from "react";
import { FormControl, NativeSelect, Button } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { RangeDatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { recievedrfpAction } from "../../_actions";
import { status } from "../../_constants";
import { connect } from "react-redux";
import { commonFunctions } from "../../_utilities";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import Loader from "react-js-loader";
class RecievedRfq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      requiData: {},
      ViewDetail: false,
      indx: 0,
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
          label: "Price",
          key: "totalPrice",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: "Qauntity",
          key: "Qauntity",
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
          label: "Net Amount",
          key: "NetAmount",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">${value}</span>
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
                <Button
                  className="btn details-btn"
                  onClick={() => this.onClickShowViewDetails(value)}
                  style={{ color: "#6417c5", textTransform: "capitalize" }}
                >
                  View Details
                </Button>
              </td>
            );
          },
        },
      ],
      tableData: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(recievedrfpAction.searchRecievedRFQ());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.fetch_recieved_rfq_status !==
        prevProps.fetch_recieved_rfq_status &&
      this.props.fetch_recieved_rfq_status === status.SUCCESS
    ) {
      if (
        this.props.recieved_rfq_list &&
        this.props.recieved_rfq_list.length > 0
      ) {
        this.setState({
          loadingStatus: !this.state.loadingStatus,
          tableData: this.props.recieved_rfq_list,
        });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    this.props.history.push(`/postlogin/recivedrfq/${id}`);
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
  };

  render() {
    const { requiData, tableData, columns, indx } = this.state;
    return (
      <div className="main-content">
        <div className="receivedrfq-content">
          <div className="heading">
            <h4>{t("Received RFQ from Buyers")}</h4>
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
                    value={requiData.status}
                    onChange={this.handleStateChange}
                  >
                    <option value="">-Select-</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Date Range")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <div className="d-flex align-items-center">
                  <RangeDatePicker
                    startPlaceholder="2021-06-01"
                    endPlaceholder="2021-06-10"
                  />
                  <CalendarTodayOutlinedIcon className="calendar-icon" />
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
                <Button variant="contained" className="default-btn ml-2">
                  Clear
                </Button>
              </div>
            </div>
          </div>
          {this.state.loadingStatus ? (
            <Table
              valueFromData={{ columns: columns, data: tableData, indx: indx }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={
                this.props.fetch_recieved_rfq_status === status.IN_PROGRESS
              }
              tableClasses={{
                table: "ticket-tabel",
                tableParent: "tickets-tabel",
                parentClass: "all-support-ticket-tabel",
              }}
              showingLine="Showing %start% to %end% of %total% Tickets"
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
  const { fetch_recieved_rfq_status, recieved_rfq_list } = state.procurement;
  return {
    fetch_recieved_rfq_status,
    recieved_rfq_list,
  };
};

const connectedRecievedRfq = withTranslation()(
  connect(mapStateToProps)(RecievedRfq)
);
export default connectedRecievedRfq;
