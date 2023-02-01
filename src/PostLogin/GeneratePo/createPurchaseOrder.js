import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities/commonFunctions";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "react-js-loader";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { requestForPurposeAction } from "../../_actions";
class CreatePurchaseOrder extends Component {
  oredrId;
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      purchaseOrderData: [],
      orderLineItems: [],
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
          key: "createdBy",
        },
        {
          label: "Category",
          key: "purchaseOrderProducts",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value[0].item.category}`}>
                <span className={"requestor"}>{value[0].item.category}</span>
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
                <span className={"department-value"}>{value.city}</span>
              </td>
            );
          },
        },
        {
          label: "Quantity",
          key: "purchaseOrderProducts",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value[0].item.quantity}`}>
                <span className={"requestor"}>{value[0].quantity}</span>
              </td>
            );
          },
        },
        {
          label: "Unit",
          key: "purchaseOrderProducts",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value[0].item.unit}`}>
                <span className={"requestor"}>{value[0].item.unit}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "purchaseOrderProducts",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value[0].item.price}`}>
                <span className={"requestor"}>{value[0].item.price}</span>
              </td>
            );
          },
        },
        {
          label: "Total Cost",
          key: "totalAmount",
        },
        {
          label: "Status",
          key: "status",
        },
        {
          label: "",
          key: "id",
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
    if (this.props.approvepo_data && this.props.approvepo_data.length > 0) {
      let { orderLineItems } = this.state;
      this.props.approvepo_data.map((item) => {
        if (item.id == this.props.match.params.id) {
          orderLineItems.push({
            ...item.details,
            id: item.id,
          });
          this.setState({
            loadingStatus: !this.state.loadingStatus,
            orderLineItems,
            purchaseOrderData: this.state.orderLineItems,
          });
        }
      });
    }

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
      this.props.delete_PO_list_item_status !==
        prevProps.delete_PO_list_item_status &&
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
    const { tableData, activeIndex } = this.state;
    let value = tableData[activeIndex];
    this.props.dispatch(
      purchaseOrderAction.deletePOListItem({
        id: this.oredrId,
        value: { ...value },
      })
    );
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
      purchaseOrderData,
      activeIndex,
      supplierAndCategoryList,
      openEditDialog,
      update,
      updateValue,
      columns,
    } = this.state;

    let updateForm = this.validateUpdate(update);
    return (
      <div>
        <div className="main-content">
          <div className="purchse-order">
            <div className="purchse-top-heading">
              <p>Your purchase order has been created successfully</p>
            </div>
            <div className="purchase-order-head">
              <div className="row d-flex align-items-center justify-content-end">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-12">
                  <div className="head-left">
                    <h3>Purchase order #{this.oredrId}</h3>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12">
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
                        <Button
                          variant="contained"
                          className="new-requisition-btn"
                        >
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
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.createdBy}</span>;
                          }
                          return item.createdBy;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Requestor Email</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.supplier.email}</span>;
                          }
                          return item.supplier.email;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Delivery Date</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.deliveryDate}</span>;
                          }
                          return item.deliveryDate;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Creation Date</label>

                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.createdOn}</span>;
                          }
                          return item.createdOn;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Department</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.supplier.company.name}</span>;
                          }
                          return item.supplier.company.name;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Location</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.supplier.city}</span>;
                          }
                          return item.supplier.city;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Request Type</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.shippingTerms}</span>;
                          }
                          return item.shippingTerms;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                  <div className="requisitioner-text">
                    <label>Approve By</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.supplier.name}</span>;
                          }
                          return item.supplier.name;
                        })
                      : null}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Total</label>
                    {purchaseOrderData && purchaseOrderData.length > 0
                      ? purchaseOrderData.map((item) => {
                          {
                            <span>{item.totalAmount}</span>;
                          }
                          return item.totalAmount;
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="supplier-details">
              <div className="heading">
                <h4>Supplier Details</h4>
              </div>
              <div className="supplier-details-content">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Supplier Name</label>
                      {purchaseOrderData && purchaseOrderData.length > 0
                        ? purchaseOrderData.map((item) => {
                            {
                              <span>{item.supplier.name}</span>;
                            }
                            return item.supplier.name;
                          })
                        : null}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Supplier Email</label>
                      {purchaseOrderData && purchaseOrderData.length > 0
                        ? purchaseOrderData.map((item) => {
                            {
                              <span>{item.supplier.email}</span>;
                            }
                            return item.supplier.email;
                          })
                        : null}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Supplier Contact</label>
                      {purchaseOrderData && purchaseOrderData.length > 0
                        ? purchaseOrderData.map((item) => {
                            {
                              <span>{item.supplier.contact}</span>;
                            }
                            return item.supplier.contact;
                          })
                        : null}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-5">
                    <div className="requisitioner-text">
                      <label>Teliphone No</label>
                      {purchaseOrderData && purchaseOrderData.length > 0
                        ? purchaseOrderData.map((item) => {
                            {
                              <span>{item.supplier.telephoneNo}</span>;
                            }
                            return item.supplier.telephoneNo;
                          })
                        : null}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Malling Address</label>
                      {purchaseOrderData && purchaseOrderData.length > 0
                        ? purchaseOrderData.map((item) => {
                            {
                              <span>{item.supplier.company.name}</span>;
                            }
                            return item.supplier.company.name;
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="supplier-details">
              <div className="heading">
                <h4>Payments and Shipping Terms</h4>
              </div>
              <div className="supplier-details-content">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="requisitioner-text">
                      <label>Payment Terms</label>
                      {this.state.purchaseOrderData?.length &&
                        this.state.purchaseOrderData.map((item, index) => (
                          <span>{item.paymentTerm}</span>
                        ))}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="requisitioner-text">
                      <label>Shipping Methods</label>
                      {this.state.purchaseOrderData?.length &&
                        this.state.purchaseOrderData.map((item, index) => (
                          <span>{item.shippingMethod}</span>
                        ))}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="requisitioner-text">
                      <label>Payment mode</label>
                      {this.state.purchaseOrderData?.length &&
                        this.state.purchaseOrderData.map((item, index) => (
                          <span>{item.paymentWith}</span>
                        ))}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="requisitioner-text">
                      <label>Shipping Terms</label>
                      {this.state.purchaseOrderData?.length &&
                        this.state.purchaseOrderData.map((item, index) => (
                          <span>{item.shippingTerms}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-Line-items">
              <div className="heading">
                <h4>Order Line Items 5</h4>
              </div>
              {this.state.loadingStatus ? (
                <Table
                  valueFromData={{
                    columns: columns,
                    data: this.state.orderLineItems,
                  }}
                  perPageLimit={6}
                  visiblecheckboxStatus={false}
                  isLoading={this.props.approvepo_status === status.IN_PROGRESS}
                  tableClasses={{
                    table: "ticket-tabel",
                    tableParent: "tickets-tabel",
                    parentClass: "all-support-ticket-tabel",
                  }}
                  showingLine="Showing %start% to %end% of %total% "
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
            <div className="approve-bottom-content">
              <div className="heading">
                <h4>Notes</h4>
              </div>
              <div className="approve-bottom-inner">
                <div className="row">
                  <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12 mb-5">
                    <div className="massage-type">
                      <textarea
                        name="note"
                        defaultValue={"Need for Office Setup!"}
                      ></textarea>
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
    supplier_category_list_status,
    supplier_category_list_data,
    update_purchase_status,
    delete_PO_list_item_status,
    approvepo_data,
  } = state.procurement;

  return {
    purchase_order_status,
    purchase_order_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_purchase_status,
    approvepo_data,
    delete_PO_list_item_status,
  };
};

export default connect(mapStateToProps)(CreatePurchaseOrder);
