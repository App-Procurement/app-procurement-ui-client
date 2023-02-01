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
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { requistionAction } from "../../../_actions";
import { status } from "../../../_constants";
import CloseIcon from "@mui/icons-material/Close";
import { alert, requisitionStatus } from "../../../_utilities";
import pdfIcon from "../../../assets/images/icons/pdficon.png";
import docIcon from "../../../assets/images/icons/docIcon.png";
import excalIcon from "../../../assets/images/excalicon.png";
import jpgIcon from "../../../assets/images/icons/jpgIcon.png";
import pngIcon from "../../../assets/images/icons/pngIcon.png";
import pptIcon from "../../../assets/images/icons/pptIcon.png";
import csvIcon from "../../../assets/images/icons/csvIcon.png";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../../_components/commonLoader";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

class NewRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isLoading: false,
      requisitionFile: [],
      itemDescription: "",
      itemPrice: "",
      itemQuantity: "",
      totalAmount: "",
      ratePerItem: "",
      addRequiData: {
        departmentId: "",
        currencyId: "",
        financialYear: "",
        status: "",
        roleName: "",
        totalPrice: "",
        notes: "",
        requisitionLineItemLists: [],
      },
      openDialog: false,
      anchorEl: null,
      open: false,
      validateSubmit: false,
      editIndex: "",
      requisitionLineItemFile: [],
      editReq: false,
      requisitionLineItemFileName: [],
      requisitionFileName: [],
      display: false,
      imageURL: {
        doc: docIcon,
        jpg: jpgIcon,
        pdf: pdfIcon,
        png: pngIcon,
        ppt: pptIcon,
        csv: csvIcon,
      },
    };
    this.imagePreviewRef = React.createRef();
  }

  componentDidMount() {
    this.getCurrentFinancialYear();
    if (this.props.match.params.id) {
      this.props.dispatch(
        requistionAction.getRequisition({
          id: this.props.match.params.id,
        })
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { addRequiData, requisitionFile } = this.state;

    if (
      prevProps.create_requisition_status !==
        this.props.create_requisition_status &&
      this.props.create_requisition_status === status.SUCCESS
    ) {
      alert.success("Add requisition successful");
      this.props.history.push("/postlogin/managerequisition");
      this.setState({
        isLoading: false,
      });
    }

    if (
      prevProps.get_edit_requisition_status !==
        this.props.get_edit_requisition_status &&
      this.props.get_edit_requisition_status === status.SUCCESS
    ) {
      const { editRequisitiondata } = this.props;
      if (editRequisitiondata) {
        addRequiData.departmentId = editRequisitiondata.id;
        addRequiData.currencyId = editRequisitiondata.currency;
        addRequiData.financialYear = editRequisitiondata.financialYear;

        addRequiData.status = editRequisitiondata.status;
        addRequiData.roleName = editRequisitiondata.roleName;
        addRequiData.totalPrice = editRequisitiondata.totalPrice;
        addRequiData.notes = editRequisitiondata.notes;
        addRequiData.requisitionLineItemLists =
          editRequisitiondata.requistionItem || [];
        this.setState({
          editReq: true,
          addRequiData,
          totalAmount: editRequisitiondata.totalPrice,
          requisitionFile,
        });
      }
    }

    if (
      prevProps.update_requisition_status !==
        this.props.update_requisition_status &&
      this.props.update_requisition_status === status.SUCCESS
    ) {
      if (this.props.updateRequisition) {
        this.setState({
          editReq: false,
          isLoading: false,
        });
      }
      this.props.history.push("/postlogin/managerequisition");
      alert.success("Requisition Update successfully");
    }
  }

  tableToggle = (e) => {
    const { open } = this.state;
    this.setState({
      open: !open,
      anchorEl: e.currentTarget,
    });
  };

  getCurrentFinancialYear() {
    let { addRequiData } = this.state;
    let today = new Date();
    addRequiData.financialYear = today.getFullYear();
    this.setState({
      addRequiData,
    });
  }

  displayTableData = () => {
    const { addRequiData } = this.state;
    const { editRequisitiondata, get_edit_requisition_status } = this.props;
    let retData = [];
    if (
      get_edit_requisition_status === status.SUCCESS &&
      editRequisitiondata.requistionItem &&
      editRequisitiondata.requistionItem.length > 0
    ) {
      for (let i = 0; i < editRequisitiondata.requistionItem; i++) {
        let data = editRequisitiondata.requistionItem[i];
        retData.push(
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{data.itemDescription}</td>
            <td>{data.orderQuantity}</td>
            <td>{data.ratePerItem}</td>
            <td>{data.price}</td>
            <td>
              <div className="popper-toggle">
                <Button>
                  <DeleteIcon onClick={() => this.deleteReqData(i)} />
                </Button>
                <Button>
                  <CreateIcon onClick={() => this.editReqData(data, i)} />
                </Button>
              </div>
            </td>
          </tr>
        );
      }
    }

    if (
      addRequiData.requisitionLineItemLists &&
      addRequiData.requisitionLineItemLists.length > 0
    ) {
      for (let i = 0; i < addRequiData.requisitionLineItemLists.length; i++) {
        let data = addRequiData.requisitionLineItemLists[i];
        retData.push(
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{data.itemDescription}</td>
            <td>{data.orderQuantity}</td>
            <td>{data.ratePerItem}</td>
            <td>{data.price}</td>
            <td>
              <div className="popper-toggle">
                <Button>
                  <DeleteIcon onClick={() => this.deleteReqData(i)} />
                </Button>
                <Button>
                  <CreateIcon onClick={() => this.editReqData(data, i)} />
                </Button>
              </div>
            </td>
          </tr>
        );
      }
    }

    return retData;
  };

  handleStateChange = (e) => {
    const { name, value, checked } = e.target;
    const { addRequiData } = this.state;
    if (e.target.type === "checkbox") {
      addRequiData[name] = checked;
    } else {
      addRequiData[name] = value;
    }
    this.setState({
      addRequiData,
    });
  };

  handleaddRequiDataClick = (event) => {
    const {
      addRequiData,
      totalAmount,
      requisitionFile,
      requisitionLineItemFile,
      fileDescription,
      editReq,
    } = this.state;
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      this.setState({
        isLoading: true,
      });
      let obj = {
        departmentId: addRequiData.departmentId,
        currencyId: addRequiData.currencyId,
        financialYear: addRequiData.financialYear,
        status: addRequiData.status,
        roleName: addRequiData.roleName,
        totalPrice: totalAmount,
        notes: addRequiData.notes,
        requisitionLineItemLists: addRequiData.requisitionLineItemLists,
      };
      if (editReq === true) {
        obj.id = this.props.match.params.id;
      }
      const sendData = {
        requisitionLineItemFile,
        obj,
        requisitionFile,
        fileDescription,
      };
      if (editReq === false) {
        this.props.dispatch(requistionAction.addRequisition(sendData));
      } else {
        this.props.dispatch(requistionAction.editRequisition(sendData));
      }
    } else {
      alert.error("Please Enter all Required Fields");
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      roleName: validObj,
      financialYear: validObj,
      departmentId: validObj,
      currencyId: validObj,
      notes: validObj,
      status: validObj,
      isValid,
    };
    const { addRequiData } = this.state;
    if (isSubmitted) {
      if (!addRequiData.roleName) {
        retData.roleName = {
          isValid: false,
          message: "Requester Name is Required",
        };
        isValid = false;
      }
      if (!addRequiData.financialYear) {
        retData.financialYear = {
          isValid: false,
          message: "Financial Year is Required",
        };
        isValid = false;
      } else if (addRequiData.financialYear.length > 4) {
        retData.financialYear = {
          isValid: false,
          message: "Financial Year Must Be in 4 Digits",
        };
        isValid = false;
      }
      if (!addRequiData.departmentId) {
        retData.departmentId = {
          isValid: false,
          message: "Department is Required",
        };
        isValid = false;
      }
      if (!addRequiData.currencyId) {
        retData.currencyId = {
          isValid: false,
          message: "Currency is Required",
        };
        isValid = false;
      }
      if (!addRequiData.notes) {
        retData.notes = {
          isValid: false,
          message: "General Text is Required",
        };
        isValid = false;
      }
      if (!addRequiData.status) {
        retData.status = {
          isValid: false,
          message: "Status is Required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  displayDepartment = () => {
    const { department_list } = this.props;
    let departmentoption = [];
    if (department_list) {
      for (let i = 0; i < department_list.length; i++) {
        departmentoption.push(
          <option key={i} value={department_list[i].id}>
            {department_list[i].name}
          </option>
        );
      }
    }
    return departmentoption;
  };

  displayCurrency = () => {
    const { currency_list_data } = this.props;
    let currencyoption = [];
    if (currency_list_data) {
      for (let i = 0; i < currency_list_data.object.length; i++) {
        currencyoption.push(
          <option key={i} value={currency_list_data.object[i]}>
            {currency_list_data.object[i].code}
          </option>
        );
      }
    }
    return currencyoption;
  };

  handleFileChange = (e) => {
    let { requisitionLineItemFile, requisitionFile } = this.state;
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "requisitionFile") {
        requisitionFile.push(...Array.from(files));
        this.setState({
          requisitionFile,
        });
      } else if (name === "requisitionLineItemFile") {
        requisitionLineItemFile.push(...Array.from(files));
        this.setState({
          requisitionLineItemFile,
        });
      }
    }
  };

  handleRemove = (index, fileName) => {
    let { requisitionLineItemFile, requisitionFile } = this.state;
    if (fileName === "requisitionFile") {
      requisitionFile.splice(index, 1);
    } else if (fileName === "requisitionLineItemFile") {
      requisitionLineItemFile.splice(index, 1);
    }
    this.setState({
      requisitionFile,
      requisitionLineItemFile,
    });
  };

  editReqData = (data, index) => {
    this.setState({
      isEdit: true,
      itemDescription: data.itemDescription,
      itemQuantity: data.orderQuantity,
      ratePerItem: data.ratePerItem,
      itemPrice: data.itemPrice,
      openDialog: true,
      editIndex: index,
    });
  };

  deleteReqData = (id) => {
    const { addRequiData } = this.state;
    addRequiData.requisitionLineItemLists.splice(id, 1);
    let totalprice = 0;
    if (addRequiData) {
      for (let i = 0; i < addRequiData.requisitionLineItemLists.length; i++) {
        totalprice =
          addRequiData.requisitionLineItemLists[i].price + totalprice;
      }
    }
    this.setState({
      addRequiData,
      totalAmount: totalprice,
    });
  };

  addNewClickOpen = () => {
    let { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
    });
  };

  addNewClickClose = () => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
    });
  };

  addNewRequistion = (event) => {
    let {
      addRequiData,
      itemDescription,
      editReq,
      itemQuantity,
      ratePerItem,
      editIndex,
      isEdit,
    } = this.state;
    event.preventDefault();
    this.setState({
      validateSubmit: true,
    });
    const errorData = this.validateReq(true);
    if (errorData.isValid) {
      let price = itemQuantity * ratePerItem;
      if (isEdit === false || (editReq === true && isEdit === false)) {
        addRequiData.requisitionLineItemLists.push({
          itemDescription: itemDescription,
          price: price,
          orderQuantity: itemQuantity,
          ratePerItem: ratePerItem,
        });
      } else {
        addRequiData.requisitionLineItemLists[
          editIndex
        ].itemDescription = itemDescription;
        addRequiData.requisitionLineItemLists[editIndex].price = price;
        addRequiData.requisitionLineItemLists[
          editIndex
        ].orderQuantity = itemQuantity;
        addRequiData.requisitionLineItemLists[
          editIndex
        ].ratePerItem = ratePerItem;
      }
      let totalprice = 0;
      if (addRequiData) {
        for (let i = 0; i < addRequiData.requisitionLineItemLists.length; i++) {
          totalprice =
            addRequiData.requisitionLineItemLists[i].price + totalprice;
        }
      }
      this.setState({
        addRequiData,
        openDialog: false,
        itemDescription: "",
        itemPrice: "",
        itemQuantity: "",
        ratePerItem: "",
        totalAmount: totalprice,
        validateSubmit: false,
        isEdit: false,
        editIndex: "",
      });
    }
  };

  handlenewReqState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateReq = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      itemDescription: validObj,
      itemQuantity: validObj,
      ratePerItem: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { itemDescription, itemQuantity, ratePerItem } = this.state;
      if (!itemDescription) {
        retData.itemDescription = {
          isValid: false,
          message: "Requester Item description is Required",
        };
        isValid = false;
      }
      if (!itemQuantity) {
        retData.itemQuantity = {
          isValid: false,
          message: "Requester Quantity is Required",
        };
        isValid = false;
      }
      if (!ratePerItem) {
        retData.ratePerItem = {
          isValid: false,
          message: "Requester Item Price is Required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleFileIcon = (file) => {
    let extension = file.name.split(".").pop();
    let iconValue = this.state.imageURL[extension];
    return iconValue;
  };

  saveToDraft = () => {
    let { addRequiData } = this.state;
    addRequiData.status = requisitionStatus.DRAFT;
    this.setState({
      addRequiData,
    });
  };

  render() {
    const {
      addRequiData,
      isSubmitted,
      openDialog,
      itemDescription,
      itemQuantity,
      ratePerItem,
      totalAmount,
      validateSubmit,
      requisitionLineItemFile,
      requisitionFile,
      editReq,
      isLoading,
    } = this.state;
    const { create_requisition_status, update_requisition_status } = this.props;
    const errorData = this.validate(isSubmitted);
    const errorReqData = this.validateReq(validateSubmit);
    return (
      <>
        {!isLoading && (
          <div className="main-content">
            <div className="new-req-section">
              <div className="d-block heading">
                <h4 className="d-inline-block">
                  {editReq === false ? `${t("Add New")}` : "Edit"}{" "}
                  {t("Requisition")}
                </h4>
                <div className="heading-buttons">
                  <Button
                    variant="outlined"
                    className="draft-btn"
                    onClick={this.saveToDraft}
                  >
                    <SaveIcon />
                    {t(" Save to Draft")}
                  </Button>
                </div>
              </div>
              <div className="requisition-form">
                <div className="row">
                  <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-12">
                    <div className="requisition-form-left">
                      <div className="requester">
                        <div className="form-group">
                          <label>{t("Requester")}</label>
                          <input
                            type="text"
                            name="roleName"
                            value={addRequiData.roleName || ""}
                            onChange={this.handleStateChange}
                            placeholder="PSDS Admin"
                          />
                          <span className="text-danger">
                            {errorData.roleName.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <div className="form-group">
                          <label>{t("Financial year")}</label>
                          <input
                            type="text"
                            name="financialYear"
                            value={addRequiData.financialYear || ""}
                            onChange={this.handleStateChange}
                          />
                          <span className="text-danger">
                            {errorData.financialYear.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <div className="form-group">
                          <label>{t("Department")}</label>
                          <FormControl className="select-menu">
                            <NativeSelect
                              name="departmentId"
                              value={addRequiData.departmentId}
                              onChange={this.handleStateChange}
                            >
                              <option value="">-Select-</option>
                              {this.displayDepartment()}
                            </NativeSelect>
                          </FormControl>
                          <span className="text-danger">
                            {errorData.departmentId.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <div className="form-group">
                          <label>{t("Currency")}</label>
                          <FormControl className="select-menu">
                            <NativeSelect
                              name="currencyId"
                              onChange={this.handleStateChange}
                              value={addRequiData.currencyId}
                            >
                              <option value="">-Select-</option>
                              {this.displayCurrency()}
                            </NativeSelect>
                          </FormControl>
                          <span className="text-danger">
                            {errorData.currencyId.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <div className="form-group">
                          <p className="requisition-text">
                            {t("General Purpose for Requisition")}
                          </p>
                          <TextareaAutosize
                            className="text-box"
                            aria-label="maximum height"
                            placeholder=""
                            defaultValue=""
                            name="notes"
                            value={addRequiData.notes || ""}
                            onChange={this.handleStateChange}
                          />
                          <span className="text-danger">
                            {errorData.notes.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <label>
                          <strong>{t("Extra Budgetory")}</strong>
                        </label>
                      </div>
                      <div className="requester">
                        <label>{t("Attach Files")}</label>
                        {requisitionFile && requisitionFile.length === 0 && (
                          <div className="attach">
                            <input
                              type="file"
                              placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                              accept=" .pdf , .doc , .ppt , .jpg , .png"
                              name="requisitionFile"
                              onChange={this.handleFileChange}
                              multiple
                            />
                            <CloudUploadIcon className="icon" />
                            <div className="file-content">
                              <p>{t("Upload file")}</p>
                              <span>PDF, DOC, PPT, JPG, PNG</span>
                            </div>
                          </div>
                        )}
                        <ul className="attach-files">
                          {requisitionFile &&
                            requisitionFile.length > 0 &&
                            requisitionFile.map((file, index) => {
                              let retValue = this.handleFileIcon(file);
                              return (
                                <li>
                                  <div className="d-flex justify-content-center align-items-start">
                                    <div className="col-2 pl-0">
                                      <div className="file-icon">
                                        <img src={retValue} alt="" />
                                      </div>
                                    </div>
                                    <div className="col-8 px-0">
                                      <a
                                        href={URL.createObjectURL(file)}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <Tooltip title={file.name}>
                                          <div
                                            className="file-name"
                                            aria-label={file.name}
                                          >
                                            {file.name}
                                          </div>
                                        </Tooltip>
                                      </a>
                                      <input
                                        type="text"
                                        className="file-name-input"
                                        placeholder={"File description"}
                                      />
                                    </div>
                                    <div className="col-2 pr-0">
                                      <IconButton className="CancelIcon">
                                        <CancelIcon
                                          onClick={() => {
                                            this.handleRemove(
                                              index,
                                              "requisitionFile"
                                            );
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          {requisitionFile && requisitionFile.length > 0 && (
                            <li className="upload-more">
                              <Button className="upload-btn">
                                Upload More
                                <input
                                  type="file"
                                  id="requisitionFile"
                                  accept=" .pdf , .doc , .ppt , .jpg , .png"
                                  name="requisitionFile"
                                  onChange={this.handleFileChange}
                                  multiple
                                />
                              </Button>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="requester action">
                        <div className="form-group">
                          <p className="requisition-text requisition-action-text">
                            Action
                          </p>
                          <div className="requisition-approval">
                            <RadioGroup
                              aria-label="position"
                              name="position"
                              defaultValue="top"
                            >
                              <FormControlLabel
                                value={requisitionStatus.DRAFT}
                                checked={
                                  addRequiData.status ===
                                  requisitionStatus.DRAFT
                                }
                                name="status"
                                control={<Radio color="primary" />}
                                label={t("Save Requisition")}
                                onChange={this.handleStateChange}
                              />
                              <FormControlLabel
                                value={requisitionStatus.ACTIVE}
                                name="status"
                                checked={
                                  addRequiData.status ===
                                  requisitionStatus.ACTIVE
                                }
                                control={<Radio color="primary" />}
                                label={t("Send For Approval")}
                                onChange={this.handleStateChange}
                              />
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                      <div className="requisition-submit-button">
                        <Button
                          variant="contained"
                          className="primary-btn"
                          onClick={this.handleaddRequiDataClick}
                          disableElevation
                          disabled={
                            create_requisition_status === status.IN_PROGRESS ||
                            update_requisition_status === status.IN_PROGRESS
                          }
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12 col-12">
                    <div className="requisition-form-right">
                      <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={this.addNewClickOpen}
                        disableElevation
                      >
                        {t("Add New Item")}
                      </Button>
                      <div className="item-heading">
                        {t("Requisition Items")}
                      </div>
                      <SimpleBar>
                        <div className="item-detail">
                          <table width="100%">
                            <thead className="item-content">
                              <tr>
                                <th>Id</th>
                                <th>Requisition Item</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>{this.displayTableData()}</tbody>
                          </table>
                        </div>
                      </SimpleBar>
                      <div className="requisition">
                        {requisitionLineItemFile &&
                          requisitionLineItemFile.length === 0 && (
                            <div className="requisition-file">
                              <input
                                type="file"
                                placeholder="Upload files (XLS)"
                                name="requisitionLineItemFile"
                                accept=".xlsx, .xls, .csv"
                                onChange={this.handleFileChange}
                                multiple
                              />
                              <CloudUploadIcon className="icon" />
                              <div className="file-content">
                                <p>Upload file</p>
                                <span>Excel File </span>
                              </div>
                            </div>
                          )}
                        <ul className="attach-files">
                          {requisitionLineItemFile &&
                            requisitionLineItemFile.length > 0 &&
                            requisitionLineItemFile.map((file, index) => {
                              return (
                                <li>
                                  <div className="d-flex justify-content-center align-items-start">
                                    <div className="col-2 pl-0">
                                      <div className="file-icon">
                                        <img src={excalIcon} alt="" />
                                      </div>
                                    </div>
                                    <div className="col-8 px-0">
                                      <a
                                        href={URL.createObjectURL(file)}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <div className="file-name">
                                          {file.name}
                                        </div>
                                      </a>
                                    </div>
                                    <div className="col-2 pr-0">
                                      <IconButton className="CancelIcon">
                                        <CancelIcon
                                          onClick={() => {
                                            this.handleRemove(
                                              index,
                                              "requisitionLineItemFile"
                                            );
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          {requisitionLineItemFile &&
                            requisitionLineItemFile.length > 0 && (
                              <li className="upload-more">
                                <Button className="upload-btn">
                                  Upload More
                                  <input
                                    type="file"
                                    placeholder="Upload More"
                                    name="requisitionLineItemFile"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={this.handleFileChange}
                                    multiple
                                  />
                                </Button>
                              </li>
                            )}
                        </ul>
                        <div className="total-amount">
                          <span>{t("Total Estimate Coste")}</span>
                          <p>{totalAmount ? totalAmount : "00.00 USD"}</p>
                        </div>
                      </div>

                      <Dialog
                        open={openDialog}
                        onClose={this.addNewClickClose}
                        aria-labelledby="form-dialog-title"
                        className="addNewItemDialog"
                      >
                        <DialogTitle
                          id="form-dialog-title"
                          className="dialogSmWidth addNewItemDialogTitle"
                        >
                          {t("Add New Item")}
                          <Button
                            onClick={this.addNewClickClose}
                            className="modal-close-btn"
                          >
                            <CloseIcon />
                          </Button>
                        </DialogTitle>
                        <DialogContent className="dialogSmWidth addNewItemDialogContent">
                          <div className="form-row">
                            <div className="col-sm-12 col-md-6 form-group">
                              <p className="requisition-text">
                                {t("Requisition Item")}
                              </p>
                              <input
                                type="text"
                                name="itemDescription"
                                value={itemDescription}
                                onChange={this.handlenewReqState}
                                placeholder="Asus Laptop Ryzen 5"
                              />
                              <span className="text-danger">
                                {errorReqData.itemDescription.message}
                              </span>
                            </div>
                            <div className="col-sm-12 col-md-6 form-group">
                              <p className="requisition-text">Rate</p>
                              <input
                                type="number"
                                name="ratePerItem"
                                value={ratePerItem}
                                onChange={this.handlenewReqState}
                                placeholder="Rate"
                              />
                              <span className="text-danger">
                                {errorReqData.ratePerItem.message}
                              </span>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col-sm-12 col-md-6 form-group">
                              <p className="requisition-text">Quantity</p>
                              <input
                                type="number"
                                name="itemQuantity"
                                value={itemQuantity}
                                onChange={this.handlenewReqState}
                                placeholder="1"
                              />
                              <span className="text-danger">
                                {errorReqData.itemQuantity.message}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions className="dialogSmWidth addNewItemDialogActions">
                          <Button
                            variant="contained"
                            onClick={this.addNewRequistion}
                            className="primary-btn"
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            onClick={this.addNewClickClose}
                            className="default-btn"
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    create_requisition_status,
    create_requisition,
    get_edit_requisition_status,
    editRequisitiondata,
    currency_status,
    currency_list_data,
    update_requisition_status,
  } = state.procurement;

  const { department_status, department_list } = state.procurement;

  return {
    department_list,
    department_status,
    create_requisition_status,
    create_requisition,
    get_edit_requisition_status,
    editRequisitiondata,
    currency_status,
    currency_list_data,
    update_requisition_status,
  };
}

const connectedNewRequisition = withTranslation()(
  connect(mapStateToProps)(NewRequisition)
);

export default connectedNewRequisition;
