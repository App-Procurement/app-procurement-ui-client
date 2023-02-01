import React, { Component } from "react";
import Loader from "react-js-loader";
import { RangeDatePicker } from "@y0c/react-datepicker";
import Table from "../../Table/Table";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { commonFunctions } from "../../_utilities";
import { connect } from "react-redux";
import { vendorAction } from "../../_actions";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link, Button, FormControl, NativeSelect } from "@mui/material";
class VendorQuotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,

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
          label: "Vendor No.",
          key: "venderNo",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"venderNo"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Vendor Name",
          key: "vendorName",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"vendorName"}>{value}</span>
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
                <span className={"requisitionType"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Request Data",
          key: "requisitionDate",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitionDate"}>
                  {commonFunctions.convertDateToString(new Date(value))}
                </span>
              </td>
            );
          },
        },
        {
          label: "Requisition Total",
          key: "requisitionTotal",
          renderCallback: (value, row) => {
            return (
              <td>
                <span className="requisitionTotal">
                  {row.currency.code} {value}
                </span>
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
                <span className="currency">{value}</span>
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
                <Link to={`/`} className="btn details-btn">
                  {"View Details"}
                </Link>
              </td>
            );
          },
        },
      ],
      vendorQuatation: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(vendorAction.getVendorQuotation());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.vendor_quotation_status !==
        prevProps.vendor_quotation_status &&
      this.props.vendor_quotation_status === status.SUCCESS
    ) {
      if (
        this.props.vendor_quotation &&
        this.props.vendor_quotation.length > 0
      ) {
        this.setState({
          loadingStatus: !this.state.loadingStatus,
          vendorQuatation: this.props.vendor_quotation,
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

  render() {
    const { vendorQuatation } = this.state;
    return (
      <div className="main-content">
        <div className="receivedrfq-content">
          <div className="heading">
            <h4>{t("Vendor quotation")}</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                {t("Filter By Status")}
              </label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect name="status" onChange={this.handleStateChange}>
                    <option value="">-Select-</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                <span className="d-block w-100 text-danger"></span>
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
                      startPlaceholder="2021-06-01"
                      endPlaceholder="2021-06-10"
                    />
                    <CalendarTodayIcon className="calendar-icon" />
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
          {this.state.loadingStatus ? (
            <Table
              valueFromData={{
                columns: this.state.columns,
                data: vendorQuatation,
              }}
              isLoading={this.props.requisition_status === status.IN_PROGRESS}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              tableClasses={{
                table: "ticket-tabel",
                tableParent: "tickets-tabel",
                parentClass: "all-support-ticket-tabel",
              }}
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

function mapStateToProps(state) {
  const { vendor_quotation_status, vendor_quotation } = state.procurement;
  return {
    vendor_quotation_status,
    vendor_quotation,
  };
}

const connectedVendorQuotation = withTranslation()(
  connect(mapStateToProps)(VendorQuotation)
);

export default connectedVendorQuotation;
