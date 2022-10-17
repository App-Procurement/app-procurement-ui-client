import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { manageSupplierAction } from "../../_actions";
import Table from "../../Table/Table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { requestForPurposeAction } from "../../_actions";

class ActiveSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierList: [],
      columns: [
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
          label: "Supplier",
          key: "supplier",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requisitions-no"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "AccountHolderName",
          key: "accountHolderName",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Email",
          key: "email",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Currencies",
          key: "currency",
          renderCallback: (value) => {
            return (
              <td>
                <span className={"requestor"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "PaymentTerms",
          key: "paymentTerms",
          renderCallback: (value) => {
            return (
              <td>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            return (
              <td>
                <Button
                  variant="outlined"
                  className="department-value active-btn "
                >
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
        //   label: '',
        //   key: 'id',
        //   renderCallback: () => {
        //     return (
        //       <td>
        //         <i class="fa fa-ellipsis-h" aria-hidden="true" />
        //       </td>
        //     );
        //   },
        // },
      ],
      openDialog: false,
      openUpdateDialog: false,
      supplierActiveIndex: -1,
      openSupplierEditDialog: false,
      updateSupplierValue: {},
      supplierAndCategoryList: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(manageSupplierAction.getActiveSupplierList());
    dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      active_supplier_list_status,
      active_supplier_list_data,
      update_active_supplier_list_status,
      delete_active_supplier_status,
      dispatch,
    } = this.props;
    if (
      active_supplier_list_status !== prevProps.active_supplier_list_status &&
      active_supplier_list_status === status.SUCCESS
    ) {
      if (active_supplier_list_data && active_supplier_list_data.length > 0) {
        this.setState({ supplierList: active_supplier_list_data });
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
      update_active_supplier_list_status &&
      update_active_supplier_list_status !==
      prevProps.update_active_supplier_list_status &&
      update_active_supplier_list_status === status.SUCCESS
    ) {
      dispatch(manageSupplierAction.getActiveSupplierList());
    }
    if (
      delete_active_supplier_status &&
      delete_active_supplier_status !==
      prevProps.delete_active_supplier_status &&
      delete_active_supplier_status === status.SUCCESS
    ) {
      dispatch(manageSupplierAction.getActiveSupplierList());
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
      // updateSupplierValue.totalCost = updateSupplierValue.price * updateSupplierValue.quantity;
      // requestData.detailsList[productActiveIndex] = updateSupplierValue updateSupplierList
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
                    <Button
                      // href="/postlogin/managesupplier/addsupplier"
                      variant="contained"
                      className="new-requisition-btn"
                    >
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
                    <Button
                      className="fillter-btn"
                      variant="outlined"
                    // onClick={this.openUpdateProductPopup}
                    >
                      Update Supplier{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {supplierList && supplierList.length > 0 && (
            <Table
              valueFromData={{ columns: columns, data: supplierList }}
              perPageLimit={6}
              visiblecheckboxStatus={false}
              isLoading={this.props.recieved_rfp_status === status.IN_PROGRESS}
              tableClasses={{
                table: "ticket-tabel",
                tableParent: "tickets-tabel",
                parentClass: "all-support-ticket-tabel",
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
    active_supplier_list_status,
    active_supplier_list_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_active_supplier_list_status,
    delete_active_supplier_status,
  } = state.procurement;
  return {
    active_supplier_list_status,
    active_supplier_list_data,
    supplier_category_list_status,
    supplier_category_list_data,
    update_active_supplier_list_status,
    delete_active_supplier_status,
  };
};
export default connect(mapStateToProps)(ActiveSupplier);
