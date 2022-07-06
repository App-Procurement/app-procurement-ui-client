import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { status } from '../../_constants';
import { manageSupplierAction } from '../../_actions';
import Table from '../../Table/Table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

class ActiveSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierList: [],
      columns: [
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
          label: 'Supplier',
          key: 'supplier',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requisitions-no'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'AccountHolderName',
          key: 'accountHolderName',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Email',
          key: 'email',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Currencies',
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
          label: 'PaymentTerms',
          key: 'paymentTerms',
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
          label: '',
          key: 'id',
          renderCallback: () => {
            return (
              <td>
                <i class="fa fa-ellipsis-h" aria-hidden="true" />
              </td>
            );
          },
        },
      ],
      openDialog: false,
      openUpdateDialog: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(manageSupplierAction.getActiveSupplierList());
  }

  componentDidUpdate(prevProps, prevState) {
    const { active_supplier_list_status, active_supplier_list_data } = this.props;
    if (
      active_supplier_list_status !== prevProps.active_supplier_list_status &&
      active_supplier_list_status === status.SUCCESS
    ) {
      if (active_supplier_list_data && active_supplier_list_data.length > 0) {
        this.setState({ supplierList: active_supplier_list_data });
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
    const { supplierList, columns, openDialog, openUpdateDialog } = this.state;
    return (
      <div className="main-content">
        <div className="manage-supplier-conntent">
          <div className="request-purpose-head">
            <div className="row d-flex align-items-center justify-content-spacebetween">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="request-purpose-head-left">
                  <h4>Active Suppliers</h4>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="request-purpose-head-right">
                  <div className="add-Supplier-button">
                    <Button
                      href="/postlogin/managesupplier/addsupplier"
                      variant="contained"
                      className="new-requisition-btn"
                    >
                      Add Supplier
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button className="fillter-btn" variant="outlined" onClick={this.openImportProductPopup}>
                      <span className="download-icon">
                        <CloudDownloadIcon />
                      </span>
                      Import Supplier{' '}
                    </Button>
                  </div>
                  <div className="search-fillter">
                    <Button className="fillter-btn" variant="outlined" onClick={this.openUpdateProductPopup}>
                      Update Supplier{' '}
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
            <Link onClick={this.openImportProductPopup} className="modal-close-btn">
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { active_supplier_list_status, active_supplier_list_data } = state.procurement;
  return { active_supplier_list_status, active_supplier_list_data };
};
export default connect(mapStateToProps)(ActiveSupplier);
