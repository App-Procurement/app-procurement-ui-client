import React, { Component } from "react";
import {
  NativeSelect,
  FormControl,
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  TextareaAutosize,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { RangeDatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../../Table/Table";
import { connect } from "react-redux";
import { requistionAction } from "../../../_actions";
import { status } from "../../../_constants";
import { commonFunctions, requisitionStatus, alert } from "../../../_utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

class ManageRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      deleteIndex: "",
      isLoading: true,
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
                {" "}
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
            return value ? (
              <td>
                <span className={"requestor"}>{value}</span>
              </td>
            ) : (
              <></>
            );
          },
        },
        {
          label: "Requisitions Total",
          key: "totalPrice",
          renderCallback: (value, row) => {
            return (
              <td>
                {row && row.currency && row.currency.code && value && (
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
                <div className="popper-toggle">
                  {row.status === requisitionStatus.APPROVED && (
                    <Tooltip title="You can not edit approved requisition">
                      <Button
                        area-label="You can not edit approved requisition"
                        className="disabled"
                      >
                        <CreateIcon />
                      </Button>
                    </Tooltip>
                  )}
                  {row.status !== requisitionStatus.APPROVED && (
                    <Button>
                      <Link to={`/postlogin/requisitiondetails/${value}`}>
                        {" "}
                        <VisibilityIcon />
                      </Link>
                    </Button>
                  )}
                  {row.status !== requisitionStatus.APPROVED && (
                    <Button>
                      <Link to={`/postlogin/managerequisition/${value}`}>
                        {" "}
                        <CreateIcon />
                      </Link>
                    </Button>
                  )}
                  {row.status === requisitionStatus.DRAFT && (
                    <Button>
                      <DeleteIcon onClick={() => this.onClickDelete(value)} />
                    </Button>
                  )}
                  {row.status !== requisitionStatus.DRAFT && (
                    <Tooltip title="You can delete only draft">
                      <Button
                        area-label="You can delete only draft"
                        className="disabled"
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </td>
            );
          },
        },
      ],
      requistionList: [],
      anchorEl: null,
      open: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(requistionAction.getRequisitions({}));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.requisition_status !== this.props.requisition_status &&
      this.props.requisition_status === status.SUCCESS
    ) {
      this.setState({
        requistionList: this.props.requisition_list,
        isLoading: false,
      });
    }
    if (
      prevProps.delete_requisition_status !==
        this.props.delete_requisition_status &&
      this.props.delete_requisition_status === status.SUCCESS
    ) {
      this.props.dispatch(requistionAction.getRequisitions({}));
      alert.success("Requisition deleted successfully");
    }
  }

  toggleAction = (e) => {
    const { open } = this.state;
    this.setState({
      open: !open,
      anchorEl: e.currentTarget,
    });
  };

  onClickDelete = (id) => {
    const { openDialog } = this.state;
    let deleteItem = !openDialog;
    this.setState({
      openDialog: deleteItem,
      deleteIndex: id,
    });
  };

  deleteRequisition = () => {
    this.props.dispatch(
      requistionAction.deleteRequitionData({ id: this.state.deleteIndex })
    );
    this.setState({
      openDialog: false,
      isLoading: true,
    });
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
          <option key={i} value={department_list[i].id}>
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
    const { searchData, openDialog } = this.state;
    const { requisition_status } = this.props;
    return (
      <div className="main-content">
        <div className="manage-requisitions">
          <div className="heading">
            <h4>{t("Manage Requisitions")}</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Filter By Status")}
              </label>
              <p className="error">Error Message</p>
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
                  placeholder="647598"
                  name="requisitionNo"
                  value={searchData.requisitionNo || ""}
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
        <Dialog
          open={openDialog}
          onClose={() => this.setState({ openDialog: false })}
          aria-labelledby="form-dialog-title"
          className="addNewItemDialog"
        >
          <DialogTitle
            id="form-dialog-title"
            className="dialogSmWidth addNewItemDialogTitle"
          >
            Delete Confirmation
          </DialogTitle>
          <DialogContent className="dialogSmWidth addNewItemDialogContent">
            <p>Are you sure to delete record?</p>
          </DialogContent>
          <DialogActions className="dialogSmWidth addNewItemDialogActions">
            <Button
              variant="contained"
              onClick={this.deleteRequisition}
              className="primary-btn"
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => this.setState({ openDialog: false })}
              className="default-btn"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requisition_status, requisition_list, delete_requisition_status } =
    state.procurement;
  const { department_status, department_list } = state.procurement;
  return {
    requisition_status,
    requisition_list,
    department_status,
    department_list,
    delete_requisition_status,
  };
}

const connectedManageRequisition = withTranslation()(
  connect(mapStateToProps)(ManageRequisition)
);

export default connectedManageRequisition;
