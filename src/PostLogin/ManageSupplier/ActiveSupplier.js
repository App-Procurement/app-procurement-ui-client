import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { manageSupplierAction } from "../../_actions";
import Table from "../../Table/Table";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "react-js-loader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  NativeSelect,
} from "@mui/material";
class ActiveSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      importProductFile: null,
      supplierList: [],
      columns: [
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
      openDialog: false,
      openUpdateDialog: false,
      supplierActiveIndex: -1,
      openSupplierEditDialog: false,
      updateSupplierValue: {},
      supplierAndCategoryList: [],
      selectedFile: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(manageSupplierAction.searchSupplierList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.search_suplier_list_status !==
        prevProps.search_suplier_list_status &&
      this.props.search_suplier_list_status === status.SUCCESS
    ) {
      let { supplierList } = this.state;
      if (
        this.props.search_supplier_list &&
        this.props.search_supplier_list.length > 0
      ) {
        this.props.search_supplier_list.map((item) => {
          let itemData = item.details;

          supplierList.push({
            ...itemData,
            id: item.id,
          });
          this.setState({
            loadingStatus: !this.state.loadingStatus,
            supplierList,
          });
        });
      }
      const reversed = [...supplierList].reverse();
      this.setState({
        supplierList: reversed,
      });
    }
  }

  toggleEditModal = () => {
    const { supplierActiveIndex, supplierList } = this.state;
    if (supplierActiveIndex >= 0) {
      let values = JSON.parse(
        JSON.stringify(supplierList[supplierActiveIndex])
      );
      this.setState({ updateSupplierValue: values });
    }
    this.setState({
      openSupplierEditDialog: !this.state.openSupplierEditDialog,
    });
  };

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

  validateSupplierUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { updateSupplierValue } = this.state;
    let isValid = true;
    const retData = {
      supplier: validObj,
      accountHolderName: validObj,
      email: validObj,
      currency: validObj,
      paymentTerms: validObj,
    };
    if (update) {
      if (!updateSupplierValue.supplier) {
        retData.supplier = {
          isValid: false,
          message: "Supplier is required",
        };
        isValid = false;
      }
      if (!updateSupplierValue.accountHolderName) {
        retData.accountHolderName = {
          isValid: false,
          message: "Account holder name is required",
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
      if (!updateSupplierValue.currency) {
        retData.currency = {
          isValid: false,
          message: "currency type is required",
        };
        isValid = false;
      }

      if (!updateSupplierValue.paymentTerms) {
        retData.paymentTerms = {
          isValid: false,
          message: "payment terms is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleUpdate = (e, type) => {
    const { updateSupplierValue } = this.state;
    const { name, value } = e.target;
    updateSupplierValue[name] = value;
    this.setState({ updateSupplierValue });
  };

  updateDataValues = (type) => {
    const { updateSupplierValue } = this.state;

    let updateForm = this.validateSupplierUpdate(true);
    this.setState({ isSubmit: true });
    if (updateForm.isValid) {
      this.props.dispatch(
        manageSupplierAction.updateActiveSupplierList({
          id: updateSupplierValue.id,
          value: updateSupplierValue,
        })
      );
      this.setState({
        openSupplierEditDialog: !this.state.openSupplierEditDialog,
      });
    }
  };

  removeProduct = (index) => {
    const { supplierList } = this.state;
    let value = supplierList[index];
    if (value.id) {
      this.props.dispatch(
        manageSupplierAction.deleteActiveSupplier({ id: value.id, value })
      );
    }
    this.setState({ supplierActiveIndex: -1 });
  };

  handleClickUploadDocument = (event) => {
    const { name, files } = event.target;

    let fileObj = event.target.files[0];

    if (fileObj.size > 0 && fileObj.name.split(".").pop() === "xls") {
      this.setState({
        [name]: files,
      });
    }
  };

  render() {
    const {
      supplierList,
      columns,
      updateSupplierValue,
      supplierAndCategoryList,
      isSubmit,
      supplierActiveIndex,
      openSupplierEditDialog,
      openDialog,
      openUpdateDialog,
    } = this.state;

    let supplierValidation = this.validateSupplierUpdate(isSubmit);

    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-spacebetween">
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-12 col-12">
                <div className="request-purpose-head-left">
                  <h4>Active Suppliers</h4>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9 col-md-8 col-sm-12 col-12">
                <div className="request-purpose-head-right">
                  <div className="add-Supplier-button">
                    <Button variant="contained" className="new-requisition-btn">
                      Add Supplier
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button
                      className="fillter-btn"
                      variant="outlined"
                      onClick={this.openImportProductPopup}
                    >
                      <span className="download-icon">
                        <CloudDownloadIcon />
                      </span>
                      Import Supplier{" "}
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button className="fillter-btn" variant="outlined">
                      Update Supplier
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.loadingStatus ? (
            <Table
              valueFromData={{ columns: columns, data: supplierList }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={this.props.suplier_list_status === status.IN_PROGRESS}
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
            <Link
              onClick={this.openImportProductPopup}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Link>
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
                    accept=".xls"
                    name="importProductFile"
                    onChange={this.handleClickUploadDocument}
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
                <Button variant="contained" className="new-requisition-btn">
                  Download
                </Button>
              </div>
              <div className="heading">
                <h5>
                  Upload <span>File</span>
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
        {supplierActiveIndex >= 0 && (
          <Dialog
            open={openSupplierEditDialog}
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
                <label className="col-3 col-form-label">Supplier</label>
                <div className="col-9 col-form-field">
                  <FormControl className="select-menu">
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
                      {supplierValidation.supplier.message}
                    </span>
                  </FormControl>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">
                  AccountHolderName
                </label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="accountHolderName"
                    className="form-control"
                    placeholder="Account Holder Name"
                    onChange={this.handleUpdate}
                    value={updateSupplierValue.accountHolderName}
                  />
                  <span className="d-block w-100 text-danger">
                    {supplierValidation.accountHolderName.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">Email</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Item Type"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.email}
                  />
                  <span className="d-block w-100 text-danger">
                    {supplierValidation.email.message}
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
                    placeholder="Unit"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.currency}
                  />
                  <span className="d-block w-100 text-danger">
                    {supplierValidation.currency.message}
                  </span>
                </div>
              </div>
              <div className="form-group row form-group">
                <label className="col-3 col-form-label">PaymentTerms</label>
                <div className="col-9 col-form-field">
                  <input
                    type="text"
                    name="paymentTerms"
                    className="form-control"
                    placeholder="Price"
                    onChange={(e) => this.handleUpdate(e, "supplier")}
                    value={updateSupplierValue.paymentTerms}
                  />
                  <span className="d-block w-100 text-danger">
                    {supplierValidation.paymentTerms.message}
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
    search_supplier_list,
    search_suplier_list_status,
    active_supplier_list_status,
    active_supplier_list_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_active_supplier_list_status,
    delete_active_supplier_status,
  } = state.procurement;
  return {
    search_supplier_list,
    search_suplier_list_status,
    active_supplier_list_status,
    active_supplier_list_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_active_supplier_list_status,
    delete_active_supplier_status,
  };
};

export default connect(mapStateToProps)(ActiveSupplier);
