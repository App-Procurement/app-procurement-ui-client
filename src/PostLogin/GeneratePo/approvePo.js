import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { RangeDatePicker, DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import "simplebar/dist/simplebar.min.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions/purchaseOrder.action";
import { status } from "../../_constants";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
class ApprovePo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        status: "",
        reqNo: "",
        depart: "",
        GenerateButton: false,
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
          label: "Requestor",
          key: "createdBy",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
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
          label: "Request type",
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
          label: "Requisition Total",
          key: "totalPrice",
          renderCallback: (value) => {
            return (
              <td>
                <span className='department-value'>{value}</span>
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
                <span className='department-value'>{value.code}</span>
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
                <span className='department-value'>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Purchase Order",
          key: "id",
          renderCallback: (value) => {
            return (
              <td>
                <button
                  className='btn details-btn'
                  onClick={() => this.onClickShowGenerateButton(value)}>
                  Approve
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
    if (this.props.approvepo_data && this.props.approvepo_data.length > 0) {
      this.setState({ tableData: this.props.approvepo_data });
    } else {
      this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.approvepo_status !== this.props.approvepo_status &&
      this.props.approvepo_status === status.SUCCESS
    ) {
      if (this.props.approvepo_data && this.props.approvepo_data.length > 0) {
        this.setState({ tableData: this.props.approvepo_data });
      }
    }
  }

  onClickShowGenerateButton = (id) => {
    this.props.history.push(`/postlogin/approvepo/${id}`);
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
        payment: requiData.payment,
        conditionText: requiData.conditionText,
      };
      this.props.history.push(`/postlogin/approvepo`);
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
      payment: validObj,
      conditionText: validObj,
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
      if (!requiData.payment) {
        retData.payment = {
          isValid: false,
          message: "Payment terms  is required",
        };
        isValid = false;
      }
      if (!requiData.conditionText) {
        retData.conditionText = {
          isValid: false,
          message: " Other terms and Condition is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const { requiData, isSubmitted, GenerateButton, columns, tableData } =
      this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className='main-content'>
        <div className='generate-content'>
          <div className='generate-purchase'>
            <div className='heading'>
              <IconButton className='head-icon'>
                <KeyboardBackspaceIcon
                  onClick={() =>
                    this.props.history.push(`/postlogin/generatepo`)
                  }
                />
              </IconButton>
              <h4>Approve Purchase Order</h4>
            </div>
            <div className='requisitions-filter'>
              <div className='form'>
                <div className='form-group row col-form-group'>
                  <label className='col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label'>
                    Filter By Status
                  </label>
                  <div className='col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field'>
                    <FormControl className='select-menu'>
                      <NativeSelect
                        name='status'
                        value={requiData.status}
                        onChange={this.handleStateChange}
                        isValid={errorData.status.isValid}>
                        <option value=''>-Select-</option>
                        <option value={10}>abc</option>
                        <option value={20}>def</option>
                        <option value={30}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    <span className='d-block w-100 text-danger'>
                      {errorData.status.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className='form-group row col-form-group'>
                <label className='col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label'>
                  Date Range
                </label>
                <div className='col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field'>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center date-picker'>
                      <RangeDatePicker
                        startPlaceholder='2021-06-01'
                        endPlaceholder='2021-06-10'
                      />
                      <CalendarTodayTwoToneIcon className='calendar-icon' />
                    </div>
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
          </div>
          {/* {tableData&& tableData.length>0 &&  */}
          <Table
            valueFromData={{ columns: columns, data: tableData }}
            perPageLimit={6}
            visiblecheckboxStatus={true}
            isLoading={this.props.search_purchase_status === status.IN_PROGRESS}
            tableClasses={{
              table: "ticket-tabel",
              tableParent: "tickets-tabel",
              parentClass: "all-support-ticket-tabel",
            }}
            searchKey='subject'
            showingLine='Showing %start% to %end% of %total% Tickets'
          />
          {/* } */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { approvepo_data, approvepo_status } = state.procurement;
  return { approvepo_data, approvepo_status };
};

export default connect(mapStateToProps)(ApprovePo);
