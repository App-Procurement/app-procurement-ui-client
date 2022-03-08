import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { RangeDatePicker, DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { recievedrfpAction } from "../../_actions";
import { status } from "../../_constants";
import { connect } from "react-redux";
import { commonFunctions } from "../../_utilities";

class SendRfq extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                <span className={"s-no"}>{index + 1} .</span>
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
          label: "Carrency",
          key: "currency",
          renderCallback: (value) => {
            return (
              <td>
                <span className='department-value'>{value.code}</span>
              </td>
            );
          },
        },
        // {
        //   label: "Status",
        //   key: "Status",
        //   renderCallback: (value) => {
        //     return (
        //       <td>
        //         <span className='department-value'>{value}</span>
        //       </td>
        //     );
        //   },
        // },
        {
          label: "FRQ",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <Button
                  className='btn primary-btn'
                  style={{ color: "#6417c5", textTransform: "capitalize" }}>
                  Send RFQ
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
    this.props.dispatch(recievedrfpAction.sendRFQ());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.send_frq_status !==
      prevProps.send_frq_status &&
      this.props.send_frq_status === status.SUCCESS
    ) {
      if (
        this.props.send_rfq_data &&
        this.props.send_rfq_data.length > 0
      ) {
        this.setState({
          tableData: this.props.send_rfq_data,
        });
      }
    }
  }

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
  };

  render() {
    const { requiData, isSubmitted, tableData, columns, indx } = this.state;
    return (
      <div className='main-content'>
        <div className='receivedrfq-content'>
          <div className='heading'>
            <h4>Send RFQ to Vendors</h4>
          </div>
          <div className='requisitions-filter'>
            <div className='form-group row col-form-group'>
              <label className='col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label'>
                Filter By Status
              </label>
              <div className='col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field'>
                <FormControl className='select-menu'>
                  <NativeSelect
                    name='status'
                    value={requiData.status}
                    onChange={this.handleStateChange}>
                    <option value=''>-Select-</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                {/* <span className="d-block w-100 text-danger">{errorData.status.message}</span> */}
              </div>
            </div>
            <div className='form-group row col-form-group'>
              <label className='col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label'>
                Date Range
              </label>
              <div className='col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field'>
                <div className='d-flex align-items-center'>
                  <RangeDatePicker
                    startPlaceholder='2021/06/01'
                    endPlaceholder='2021/06/10'
                  />
                  <CalendarTodayTwoToneIcon className='calendar-icon' />
                </div>
              </div>
            </div>
            <div className='form-group row col-form-group'>
              <label className='col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label'></label>
              <div className='col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-button'>
                <Button
                  variant='contained'
                  className='primary-btn'
                  disableElevation
                  onClick={this.handleClickMethod}>
                  Search
                </Button>
              </div>
            </div>
          </div>
          <Table
            valueFromData={{ columns: columns, data: tableData, indx: indx }}
            perPageLimit={6}
            visiblecheckboxStatus={false}
            isLoading={
              this.props.send_frq_status === status.IN_PROGRESS
            }
            tableClasses={{
              table: "ticket-tabel",
              tableParent: "tickets-tabel",
              parentClass: "all-support-ticket-tabel",
            }}
            showingLine='Showing %start% to %end% of %total% Tickets'
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { send_frq_status, send_rfq_data } = state.procurement;
  return {
    send_frq_status,
    send_rfq_data,
  };
};
export default connect(mapStateToProps, null)(SendRfq);
