import React, { Component } from "react";
import { Button, FormControl, NativeSelect } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@y0c/react-datepicker";
import { commonFunctions } from "../../_utilities";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { connect } from "react-redux";
import { requestForPurposeAction } from "../../_actions";
import {
  requestForQuotationAction,
  productActions,
  manageSupplierAction,
} from "../../_actions";
import { status } from "../../_constants";
import { alert } from "../../_utilities";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import AddlineItemList from "./AddlineItemList";
import { Link } from "react-router-dom";
import AddSupplierContent from "./AddSupplierContent";
import InviteSupplierDialog from "./InviteSupplierDialog";
import { CatchingPokemonSharp } from "@mui/icons-material";

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
      searchProductListData: [],
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
        onFormSubmitted: (formName) => {},
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
    formData[name] = `${date.$D}-${date.$M + 1}-${date.$y}`;
    this.setState({ formData });
  };

  componentDidMount() {
    this.props.dispatch(productActions.searchProductList());
    this.props.dispatch(requestForQuotationAction.searchRequestQuotationData());
    this.props.dispatch(manageSupplierAction.searchSupplierList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.search_suplier_list_status &&
      this.props.search_suplier_list_status !==
        prevProps.search_suplier_list_status &&
      this.props.search_suplier_list_status === status.SUCCESS
    ) {
      if (
        this.props.search_supplier_list &&
        this.props.search_supplier_list.length > 0
      ) {
        this.setState({
          searchSupplierListData: this.props.search_supplier_list,
        });
      }
    }

    if (
      this.props.search_product_list_status &&
      this.props.search_product_list_status !==
        prevProps.search_product_list_status &&
      this.props.search_product_list_status === status.SUCCESS
    ) {
      let { searchProductListData } = this.state;
      if (
        this.props.search_product_list &&
        this.props.search_product_list.length > 0
      ) {
        this.props.search_product_list.map((item) => {
          let itemData = item.details;

          searchProductListData.push({
            ...itemData,
            id: item.id,
          });
          this.setState({
            searchProductListData,
          });
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
      }
    }
  };

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
    if (
      selectedItemList.length === 0 ||
      (selectedItemList.length &&
        selectedItemList.findIndex((e) => e.id === data.id) === -1)
    ) {
      this.setState({ selectedItemList: [...selectedItemList, data] });
    }
  };

  createRequest = (event) => {
    event.preventDefault();
    const {
      formData,
      selectedItemList,
      selectedFile,
      uploadedFileList,
    } = this.state;

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

    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    const { history } = this.props;

    if (errorData.isValid && this.state.result.length > 0) {
      if (result && result.length > 0 && this.props.get_request_status === 1) {
        let sendData = {
          openDate: formData.openDate,
          closingDate: formData.closingDate,
          requiredDeliveryDate: formData.requiredDeliveryDate,
          rfqType: this.props.request_data[0].details.rfqType,
          document: this.props.request_data[0].details.document,
          location: this.props.request_data[0].details.location,
          note: formData.note,
          product: this.state.selectedItemList,
          paymentTerms: this.props.request_data[0].details.paymentTerms,
          paymentMode: this.props.request_data[0].details.paymentMode,
          incoterms: this.props.request_data[0].details.incoterms,
          modeOfDelivery: this.props.request_data[0].details.modeOfDelivery,
        };
        this.props.dispatch(requestForQuotationAction.createRfq(sendData));
      }
    }
  };

  handleCallback = (childData) => {
    console.log("child dat ", childData);
    this.setState({ selectedSupplierData: childData });
    let { requestDetailsData, searchSupplierListData } = this.state;
    if (searchSupplierListData && searchSupplierListData.length > 0) {
      searchSupplierListData.map((item) => {
        if (item.details.email === childData) {
          if (
            this.state.result.length === 0 ||
            (this.state.result.length &&
              this.state.result.findIndex((e) => e.id === item.id) === -1)
          ) {
            this.setState({
              result: [...this.state.result, item],
            });
          }
        }
      });
    }
  };

  render() {
    const {
      formData,
      isSubmitted,
      openDialog,
      openModulRfqAddSupplier,
      openModulInviteSupplier,
      searchProductListData,
      requestDetailsData,
      selectedItemList,
    } = this.state;
    console.log("result ", this.state.result);

    const errorData = this.validate(isSubmitted);
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
                    <CalendarTodayIcon className="calendar-icon" />
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
                    <CalendarTodayIcon className="calendar-icon" />
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
                    <CalendarTodayIcon className="calendar-icon" />
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
                    >
                      <option value={"Main Office Usa"}>Select rfq type</option>
                      <option value={"this"}>this</option>
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

            {searchProductListData.length > 0 && (
              <AddlineItemList
                openDialog={openDialog}
                setSelectedItemList={this.setSelectedItemList}
                openAddNewItemPopup={this.openAddNewItemPopup}
                searchProductListData={searchProductListData}
              />
            )}

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
                  {this.state.selectedItemList &&
                  this.state.selectedItemList.length > 0
                    ? this.state.selectedItemList.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div className="description">
                              <div className="iteam-name">{item.itemName}</div>
                            </div>
                          </td>
                          <td>
                            <div className="description">
                              <div className="iteam-name">{item.category}</div>
                            </div>
                          </td>
                          <td>
                            <div className="description">
                              <div className="iteam-name">{item.unit}</div>
                            </div>
                          </td>
                          <td>
                            <div className="description">
                              <div className="iteam-name">{index + 1}</div>
                            </div>
                          </td>
                          <td>
                            <div className="description">
                              <div className="iteam-name">{item.price}</div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
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
                          <div className="iteam-name">{item.details.name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="description ">
                          <div className="iteam-name category">
                            {item.details.email}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="description">
                          <div className="iteam-name category">
                            {item.details.contact}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="description">
                          <div className="iteam-name">
                            ${item.details.status}
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <Button className="list-btn">
                          <i class="fas fa-ellipsis-v"></i>
                        </Button>
                      </td> */}
                    </tr>
                  ))}
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
                searchSupplierListData={this.state.searchSupplierListData}
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    request_data,
    get_request_status,
    search_product_list,
    search_product_list_status,
    search_suplier_list_status,
    search_supplier_list,
  } = state.procurement;

  return {
    request_data,
    get_request_status,
    search_product_list,
    search_product_list_status,
    search_suplier_list_status,
    search_supplier_list,
  };
};

const DetailsComponet = withTranslation()(connect(mapStateToProps)(RfqDetails));

export default DetailsComponet;
