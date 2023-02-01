import React, { Component } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { connect } from "react-redux";
import { requestForQuotationAction } from "../../_actions";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { Button, FormControl, NativeSelect } from "@mui/material";
class CreateRfq extends Component {
  inputOpenFileRef;
  formkiqClient;
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        note: "",
        rfqType: "",
        document: [],
        location: "",
        openDate: "",
        products: [],
        incoterms: "ABCD",
        closingDate: "",
        paymentMode: "ABCD",
        paymentTerms: "Terms",
        modeOfDelivery: "",
        requiredDeliveryDate: "",
      },
      activeIndex: -1,
    };
    this.inputOpenFileRef = React.createRef();
    this.formkiqClient = new window.exports.FormkiqClient(
      "https://0f46r83d5a.execute-api.us-east-1.amazonaws.com",
      "",
      "",
      {
        onFormSubmitted: (formName) => {},
        onFormCompleted: (formName, response) => {
          this.setUploadedDocID(response);
        },
      }
    );
    this.formkiqClient.login("papubhat@gmail.com", "microsoft");
  }

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = `${date.$D}-${date.$M + 1}-${date.$y}`;
    this.setState({ formData });
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      openDate: validObj,
      closingDate: validObj,
      requiredDeliveryDate: validObj,
      rfqType: validObj,
      location: validObj,
      note: validObj,
      isValid,
    };

    if (isSubmitted) {
      const { formData } = this.state;

      if (!formData.openDate) {
        retData.openDate = {
          isValid: false,
          message: "Open date is required",
        };
        isValid = false;
      }

      if (!formData.closingDate) {
        retData.closingDate = {
          isValid: false,
          message: "Closing date is  Date is Required",
        };
        isValid = false;
      }

      if (!formData.requiredDeliveryDate) {
        retData.requiredDeliveryDate = {
          isValid: false,
          message: "Required Delivery Date is required",
        };
        isValid = false;
      }
      if (!formData.rfqType) {
        retData.rfqType = {
          isValid: false,
          message: "Rfq Type is required",
        };
        isValid = false;
      }
      if (!formData.location) {
        retData.location = {
          isValid: false,
          message: "location  is required",
        };
        isValid = false;
      }
      if (!formData.note) {
        retData.note = {
          isValid: false,
          message: "Note is required",
        };
        isValid = false;
      }
    }

    retData.isValid = isValid;
    return retData;
  };

  onSubmitCreateRfq = (event) => {
    event.preventDefault();
    const { formData } = this.state;

    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    const { history } = this.props;

    if (errorData.isValid) {
      this.props.dispatch(requestForQuotationAction.createRfq(formData));
      history.push("/postlogin/requestforquotation/rfqdetails");
    }
  };

  render() {
    const { formData, isSubmitted } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="create-rfq-contant">
            <div className="new-request-heading">
              <Link to={`/postlogin/requestforquotation/`}>RFQ</Link>
              <i class="far fa-angle-right"></i>
              Create RFQ
            </div>
            <div className="requisitions-filter">
              <div className="form-group row col-form-group">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <label className="col-form-label">{t("Open Date")}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={formData.openDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) => this.handleDates(date, "openDate")}
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.openDate.message}
                  </span>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <label className="col-form-label">{t("Closing  Date")}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={formData.closingDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) => this.handleDates(date, "closingDate")}
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.closingDate.message}
                  </span>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <label className="col-form-label">
                    {t("Required Delivery Date")}
                  </label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={formData.requiredDeliveryDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) =>
                        this.handleDates(date, "requiredDeliveryDate")
                      }
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.requiredDeliveryDate.message}
                  </span>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <label className="col-form-label">{t("RFQ Type")}</label>
                  <div className="new-requeust-massge">
                    <FormControl className="payment-select-menu">
                      <NativeSelect
                        name="rfqType"
                        value={formData.rfqType}
                        onChange={this.handleStateChange}
                      >
                        <option value={"Main Office Usa"}>Non-Bid</option>
                        <option value={"abc"}>abc</option>
                        <option value={"def"}>def</option>
                        <option value={"abc"}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {errorData.rfqType.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <label className="col-form-label">{t("Location")}</label>
                  <div className="new-requeust-massge">
                    <FormControl className="payment-select-menu">
                      <NativeSelect
                        name="location"
                        value={formData.location}
                        onChange={this.handleStateChange}
                      >
                        <option value={"Main Office Usa"}>
                          Main Office USA
                        </option>
                        <option value={"abc"}>abc</option>
                        <option value={"def"}>def</option>
                        <option value={"abc"}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {errorData.location.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-5 col-form-label">
                  <label className="col-form-label">{t("Note")}</label>
                  <div className="new-requeust-massge">
                    <textarea
                      name="note"
                      onChange={this.handleStateChange}
                      value={formData.note}
                    />
                    <span className="d-block w-100 text-danger">
                      {errorData.note.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-button text-center mt-5">
              <Button
                className="primary-btn"
                onClick={this.onSubmitCreateRfq}
                disabled={this.props.create_rfq_status === 0 ? true : false}
              >
                Create
              </Button>
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
    update_document_status,
    update_document_res,
    item_list_status,
    item_list,
    add_request_status,
    add_request_response,
    supplier_category_list_status,
    supplier_category_list_data,
  } = state.procurement;

  return {
    request_for_purpose_status,
    request_for_purpose_list,
    update_document_status,
    update_document_res,
    item_list_status,
    item_list,
    add_request_status,
    add_request_response,
    supplier_category_list_status,
    supplier_category_list_data,
  };
};

const CreateComponet = withTranslation()(connect(mapStateToProps)(CreateRfq));

export default CreateComponet;
