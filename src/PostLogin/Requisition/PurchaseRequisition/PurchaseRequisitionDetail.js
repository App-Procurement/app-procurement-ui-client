import React, { Component } from "react";
import {
  NativeSelect,
  FormControl,
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
} from "@mui/material";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../../_actions/";
import { requestForPurposeAction } from "../../../_actions";
import { status } from "../../../_constants";
import { commonFunctions } from "../../../_utilities/commonFunctions";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { Link } from "react-router-dom";
import Table from "../../../Table/Table";
import Chat from "./../../../_components/ChatBox";
import CloseIcon from "@mui/icons-material/Close";
class PurchaseRequisitionDetail extends Component {
  requestId;
  constructor(props) {
    super(props);
    this.state = {
      approveOrder: {},
      activeIndex: -1,
      openEditDialog: false,
      supplierAndCategoryList: [],
      updateValue: {},
      update: false,
      user: {
        name: "himanshu",
        id: 101,
        accountType: "admin",
      },
      columns: [
        {
          label: "S No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
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
          key: "orderQuantity",
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
          key: "ratePerItem",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value"> ${value}</span>
              </td>
            );
          },
        },
        {
          label: "Total Cost",
          key: "totalcost",
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
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button
                  variant="outlined"
                  className="department-value status-btn "
                >
                  {value}
                </Button>
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
                    onClick={() =>
                      this.setState({
                        activeIndex:
                          this.state.activeIndex === index ? -1 : index,
                      })
                    }
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
                          this.handleDelete(index, value);
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
      tableData: [],
    };
    this.requestId = this.props.match.params.id;
  }

  componentDidMount() {
    this.props.dispatch(
      purchaseOrderAction.getPurchaseOrder({ id: this.requestId })
    );
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchase_order_status !== this.props.purchase_order_status &&
      this.props.purchase_order_status === status.SUCCESS
    ) {
      this.setState({
        approveOrder: this.props.purchase_order_data,
        tableData: this.props.purchase_order_data.requistionItem,
      });
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
    if (
      this.props.delete_PO_list_item_status !==
        prevProps.delete_PO_list_item_status &&
      this.props.delete_PO_list_item_status === status.SUCCESS
    ) {
      this.props.dispatch(
        purchaseOrderAction.getPurchaseOrder({ id: this.requestId })
      );
    }
    if (
      this.props.update_purchase_status !== prevProps.update_purchase_status &&
      this.props.update_purchase_status === status.SUCCESS
    ) {
      this.props.dispatch(
        purchaseOrderAction.getPurchaseOrder({ id: this.requestId })
      );
    }
  }

  handleApprove = (status) => {
    const { approveOrder } = this.state;
    this.props.dispatch(
      purchaseOrderAction.approvePurchaseOrder({
        id: approveOrder.id,
        status: status,
      })
    );
    this.props.history.push(`/postlogin/generatepo`);
  };
  handleUpdate = (e) => {
    const { updateValue } = this.state;
    const { name, value } = e.target;
    updateValue[name] = value;
    this.setState({ updateValue });
  };
  updateDataValues = () => {
    const { updateValue } = this.state;
    let updateForm = this.validateUpdate(true);
    this.setState({ update: true });
    if (updateForm.isValid) {
      updateValue.totalCost = updateValue.price * updateValue.quantity;
      // requestData.detailsList[activeIndex] = updateValue
      this.setState({ openEditDialog: !this.state.openEditDialog });
      this.props.dispatch(
        purchaseOrderAction.updatePurcahseOrder({
          id: this.requestId,
          value: updateValue,
        })
      );
    }
  };

