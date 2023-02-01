import React, { Component } from "react";
import Loader from "react-js-loader";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { Link } from "react-router-dom";
import { status } from "../../_constants";
import { manageSupplierAction } from "../../_actions";
import Table from "../../Table/Table";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { requestForPurposeAction, productActions } from "../../_actions";
import { commonFunctions } from "../../_utilities";
import {
  Dialog,
  DialogTitle,
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
class ManageSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      productListData: [],
      searchSupplierList: [],
      productActiveIndex: -1,
      supplierActiveIndex: -1,
      supplierColumn: [
        {
          label: "S.no",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
          key: "name",
        },
        {
          label: "Account Holder Name",
          key: "bankDetails",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.accountHolderName}`}>
                <span className={"department-value"}>
                  {value.accountHolderName}
                </span>
              </td>
            );
          },
        },
        {
          label: "Email",
          key: "email",
        },
        {
          label: "Currencies",
          key: "bankDetails",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.currency.code}`}>
                <span className={"requestor"}>{value.currency.code}</span>
              </td>
            );
          },
        },
        {
          label: "Payment Term",
          key: "paymentTerms",
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value.status}`}>
                <Button
                  variant="outlined"
                  className={
                    value.status === "ready"
                      ? "department-value green-btn"
                      : value.status === "outstanding"
                      ? "department-value status-btn"
                      : value.status === "rejected"
                      ? "department-value onahau-btn"
                      : "department-value magnolia-btn"
                  }
                >
                  {value.status}
                </Button>
              </td>
            );
          },
        },
        {
          label: "Edit",
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
                        supplierActiveIndex:
                          this.state.supplierActiveIndex === index ? -1 : index,
                      })
                    }
                  ></i>
                  {this.state.supplierActiveIndex === index && (
                    <div className="toggale">
                      <i
                        className="fa fa-pencil edit"
                        aria-hidden="true"
                        onClick={this.openSupplierEditModal}
                      ></i>
                      <i
                        className="fa fa-trash delete"
                        aria-hidden="true"
                        onClick={() => {
                          this.handleDelete(index, "supplier");
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
      supplierAndCategoryList: {},
      supplierData: [],
      openSupplierEditDialog: false,
      productColumn: [
        {
          label: "S No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: "Picture",
          key: "imgUrl",
          renderCallback: (value) => {
            return <img src={value} height="40px" width="40px" />;
          },
        },
        {
          label: "Item Name",
          key: "itemName",
        },
        {
          label: "Item Type",
          key: "itemType",
        },
        {
          label: "Unit",
          key: "unit",
        },
        {
          label: "Supplier",
          key: "supplier",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value.supplier.name}`}>
                <span className={"requestor"}>{value.supplier.name}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "price",
        },
        {
          label: "Stock",
          key: "supplier",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${value.stock}`}>
                <span className="department-value">{value.stock}</span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (index, value) => {
            return (
              <td key={`${Math.random()}_${"status"}`}>
                <Button
                  variant="outlined"
                  className={
                    value.status === "ready"
                      ? "department-value green-btn"
                      : value.status === "outstanding"
                      ? "department-value status-btn"
                      : value.status === "rejected"
                      ? "department-value onahau-btn"
                      : "department-value magnolia-btn"
                  }
                >
                  {value.status}
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
                    onClick={() => {
                      this.setState({
                        productActiveIndex:
                          this.state.productActiveIndex === index ? -1 : index,
                      });
                    }}
                  ></i>
                  {this.state.productActiveIndex === index && (
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
                          this.handleDelete(index, "product");
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
      updateSupplier: false,
      productList: [],
      updateProductValue: {},
      updateSupplierValue: {},
      update: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(productActions.searchProductList());
    this.props.dispatch(manageSupplierAction.searchSupplierList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.search_suplier_list_status !==
        prevProps.search_suplier_list_status &&
      this.props.search_suplier_list_status === status.SUCCESS
    ) {
      let { searchSupplierList } = this.state;
      if (
        this.props.search_supplier_list &&
        this.props.search_supplier_list.length > 0
      ) {
        this.props.search_supplier_list.map((item) => {
          let itemData = item.details;

          searchSupplierList.push({
            ...itemData,
            id: item.id,
          });
          this.setState({
            searchSupplierList,
          });
        });
      }
      const reversed = [...searchSupplierList].reverse();
      this.setState({
        searchSupplierList: reversed,
      });
    }

    if (
      this.props.search_product_list_status !==
        prevProps.search_product_list_status &&
      this.props.search_product_list_status === status.SUCCESS
    ) {
      let { productListData } = this.state;
      if (
        this.props.search_product_list &&
        this.props.search_product_list.length > 0
      ) {
        this.props.search_product_list.map((item) => {
          let itemData = item.details;

          productListData.push({
            ...itemData,
            id: item.id,
          });
          productListData.map((item) => {
            if (!item.stock) {
              item.stock = 1;
            }
          });
          this.setState({
            loadingStatus: !this.state.loadingStatus,
            productListData,
          });
        });
      }
      const reversed = [...productListData].reverse();
      this.setState({
        productListData: reversed,
      });
    }

    if (
      this.props.suplier_list_status !== prevProps.suplier_list_status &&
      this.props.suplier_list_status === status.SUCCESS
    ) {
      if (this.props.supplier_list && this.props.supplier_list.length > 0) {
        this.setState({ supplierData: this.props.supplier_list });
      }
    }
    if (
      this.props.suplier_product_status !== prevProps.suplier_product_status &&
      this.props.suplier_product_status === status.SUCCESS
    ) {
      if (
        this.props.supplier_product_list &&
        this.props.supplier_product_list.length > 0
      ) {
        this.setState({ productList: this.props.supplier_product_list });
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
    if (
      this.props.update_suplier_product_status !==
        prevProps.update_suplier_product_status &&
      this.props.update_suplier_product_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getProductList());
    }
    if (
      this.props.update_suplier_list_status !==
        prevProps.update_suplier_list_status &&
      this.props.update_suplier_list_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getSupplierList());
    }
    if (
      this.props.delete_suplier_list_status !==
        prevProps.delete_suplier_list_status &&
      this.props.delete_suplier_list_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getSupplierList());
    }
    if (
      this.props.delete_suplier_product_status !==
        prevProps.delete_suplier_product_status &&
      this.props.delete_suplier_product_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getProductList());
    }
  }

  handleDelete = (index, type) => {
    if (type === "supplier") {
      let value = this.state.searchSupplierList[index].id;
      // this.props.dispatch(
      //   manageSupplierAction.deleteSupplier({ id: value.id, value })
      // );
    } else if (type === "product") {
      let { productListData } = this.state;

      let ind;
      if (productListData.length > 0) {
        ind = productListData.find(function (element) {
          return element.id === index.id;
        });
      }

      if (ind !== -1) {
        productListData.splice(ind, 1);
        this.setState({
          productListData,
        });
        this.props.dispatch(
          productActions.deleteProduct({ id: ind.id, productListData })
        );
      }
    }
  };

  validateProductUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { updateProductValue } = this.state;
    let isValid = true;
    const retData = {
      imgUrl: validObj,
      itemName: validObj,
      supplier: validObj,
      itemType: validObj,
      unit: validObj,
      price: validObj,
      stock: validObj,
      isValid,
    };
    if (update) {
      if (!updateProductValue.imgUrl) {
        retData.imgUrl = {
          isValid: false,
          message: "image is required",
        };
        isValid = false;
      }
      if (!updateProductValue.itemName) {
        retData.itemName = {
          isValid: false,
          message: "item name is required",
        };
        isValid = false;
      }
      if (!updateProductValue.supplier) {
        retData.supplier = {
          isValid: false,
          message: "supplier is required",
        };
        isValid = false;
      }
      if (!updateProductValue.itemType) {
        retData.itemType = {
          isValid: false,
          message: "item type is required",
        };
        isValid = false;
      } else if (
        updateProductValue.quantity &&
        !commonFunctions.validateNumeric(updateProductValue.quantity)
      ) {
        retData.quantity = {
          isValid: false,
          message: "quantity must be in digits",
        };
        isValid = false;
      }
      if (!updateProductValue.stock) {
        retData.stock = {
          isValid: false,
          message: "stock is required",
        };
        isValid = false;
      } else if (
        updateProductValue.stock &&
        !commonFunctions.validateNumeric(updateProductValue.stock)
      ) {
        retData.stock = {
          isValid: false,
          message: "stock must be in digits",
        };
        isValid = false;
      }
      if (!updateProductValue.unit) {
        retData.unit = {
          isValid: false,
          message: "unit is required",
        };
        isValid = false;
      }
      if (!updateProductValue.price) {
        retData.price = {
          isValid: false,
          message: "price is required",
        };
        isValid = false;
      } else if (
        updateProductValue.price &&
        !commonFunctions.validateNumeric(updateProductValue.price)
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

  validateSupplierUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { updateSupplierValue } = this.state;
    let isValid = true;
    const retData = {
      accountHolderName: validObj,
      currency: validObj,
      email: validObj,
      paymentTerms: validObj,
      supplier: validObj,
    };
    if (update) {
      if (!updateSupplierValue.accountHolderName) {
        retData.accountHolderName = {
          isValid: false,
          message: "account holders name is required",
        };
        isValid = false;
      }
      if (!updateSupplierValue.currency) {
        retData.currency = {
          isValid: false,
          message: "currency name is required",
        };
        isValid = false;
      }
      if (!updateSupplierValue.email) {
        retData.email = {
          isValid: false,
          message: "email is required",
        };
        isValid = false;
      }
      if (!updateSupplierValue.paymentTerms) {
        retData.paymentTerms = {
          isValid: false,
          message: "payment terms type is required",
        };
        isValid = false;
      }

      if (!updateSupplierValue.supplier) {
        retData.supplier = {
          isValid: false,
          message: "supplier is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  openEditModal = () => {
    const { productActiveIndex, productListData } = this.state;
    if (productActiveIndex >= 0) {
      let values = JSON.parse(
        JSON.stringify(productListData[productActiveIndex])
      );
      values.supplier = values.supplier.name;
      this.setState({ updateProductValue: values });
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

  openSupplierEditModal = () => {
    const { supplierActiveIndex, supplierData, searchSupplierList } =
      this.state;
    console.log("active index", supplierActiveIndex);
    if (supplierActiveIndex >= 0) {
      let values = JSON.parse(
        JSON.stringify(searchSupplierList[supplierActiveIndex])
      );
      this.setState({ updateSupplierValue: values });
    }
    this.setState({
      openSupplierEditDialog: !this.state.openSupplierEditDialog,
    });
  };

  closeSupplierEditModal = () => {
    this.setState({
      openSupplierEditDialog: !this.state.openSupplierEditDialog,
    });
  };

  updateDataValues = (type) => {
    const {
      updateProductValue,
      updateSupplierValue,
      productActiveIndex,
      productListData,
    } = this.state;
    if (type === "product") {
      let updateForm = this.validateProductUpdate(true);
      this.setState({ update: true });
      if (updateForm.isValid) {
        productListData[productActiveIndex] = updateProductValue;
        this.setState({ openEditDialog: !this.state.openEditDialog });
        // put request
        // this.props.dispatch(
        //   manageSupplierAction.updateProductList({
        //     id: updateProductValue.id,
        //     details: updateProductValue,
        //   })
        // );
      }
    } else if (type === "supplier") {
      let updateForm = this.validateSupplierUpdate(true);
      this.setState({ updateSupplier: true });
      if (updateForm.isValid) {
        // this.props.dispatch(
        // manageSupplierAction.updateSupplierList({
        //   id: updateSupplierValue.id,
        //   value: updateSupplierValue,
        // })
        // );
        this.setState({
          openSupplierEditDialog: !this.state.openSupplierEditDialog,
        });
      }
    }
  };

  handleUpdate = (e, type) => {
    if (type === "product") {
      const { updateProductValue } = this.state;
      const { name, value } = e.target;

      updateProductValue[name] = value;
      this.setState({ updateProductValue });
    } else if (type === "supplier") {
      const { updateSupplierValue } = this.state;
      const { name, value } = e.target;
      updateSupplierValue[name] = value;
      this.setState({ updateSupplierValue });
    }
  };

  render() {
    const {
      productListData,
      supplierColumn,
      update,
      openSupplierEditDialog,
      updateSupplierValue,
      updateSupplier,
      supplierAndCategoryList,
      supplierActiveIndex,
      updateProductValue,
      productActiveIndex,
      productColumn,
      searchSupplierList,
      openEditDialog,
    } = this.state;
    const updateProductForm = this.validateProductUpdate(update);
    const updateSupplierForm = this.validateSupplierUpdate(updateSupplier);

    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-spacebetween">
              <div className="col-12">
                <div className="request-purpose-head-left">
                  <h3>Supplier Risk</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-rfp-boxs">
            <div className="row d-flex align-items-center justify-content-start">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <Link to="/postlogin/managesupplier/activesuppliers">
                    <div className="progress-content">
                      <div className="title">Active Supplier</div>
                      <h4>{searchSupplierList.length}</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <Link to="/postlogin/managesupplier/activeproductcatalogue">
                    <div className="progress-content">
                      <div className="title">Active Product Catalogue</div>
                      <h4>{productListData.length}</h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="recent-suppliers-table">
            <div className="heading">
              <h4>Recent Suppliers</h4>
            </div>
            {searchSupplierList && searchSupplierList.length > 0 && (
              <Table
                valueFromData={{
                  columns: supplierColumn,
                  data: searchSupplierList,
                }}
                perPageLimit={4}
                visiblecheckboxStatus={false}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                showPagination={false}
                showingLine="Showing %start% to %end% of %total% "
              />
            )}
          </div>
          <div className="recent-suppliers-table">
            <div className="heading">
              <h4>Recent Added Products</h4>
            </div>
            {this.state.loadingStatus ? (
              <Table
                valueFromData={{
                  columns: productColumn,
                  data: productListData,
                }}
                perPageLimit={3}
                visiblecheckboxStatus={false}
                isLoading={
                  this.props.fetchProductList_status === status.IN_PROGRESS
                }
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                showingLine="Showing %start% to %end% of %total% "
                showPagination={false}
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
        </div>
        {productActiveIndex >= 0 && (
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
                <label className="col-3 col-form-label">Image</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="imgUrl"
                    className="form-control"
                    placeholder="image"
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.imgUrl}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.imgUrl.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Item Name</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="itemName"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.itemName}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.itemName.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Item Type</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="itemType"
                    className="form-control"
                    placeholder="Item Type"
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.itemType}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.itemType.message}
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
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.unit}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.unit.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Supplier</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="unit"
                    className="form-control"
                    placeholder="Unit"
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.supplier}
                  />
                  {/* <FormControl className="select-menu">
                    <NativeSelect
                      name="supplier"
                      onChange={(e) => this.handleUpdate(e, "product")}
                      value={updateProductValue.supplier}
                    >
                      <option value={""}>Supplier</option>
                      {supplierAndCategoryList &&
                        supplierAndCategoryList.supplierDetails &&
                        supplierAndCategoryList.supplierDetails.length > 0 &&
                        supplierAndCategoryList.supplierDetails.map(
                          (val, index) => (
                            <option
                              key={val.supplierName}
                              value={val.supplierName}
                              name="supplier"
                            >
                              {val.supplierName}
                            </option>
                          )
                        )}
                    </NativeSelect>
                    <span className="d-block w-100 text-danger">
                      {updateProductForm.supplier.message}
                    </span>
                  </FormControl> */}
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
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.price}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.price.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Stock</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="stock"
                    className="form-control"
                    placeholder="Stock"
                    onChange={(e) => this.handleUpdate(e, "product")}
                    value={updateProductValue.stock}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateProductForm.stock.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label"></label>
                <div className="col-9 col-form-field">
                  <Button
                    variant="contained"
                    className="submit"
                    onClick={() => this.updateDataValues("product")}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
        {supplierActiveIndex >= 0 && (
          <Dialog
            open={openSupplierEditDialog}
            onClose={this.closeSupplierEditModal}
            aria-labelledby="form-dialog-title"
            className="custom-dialog edit-dialog"
          >
            <div className="custom-dialog-head">
              <DialogTitle id="form-dialog-title" className="dialog-heading">
                Edit
              </DialogTitle>
              <Button
                onClick={this.closeSupplierEditModal}
                className="modal-close-btn"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="custom-dialog-content">
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Supplier</label>
                <div className="col-9 col-form-field">
                  {/* <FormControl className="select-menu">
                    <NativeSelect
                      name="supplier"
                      onChange={(e) => this.handleUpdate(e, "supplier")}
                      value={updateSupplierValue.supplier}
                    >
                      <option value={""}>Supplier</option>
                      {supplierAndCategoryList &&
                        supplierAndCategoryList.supplierDetails &&
                        supplierAndCategoryList.supplierDetails.length > 0 &&
                        supplierAndCategoryList.supplierDetails.map(
                          (val, index) => (
                            <option value={val.supplier} name="supplier">
                              {val.supplierName}
                            </option>
                          )
                        )}
                    </NativeSelect>
                    <span className="d-block w-100 text-danger">
                      {updateSupplierForm.supplier.message}
                    </span>
                  </FormControl> */}
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.supplier}
                  />
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Email</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.email}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateSupplierForm.email.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Currencies</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="currency"
                    className="form-control"
                    placeholder="Currencies"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={
                      updateSupplierValue.details?.bankDetails.currency.code
                    }
                  />
                  <span className="d-block w-100 text-danger">
                    {updateSupplierForm.currency.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Payment Term</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="paymentTerms"
                    className="form-control"
                    placeholder="Item Type"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.paymentTerms}
                  />
                  <span className="d-block w-100 text-danger">
                    {updateSupplierForm.paymentTerms.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label"></label>
                <div className="col-9 col-form-field">
                  <Button
                    variant="contained"
                    className="submit"
                    onClick={() => this.updateDataValues("supplier")}
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
    search_product_list_status,
    search_product_list,
    search_suplier_list_status,
    search_supplier_list,
    supplier_product_list,
    suplier_product_status,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_suplier_list_status,
    delete_suplier_list_status,
    delete_suplier_product_status,
    fetchProductList_status,
    fetch_product_list,
    product_status,
    product_list,
  } = state.procurement;

  return {
    search_product_list_status,
    search_product_list,
    search_suplier_list_status,
    search_supplier_list,
    supplier_product_list,
    suplier_product_status,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_suplier_list_status,
    delete_suplier_list_status,
    delete_suplier_product_status,
    fetchProductList_status,
    fetch_product_list,
    product_status,
    product_list,
  };
};

export default connect(mapStateToProps)(ManageSupplier);
