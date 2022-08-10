import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '../../Table/Table';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { connect } from 'react-redux';
import { requestForPurposeAction } from '../../_actions';
import { status } from '../../_constants';
import { commonFunctions } from '../../_utilities';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import AddItemList from './AddItemList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
//import PopupState, { bindTrigger, bindMenu } from '@material-ui-popup-state';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
class ViewRequest extends Component {
  inputOpenFileRef;
  anchorRef;
  pathID;
  apiCall;
  formkiqClient;
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      anchorEl: null,
      requiData: {
        status: '',
        reqno: '',
        depart: '',
        ViewDetail: false,
        selectBuyer: false,
      },
      supplierAndCategoryList: {},
      updateValue: {},
      update: false,
      openEditDialog: false,
      requestData: [],
      openedMenuIndex: -1,
      openDialog: false,
      formData: {
        dueDate: 'yyyy-mm-dd',
        deliveryDate: 'yyyy-mm-dd',
        location: '',
        Department: '',
        Request: '',
        Note: '',
      },
      currentId: '',
      columns: [
        {
          label: 'S.no',
          key: 'sno',
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'s-no'}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: 'Name',
          key: 'name',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'requisitions-no'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: t('Category'),
          key: 'category',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Supplier',
          key: 'supplier',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Quantity',
          key: 'quantity',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'requestor'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Unit',
          key: 'unit',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: 'price',
          key: 'price',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: 'Total Cost',
          key: 'totalCost',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: 'Status',
          key: 'status',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button variant="contained" className="warning-btn">
                  {value}
                </Button>
              </td>
            );
          },
        },
        {
          label: '',
          key: 'sno',
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <div className="d-block position-relative edit-delete-modal">
                  <i
                    className="fa fa-ellipsis-h"
                    aria-hidden="true"
                    onClick={() => this.setState({ activeIndex:this.state.activeIndex===index?-1: index })}
                  ></i>
                  {this.state.activeIndex === index && (
                    <div className="toggale" >
                      <i className="fa fa-pencil edit" aria-hidden="true" onClick={this.openEditModal}></i>
                      <i
                        className="fa fa-trash delete"
                        aria-hidden="true"
                        onClick={() => {
                          this.handleDelete(index, value);
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
      selectedItemList: [],
      itemList: [],
      tableData: [],
      uploadedFileList: [],
      selectedFile: {},
    };
    this.inputOpenFileRef = React.createRef();
    this.anchorRef = React.createRef();
    this.pathID = this.props.match.params.id;
    this.formkiqClient = new window.exports.FormkiqClient(
      'https://0f46r83d5a.execute-api.us-east-1.amazonaws.com',
      '',
      '',
      {
        onFormSubmitted: (formName) => {},
        onFormCompleted: (formName, response) => {
          this.setUploadedDocID(response);
        },
      }
    );
    this.formkiqClient.login('papubhat@gmail.com', 'microsoft');
  }
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
      // requestData.detailsList[activeIndex] = updateValue
      this.setState({ openEditDialog: !this.state.openEditDialog });
      this.props.dispatch(requestForPurposeAction.updateRequestList({ id: this.pathID, value: updateValue }));
    }
  };

  handleDelete = (index, id) => {
    this.props.dispatch(requestForPurposeAction.removeRequest({ id: this.pathID, key: id }));
    this.handleOperation(index);
    this.setState({ activeIndex: -1 });
  };
  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };
  openEditModal = () => {
    const { activeIndex, requestData } = this.state;
    if (activeIndex >= 0) {
      let values = JSON.parse(JSON.stringify(requestData.detailsList[activeIndex]));
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
  handleOperation = (id) => {
    if (id === this.state.openedMenuIndex) {
      this.setState({
        openedMenuIndex: -1,
      });
    } else {
      this.setState({
        openedMenuIndex: id,
      });
    }
  };
  validateUpdate = (update) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    const { updateValue } = this.state;
    let isValid = true;
    const retData = {
      name: validObj,
      category: validObj,
      supplier: validObj,
      quantity: validObj,
      unit: validObj,
      price: validObj,
      isValid,
    };
    if (update) {
      if (!updateValue.name) {
        retData.name = {
          isValid: false,
          message: 'Name is required',
        };
        isValid = false;
      }
      if (!updateValue.category) {
        retData.category = {
          isValid: false,
          message: 'category is required',
        };
        isValid = false;
      }
      if (!updateValue.supplier) {
        retData.supplier = {
          isValid: false,
          message: 'supplier is required',
        };
        isValid = false;
      }
      if (!updateValue.quantity) {
        retData.quantity = {
          isValid: false,
          message: 'quantity is required',
        };
        isValid = false;
      } else if (updateValue.quantity && !commonFunctions.validateNumeric(updateValue.quantity)) {
        retData.quantity = {
          isValid: false,
          message: 'quantity must be in digits',
        };
        isValid = false;
      }
      if (!updateValue.unit) {
        retData.unit = {
          isValid: false,
          message: 'unit is required',
        };
        isValid = false;
      }
      if (!updateValue.price) {
        retData.price = {
          isValid: false,
          message: 'price is required',
        };
        isValid = false;
      } else if (updateValue.price && !commonFunctions.validateNumeric(updateValue.price)) {
        retData.price = {
          isValid: false,
          message: 'price must be in digits',
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };
  setSelectedItemList = (data) => {
    let { requestData } = this.state;
    let value = JSON.parse(JSON.stringify(data));
    let index = -1;
    if (requestData.detailsList && requestData.detailsList.length > 0) {
      for (let i = 0; i < requestData.detailsList.length; i++) {
        if (requestData.detailsList[i].id === value.id) {
          index = i;
        }
      }
      if (index >= 0) {
        requestData.detailsList[index].quantity += value.quantity;
        requestData.detailsList[index].totalCost =
          requestData.detailsList[index].quantity * requestData.detailsList[index].price;
      } else {
        requestData.detailsList = [...requestData.detailsList, value];
      }
    } else {
      requestData.detailsList = [value];
    }
    this.setState({
      requestData,
    });
  };
  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };
  handleClickMethod = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
  };
  componentDidMount() {
    if (this.pathID) {
      this.props.dispatch(requestForPurposeAction.getRequest({ id: this.pathID }));
    }
    this.props.dispatch(requestForPurposeAction.getItemList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }
  openAddNewItemPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    let { uploadedFileList, selectedFile } = this.state;
    if (
      this.props.get_request_status !== prevProps.get_request_status &&
      this.props.get_request_status === status.SUCCESS
    ) {
      if (this.props.get_request_data) {
        if (this.props.get_request_data.detailsList && this.props.get_request_data.detailsList.length > 0) {
          for (let i = 0; i < this.props.get_request_data.detailsList.length; i++) {
            this.props.get_request_data.detailsList[i].totalCost =
              this.props.get_request_data.detailsList[i].price * this.props.get_request_data.detailsList[i].quantity;
          }
        }
        this.setState({ requestData: this.props.get_request_data });
      }
    }
    if (this.props.item_list_status !== prevProps.item_list_status && this.props.item_list_status === status.SUCCESS) {
      if (this.props.item_list && this.props.item_list.length > 0) {
        for (let i = 0; i < this.props.item_list.length; i++) {
          this.props.item_list[i].totalCost = this.props.item_list[i].price * this.props.item_list[i].quantity;
        }
        this.setState({
          itemList: this.props.item_list,
        });
      }
    }
    if (
      this.props.remove_request_status !== prevProps.remove_request_status &&
      this.props.remove_request_status == status.SUCCESS
    ) {
      this.props.dispatch(requestForPurposeAction.getRequest({ id: this.pathID }));
    }
    if (
      this.props.update_document_status !== prevProps.update_document_status &&
      this.props.update_document_status === status.SUCCESS
    ) {
      if (this.props.update_document_res) {
        uploadedFileList.push(this.props.update_document_res.documentId);
        this.props.dispatch(
          requestForPurposeAction.UploadFileUrlUpdate({
            url: this.props.update_document_res.url,
            files: selectedFile,
          })
        );
        this.setState({
          uploadedFileList,
        });
      }
    }
    if (
      this.props.supplier_category_list_status !== prevProps.supplier_category_list_status &&
      this.props.supplier_category_list_status === status.SUCCESS
    ) {
      if (this.props.supplier_category_list_data) {
        this.setState({ supplierAndCategoryList: { ...this.props.supplier_category_list_data } });
      }
    }
    if (
      this.props.update_request_status !== prevProps.update_request_status &&
      this.props.update_request_status === status.SUCCESS
    ) {
      this.props.dispatch(requestForPurposeAction.getRequest({ id: this.pathID }));
    }
  }

  onClickShowViewDetails = (id) => {
    let url = this.props.match.params.url;
    this.props.history.push(`/postlogin/frp/${url}/${id}`);
  };

  openUploadPopup = (docId) => {
    // this.inputOpenFileRef.current.click();
    this.formkiqClient.documentsApi.getDocumentUrl(docId).then((response) => {
      window.open(response.url, '_blank', '570', '520');
    });
  };

  handleClickUploadDocument = (e) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.setState({
          selectedFile: e.target.files[i],
        });
        this.props.dispatch(requestForPurposeAction.UploadFile(e.target.files[i].name));
      }
    }
  };

  render() {
    const {
      columns,
      requestData,
      itemList,
      updateValue,
      openDialog,
      update,
      supplierAndCategoryList,
      activeIndex,
      openEditDialog,
    } = this.state;
    const updateForm = this.validateUpdate(update);
    return (
      <>
        <div className="main-content">
          <div className="request-purpose">
            <div className="view-request-head">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lx-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="view-request-head-left">
                    <h4>{t('View Request')}</h4>
                  </div>
                </div>
                <div className="col-lx-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="view-request-head-right">
                    <ul>
                      <li>
                        <Button variant="contained" className="head-right-btn delete-icon">
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </li>
                      <li>
                        <Button variant="contained" className="head-right-btn comment-icon">
                          <i className="fa fa-comment" aria-hidden="true"></i>
                        </Button>
                      </li>
                      <li>
                        <Button variant="contained" className="head-right-btn pencil-icon">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="requisitions-filter">
              <div className="viewrequest-heading">
                <h4>{t('Request No.5')}</h4>
              </div>
              {requestData && (
                <div className="form-group row col-form-group">
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-3 col-md-3 col-lg-2 col-xl-2">{t('Status')}</label>
                      {requestData.status && (
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Button className="status-btn">{requestData.status}</Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Requestor Name')}
                      </label>
                      {requestData.requestorName && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.requestorName}</strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Requestor Email')}
                      </label>
                      {requestData.requestorEmail && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          {requestData.requestorEmail}
                        </strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Creation Date')}
                      </label>
                      {requestData.createdOn && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          {commonFunctions.convertDateToString(new Date(requestData.createdOn))}
                        </strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Department')}
                      </label>
                      {requestData.department && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.department}</strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">{t('Location')}</label>
                      {requestData.location && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.location}</strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Delivery Date')}
                      </label>
                      {requestData.deliveryDate && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          {commonFunctions.convertDateToString(new Date(requestData.deliveryDate))}
                        </strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Request Type')}
                      </label>
                      {requestData.requestType && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.requestType}</strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">{t('Total')}</label>
                      {requestData.total && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.total}</strong>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 col-form-label">
                    <div className="form-group row col-form-group">
                      <label className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-label">
                        {t('Final Approve')}
                      </label>
                      {requestData.finalApprove && (
                        <strong className="col-sm-12 col-md-12 col-lg-12 col-xl-12">{requestData.finalApprove}</strong>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="order-line-heading">
              <div className="row col-form-group d-flex align-items-center justify-content-center ">
                <h4 className="col-sm-12 col-md-4 col-lg-4 col-xl-3 col-form-button">{t('Order Line 04')}</h4>
                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9 col-form-button">
                  <div className="order-line-buttons">
                    <Button
                      variant="contained"
                      className="primary-btn add-item-btn"
                      disableElevation
                      onClick={this.openAddNewItemPopup}
                    >
                      Add Items
                    </Button>
                    <Button
                      variant="contained"
                      className="add-custom-btn"
                      disableElevation
                      onClick={this.handleClickMethod}
                    >
                      Add Custom Item
                    </Button>
                    <Button
                      variant="contained"
                      className="add-custom-btn"
                      disableElevation
                      onClick={this.handleClickMethod}
                    >
                      Import Item
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {requestData && requestData.detailsList && requestData.detailsList.length > 0 && (
              <Table
                valueFromData={{
                  columns: columns,
                  data: requestData.detailsList,
                }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                isLoading={this.props.get_request_status === status.IN_PROGRESS}
                tableClasses={{
                  table: 'ticket-tabel',
                  tableParent: 'tickets-tabel',
                  parentClass: 'all-support-ticket-tabel',
                }}
                showingLine="Showing %start% to %end% of %total% "
              />
            )}
            <div className="view-request-attach-file">
              <span>Attach Files</span>
              <Button
                variant="contained"
                className="attach-file-box"
                onClick={() => this.openUploadPopup('7c5b0f09-4cda-4788-8e73-c655bf74b5cd')}
              >
                {/* <input
									type="file"
									id="file"
									multiple
									ref={this.inputOpenFileRef}
									onChange={this.handleClickUploadDocument}
									style={{ display: "none" }}
								/> */}
                <span className="pdf-icon">
                  <i className="fa fa-file-pdf" aria-hidden="true"></i>
                </span>
                Approval Documents
                {/* <span className="circle-icon"><i className="fa fa-times-circle" aria-hidden="true"></i></span> */}
              </Button>
            </div>
          </div>
        </div>
        <div>
          {
            <>
              <AddItemList
                openDialog={openDialog}
                setSelectedItemList={this.setSelectedItemList}
                openAddNewItemPopup={this.openAddNewItemPopup}
                itemList={itemList}
              />
            </>
          }
          {/* <Dialog
					open={openDialog}
					onClose={this.openAddNewItemPopup}
					aria-labelledby="form-dialog-title"
					className="addNewItemDialog"
				>
					<DialogTitle id="form-dialog-title" className="dialogSmWidth addNewItemDialogTitle">
						{t('Items')}
						<Button onClick={this.openAddNewItemPopup} className="modal-close-btn">
							<CloseIcon />
						</Button>
					</DialogTitle>
					<DialogContent className="dialogSmWidth addNewItemDialogContent">
						<Table
							valueFromData={{ columns: addItemsColumns, data: itemList }}
							perPageLimit={6}
							visiblecheckboxStatus={false}
							tableClasses={{
								table: 'ticket-tabel',
								tableParent: 'tickets-tabel',
								parentClass: 'all-support-ticket-tabel'
							}}
							showingLine="Showing %start% to %end% of %total% "
						/>
					</DialogContent>
				</Dialog> */}
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
                    <span className="d-block w-100 text-danger">{updateForm.name.message}</span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <label className="col-3 col-form-label">Category</label>
                  <div className="col-9 col-form-field">
                    <FormControl className="select-menu">
                      <NativeSelect name="category" onChange={this.handleUpdate} value={updateValue.category}>
                        <option value={''}>Category</option>
                        {supplierAndCategoryList &&
                          supplierAndCategoryList.category &&
                          supplierAndCategoryList.category.length > 0 &&
                          supplierAndCategoryList.category.map((val, index) => (
                            <option value={val.categoryName} name="category">
                              {val.categoryName}
                            </option>
                          ))}
                      </NativeSelect>
                      <span className="d-block w-100 text-danger">{updateForm.category.message}</span>
                    </FormControl>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <label className="col-3 col-form-label">Supplier</label>
                  <div className="col-9 col-form-field">
                    <FormControl className="select-menu">
                      <NativeSelect name="supplier" onChange={this.handleUpdate} value={updateValue.supplier}>
                        <option value={''}>Supplier</option>
                        {supplierAndCategoryList &&
                          supplierAndCategoryList.supplierDetails &&
                          supplierAndCategoryList.supplierDetails.length > 0 &&
                          supplierAndCategoryList.supplierDetails.map((val, index) => (
                            <option value={val.supplierName} name="supplier">
                              {val.supplierName}
                            </option>
                          ))}
                      </NativeSelect>
                      <span className="d-block w-100 text-danger">{updateForm.supplier.message}</span>
                    </FormControl>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <label className="col-3 col-form-label">Quantity</label>
                  <div className="col-9 col-form-field">
                    <input
                      type="text"
                      name="quantity"
                      className="form-control"
                      placeholder="Quantity"
                      onChange={this.handleUpdate}
                      value={updateValue.quantity}
                    />
                    <span className="d-block w-100 text-danger">{updateForm.quantity.message}</span>
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
                    <span className="d-block w-100 text-danger">{updateForm.unit.message}</span>
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
                    <span className="d-block w-100 text-danger">{updateForm.price.message}</span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <label className="col-3 col-form-label"></label>
                  <div className="col-9 col-form-field">
                    <Button variant="contained" className="submit" onClick={this.updateDataValues}>
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    get_request_status,
    get_request_data,
    update_document_status,
    update_document_res,
    remove_request_status,
    item_list_status,
    item_list,
    supplier_category_list_status,
    supplier_category_list_data,
    update_request_status,
  } = state.procurement;
  return {
    get_request_status,
    get_request_data,
    update_document_status,
    update_document_res,
    remove_request_status,
    item_list_status,
    item_list,
    supplier_category_list_status,
    supplier_category_list_data,
    update_request_status,
  };
};

const connectedCreateNewRequest = withTranslation()(connect(mapStateToProps)(ViewRequest));
export default connectedCreateNewRequest;