  handleDelete = (index, id) => {
    const { tableData, activeIndex } = this.state;
    this.props.dispatch(
      purchaseOrderAction.deletePOListItem({
        id: this.requestId,
        value: tableData[activeIndex],
      })
    );
    this.setState({ activeIndex: -1 });
  };
  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };
  openEditModal = () => {
    const { activeIndex, tableData } = this.state;
    if (activeIndex >= 0) {
      let values = JSON.parse(JSON.stringify(tableData[activeIndex]));
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
      orderQuantity: validObj,
      unit: validObj,
      price: validObj,
      isValid,
    };
    if (update) {
      if (!updateValue.name) {
        retData.name = {
          isValid: false,
          message: "Name is required",
        };
        isValid = false;
      }
      if (!updateValue.category) {
        retData.category = {
          isValid: false,
          message: "category is required",
        };
        isValid = false;
      }
      if (!updateValue.supplier) {
        retData.supplier = {
          isValid: false,
          message: "supplier is required",
        };
        isValid = false;
      }
      if (!updateValue.orderQuantity) {
        retData.orderQuantity = {
          isValid: false,
          message: "quantity is required",
        };
        isValid = false;
      } else if (
        updateValue.orderQuantity &&
        !commonFunctions.validateNumeric(updateValue.orderQuantity)
      ) {
        retData.orderQuantity = {
          isValid: false,
          message: "quantity must be in digits",
        };
        isValid = false;
      }
      if (!updateValue.unit) {
        retData.unit = {
          isValid: false,
          message: "unit is required",
        };
        isValid = false;
      }
      if (!updateValue.price) {
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
  render() {
    const {
      approveOrder,
      columns,
      tableData,
      activeIndex,
      update,
      openEditDialog,
      supplierAndCategoryList,
      updateValue,
    } = this.state;
    let updateForm = this.validateUpdate(update);
    return (
      <div>
        <div className="main-content">
          <div className="purchase-requisition purchase-requisition-details">
            <div className="request-purpose-head">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8 col-form-button">
                  <div className="request-purpose-head-left">
                    <h3>
                      Purchase Requisition
                      <i className="fal fa-angle-right"></i>
                      <span>Purchase Request</span>
                    </h3>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5 col-lg-4 col-xl-4 col-form-button">
                  <div className="request-purpose-head-right" />
                </div>
              </div>
            </div>
            <div className="request-no-content">
              <div className="request-content-heading">
                <h4>Request No {this.requestId}</h4>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Status</label>
                    {approveOrder.status && (
                      <Button variant="contained" className="status-btn">
                        {approveOrder.status}
                      </Button>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisitioner Name</label>
                    {approveOrder.createdBy && (
                      <span>{approveOrder.createdBy}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisitioner Email</label>
                    {approveOrder.email && <span>{approveOrder.email}</span>}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Creation Date</label>
                    {approveOrder.createdOn && (
                      <span>
                        {commonFunctions.convertDateToString(
                          new Date(approveOrder.createdOn)
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Department</label>
                    {approveOrder.department && (
                      <span>{approveOrder.department.name}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Location</label>
                    {approveOrder.location && (
                      <span>{approveOrder.location}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Delivery Date</label>
                    {approveOrder.deliveryDate && (
                      <span>
                        {commonFunctions.convertDateToString(
                          new Date(approveOrder.deliveryDate)
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Request Type</label>
                    {approveOrder.requisitionType && (
                      <span>{approveOrder.requisitionType}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Total</label>
                    {approveOrder.totalPrice && (
                      <span>${approveOrder.totalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Final Approver</label>
                    {approveOrder.approvedVendor && (
                      <span>{approveOrder.approvedVendor}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-line-content">
              <div className="order-line-heading">
                <h3>Order Line 04</h3>
              </div>
              <div className="recieved-body-content">
                {tableData && tableData.length > 0 && (
                  <Table
                    valueFromData={{ columns: columns, data: tableData }}
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
              </div>
            </div>
            <div className="order-line-content purchase-requisition-bottom-content">
              {/* <div className="order-line-heading">
                <h3>Attach Documents</h3>
              </div> */}
              <div className="requisition-download-file">
                <Button variant="contained" className="approval-btn">
                  {/* onClick={()=>this.openUploadPopup('7c5b0f09-4cda-4788-8e73-c655bf74b5cd')}> */}
                  <i className="fas fa-cloud-download"></i>
                  Approval Documents
                </Button>
              </div>
              {/* <div className="order-line-heading">
                <h3>Note</h3>
              </div> */}
              <div className="purchase-inner-content">
                <div className="row d-flex align-items-end justify-content-end">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-5 col-12">
                    <div className="approve-content-buttons">
                      <div className="purchase-order">
                        <Button variant="contained" className="purchase-btn">
                          Confirm
                        </Button>
                      </div>
                      <div className="purchase-order">
                        <Button
                          variant="contained"
                          className="purchase-btn cancel-btn"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-7 col-12 mt-md-4">
                    <Chat user={this.state.user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    value={updateValue.name}
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
                      value={updateValue.category}
                    >
                      <option value={""}>Category</option>
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
                      value={updateValue.supplier}
                    >
                      <option value={""}>Supplier</option>
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
                    name="orderQuantity"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={this.handleUpdate}
                    value={updateValue.orderQuantity}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateForm.orderQuantity.message}
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
                    value={updateValue.unit}
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
                    value={updateValue.price}
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
    purchase_order_status,
    purchase_order_data,
    update_purchase_status,
    supplier_category_list_status,
    supplier_category_list_data,
    delete_PO_list_item_status,
  } = state.procurement;
  return {
    purchase_order_status,
    purchase_order_data,
    update_purchase_status,
    supplier_category_list_status,
    supplier_category_list_data,
    delete_PO_list_item_status,
  };
};

export default connect(mapStateToProps)(PurchaseRequisitionDetail);
