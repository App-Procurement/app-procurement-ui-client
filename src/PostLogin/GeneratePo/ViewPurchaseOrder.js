import React, { Component } from "react";
import { connect } from "react-redux";
import { purchaseOrderAction } from "../../_actions";
import { status } from "../../_constants";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Table from "../../Table/Table";
import { Button, FormControl, NativeSelect } from "@mui/material";
import Loader from "react-js-loader";
class ViewPurchaseOrder extends Component {
  oredrId;
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      approveOrder: {},
      activeIndex: -1,
      updateValue: {},
      update: false,
      openEditDialog: false,
      openDialog: false,
      orderLineItems: [],
      purchaseOrderData: [],
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
      formData: {
        notes: "",
        paymentTerm: "",
        shippingMethod: "",
        paymentWith: "",
        shippingTerms: "",
        supplierName: "",
        supplierEmail: "",
        supplierContact: "",
        teliphoneNo: "",
        mailingAddress: "",
        requestorName: "",
        requestorEmail: "",
        deliveryDate: "",
        createnDate: "",
        Department: "",
        location: "",
        requestType: "",
        approveBy: "",
        total: "",
      },
    };
    this.oredrId = this.props.match.params.id;
  }

  componentDidMount() {
    if (this.props.purchase_data && this.props.purchase_data.length > 0) {
      let { orderLineItems } = this.state;
      this.props.purchase_data.map((item) => {
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

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      notes: validObj,
      paymentTerm: validObj,
      shippingMethod: validObj,
      paymentWith: validObj,
      shippingTerms: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { formData } = this.state;

      if (!formData.paymentTerm) {
        retData.paymentTerm = {
          isValid: false,
          message: "Payment Term is required",
        };
        isValid = false;
      }

      if (!formData.shippingTerms) {
        retData.shippingTerms = {
          isValid: false,
          message: "Shipping Term is required",
        };
        isValid = false;
      }

      if (!formData.notes) {
        retData.notes = {
          isValid: false,
          message: "Notes is required",
        };
        isValid = false;
      }

      if (!formData.paymentWith) {
        retData.paymentWith = {
          isValid: false,
          message: "Payment Term is required",
        };
        isValid = false;
      }

      if (!formData.shippingMethod) {
        retData.shippingMethod = {
          isValid: false,
          message: "Shipping Method is required",
        };
        isValid = false;
      }
    }

    retData.isValid = isValid;
    return retData;
  };

  onClickCreatePurchaseOrder = (id) => {
    const { formData } = this.state;
    const errorData = this.validate(true);

    this.setState({
      isSubmitted: true,
    });
    let purchaseOrderData = {};
    this.props.purchase_data.map((item) => {
      if (item.id == this.props.match.params.id) {
        purchaseOrderData.supplier = item.details.supplier;
        purchaseOrderData.requestsDetail = item.details.requestsDetail;
        purchaseOrderData.purchaseOrderProducts =
          item.details.purchaseOrderProducts;
        purchaseOrderData.status = item.details.status;
        purchaseOrderData.toDate = item.details.toDate;
        purchaseOrderData.fromDate = item.details.fromDate;
        purchaseOrderData.createdBy = item.details.createdBy;
        purchaseOrderData.createdOn = item.details.createdOn;
        purchaseOrderData.requesterId = item.details.requesterId;
        purchaseOrderData.totalAmount = item.details.totalAmount;
        purchaseOrderData.deliveryDate = item.details.deliveryDate;
        purchaseOrderData.totalNumberOfProduct =
          item.details.totalNumberOfProduct;
      }
      return item.details;
    });

    if (errorData.isValid) {
      let details = {
        status: purchaseOrderData.status,
        toDate: purchaseOrderData.toDate,
        fromDate: purchaseOrderData.fromDate,
        createdBy: purchaseOrderData.createdBy,
        createdOn: purchaseOrderData.createdOn,
        requesterId: purchaseOrderData.requesterId,
        totalAmount: purchaseOrderData.totalAmount,
        deliveryDate: purchaseOrderData.deliveryDate,
        totalNumberOfProduct: purchaseOrderData.totalNumberOfProduct,
        notes: this.state.formData.notes,
        paymentTerm: this.props.purchase_data[formData.paymentTerm].details
          .paymentTerm,
        shippingMethod: this.props.purchase_data[formData.shippingMethod]
          .details.shippingMethod,
        paymentWith: this.props.purchase_data[formData.paymentWith].details
          .paymentWith,
        shippingTerms: this.props.purchase_data[formData.shippingTerms].details
          .shippingTerms,
        supplier: purchaseOrderData.supplier,
        requestsDetail: purchaseOrderData.requestsDetail,
        purchaseOrderProducts: purchaseOrderData.purchaseOrderProducts,
      };

      this.props.dispatch(purchaseOrderAction.addPurchaseOrder(details));
    }
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  render() {
    const {
      approveOrder,
      columns,
      isSubmitted,
      purchaseOrderData,
      orderLineItems,
      formData,
    } = this.state;

    const errorData = this.validate(isSubmitted);

    return (
      <div>
        <div className="main-content">
          <div className="purchse-order">
            <div className="purchase-order-head">
              <div className="row d-flex align-items-center justify-content-end">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="head-left">
                    <h3>Purchase order #{this.oredrId}</h3>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="head-right">
                    <ul>
                      <li>
                        <Button variant="contained" className="head-right-btn">
                          <span className="delete-icon">
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </Button>
                      </li>
                      <li>
                        <Button variant="contained" className="head-right-btn">
                          <span className="comment-icon">
                            <i className="far fa-edit"></i>
                          </span>
                        </Button>
                      </li>
                      <li>
                        <Button variant="contained" className="head-right-btn">
                          <span className="pencil-icon">
                            <i className="fas fa-comment-alt-lines"></i>
                          </span>
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
                    <label>Requisitioner Name</label>
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
                    <label>Requisitioner Email</label>
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
                    <label>Created Date</label>

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
                {/* )} */}
              </div>
            </div>
            <div className="payment-and-shiping">
              <div className="heading">
                <h4>Payment and Shiping Terms</h4>
              </div>
              <div className="payment-and-shiping-content">
                <div className="row">
                  <div className="col-xl-6 col-lg-8 col-md-6 col-sm-12 col-12 mb-4 mb-md-5">
                    <div className="payment-shiping-text">
                      <label>Payment Terms</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="paymentTerm"
                          value={
                            formData.paymentTerm &&
                            this.state.purchaseOrderData[formData.paymentTerm]
                              ? this.state.purchaseOrderData[
                                  formData.paymentTerm
                                ].name
                              : null
                          }
                          onChange={this.handleStateChange}
                        >
                          <option value="">Select</option>
                          {this.state.purchaseOrderData?.length &&
                            this.state.purchaseOrderData.map((item, index) => (
                              <option value={index}>{item.paymentTerm}</option>
                            ))}
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.paymentTerm.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-6 col-sm-12 col-12 mb-4 mb-md-5">
                    <div className="payment-shiping-text">
                      <label>Shipping Method</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="shippingMethod"
                          onChange={this.handleStateChange}
                          value={
                            formData.shippingMethod &&
                            this.state.purchaseOrderData[
                              formData.shippingMethod
                            ]
                              ? this.state.purchaseOrderData[
                                  formData.shippingMethod
                                ].name
                              : null
                          }
                        >
                          <option value="">-Select-</option>

                          {this.state.purchaseOrderData?.length &&
                            this.state.purchaseOrderData.map((item, index) => (
                              <option value={index}>
                                {item.shippingMethod}
                              </option>
                            ))}
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.shippingMethod.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-6 col-sm-12 col-12 mb-4">
                    <div className="payment-shiping-text">
                      <label>Payment With</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="paymentWith"
                          onChange={this.handleStateChange}
                          value={
                            formData.paymentWith &&
                            this.state.purchaseOrderData[formData.paymentWith]
                              ? this.state.purchaseOrderData[
                                  formData.paymentWith
                                ].name
                              : null
                          }
                        >
                          <option value="">-Select-</option>
                          {this.state.purchaseOrderData?.length &&
                            this.state.purchaseOrderData.map((item, index) => (
                              <option value={index}>{item.paymentWith}</option>
                            ))}
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.paymentWith.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-8 col-md-6 col-sm-12 col-12 mb-4">
                    <div className="payment-shiping-text">
                      <label>Shipping Terms</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="shippingTerms"
                          onChange={this.handleStateChange}
                          value={
                            formData.shippingTerms &&
                            this.state.purchaseOrderData[formData.shippingTerms]
                              ? this.state.purchaseOrderData[
                                  formData.shippingTerms
                                ].name
                              : null
                          }
                        >
                          <option value="">-Select-</option>
                          {this.state.purchaseOrderData?.length &&
                            this.state.purchaseOrderData.map((item, index) => (
                              <option value={index}>
                                {item.shippingTerms}
                              </option>
                            ))}
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.shippingTerms.message}
                      </span>
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
                    data: orderLineItems,
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
                        name="notes"
                        placeholder="Need for Office Setup!"
                        onChange={this.handleStateChange}
                        value={formData.notes}
                      ></textarea>
                    </div>
                  </div>
                  <span className="d-block w-100 text-danger">
                    {errorData.notes.message}
                  </span>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div className="approve-content-buttons">
                      <div className="purchase-order">
                        <Button
                          variant="contained"
                          className="purchase-btn"
                          onClick={this.onClickCreatePurchaseOrder}
                          disabled={
                            this.props.add_purchase_order_status === 0
                              ? true
                              : false
                          }
                        >
                          Create Purchase Order
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
    );
  }
}

const mapStateToProps = (state) => {
  const { purchase_data, purchase_status } = state.procurement;
  return {
    purchase_data,
    purchase_status,
  };
};

export default connect(mapStateToProps)(ViewPurchaseOrder);
