import React from "react";

import { connect } from "react-redux";
import { status } from "../../_constants";
import Table from "../../Table/Table";
import Loader from "react-js-loader";
import {
  requestForPurposeAction,
  manageSupplierAction,
  productActions,
} from "../../_actions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { commonFunctions } from "../../_utilities";
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      SupplierData: {},
      productListData: [],
      productColumn: [
        {
          label: "S No",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td>
                <span className={"s-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: "Picture",
          key: "imgUrl",
          renderCallback: (value) => {
            return (
              <td>
                <img src={value} />
              </td>
            );
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
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requestor"}>{value.name}</span>
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
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.id}`}>
                <span className={"department-value"}>{value.id}</span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "supplier",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value.status}`}>
                <span className={"department-value"}>{value.status}</span>
              </td>
            );
          },
        },
        {
          label: "Edit",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td>
                <div className="d-block position-relative edit-delete-modal">
                  <i
                    class="fa fa-ellipsis-h"
                    aria-hidden="true"
                    onClick={() =>
                      this.setState({
                        productActiveIndex:
                          this.state.productActiveIndex === index ? -1 : index,
                      })
                    }
                  ></i>
                  {this.state.productActiveIndex === index && (
                    <div className="toggale">
                      <i
                        class="fa fa-pencil edit"
                        aria-hidden="true"
                        onClick={this.toggleEditModal}
                      ></i>
                      <i
                        class="fa fa-trash delete"
                        aria-hidden="true"
                        onClick={() => {
                          this.removeProduct(index);
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
      productList: [],
      supplierAndCategoryList: [],
      openDialog: false,
      isSubmit: false,
      openUpdateDialog: false,
      productActiveIndex: -1,
      openProductEditDialog: false,
      itemName: "",
      itemNameError: "",
      itemPrice: "",
      itemPriceError: "",
      itemUnit: "",
      itemUnitError: "",
      itemType: "",
      itemTypeError: "",
      itemSupplier: "",
      itemSupplierError: "",
      itemFile: [],
      itemFileError: "",
      updateProductValue: {},
      supplierData: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(productActions.searchProductList());
    this.props.dispatch(manageSupplierAction.searchSupplierList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  clearUpdateFields = () => {
    this.setState({
      openProductEditDialog: false,
      updateProductValue: {},
      productActiveIndex: -1,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.search_suplier_list_status !==
        prevProps.search_suplier_list_status &&
      this.props.search_suplier_list_status === status.SUCCESS
    ) {
      if (
        this.props.search_supplier_list &&
        this.props.search_supplier_list.length > 0
      ) {
        this.setState({ supplierData: this.props.search_supplier_list });
      }
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
          this.setState({
            loadingStatus: !this.state.loadingStatus,
            productListData,
          });
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
    if (
      this.props.update_suplier_product_status !==
        prevProps.update_suplier_product_status &&
      this.props.update_suplier_product_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getProductList());
      this.clearUpdateFields();
    } else if (
      this.props.delete_suplier_list_status !==
        prevProps.delete_suplier_list_status &&
      this.props.delete_suplier_list_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getProductList());
    }
  }

  openImportProductPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  openUpdateProductPopup = () => {
    this.setState({
      openUpdateDialog: !this.state.openUpdateDialog,
    });
  };

  toggleEditModal = () => {
    const { productActiveIndex, productList } = this.state;
    if (productActiveIndex >= 0) {
      let values = JSON.parse(JSON.stringify(productList[productActiveIndex]));
      this.setState({ updateProductValue: values });
    }
    this.setState({
      openProductEditDialog: !this.state.openProductEditDialog,
    });
  };

  validateProductUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { updateProductValue } = this.state;
    let isValid = true;
    const retData = {
      productName: validObj,
      itemType: validObj,
      unit: validObj,
      price: validObj,
      supplier: validObj,
      stock: validObj,
    };
    if (update) {
      if (!updateProductValue.productName) {
        retData.productName = {
          isValid: false,
          message: "Item name is required",
        };
        isValid = false;
      }
      if (!updateProductValue.itemType) {
        retData.itemType = {
          isValid: false,
          message: "item type name is required",
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
          message: "price type is required",
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
      if (!updateProductValue.stock) {
        retData.stock = {
          isValid: false,
          message: "stock value is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  taskValid = () => {
    let valid = true;

    const { itemName, itemUnit, itemPrice, itemType, itemSupplier, itemFile } =
      this.state;

    if (!itemName) {
      this.setState({ itemNameError: "Item  Name Is Required" });
      valid = false;
    } else {
      this.setState({ itemNameError: "" });
    }
    if (!itemFile) {
      this.setState({ itemFileError: "Item file is  Required" });
      valid = false;
    } else {
      this.setState({ itemFileError: "" });
    }

    if (!itemPrice) {
      this.setState({ itemPriceError: "Item  Price Is Required" });
      valid = false;
    } else if (!commonFunctions.validateNumeric(itemPrice)) {
      this.setState({ itemPriceError: "Please enter valid price" });
      valid = false;
    } else {
      this.setState({ itemPriceError: "" });
    }

    if (!itemUnit) {
      this.setState({ itemUnitError: "Item Unit Is  required" });
      valid = false;
    } else {
      this.setState({ itemUnitError: "" });
    }

    if (!itemType) {
      this.setState({ itemTypeError: "Item type is Required" });
      valid = false;
    } else {
      this.setState({ itemTypeError: "" });
    }

    if (!itemSupplier) {
      this.setState({ itemSupplierError: "item Supplier is required" });
      valid = false;
    } else {
      this.setState({ itemSupplierError: "" });
    }

    if (
      itemName &&
      itemType &&
      itemPrice &&
      itemUnit &&
      itemSupplier &&
      itemFile
    ) {
      valid = true;
    }

    return valid;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleUploadFile = (e) => {
    let { itemFile } = this.state;
    const { name, files } = e.target;

    if (files[0]) {
      itemFile.push(files[0]);
    }
    this.setState({ itemFile });
  };

  updateDataValues = (type) => {
    const { updateProductValue } = this.state;
    let updateForm = this.validateProductUpdate(true);
    this.setState({ isSubmit: true });
    if (updateForm.isValid) {
      this.props.dispatch(
        manageSupplierAction.updateProductList({
          id: updateProductValue.id,
          value: updateProductValue,
        })
      );
      this.setState({
        openSupplierEditDialog: !this.state.openSupplierEditDialog,
      });
    }
  };

  handleUpdate = (e, type) => {
    const { updateProductValue } = this.state;
    const { name, value } = e.target;
    updateProductValue[name] = value;
    this.setState({ updateProductValue });
  };

  removeProduct = (index) => {
    const { productList } = this.state;
    let value = productList[index];
    if (value.id) {
      this.props.dispatch(
        manageSupplierAction.deleteSupplier({ id: value.id, value })
      );
    }
    this.setState({ productActiveIndex: -1 });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.taskValid()) {
      let details = {
        itemName: this.state.itemName,
        price: this.state.itemPrice.toString(),
        imgUrl: this.props.search_product_list[0].details.imgUrl,
        unit: this.state.itemUnit,
        category: this.props.search_product_list[0].details.category,
        itemType: this.state.itemType,
        supplier: this.props.search_product_list[0].details.supplier,
      };
      details.supplier.name = this.props.search_supplier_list[0].details.name;
      this.props.dispatch(productActions.addProduct(details));
      this.props.history.push(`/postlogin/products`);
    }
  };

  render() {
    const {
      productColumn,
      productActiveIndex,
      openProductEditDialog,
      updateProductValue,
      supplierAndCategoryList,
      openDialog,
      openUpdateDialog,
      isSubmit,
      handleSubmit,
      itemNameError,
      itemPriceError,
      itemSupplierError,
      itemTypeError,
      itemUnitError,
      itemFileError,
      productListData,
      itemSupplier,
    } = this.state;

    const productValidation = this.validateProductUpdate(isSubmit);
    return (
      <div className="main-content">
        <div className="products-page-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-spacebetween">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="request-purpose-head-left">
                  <h4>Add Product</h4>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="account-holder-details mb-4">
              <div className="requisitions-filter">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Item Name</label>
                      <input
                        type="text"
                        name="itemName"
                        className="form-control"
                        placeholder="Hp Printer"
                        onChange={this.handleStateChange}
                      />
                      <span className="d-block w-100 text-danger">
                        {itemNameError}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Price</label>
                      <input
                        type="text"
                        name="itemPrice"
                        className="form-control"
                        placeholder="$625"
                        onChange={this.handleStateChange}
                      />
                      <span className="d-block w-100 text-danger">
                        {itemPriceError}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Unit</label>
                      <input
                        type="text"
                        name="itemUnit"
                        className="form-control"
                        placeholder="Each"
                        onChange={this.handleStateChange}
                      />
                      <span className="d-block w-100 text-danger">
                        {itemUnitError}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Item Type</label>
                      <input
                        type="text"
                        name="itemType"
                        // value={item.itemType}
                        className="form-control"
                        placeholder="Product"
                        onChange={this.handleStateChange}
                      />
                      <span className="d-block w-100 text-danger">
                        {itemTypeError}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Supplier</label>
                      <div className="new-requeust-massge">
                        <FormControl className="payment-select-menu">
                          <NativeSelect
                            name="itemSupplier"
                            onChange={this.handleStateChange}
                            value={
                              itemSupplier &&
                              this.props.search_supplier_list[itemSupplier]
                                ? this.props.search_supplier_list[itemSupplier]
                                    .name
                                : null
                            }
                          >
                            {this.props?.search_supplier_list?.length &&
                              this.props.search_supplier_list.map(
                                (item, index) => (
                                  <option value={index}>
                                    {item.details.name}
                                  </option>
                                )
                              )}
                          </NativeSelect>
                        </FormControl>
                        <span className="d-block w-100 text-danger">
                          {itemSupplierError}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="form-group form-group-common">
                      <label className="d-block">Image</label>
                      <div className="attach">
                        <input
                          type="file"
                          placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                          accept=" .pdf , .doc , .ppt , .jpg , .png"
                          name="itemFile"
                          onChange={(e) => this.handleUploadFile(e)}
                          multiple
                        />

                        <div className="file-content d-flex justify-content-center align-items-center">
                          <CloudUploadIcon className="icon" />
                          <p>Upload file</p>
                        </div>
                      </div>
                      <span className="d-block w-100 text-danger">
                        {itemFileError}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-submit-buttons">
                <div className="row col-form-group ">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-form-button">
                    <div className="item-delete-buttons">
                      <div className="submit-btn">
                        <Button
                          variant="contained"
                          className="submit disabled"
                          onClick={this.handleSubmit}
                          disabled={
                            this.props.add_product_status === 0 ? true : false
                          }
                        >
                          Save
                        </Button>
                      </div>
                      <div className="submit-btn">
                        <Button variant="contained" className="submit delete">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="add-product-table">
            <div className="heading">
              <h5>Recent Added Product</h5>
            </div>
            {this.state.loadingStatus ? (
              <Table
                valueFromData={{
                  columns: productColumn,
                  data: this.state.productListData,
                }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                isLoading={this.props.product_status === status.IN_PROGRESS}
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
        </div>
        <Dialog
          open={openDialog}
          onClose={this.openImportProductPopup}
          aria-labelledby="form-dialog-title"
          className="update-supplier-dialog"
        >
          <div className="additem-dialog-head">
            <DialogTitle
              id="form-dialog-title"
              className="addNewItemDialogTitle dialog-heading"
            >
              Import Product
            </DialogTitle>
            <Button
              onClick={this.openImportProductPopup}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>

          <DialogContent className="dialogSmWidth addNewItemDialogContent">
            <div className="supplier-inner-content">
              <div className="heading">
                <h5>
                  Download <span>File</span>
                </h5>
                <p>click on the download file and add the supplier</p>
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
              <div className="heading">
                <h5>
                  Download <span>File</span>
                </h5>
              </div>
              <div className="upload-file-box text-center">
                <div className="attach">
                  <input
                    type="file"
                    placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                    accept=" .pdf , .doc , .ppt , .jpg , .png"
                    name="requisitionFile"
                    onChange={this.handleFileChange}
                    multiple
                  />

                  <div className="file-content">
                    <div className="file-inner-content">
                      <CloudUploadIcon className="icon" />
                      <p>
                        Drag & drop your file or <span>Browse</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openUpdateDialog}
          onClose={this.openUpdateProductPopup}
          aria-labelledby="form-dialog-title"
          className="update-supplier-dialog"
        >
          <div className="additem-dialog-head">
            <DialogTitle
              id="form-dialog-title"
              className="addNewItemDialogTitle dialog-heading"
            >
              Update Supplier
            </DialogTitle>
            <Button
              onClick={this.openUpdateProductPopup}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>

          <DialogContent className="dialogSmWidth addNewItemDialogContent">
            <div className="supplier-inner-content">
              <div className="heading">
                <h5>
                  Download <span>File</span>
                </h5>
                <p>click on the download file and add the supplier</p>
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
              <div className="heading">
                <h5>
                  Download <span>File</span>
                </h5>
              </div>
              <div className="upload-file-box text-center">
                <div className="attach">
                  <input
                    type="file"
                    placeholder="Upload files (PDF,DOC,PPT,JPG,PNG)"
                    accept=" .pdf , .doc , .ppt , .jpg , .png"
                    name="requisitionFile"
                    onChange={this.handleFileChange}
                    multiple
                  />

                  <div className="file-content">
                    <div className="file-inner-content">
                      <CloudUploadIcon className="icon" />
                      <p>
                        Drag & drop your file or <span>Browse</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {productActiveIndex >= 0 && (
          <Dialog
            open={openProductEditDialog}
            onClose={this.toggleEditModal}
            aria-labelledby="form-dialog-title"
            className="custom-dialog edit-dialog"
          >
            <div className="custom-dialog-head">
              <DialogTitle id="form-dialog-title" className="dialog-heading">
                Edit
              </DialogTitle>
              <Button
                onClick={this.toggleEditModal}
                className="modal-close-btn"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="custom-dialog-content">
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Item Name</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    placeholder="Item Name"
                    onChange={this.handleUpdate}
                    value={updateProductValue.productName}
                  />
                  <span className="d-block w-100 text-danger">
                    {productValidation.productName.message}
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
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateProductValue.itemType}
                  />
                  <span className="d-block w-100 text-danger">
                    {productValidation.itemType.message}
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
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateProductValue.unit}
                  />
                  <span className="d-block w-100 text-danger">
                    {/* {productValidation.unit.message} */}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Supplier</label>
                <div className="col-9 col-form-field">
                  <FormControl className="select-menu">
                    <NativeSelect
                      name="supplier"
                      onChange={(e) => this.handleUpdate(e, "supplier")}
                      value={updateProductValue.supplier}
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
                      {/* {productValidation.supplier.message} */}
                    </span>
                  </FormControl>
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
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateProductValue.price}
                  />
                  <span className="d-block w-100 text-danger">
                    {/* {productValidation.price.message} */}
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
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateProductValue.stock}
                  />
                  <span className="d-block w-100 text-dansubmitger"></span>
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
    search_suplier_list_status,
    search_supplier_list,
    search_product_list,
    search_product_list_status,
    add_product_status,
    fetch_product_list,
    fetchProductList_status,
    supplier_list,
    product_status,
    product_list,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_supplier_product_list,
    delete_suplier_list_status,
  } = state.procurement;
  return {
    search_suplier_list_status,
    search_supplier_list,
    search_product_list,
    search_product_list_status,
    add_product_status,
    fetch_product_list,
    fetchProductList_status,

    supplier_list,
    product_status,
    product_list,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_supplier_product_list,
    delete_suplier_list_status,
  };
};

export default connect(mapStateToProps)(Products);
