import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { requestForPurposeAction } from "../../_actions";
import { requestForQuotationAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions, alert } from "../../_utilities";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import Chat from "../../_components/ChatBox";
import AddlineItemList from "./AddlineItemList";
import Dialog from "@material-ui/core/Dialog";
import { Search } from "@material-ui/icons";

import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
//import AddItemList from "./AddItemList";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddItemImg from "../../assets/images/request/add-item-img.png";
import { TextField } from "@material-ui/core";
import AddSupplierContent from "./AddSupplierContent";
import InviteSupplierDialog from "./InviteSupplierDialog";

class RfqDetails extends Component {
  inputOpenFileRef;
  formkiqClient;
  constructor(props) {
    super(props);
    this.state = {
      lineItems: [],
      result: [],
      selectedData: [],
      requestDetailsData: {},
      activeIndex: -1,
      requiData: {
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
        isEdit: false,
      },
      selectedSupplierData: "",
      updateValue: {},
      user: {
        name: "himanshu",
        id: 101,
        accountType: "admin",
      },
      paymentFormData: {
        incorterms: "",
        paymentMode: "",
        paymentTerm: "",
        modeOfDelivery: "",
      },
      formData: {
        openDate: "",
        closingDate: "",
        requiredDeliveryDate: "",
        rfqType: "",
        location: "",
        note: "",
        paymentTerm: "",
        paymentMode: "",
        incorterms: "",
        modeOfDelivery: "",
      },
      inviteUserFields: [
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
      ],
      formAllData: {},
      supplierAndCategoryList: {},
      uploadedFileList: [],
      selectedFile: {},
      openDialog: false,
      openEditDialog: false,
      openImportItemDialog: false,
      itemList: [],
      supplierResult: [],
      columns: [
        {
          label: "S.no",
          key: "sno",
          renderCallback: (value, index) => {
            return <td key={`${Math.random()}_${value}`}>{index + 1}</td>;
          },
        },
        {
          label: "Name",
          key: "name",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requisitions-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Category",
          key: "category",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
          key: "supplier",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Quantity",
          key: "quantity",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requestor"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Unit",
          key: "unit",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "price",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: "Total Cost",
          key: "totalCost",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button className="primary-btn">{value}</Button>
              </td>
            );
          },
        },
        {
          label: "",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <div className="d-block position-relative edit-delete-modal">
                  <i
                    className="fa fa-ellipsis-h"
                    aria-hidden="true"
                    onClick={() => this.setState({ activeIndex: index })}
                  ></i>
                  {this.state.activeIndex === index && (
                    <div className="toggale">
                      <i
                        className="fa fa-pencil edit"
                        aria-hidden="true"
                        onClick={this.openEditModal}
                      ></i>
                      <i
                        className="fa fa-trash delete"
                        aria-hidden="true"
                        onClick={() => {
                          this.onClickDeleteSelectedItem(index);
                        }}
                      ></i>
                    </div>
                  )}
                </div>
              </td>
            );
          },
        },
      ],
      selectedItemList: [],
    };
    this.inputOpenFileRef = React.createRef();
    this.formkiqClient = new window.exports.FormkiqClient(
      "https://0f46r83d5a.execute-api.us-east-1.amazonaws.com",
      "",
      "",
      {
        onFormSubmitted: (formName) => { },
        onFormCompleted: (formName, response) => {
          this.setUploadedDocID(response);
        },
      }
    );
    this.formkiqClient.login("papubhat@gmail.com", "microsoft");
  }
  setUploadedDocID = (res) => {
    const { uploadedFileList } = this.state;
    if (res && res.object && res.object.documents) {
      for (let i = 0; i < res.object.documents.length; i++) {
        let doc = res.object.documents[i];
        uploadedFileList.push(doc.documentId);
      }
    }
    this.setState({
      uploadedFileList,
    });
  };

  handleStateChangePaymentANdShippingTerm = (e) => {
    const { name, value } = e.target;
    const { paymentFormData } = this.state;
    paymentFormData[name] = value;
    this.setState({
      paymentFormData,
    });
  };

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
    console.log("name", name, " ", date);
    formData[name] = date;
    this.setState({ formData });
  };

  componentDidMount() {
    this.props.dispatch(requestForQuotationAction.getRequestQuotationData());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_request_status, request_data, requiData } = this.props;

    if (
      this.props.get_request_status &&
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (
        this.props.request_data &&
        this.props.request_data.lineItems &&
        this.props.request_data.lineItems.length > 0
      ) {
        this.setState({
          requestDetailsData: this.props.request_data,
          lineItems: this.props.request_data.lineItems,
        });
      }
      if (
        this.props.request_data &&
        this.props.request_data.addLine &&
        this.props.request_data.addLine.length > 0
      ) {
        this.setState({
          itemList: this.props.request_data.addLine,
        });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    let url = this.props.match.params.url;
    this.props.history.push(`/postlogin/frp/${url}/${id}`);
  };

  openModulRfqAddSupplier = () => {
    this.setState({
      openModulRfqAddSupplier: !this.state.openModulRfqAddSupplier,
    });
  };
  handleOpenModulInviteSupplier = () => {
    this.setState({
      openModulInviteSupplier: !this.state.openModulInviteSupplier,
    });
  };

  openUploadPopup = () => {
    this.inputOpenFileRef.current.click();
  };

  handleClickUploadDocument = (e) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.setState({
          selectedFile: e.target.files[i],
        });
        let data = document.getElementById("upload_document");
        this.formkiqClient.webFormsHandler.submitFormkiqForm(data);
        // this.props.dispatch(requestForPurposeAction.UploadFile(e.target.files[i].name));
      }
    }
  };

  // getUploadedDocument = (docId) => {
  //   this.formkiqClient.documentsApi.getDocumentUrl(docId).then((response) => {
  //     window.open(response.url, "_blank", "570", "520");
  //   });
  // };

  openAddNewItemPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  openAddNewItemPopupSupplier = () => {
    this.setState({
      openModulRfqAddSupplier: !this.state.openModulRfqAddSupplier,
    });
  };

  openEditModal = () => {
    const { activeIndex, selectedItemList } = this.state;
    if (activeIndex >= 0) {
      let values = JSON.parse(JSON.stringify(selectedItemList[activeIndex]));
      this.setState({ updateValue: values });
    }
    this.setState({
      openEditDialog: !this.state.openEditDialog,
    });
  };

  closeEditModal = () => {
    this.setState({
      openEditDialog: !this.state.openEditDialog,
    });
  };

  setSelectedItemList = (data) => {
    let { selectedItemList } = this.state;
    let value = JSON.parse(JSON.stringify(data));

    let index = -1;
    if (selectedItemList && selectedItemList.length > 0) {
      for (let i = 0; i < selectedItemList.length; i++) {
        if (selectedItemList[i].id === value.id) {
          index = i;
        }
      }
      if (index >= 0) {
        selectedItemList[index].quantity += value.quantity;
        selectedItemList[index].totalCost =
          selectedItemList[index].quantity * selectedItemList[index].price;
      } else {
        selectedItemList = [...selectedItemList, value];
      }
    } else {
      selectedItemList = [value];
    }
    this.setState({
      selectedItemList,
    });
  };

  createRequest = (event) => {
    event.preventDefault();
    const { formData, selectedItemList, selectedFile, uploadedFileList } =
      this.state;

    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      if (selectedItemList && selectedItemList.length > 0) {
        let sendData = {
          formData,
          itemList: selectedItemList,
          files: selectedFile,
          documentId: uploadedFileList,
        };
        this.props.dispatch(requestForPurposeAction.addRequest(sendData));
      } else {
        alert.error("Add Request item list");
      }
    }
  };

  openTooltipForEdit = (index) => {
    const { selectedItemList } = this.state;
    if (selectedItemList && selectedItemList.length > 0) {
      for (let i = 0; i < selectedItemList.length; i++) {
        if (i !== index) {
          selectedItemList[i].isOpen = false;
        } else {
          selectedItemList[index].isOpen = true;
        }
      }
    }
    this.setState({
      selectedItemList,
    });
  };

  onClickDeleteSelectedItem = (id) => {
    const { selectedItemList } = this.state;
    selectedItemList.splice(id, 1);
    this.setState({
      selectedItemList,
    });
  };
  handleUpdate = (e) => {
    const { updateValue } = this.state;
    const { name, value } = e.target;
    updateValue[name] = value;
    this.setState({ updateValue });
  };
  updateDataValues = () => {
    const { selectedItemList, activeIndex, updateValue } = this.state;
    let updateForm = this.validateUpdate(true);
    this.setState({ update: true });
    if (updateForm.isValid) {
      updateValue.totalCost = updateValue.price * updateValue.quantity;
      selectedItemList[activeIndex] = updateValue;
      this.setState({
        selectedItemList,
        openEditDialog: !this.state.openEditDialog,
      });
    }
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
      paymentTerm: validObj,
      paymentMode: validObj,
      incorterms: validObj,
      modeOfDelivery: validObj,
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
      if (!formData.paymentTerm) {
        retData.paymentTerm = {
          isValid: false,
          message: "Payment Term is required",
        };
        isValid = false;
      }
      if (!formData.paymentMode) {
        retData.paymentMode = {
          isValid: false,
          message: " Payment Mode is required",
        };
        isValid = false;
      }
      if (!formData.incorterms) {
        retData.incorterms = {
          isValid: false,
          message: " IncorTerms is required",
        };
        isValid = false;
      }
      if (!formData.modeOfDelivery) {
        retData.modeOfDelivery = {
          isValid: false,
          message: " Mode of delivery is required",
        };
        isValid = false;
      }
    }

    retData.isValid = isValid;
    return retData;
  };

  onFormSubmitted = (event) => {
    event.preventDefault();
    const { formData, result, lineItems, selectedFile } = this.state;

    console.log("formdata", formData);
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    const { history } = this.props;

    if (errorData.isValid) {
      if (result && result.length > 0) {
        let sendData = {
          formData,
          selectedItemList: result,
          lineItems: lineItems,
          files: selectedFile,
          // documentId: uploadedFileList,
        };
        this.props.dispatch(
          requestForQuotationAction.rfqQuotationPost(sendData)
        );
      } else {
        alert.error("Add Request Quotation item list");
      }
    }
    // this.setState({
    //   formData: {
    //     openDate: "",
    //     closingDate: "",
    //     requiredDeliveryDate: "",
    //     rfqType: "",
    //     location: "",
    //     note: "",
    //   },
    // });
  };

  handleCallback = (childData) => {
    this.setState({ selectedSupplierData: childData });

    let { requestDetailsData } = this.state;
    console.log("request detail data", requestDetailsData);
    if (
      requestDetailsData &&
      requestDetailsData.Supplier &&
      requestDetailsData.Supplier.length > 0
    ) {
      this.setState({
        supplierResult: requestDetailsData.Supplier,
      });
    }
    let duplicateData = this.state.supplierResult;

    console.log("duplicate data", duplicateData);
    if (duplicateData && duplicateData.length > 0) {
      duplicateData.map((item) => {
        if (item.Email === childData) {
          this.setState({
            result: [...this.state.result, item],
          });
        }
      });

      // this.setState(
      //   {
      //     supplierResult:this.state.result
      //   })
    }
  };

  render() {
    const {
      formData,
      isSubmitted,
      dueDate,
      deliverDate,
      openDialog,
      openModulRfqAddSupplier,
      openModulInviteSupplier,
      openEditDialog,
      columns,
      activeIndex,
      updateValue,
      itemList,
      selectedItemList,
      uploadedFileList,
      supplierAndCategoryList,
      paymentFormData,
      update,
      selectedSupplierData,
      requestDetailsData,
      openImportItemDialog,
    } = this.state;
    console.log("result data", this.state.result);
    const errorData = this.validate(isSubmitted);
    // const updateForm = this.validateUpdate(update);
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="rfq-details-contant">
            <div className="new-request-heading">
              <Link to={`#`}>Request for Quotation</Link>
              <i class="far fa-angle-right"></i>
              Create
            </div>
            <div className="new-request-bottom-head d-flex align-items-center justify-content-between">
              <div className="bottom-head-left">
                <p className="m-0">
                  <span>RFQ00011</span> | Ryan Kenter
                </p>
              </div>
              <div className="bottom-head-right">
                <Button className="save-btn">Save</Button>
                <Button className="primary-btn" onClick={this.onFormSubmitted}>
                  Submit
                </Button>
              </div>
            </div>
            <div className="requisitions-filter">
              <div className="form-group row col-form-group">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Open Date")}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={formData.openDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) => this.handleDates(date, "openDate")}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.openDate.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Closing  Date")}</label>
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={formData.closingDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) => this.handleDates(date, "closingDate")}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.closingDate.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
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
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.requiredDeliveryDate.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("RFQ Type")}</label>
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="rfqType"
                      value={formData.rfqType}
                      onChange={this.handleStateChange}
                    // isvalid={errorData.location.isValid}
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

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Location")}</label>
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="location"
                      value={formData.location}
                      onChange={this.handleStateChange}
                    >
                      <option value={"Main Office Usa"}>Main Office USA</option>
                      <option value={"abc"}>abc</option>
                      <option value={"def"}>def</option>
                      <option value={"abc"}>abc</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="d-block w-100 text-danger">
                    {errorData.location.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
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
            <div className="item-heading my-md-4">
              <div className="item-head-left">
                <h4>Line Items</h4>
              </div>
              <div className="item-head-right">
                <Button
                  className="primary-btn mr-3"
                  onClick={this.openAddNewItemPopup}
                >
                  <i class="fas fa-plus-circle"></i> Add Line
                </Button>
                <Button variant="outlined" className="add-custom-btn">
                  Import Line
                </Button>
              </div>
            </div>

            {
              <AddlineItemList
                openDialog={openDialog}
                setSelectedItemList={this.setSelectedItemList}
                openAddNewItemPopup={this.openAddNewItemPopup}
                itemList={itemList}
              />
            }

            <div className="form-table rfq-group-table">
              <table>
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Request Quantity</th>
                    <th>Request Unit Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requestDetailsData?.lineItems ? (
                    requestDetailsData?.lineItems.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div className="description">
                            <div className="iteam-name">{item.itemName}</div>
                          </div>
                        </td>
                        <td>
                          <div className="description ">
                            <div className="iteam-name category">
                              {item.Category}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="table-dropdown-menu">
                            <select name="" className="approved-dropdown">
                              <option value="Month">Month</option>
                              <option value="Month">January</option>
                              <option value="Month">February</option>
                              <option value="Month">March</option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="description">
                            <div className="iteam-name category">
                              {item.requesrQuantity}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="description">
                            <div className="iteam-name">
                              ${item.requestUnitQuantity}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Button className="list-btn">
                            <i class="fas fa-ellipsis-v"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="item-heading my-md-4">
              <div className="item-head-left">
                <h4>Supplier</h4>
              </div>
              <div className="item-head-right">
                <Button
                  variant="outlined"
                  className="add-custom-btn"
                  onClick={this.openModulRfqAddSupplier}
                >
                  add Supplier
                </Button>
                <Button
                  onClick={this.handleOpenModulInviteSupplier}
                  className="primary-btn ml-3"
                >
                  <i class="fas fa-plus-circle"></i> Invite Supplier
                </Button>
              </div>
            </div>
            <div className="form-table rfq-group-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Supplier</th>
                    <th>Email</th>
                    <th>Contact No.</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.result.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="description">
                          <div className="iteam-name">{item.supplier}</div>
                        </div>
                      </td>
                      <td>
                        <div className="description ">
                          <div className="iteam-name category">
                            {item.Email}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="description">
                          <div className="iteam-name category">
                            {item.contact}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="description">
                          <div className="iteam-name">${item.status}</div>
                        </div>
                      </td>
                      <td>
                        <Button className="list-btn">
                          <i class="fas fa-ellipsis-v"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {/* {requestDetailsData?.Supplier ? (
                    requestDetailsData?.Supplier.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div className="description">
                            <div className="iteam-name">{item.supplier}</div>
                          </div>
                        </td>
                        <td>
                          <div className="description ">
                            <div className="iteam-name category">
                              {item.Email}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="description">
                            <div className="iteam-name category">
                              {item.contact}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="description">
                            <div className="iteam-name">${item.status}</div>
                          </div>
                        </td>
                        <td>
                          <Button className="list-btn">
                            <i class="fas fa-ellipsis-v"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )} */}
                </tbody>
              </table>
            </div>
            <div className="item-heading my-md-4">
              <div className="item-head-left">
                <h4>Payments and Shipping Terms</h4>
              </div>
            </div>
            <div className="payments-shipping">
              <div className="form-group row col-form-group">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Payment Terms")}</label>
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="paymentTerm"
                      value={formData.paymentTerm}
                      onChange={this.handleStateChange}
                    // value={paymentFormData.paymentTerm}
                    // onChange={this.handleStateChangePaymentANdShippingTerm}
                    >
                      <option value={"Main Office Usa"}>Non-Bid</option>
                      <option value={"abc"}>abc</option>
                      <option value={"def"}>def</option>
                      <option value={"abc"}>abc</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="d-block w-100 text-danger">
                    {errorData.paymentTerm.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Payment Mode")}</label>
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={this.handleStateChange}
                    // value={paymentFormData.paymentMode}
                    // onChange={this.handleStateChangePaymentANdShippingTerm}
                    >
                      <option value={"Main Office Usa"}>Main Office USA</option>
                      <option value={"abc"}>abc</option>
                      <option value={"def"}>def</option>
                      <option value={"abc"}>abc</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="d-block w-100 text-danger">
                    {errorData.paymentMode.message}
                  </span>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">{t("Incoterms")}</label>
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="incorterms"
                      value={formData.incorterms}
                      onChange={this.handleStateChange}
                    // value={paymentFormData.incorterms}
                    // onChange={this.handleStateChangePaymentANdShippingTerm}
                    >
                      <option value={"Main Office Usa"}>Main Office USA</option>
                      <option value={"abc"}>abc</option>
                      <option value={"def"}>def</option>
                      <option value={"abc"}>abc</option>
                    </NativeSelect>
                  </FormControl>
                  <span className="d-block w-100 text-danger">
                    {errorData.incorterms.message}
                  </span>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                  <label className="col-form-label">
                    {t("Mode of delivery")}
                  </label>

                  <input
                    type="text"
                    name="modeOfDelivery"
                    className="form-control"
                    value={formData.modeOfDelivery}
                    onChange={this.handleStateChange}
                    // value={paymentFormData.modeOfDelivery}
                    // onChange={this.handleStateChangePaymentANdShippingTerm}
                    placeholder="FOB"
                  />
                  <span className="d-block w-100 text-danger">
                    {errorData.modeOfDelivery.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="item-heading my-md-4">
              <div className="item-head-left">
                <h4>Attachments</h4>
              </div>
            </div>
            <div className="attach-document">
              <form id="upload_document">
                <Button
                  variant="contained"
                  className="primary-btn"
                  onClick={this.openUploadPopup}
                >
                  <input
                    type="file"
                    id="file"
                    multiple
                    name="upload_doc"
                    ref={this.inputOpenFileRef}
                    onChange={this.handleClickUploadDocument}
                    style={{ display: "none" }}
                  />
                  <i className="fa fa-plus-circle" aria-hidden="true" />
                  Attach Documents
                </Button>
              </form>
            </div>
            {openModulRfqAddSupplier && (
              <AddSupplierContent
                requestDetailsData={requestDetailsData}
                parentCallback={this.handleCallback}
                openModulRfqAddSupplier={openModulRfqAddSupplier}
                openAddNewItemPopupSupplier={this.openAddNewItemPopupSupplier}
              />
            )}
            {openModulInviteSupplier && (
              <InviteSupplierDialog
                inviteUserFields={this.state.inviteUserFields}
                handleOpenModulInviteSupplier={
                  this.handleOpenModulInviteSupplier
                }
                openModulInviteSupplier={openModulInviteSupplier}
              />
            )}

            {/* <Dialog
              fullWidth
              open={openModulInviteSupplier}
              onClose={this.openModulInviteSupplier}
              aria-labelledby="form-dialog-title"
              className="invite-supplier-dialog"
            >
              <div className="custom-dialog-head">
                <DialogTitle id="form-dialog-title" className="dialog-heading">
                  Invite Supplier
                </DialogTitle>
                <Button
                  onClick={this.openModulInviteSupplier}
                  className="modal-close-btn"
                >
                  <CloseIcon />
                </Button>
              </div>
              <div className="custom-dialog-content">
                <div className="invite-dialog-form">
                  {this.state.inviteUserFields.map((index) => {
                    return (
                      <div
                        key={Math.random()}
                        className="search-bar form-group"
                      >
                        <input
                          type="email"
                          name="userEmail"
                          className="control-form"
                          placeholder="example@example.com"
                          onChange={(e) =>
                            this.handleInviteFormChange(index, e)
                          }
                        />
                        <Button
                          variant="contained"
                          className="delete-btn"
                          onClick={() => this.handleInviteFormDelete(index)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </Button>
                        <span className="d-block w-100 text-danger">
                          {index.inviteError}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="invite-dialog-bottom-content">
                  <div className="add-another-buttons">
                    <Button
                      variant="contained"
                      className="add-btn"
                      onClick={() => this.handleInviteFormAdd()}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      Add Another
                    </Button>
                  </div>
                  <Button
                    variant="contained"
                    className="primary-btn"
                    onClick={() => this.handleSendInvites()}
                  >
                    Send Invites
                  </Button>
                </div>
              </div>
            </Dialog> */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { get_request_status, request_data } = state.procurement;

  return {
    get_request_status,
    request_data,
  };
};

// const CreateRfqComponet = withTranslation()(
//   connect(mapStateToProps)(CreateRfq)
// );
// export default CreateRfqComponet;

const DetailsComponet = withTranslation()(connect(mapStateToProps)(RfqDetails));
export default DetailsComponet;
