import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { requistionAction, departmentAction } from "../../../_actions";
import { status } from "../../../_constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { alert, requisitionStatus } from "../../../_utilities";
import pdfIcon from "../../../assets/images/icons/pdficon.png";
import docIcon from "../../../assets/images/icons/docIcon.png";
import excalIcon from "../../../assets/images/excalicon.png";
import jpgIcon from "../../../assets/images/icons/jpgIcon.png";
import pngIcon from "../../../assets/images/icons/pngIcon.png";
import pptIcon from "../../../assets/images/icons/pptIcon.png";
import csvIcon from "../../../assets/images/icons/csvIcon.png";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Loader from '../../../_components/commonLoader';

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
      openDialogReq: false,
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
    this.renderProfile();
    if (this.props.match.params.id) {
      this.props.dispatch(
        requistionAction.getRequisition({
          id: this.props.match.params.id,
        })
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { addRequiData, requisitionFile, requisitionFileName } = this.state;
    if (prevProps.create_requisition_status !== this.props.create_requisition_status && this.props.create_requisition_status === status.SUCCESS) {
      alert.success("Add requisition successful");
      this.props.history.push("/postlogin/managerequisition");
      this.setState({
        isLoading: false
      })
    }

    if (prevProps.get_edit_requisition_status !== this.props.get_edit_requisition_status && this.props.get_edit_requisition_status === status.SUCCESS) {
      const { editRequisitiondata } = this.props;
      if (editRequisitiondata) {
        addRequiData.departmentId = editRequisitiondata.department && editRequisitiondata.department.id;
        addRequiData.currencyId = editRequisitiondata.currency && editRequisitiondata.currency.id;
        addRequiData.financialYear = new Date(editRequisitiondata.financialYear).getFullYear();
        addRequiData.status = editRequisitiondata.status;
        addRequiData.roleName = editRequisitiondata.roleName;
        addRequiData.totalPrice = editRequisitiondata.totalPrice;
        addRequiData.notes = editRequisitiondata.notes;
        addRequiData.requisitionLineItemLists =
          editRequisitiondata.lineItemList || [];
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
    const { addRequiData, open, anchorEl } = this.state;
    const { editRequisitiondata, get_edit_requisition_status } = this.props;
    let retData = [];
    if (get_edit_requisition_status === status.SUCCESS && editRequisitiondata.lineItemList.length > 0) {
      for (let i = 0; i < editRequisitiondata.lineItemList; i++) {

        let data = editRequisitiondata.lineItemList[i];
        console.log("dtaaaaa", data)

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
                  <DeleteIcon onClick={() => this.deleteReqData(data.id)} />
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
        console.log("dtaaaaa", data)
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
                  <DeleteIcon onClick={() => this.deleteReqData(data.id)} />
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
      userId,
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
        isLoading: true
      })
      let obj = {
        departmentId: addRequiData.departmentId,
        currencyId: addRequiData.currencyId,
        financialYear: addRequiData.financialYear,
        status: addRequiData.status,
        roleName: addRequiData.roleName,
        user:userId,
        totalPrice: totalAmount,
        notes: addRequiData.notes,
        requisitionLineItemLists: addRequiData.requisitionLineItemLists,
      };
      if (editReq == true) {
        obj.id = this.props.match.params.id;
      }
      const sendData = {
        requisitionLineItemFile,
        obj,
        requisitionFile,
        fileDescription
      };
      if (editReq == false) {
        this.props.dispatch(requistionAction.addRequisition(sendData));
      } else {
        this.props.dispatch(requistionAction.editRequisition(sendData));
      }
    } else {
      alert.error("Please enter all required fields");
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
          message: "Requester name is required",
        };
        isValid = false;
      }
      if (!addRequiData.financialYear) {
        retData.financialYear = {
          isValid: false,
          message: "FinancialYear is required",
        };
        isValid = false;
      } else if (addRequiData.financialYear.length > 4) {
        retData.financialYear = {
          isValid: false,
          message: "FinancialYear Must Be 4 Digit",
        };
        isValid = false;
      }
      if (!addRequiData.departmentId) {
        retData.departmentId = {
          isValid: false,
          message: "Department  is required",
        };
        isValid = false;
      }
      if (!addRequiData.currencyId) {
        retData.currencyId = {
          isValid: false,
          message: "Currency is required",
        };
        isValid = false;
      }
      if (!addRequiData.notes) {
        retData.notes = {
          isValid: false,
          message: "GeneralText is required",
        };
        isValid = false;
      }
      if (!addRequiData.status) {
        retData.status = {
          isValid: false,
          message: "Status is required",
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
          <option value={department_list[i].id}>{department_list[i].name}</option>
        );
      }
    }
    return departmentoption;
  };

  
  displayRoles = () => {
   let displayRole=localStorage.getItem("userData");
    var roleJson = JSON.parse(displayRole);
    let role=roleJson.info.user.roles
    let currencyoption = [];
    if (role) {
      for (let i = 0; i < role.length; i++) {
        currencyoption.push(
          <option value={role[i].id}>
            {role[i].name}
          </option>
        );
      }
    }
    return currencyoption;
  };

  displayCurrency = () => {
    const { currency_list_data } = this.props;
    let currencyoption = [];
    if (currency_list_data) {
      for (let i = 0; i < currency_list_data.length; i++) {
        currencyoption.push(
          <option value={currency_list_data[i].id}>
            {currency_list_data[i].code}
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
      if (name == "requisitionFile") {
        requisitionFile.push(...Array.from(files));
        this.setState({
          requisitionFile,
        });
      } else if (name == "requisitionLineItemFile") {
        requisitionLineItemFile.push(...Array.from(files));
        this.setState({
          requisitionLineItemFile,
        });
      }
    }
  };

  handleRemove = (index, fileName) => {
    let { requisitionLineItemFile, requisitionFile } = this.state;
    if (fileName == "requisitionFile") {
      requisitionFile.splice(index, 1);
    } else if (fileName == "requisitionLineItemFile") {
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
    const { openDialogReq } = this.state;
    let deleteItem = true;
    this.setState({
      openDialogReq: deleteItem,
      reqLineIteamId: id
    })
  };

  addNewClickOpen = () => {
    let { openDialog, addRequiData } = this.state;
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
      totalAmount,
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
      if (isEdit == false || (editReq == true && isEdit == false)) {
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
          message: "Requester Item description is required",
        };
        isValid = false;
      }
      if (!itemQuantity) {
        retData.itemQuantity = {
          isValid: false,
          message: "Requester Quantity is required",
        };
        isValid = false;
      }
      if (!ratePerItem) {
        retData.ratePerItem = {
          isValid: false,
          message: "Requester Item Price is required",
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
    console.log("addRequiData",addRequiData)
    addRequiData.status = requisitionStatus.DRAFT;
    this.setState({
      addRequiData,
    });
  };

  requisitionLineItemDelete = (id) => {
    const { addRequiData, reqLineIteamId } = this.state;
    addRequiData.requisitionLineItemLists.splice(id, 1);
    let totalprice = 0;
    if (addRequiData) {
      for (let i = 0; i < addRequiData.requisitionLineItemLists.length; i++) {
        totalprice =
          addRequiData.requisitionLineItemLists[i].price + totalprice;
      }
      fetch("http://localhost:7050/api/requisitionLineItem/" + reqLineIteamId, { method: 'DELETE' })
        .then((response) =>
          this.setState({

          }))
    }
    this.setState({
      openDialogReq: false,
      addRequiData,
      totalAmount: totalprice,
    });
  }

  renderProfile = () => {
    var profile = localStorage.getItem("userData");
    var profileJson = JSON.parse(profile);
    let retData = [];
    var row = profileJson.info.user
    this.setState({
      userId:row.id
    })
   
  }
  render() {
    const {
      addRequiData,
      isSubmitted,
      openDialogReq,
      openDialog,
      itemDescription,
      itemQuantity,
      ratePerItem,
      totalAmount,
      validateSubmit,
      requisitionLineItemFile,
      requisitionFile,
      editReq,
      isLoading
    } = this.state;
    const { create_requisition_status, update_requisition_status } = this.props;
    const errorData = this.validate(isSubmitted);
    const errorReqData = this.validateReq(validateSubmit);
    return (
      <>
        {!isLoading &&
          <div className="main-content">
            <div className="new-req-section">
              <div className="d-block heading">
                <h4 className="d-inline-block">{editReq == false ? "Add New" : "Edit"} Requisition</h4>
                <div className="heading-buttons">
                  <Button
                    variant="outlined"
                    className="draft-btn"
                    onClick={this.saveToDraft}
                  >
                    <SaveIcon />
                    Save to Draft
                  </Button>
                </div>
              </div>
              <div className="requisition-form">
                <div className="row">
                  <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-12">
                    <div className="requisition-form-left">
                      <div className="requester">
                        {/* <div className="form-group">
                          <label>Requester</label>
                          <input
                            type="text"
                            name="roleName"
                            value={addRequiData.roleName}
                            onChange={this.handleStateChange}
                            placeholder="PSDS Admin"
                            isvalid={errorData.roleName.isValid}
                          />
                          <span className="text-danger">
                            {errorData.roleName.message}
                          </span>
                        </div> */}
                        <div className="form-group">
                          <label>Requester</label>
                          <FormControl className="select-menu">
                            <NativeSelect
                              name="roleName"
                              onChange={this.handleStateChange}
                              isvalid={errorData.roleName.isValid}
                              value={addRequiData.roleName}
                            >
                              <option value="">-Select-</option>
                              {this.displayRoles()}
                            </NativeSelect>
                          </FormControl>
                          <span className="text-danger">
                            {errorData.roleName.message}
                          </span>
                        </div>
                      </div>
                  
                      <div className="requester">
                        <div className="form-group">
                          <label>Financial year</label>
                          <input
                            type="text"
                            name="financialYear"
                            isvalid={errorData.financialYear.isValid}
                            value={addRequiData.financialYear}
                            onChange={this.handleStateChange}
                          />
                          <span className="text-danger">
                            {errorData.financialYear.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <div className="form-group">
                          <label>Department</label>
                          <FormControl className="select-menu">
                            <NativeSelect
                              name="departmentId"
                              value={addRequiData.departmentId}
                              isvalid={errorData.departmentId.isValid}
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
                          <label>Currency</label>
                          <FormControl className="select-menu">
                            <NativeSelect
                              name="currencyId"
                              onChange={this.handleStateChange}
                              isvalid={errorData.currencyId.isValid}
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
                            General Purpose for Requisition
                          </p>
                          <TextareaAutosize
                            className="text-box"
                            aria-label="maximum height"
                            placeholder=""
                            defaultValue=""
                            name="notes"
                            value={addRequiData.notes}
                            isvalid={errorData.notes.isValid}
                            onChange={this.handleStateChange}
                          />
                          <span className="text-danger">
                            {errorData.notes.message}
                          </span>
                        </div>
                      </div>
                      <div className="requester">
                        <label>
                          <strong>Extra Budgetary</strong>
                        </label>
                      </div>
                      <div className="requester">
                        <label>Attach Files</label>
                        {requisitionFile && requisitionFile.length == 0 && (
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
                              <p>Upload file</p>
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
                                  addRequiData.status == requisitionStatus.DRAFT
                                }
                                name="status"
                                control={<Radio color="primary" />}
                                label="Save Requisition"
                                onChange={this.handleStateChange}
                              />
                              <FormControlLabel
                                value={requisitionStatus.ACTIVE}
                                name="status"
                                checked={
                                  addRequiData.status == requisitionStatus.ACTIVE
                                }
                                control={<Radio color="primary" />}
                                label="Send For Approval"
                                onChange={this.handleStateChange}
                              />
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                      <div className="requisition-submit-button">
                        <Button
                          variant="contained"
                          className="primary-btn send_requi"
                          onClick={this.handleaddRequiDataClick}
                          disableElevation
                          disabled={
                            create_requisition_status == status.IN_PROGRESS ||
                            update_requisition_status == status.IN_PROGRESS
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
                        className="primary-btn add_new_item"
                        onClick={this.addNewClickOpen}
                        disableElevation
                      >
                        Add New Item
                      </Button>
                      <div className="item-heading">Requisition Items</div>
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
                            {/* changes here */}
                            <tbody>{this.displayTableData()}</tbody>
                          </table>
                        </div>
                      </SimpleBar>
                      <div className="requisition">
                        {requisitionLineItemFile &&
                          requisitionLineItemFile.length == 0 && (
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
                                        <div className="file-name">{file.name}</div>
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
                          <span>Total Estimate Coste</span>
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
                          Add New Item
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
                              <p className="requisition-text">Requisition Item</p>
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
                            className="primary-btn inside_new_item"
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

                    <Dialog open={openDialogReq} onClose={() => this.setState({ openDialogReq: false })} aria-labelledby="form-dialog-title" className="addNewItemDialog">
                      <DialogTitle id="form-dialog-title" className="dialogSmWidth addNewItemDialogTitle">
                        Requisition Line Item Confirmation
                      </DialogTitle>
                      <DialogContent className="dialogSmWidth addNewItemDialogContent">
                        <p>Are you sure to delete requisition line item record?</p>
                      </DialogContent>
                      <DialogActions className="dialogSmWidth addNewItemDialogActions">
                        <Button variant="contained" onClick={this.requisitionLineItemDelete} className="primary-btn">
                          Yes
                        </Button>
                        <Button variant="contained" className="default-btn" onClick={() => this.setState({ openDialogReq: false })} >
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* <div>
                                            <div> <p>Total Estimate Coste</p> </div>
                                            <div> {totalAmount ? <p>{totalAmount}</p> : "00.00 USD"} </div>
                                        </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {isLoading &&
          <Loader />
        }
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

const connectedNewRequistion = connect(mapStateToProps)(NewRequisition);
export default connectedNewRequistion;
