import React from 'react';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { status } from '../../_constants';
import { manageSupplierAction } from '../../_actions';
import Table from '../../Table/Table';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { requestForPurposeAction } from "../../_actions";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productColumn: [
        {
          label: 'S No',
          key: 'sno',
          renderCallback: (value, index) => {
            return (
              <td>
                <span className={'s-no'}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: 'Picture',
          key: 'productImgUrl',
          renderCallback: (value) => {
            return (
              <td>
                <img src={value} width="50px" height="50px" />
              </td>
            );
          },
        },
        {
          label: 'Item Name',
          key: 'productName',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requisitions-no'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Item Type',
          key: 'itemType',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Unit',
          key: 'unit',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requestor'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Supplier',
          key: 'supplier',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requestor'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Price',
          key: 'price',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requestor'}>${value}</span>
              </td>
            );
          },
        },
        {
          label: 'Stock',
          key: 'stock',
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Status',
          key: 'status',
          renderCallback: (value) => {
            return (
              <td>
                <Button variant="outlined" className="department-value active-btn ">
                  {value}
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
              <td>
                <div className="d-block position-relative edit-delete-modal">
                  <i
                    class="fa fa-ellipsis-h"
                    aria-hidden="true"
                    onClick={() => this.setState({ productActiveIndex: this.state.productActiveIndex === index ? -1 : index })}
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
        // {
        //   label: 'Edit',
        //   key: 'id',
        //   renderCallback: () => {
        //     return (
        //       <td>
        //         <MoreHorizIcon />
        //       </td>
        //     );
        //   },
        // },
      ],
      productList: [],
      supplierAndCategoryList: [],
      openDialog: false,
      isSubmit: false,
      openUpdateDialog: false,
      productActiveIndex: -1,
      openProductEditDialog: false,
      updateProductValue: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(manageSupplierAction.getProductList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  clearUpdateFields = () => {
    this.setState({ openProductEditDialog: false, updateProductValue: {}, productActiveIndex: -1 })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.suplier_product_status !== prevProps.suplier_product_status &&
      this.props.suplier_product_status === status.SUCCESS
    ) {
      if (this.props.supplier_product_list && this.props.supplier_product_list.length > 0) {
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
      this.props.update_suplier_product_status !== prevProps.update_suplier_product_status &&
      this.props.update_suplier_product_status === status.SUCCESS
    ) {
      this.props.dispatch(manageSupplierAction.getProductList());
      this.clearUpdateFields()
    }
    else if (this.props.delete_suplier_list_status !== prevProps.delete_suplier_list_status &&
      this.props.delete_suplier_list_status === status.SUCCESS) {
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
  updateDataValues = (type) => {
    const { updateProductValue } = this.state;

    let updateForm = this.validateProductUpdate(true);
    this.setState({ isSubmit: true });
    if (updateForm.isValid) {
      // updateProductValue.totalCost = updateProductValue.price * updateProductValue.quantity;
      // requestData.detailsList[productActiveIndex] = updateProductValue updateSupplierList
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
    let value = productList[index]
    if (value.id) {
      this.props.dispatch(manageSupplierAction.deleteSupplier({ id: value.id, value }))
    }
    this.setState({ productActiveIndex: -1 })
  }
  render() {
    const { productColumn, productList, productActiveIndex, openProductEditDialog, updateProductValue, supplierAndCategoryList, openDialog, openUpdateDialog, isSubmit } = this.state;
    const productValidation = this.validateProductUpdate(isSubmit)
    return (
      <div className="main-content">
        <div className="products-page-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-spacebetween">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="request-purpose-head-left">
                  <h4>Active Product Catalogue</h4>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="request-purpose-head-right">
                  <div className="add-Supplier-button">
                    <Button
                      variant="contained"
                      href="/postlogin/products/addproducts"
                      disableElevation
                      className="new-requisition-btn"
                    >
                      Add Product
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button
                      variant="contained"
                      onClick={this.openImportProductPopup}
                      className="fillter-btn"
                      disableElevation
                    >
                      <span className="download-icon">
                        <CloudDownloadIcon />
                      </span>
                      Import Product
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button
                      variant="contained"
                      onClick={this.openUpdateProductPopup}
                      className="fillter-btn"
                      disableElevation
                    >
                      Update Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {productList && productList.length > 0 && (
            <Table
              valueFromData={{ columns: productColumn, data: productList }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={this.props.suplier_list_status === status.IN_PROGRESS}
              tableClasses={{
                table: 'ticket-tabel',
                tableParent: 'tickets-tabel',
                parentClass: 'all-support-ticket-tabel',
              }}
              showingLine="Showing %start% to %end% of %total% "
            />
          )}
        </div>
        <Dialog
          open={openDialog}
          onClose={this.openImportProductPopup}
          aria-labelledby="form-dialog-title"
          className="update-supplier-dialog"
        >
          <div className="additem-dialog-head">
            <DialogTitle id="form-dialog-title" className="addNewItemDialogTitle dialog-heading">
              Import Product
            </DialogTitle>
            <Button onClick={this.openImportProductPopup} className="modal-close-btn">
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
                <Button href="/postlogin/viewsupplierdetail" variant="contained" className="new-requisition-btn">
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
            <DialogTitle id="form-dialog-title" className="addNewItemDialogTitle dialog-heading">
              Update Supplier
            </DialogTitle>
            <Button onClick={this.openUpdateProductPopup} className="modal-close-btn">
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
                <Button href="/postlogin/viewsupplierdetail" variant="contained" className="new-requisition-btn">
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
              <DialogTitle
                id="form-dialog-title"
                className="dialog-heading"
              >
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
                    {productValidation.unit.message}
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
                      {productValidation.supplier.message}
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
                    {productValidation.price.message}
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
                  <span className="d-block w-100 text-danger">
                    {productValidation.stock.message}
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
  const { supplier_product_list,
    suplier_product_status,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_supplier_product_list,
    delete_suplier_list_status, } = state.procurement;
  return {
    supplier_product_list,
    suplier_product_status,
    supplier_category_list_status,
    supplier_category_list_data,
    update_suplier_product_status,
    update_supplier_product_list,
    delete_suplier_list_status,
  };
};
export default connect(mapStateToProps)(Products);
