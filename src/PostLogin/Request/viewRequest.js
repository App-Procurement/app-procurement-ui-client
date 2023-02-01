import React, { Component } from "react";
import {
  NativeSelect,
  FormControl,
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import { requestForPurposeAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions, alert } from "../../_utilities";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import CloseIcon from "@mui/icons-material/Close";
import AddItemList from "./AddItemList";
import { Link } from "react-router-dom";
import AddItemImg from "../../assets/images/request/add-item-img.png";

class ViewRequest extends Component {
  inputOpenFileRef;
  formkiqClient;
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      requiData: {
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
        isEdit: false,
      },
      updateValue: {},
      user: {
        name: "himanshu",
        id: 101,
        accountType: "admin",
      },
      formData: {
        createdBy: "dummy",
        createdOn: "01-01-2022",
        updatedBy: "dummy",
        updatedOn: "01-01-2022",
        approvedBy: "dummyID",
        approvedOn: "01-01-2022",
        location: "",
        requestType: "",
        note: "",
        state: "pending",
        progressStage: "new",
        totalAmount: 824,
        department: "",
        desiredDate: "",
        deliveryDate: "",
        document: [],
        products: [],
      },
      formAllData: {},
      supplierAndCategoryList: {},
      uploadedFileList: [],
      selectedFile: {},
      openDialog: false,
      openEditDialog: false,
      openImportItemDialog: false,
      itemList: [],
      columns: [
        {
          label: "S.no",
          key: "id",
        },
        {
          label: "Name",
          key: "name",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"requisitions-no"}>
                  {value.details.itemName}
                </span>
              </td>
            );
          },
        },
        {
          label: "Category",
          key: "category",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {value.details.category}
                </span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
          key: "supplier",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {value.details.supplier.name}
                </span>
              </td>
            );
          },
        },
        {
          label: "Quantity",
          key: "quantity",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value.quantity}`}>
                <span className={"requestor"}>{value.quantity}</span>
              </td>
            );
          },
        },
        {
          label: "Unit",
          key: "unit",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">{value.details.unit}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "price",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value.details.price}</span>
              </td>
            );
          },
        },
        {
          label: "Total Cost",
          key: "totalCost",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value.details.price}</span>
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
      productsList: [],
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

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value.toString();
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
    this.props.dispatch(requestForPurposeAction.getRequestList());
    this.props.dispatch(requestForPurposeAction.getItemList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
    this.props.dispatch(requestForPurposeAction.getProductsList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.products_list_status !== prevProps.products_list_status &&
      this.props.products_list_status === status.SUCCESS
    ) {
      if (this.props.products_list && this.props.products_list.length > 0) {
        this.setState({ productsList: this.props.products_list });
      }
    }
    if (
      this.props.request_for_purpose_status !==
        prevProps.request_for_purpose_status &&
      this.props.request_for_purpose_status === status.SUCCESS
    ) {
      if (
        this.props.request_for_purpose_list &&
        this.props.request_for_purpose_list.length > 0
      ) {
        for (let i = 0; i < this.props.request_for_purpose_list.length; i++) {
          this.props.request_for_purpose_list[i].totalCost =
            this.props.request_for_purpose_list[i].price *
            this.props.request_for_purpose_list[i].quantity;
        }
        this.setState({ tableData: this.props.request_for_purpose_list });
      }
    }
    if (
      this.props.update_document_status !== prevProps.update_document_status &&
      this.props.update_document_status === status.SUCCESS
    ) {
      if (this.props.add_request_response) {
        this.props.history.push("/postlogin/requestforpurpose");
      }
    }
    if (
      this.props.item_list_status !== prevProps.item_list_status &&
      this.props.item_list_status === status.SUCCESS
    ) {
      if (this.props.item_list && this.props.item_list.length > 0) {
        for (let i = 0; i < this.props.item_list.length; i++) {
          this.props.item_list[i].totalCost =
            this.props.item_list[i].price * this.props.item_list[i].quantity;
        }
        this.setState({
          itemList: this.props.item_list,
        });
      }
    }
    if (
      this.props.supplier_category_list_status !==
        prevProps.supplier_category_list_status &&
      this.props.supplier_category_list_status === status.SUCCESS
    ) {
      if (this.props.supplier_category_list_data) {
        this.setState({
          supplierAndCategoryList: {
            ...this.props.supplier_category_list_data,
          },
        });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    let url = this.props.match.params.url;
    this.props.history.push(`/postlogin/frp/${url}/${id}`);
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: "",
      message: "",
    };
    let isValid = true;
    const retData = {
      desiredDate: validObj,
      deliveryDate: validObj,
      location: validObj,
      department: validObj,
      requestType: validObj,
      note: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { formData } = this.state;
      if (!formData.desiredDate) {
        retData.desiredDate = {
          isValid: false,
          message: "Due date is required",
        };
        isValid = false;
      }
      if (!formData.deliveryDate) {
        retData.deliveryDate = {
          isValid: false,
          message: "Delivery date is required",
        };
        isValid = false;
      }
      if (!formData.location) {
        retData.location = {
          isValid: false,
          message: "Location is required",
        };
        isValid = false;
      }
      if (!formData.department) {
        retData.department = {
          isValid: false,
          message: "Department is required",
        };
        isValid = false;
      }
      if (!formData.requestType) {
        retData.requestType = {
          isValid: false,
          message: "Purchase product type is required",
        };
        isValid = false;
      }
      if (!formData.note) {
        retData.note = {
          isValid: false,
          message: "Note for requester is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  validateUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { updateValue } = this.state;
    let isValid = true;
    const retData = {
      name: validObj,
      category: validObj,
      supplier: validObj,
      quantity: validObj,
      unit: validObj,
      price: validObj,
      isValid,
    };
    if (update) {
      if (!updateValue.details.itemName) {
        retData.name = {
          isValid: false,
          message: "Name is required",
        };
        isValid = false;
      }
      if (!updateValue.details.category) {
        retData.category = {
          isValid: false,
          message: "category is required",
        };
        isValid = false;
      }
      if (!updateValue.details.supplier) {
        retData.supplier = {
          isValid: false,
          message: "supplier is required",
        };
        isValid = false;
      }
      if (!updateValue.quantity) {
        retData.quantity = {
          isValid: false,
          message: "quantity is required",
        };
        isValid = false;
      } else if (
        updateValue.quantity &&
        !commonFunctions.validateNumeric(updateValue.quantity)
      ) {
        retData.quantity = {
          isValid: false,
          message: "quantity must be in digits",
        };
        isValid = false;
      }
      if (!updateValue.details.unit) {
        retData.unit = {
          isValid: false,
          message: "unit is required",
        };
        isValid = false;
      }
      if (!updateValue.details.price) {
        retData.price = {
          isValid: false,
          message: "price is required",
        };
        isValid = false;
      } else if (
        updateValue.price &&
        !commonFunctions.validateNumeric(updateValue.price)
      ) {
        retData.price = {
          isValid: false,
          message: "price must be in digits",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
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

  getUploadedDocument = (docId) => {
    this.formkiqClient.documentsApi.getDocumentUrl(docId).then((response) => {
      window.open(response.url, "_blank", "570", "520");
    });
  };

  openAddNewItemPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
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
    const { selectedItemList } = this.state;

    this.setState({
      isSubmitted: true,
    });

    const errorData = this.validate(true);
    if (errorData.isValid) {
      if (selectedItemList && selectedItemList.length > 0) {
        const products = selectedItemList.map((item) => {
          const retData = {
            item: {
              ...item.details,
              id: String(item.id),
            },
            quantity: `1`,
          };
          return retData;
        });
        const sendData = {
          ...this.state.formData,
          products,
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
    if (name === "name") {
      updateValue.details.itemName = value;
    } else if (name === "category") {
      updateValue.details.category = value;
    } else if (name === "supplier") {
      updateValue.details.supplier = value;
    } else if (name === "quantity") {
      updateValue.quantity = value;
    } else if (name === "unit") {
      updateValue.details.unit = value;
    } else if (name === "price") {
      updateValue.details.price = value;
    }
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

  openImportItemPopup = () => {
    this.setState({
      openImportItemDialog: !this.state.openImportItemDialog,
    });
  };

  render() {
    const {
      formData,
      isSubmitted,
      desiredDate,
      deliverDate,
      openDialog,
      openEditDialog,
      columns,
      activeIndex,
      updateValue,
      selectedItemList,
      uploadedFileList,
      supplierAndCategoryList,
      update,
      openImportItemDialog,
      productsList,
    } = this.state;

    const errorData = this.validate(isSubmitted);
    const updateForm = this.validateUpdate(update);
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="view-request-contant">
            <div className="new-request-heading">
              <Link to={`/postlogin/request/`}>My Request</Link>
              <i className="far fa-angle-right"></i>
              View Request
            </div>
            <div className="requisitions-filter">
              <div className="form-group row col-form-group mb-md-4">
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Due Date")}
                </label>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 col-form-field">
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={desiredDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) => this.handleDates(date, "desiredDate")}
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.desiredDate.message}
                  </span>
                </div>
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Delivery Date")}
                </label>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 col-form-field">
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={deliverDate}
                      placeholder={"YYYY-MM-DD"}
                      onChange={(date) =>
                        this.handleDates(date, "deliveryDate")
                      }
                    />
                    <CalendarTodayIcon className="calendar-icon" />
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.deliveryDate.message}
                  </span>
                </div>
              </div>
              <div className="form-group row col-form-group mb-md-4">
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Location")}
                </label>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 col-form-field">
                  <div className="new-requeust-massge">
                    <FormControl className="select-menu">
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
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Department")}
                </label>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 col-form-field">
                  <div className="new-requeust-massge">
                    <FormControl className="select-menu">
                      <NativeSelect
                        name="department"
                        value={formData.department}
                        onChange={this.handleStateChange}
                      >
                        <option value={"HR Department"}>HR Department</option>
                        <option value={"abc"}>abc</option>
                        <option value={"def"}>def</option>
                        <option value={"abc"}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {errorData.department.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group row col-form-group mb-md-4">
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Request Type")}
                </label>
                <div className="col-12 col-sm-8 col-md-4 col-lg-4 col-xl-3 col-form-field">
                  <div className="new-requeust-massge">
                    <FormControl className="select-menu">
                      <NativeSelect
                        name="requestType"
                        value={formData.requestType}
                        onChange={this.handleStateChange}
                      >
                        <option value="Purchase">Purchase</option>
                        <option value={"abc"}>abc</option>
                        <option value={"def"}>def</option>
                        <option value={"abc"}>abc</option>
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {errorData.requestType.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group row col-form-group">
                <label className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 col-form-label">
                  {t("Note")}
                </label>
                <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-6 col-form-field">
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
            <div className="order-line-heading">
              <div className="row col-form-group d-flex align-items-center justify-content-center ">
                <h4 className="col-sm-12 col-md-4 col-lg-4 col-xl-3 col-form-button">
                  {t("Order Line 04")}
                </h4>
                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9 col-form-button">
                  <div className="order-line-buttons">
                    <Button
                      variant="contained"
                      className="primary-btn add-item-btn"
                      disableElevation
                      onClick={this.openAddNewItemPopup}
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true" />
                      Add Items
                    </Button>
                    <Button
                      variant="contained"
                      className="add-custom-btn"
                      disableElevation
                    >
                      Add Custom Item
                    </Button>
                    <Button
                      variant="contained"
                      className="add-custom-btn"
                      disableElevation
                      onClick={this.openImportItemPopup}
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true" />
                      Import Item
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {selectedItemList && selectedItemList.length > 0 && (
              <Table
                valueFromData={{ columns: columns, data: selectedItemList }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                isLoading={
                  this.props.recieved_rfp_status === status.IN_PROGRESS
                }
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                showingLine="Showing %start% to %end% of %total% "
              />
            )}
            <div className="new-request-bottom-section">
              {uploadedFileList && uploadedFileList.length > 0 && (
                <Button
                  variant="contained"
                  className="primary-btn mb-3"
                  onClick={() => this.getUploadedDocument(uploadedFileList[0])}
                >
                  Get Documents
                </Button>
              )}
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

              <React.Fragment>
                <div className="item-submit-buttons">
                  <div className="row col-form-group ">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-form-button">
                      {selectedItemList && selectedItemList.length > 0 && (
                        <div className="item-delete-buttons">
                          <div className="submit-btn">
                            <Button
                              variant="contained"
                              className="submit"
                              onClick={this.createRequest}
                              disabled={
                                this.props.add_request_status === 0
                                  ? true
                                  : false
                              }
                            >
                              Submit
                            </Button>
                          </div>
                          <div className="delete-btn">
                            <Button variant="contained" className="delete">
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>

        <Dialog
          open={openImportItemDialog}
          onClose={this.openImportItemPopup}
          aria-labelledby="form-dialog-title"
          className="import-item-dialog"
        >
          <div className="additem-dialog-head">
            <DialogTitle
              id="form-dialog-title"
              className="addNewItemDialogTitle dialog-heading"
            >
              Import Item
            </DialogTitle>
            <Button
              onClick={this.openImportItemPopup}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>

          <DialogContent className="dialogSmWidth addNewItemDialogContent">
            <div className="supplier-inner-content">
              <div className="heading text-center">
                <h4>Download Import File Template</h4>
              </div>
              <div className="download-btn text-center">
                <Button
                  href="/postlogin/viewsupplierdetail"
                  variant="contained"
                  className="new-requisition-btn"
                >
                  Download
                </Button>
              </div>
              <div className="heading text-center">
                <h5>Upload the Updated File</h5>
              </div>
              <div className="upload-file-box text-center">
                <div className="attach">
                  <div className="image">
                    <img src={AddItemImg} alt="" />
                    <div className="file-inner-content">
                      <p>Drag and drop files to Upload</p>
                      <p>or</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                    accept=" .pdf , .doc , .ppt , .jpg , .png"
                    name="requisitionFile"
                    onChange={this.handleFileChange}
                    multiple
                  />

                  <div className="select-button">
                    <Button variant="contained" className="new-requisition-btn">
                      Select file to upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {
          <AddItemList
            openDialog={openDialog}
            setSelectedItemList={this.setSelectedItemList}
            openAddNewItemPopup={this.openAddNewItemPopup}
            productsList={productsList}
          />
        }

        {activeIndex >= 0 && (
          <Dialog
            open={openEditDialog}
            onClose={this.closeEditModal}
            aria-labelledby="form-dialog-title"
            className="custom-dialog edit-dialog"
          >
            <div className="custom-dialog-head">
              <DialogTitle id="form-dialog-title" className="dialog-heading">
                Edit
              </DialogTitle>
              <Button onClick={this.closeEditModal} className="modal-close-btn">
                <CloseIcon />
              </Button>
            </div>
            <div className="custom-dialog-content">
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Name</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    onChange={this.handleUpdate}
                    value={
                      updateValue.details ? updateValue.details.itemName : ""
                    }
                  />
                  <span className="d-block w-100 text-danger">
                    {updateForm.name.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Category</label>
                <div className="col-9 col-form-field">
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="category"
                      onChange={this.handleUpdate}
                      value={
                        updateValue.details ? updateValue.details.category : ""
                      }
                    >
                      <option
                        value={
                          updateValue.details
                            ? updateValue.details.category
                            : ""
                        }
                      >
                        {updateValue.details
                          ? updateValue.details.category
                          : ""}
                      </option>
                      {supplierAndCategoryList &&
                        supplierAndCategoryList.category &&
                        supplierAndCategoryList.category.length > 0 &&
                        supplierAndCategoryList.category.map((val, index) => (
                          <option value={val.categoryName} name="category">
                            {val.categoryName}
                          </option>
                        ))}
                    </NativeSelect>
                    <span className="d-block w-100 text-danger">
                      {updateForm.category.message}
                    </span>
                  </FormControl>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Supplier</label>
                <div className="col-9 col-form-field">
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="supplier"
                      onChange={this.handleUpdate}
                      value={
                        updateValue.details
                          ? updateValue.details.supplier.name
                          : ""
                      }
                    >
                      <option
                        value={
                          updateValue.details
                            ? updateValue.details.supplier.name
                            : ""
                        }
                      >
                        {updateValue.details
                          ? updateValue.details.supplier.name
                          : ""}
                      </option>
                      {supplierAndCategoryList &&
                        supplierAndCategoryList.supplierDetails &&
                        supplierAndCategoryList.supplierDetails.length > 0 &&
                        supplierAndCategoryList.supplierDetails.map(
                          (val, index) => (
                            <option value={val.supplierName} name="supplier">
                              {val.supplierName}
                            </option>
                          )
                        )}
                    </NativeSelect>
                    <span className="d-block w-100 text-danger">
                      {updateForm.supplier.message}
                    </span>
                  </FormControl>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Quantity</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={this.handleUpdate}
                    value={updateValue ? updateValue.quantity : ""}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateForm.quantity.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Unit</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="unit"
                    className="form-control"
                    placeholder="Unit"
                    onChange={this.handleUpdate}
                    value={updateValue.details ? updateValue.details.unit : ""}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateForm.unit.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Price</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    onChange={this.handleUpdate}
                    value={updateValue.details ? updateValue.details.price : ""}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateForm.price.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label"></label>
                <div className="col-9 col-form-field">
                  <Button
                    variant="contained"
                    className="submit"
                    onClick={this.updateDataValues}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
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
    products_list_status,
    products_list,
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
    products_list_status,
    products_list,
  };
};

const viewRequestComponet = withTranslation()(
  connect(mapStateToProps)(ViewRequest)
);

export default viewRequestComponet;
