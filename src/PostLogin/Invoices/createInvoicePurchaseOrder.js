import React, { Component } from "react";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities/commonFunctions";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { requestForPurposeAction } from "../../_actions";
class createInvoicePurchaseOrder extends Component {
  oredrId;
  constructor(props) {
    super(props);
    this.state = {
      approveOrder: {},
      activeIndex: -1,
      updateValue: {},
      update: false,
      openEditDialog: false,
      openDialog: false,
      columns: [
        {
          label: "S.no",
          key: "sno",
          renderCallback: (val, index) => {
            return (
              <td key={`${Math.random()}_${index}`}>
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
                    onClick={() => this.setState({ activeIndex: this.state.activeIndex === index ? -1 : index })}
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
                          this.handleDelete(value, index);
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
    this.oredrId = this.props.match.params.id;
  }
  componentDidMount() {
    this.props.dispatch(
      purchaseOrderAction.getPurchaseOrder({ id: this.oredrId })
    );
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }
  componentDidUpdate(prevProps) {
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
      this.props.update_purchase_status !== prevProps.update_purchase_status &&
      this.props.update_purchase_status === status.SUCCESS
    ) {
      this.props.dispatch(
        purchaseOrderAction.getPurchaseOrder({ id: this.oredrId })
      );
    }
    if (
      this.props.delete_PO_list_item_status !== prevProps.delete_PO_list_item_status &&
      this.props.delete_PO_list_item_status === status.SUCCESS
    ) {
      this.props.dispatch(
        purchaseOrderAction.getPurchaseOrder({ id: this.oredrId })
      );
    }
  }
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
      // tableData.detailsList[activeIndex] = updateValue
      this.setState({ openEditDialog: !this.state.openEditDialog });
      this.props.dispatch(
        purchaseOrderAction.updatePurcahseOrder({
          id: this.oredrId,
          value: updateValue,
        })
      );
    }
  };

  handleDelete = (index, id) => {
    const { tableData, activeIndex } = this.state
    let value = tableData[activeIndex];
    this.props.dispatch(purchaseOrderAction.deletePOListItem({ id: this.oredrId, value: { ...value } }));
    this.setState({ activeIndex: -1 });
  };
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
  render() {
    const {
      approveOrder,
      activeIndex,
      supplierAndCategoryList,
      openEditDialog,
      update,
      updateValue,
      columns,
      tableData,
    } = this.state;
    let updateForm = this.validateUpdate(update);
    return (
      <div>
        <div className="main-content">
          <div className="invoices-content">
            <div className="invoice-purchase-order-contant">
              <div className="purchse-top-heading">
                <p>Your purchase order has been created successfully</p>
              </div>
              <div className="purchase-order-head">
                <div className="row d-flex align-items-center justify-content-end">
                  <div className="col-xl-6 col-lg-6 col-md-5 col-sm-4 col-12">
                    <div className="head-left">
                      <h3>Purchase order #{this.oredrId}</h3>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-7 col-sm-8 col-12">
                    <div className="head-right">
                      <ul>
                        <li>
                          <Button variant="contained" className="fillter-btn">
                            <span className="download-icon">
                              <CloudDownloadIcon />
                            </span>
                            Download PDF
                          </Button>
                        </li>
                        <li>
                          <Button variant="contained" className="new-requisition-btn">
                            Send to vendor
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appove-status-content">
                <div className="row">
                  <div className="col-12">
                    <span>Status</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="appove-status-bottons">
                      {approveOrder.status && (
                        <Button
                          variant="contained"
                          className="status-btn pendding-btn"
                        >
                          #{approveOrder.status}
                        </Button>
                      )}
                      {approveOrder.status && (
                        <Button
                          variant="contained"
                          className="status-btn unpaid-btn"
                        >
                          #{approveOrder.status}
                        </Button>
                      )}
                      {approveOrder.status && (
                        <Button
                          variant="contained"
                          className="status-btn undelivered-btn"
                        >
                          #{approveOrder.status}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Requestor Name</label>
                      {approveOrder.createdBy && (
                        <span>{approveOrder.createdBy}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Requestor Email</label>
                      {approveOrder.email && <span>{approveOrder.email}</span>}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
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
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
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
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Department</label>
                      {approveOrder.department && (
                        <span>{approveOrder.department.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Location</label>
                      {approveOrder.location && (
                        <span>{approveOrder.location}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Request Type</label>
                      {approveOrder.requisitionType && (
                        <span>{approveOrder.requisitionType}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Approve By</label>
                      {approveOrder.approvedVendor && (
                        <span>{approveOrder.approvedVendor}</span>
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
                </div>
              </div>
              <div className="supplier-details">
                <div className="heading">
                  <h4>Supplier Details</h4>
                </div>
                <div className="supplier-details-content">
                  {approveOrder && approveOrder.supplier && (
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                        <div className="requisitioner-text">
                          <label>Supplier Name</label>
                          {approveOrder.supplier.name && (
                            <span>{approveOrder.supplier.name}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                        <div className="requisitioner-text">
                          <label>Supplier Email</label>
                          {approveOrder.supplier.email && (
                            <span>{approveOrder.supplier.email}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                        <div className="requisitioner-text">
                          <label>Supplier Contact</label>
                          {approveOrder.supplier.contact && (
                            <span>{approveOrder.supplier.contact}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                        <div className="requisitioner-text">
                          <label>Teliphone No</label>
                          {approveOrder.supplier.teliphone && (
                            <span>{approveOrder.supplier.teliphone}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                        <div className="requisitioner-text">
                          <label>Malling Address</label>
                          {approveOrder.supplier.address && (
                            <span>{approveOrder.supplier.address}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="supplier-details">
                <div className="heading">
                  <h4>Payments and Shipping Terms</h4>
                </div>
                <div className="supplier-details-content">
                  {approveOrder && approveOrder.supplier && (
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="requisitioner-text">
                          <label>Payment Terms</label>
                          <span>30 Net</span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="requisitioner-text">
                          <label>Shipping Methods</label>
                          <span>Store Pickup</span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="requisitioner-text">
                          <label>Payment mode</label>
                          <span>Credit Card</span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                        <div className="requisitioner-text">
                          <label>Shipping Terms</label>
                          <span>FOB</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="payment-and-shiping">
              <div className="heading">
                <h4>Payment and Shiping Terms</h4>
              </div>
              <div className="payment-and-shiping-content">
                <div className="row">
                  <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 mb-4 mb-md-5">
                    <div className="payment-shiping-text">
                      <label>Payment Terms</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect name="status">
                          <option value="">-Select-</option>
                          <option value={10}>Saab</option>
                          <option value={20}>Mercedes</option>
                          <option value={30}>Audi</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 mb-4 mb-md-5">
                    <div className="payment-shiping-text">
                      <label>Shipping Method</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect name="status">
                          <option value="">-Select-</option>
                          <option value={10}>Saab</option>
                          <option value={20}>Mercedes</option>
                          <option value={30}>Audi</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
                    <div className="payment-shiping-text">
                      <label>Payment With</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect name="status">
                          <option value="">-Select-</option>
                          <option value={10}>Saab</option>
                          <option value={20}>Mercedes</option>
                          <option value={30}>Audi</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
                    <div className="payment-shiping-text">
                      <label>Shipping Terms</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect name="status">
                          <option value="">-Select-</option>
                          <option value={10}>Saab</option>
                          <option value={20}>Mercedes</option>
                          <option value={30}>Audi</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              <div className="order-Line-items">
                <div className="heading">
                  <h4>Order Line Items 5</h4>
                </div>
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
              <div className="approve-bottom-content">
                <div className="heading">
                  <h4>Notes</h4>
                </div>
                <div className="approve-bottom-inner">
                  <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12 mb-5">
                      <div className="massage-type">
                        <textarea name="note" defaultValue={"Need for Office Setup!"}></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="approve-content-buttons">
                        <div className="purchase-order">
                          <Button variant="contained" className="purchase-btn">
                            Revise Purchase Order
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
              <DialogTitle
                id="form-dialog-title"
                className="dialog-heading"
              >
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
    supplier_category_list_status,
    supplier_category_list_data,
    update_purchase_status,
    delete_PO_list_item_status
  } = state.procurement;


  console.log("pruchase oreder",purchase_order_data)
  return {
    purchase_order_status,
    purchase_order_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_purchase_status,
    delete_PO_list_item_status
  };
};

export default connect(mapStateToProps)(createInvoicePurchaseOrder);
