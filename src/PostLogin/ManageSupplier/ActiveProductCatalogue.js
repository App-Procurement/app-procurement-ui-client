import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { status } from '../../_constants';
import { manageSupplierAction } from '../../_actions';
import Table from '../../Table/Table';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

class ActiveProductCatalogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productColumn: [
        {
          label: 'S No',
          key: 'sno',
          renderCallback: (index) => {
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
          key: 'currency',
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
          label: 'Edit',
          key: 'id',
          renderCallback: () => {
            return (
              <td>
                <MoreHorizIcon />
              </td>
            );
          },
        },
      ],
      productList: [],
      openDialog: false,
      openUpdateDialog: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(manageSupplierAction.getProductList());
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

  render() {
    const { productColumn, productList, openDialog, openUpdateDialog } = this.state;
    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
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
                      to="/postlogin/addproduct"
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { supplier_product_list, suplier_product_status } = state.procurement;
  return {
    supplier_product_list,
    suplier_product_status,
  };
};
export default connect(mapStateToProps)(ActiveProductCatalogue);
