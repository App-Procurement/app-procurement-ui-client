import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import { DatePicker } from '@y0c/react-datepicker';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import Table from '../../Table/Table';
import { connect } from 'react-redux';
import { requestForPurposeAction } from '../../_actions';
import { status } from '../../_constants';
import { commonFunctions, alert } from '../../_utilities';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import Chat from '../../_components/ChatBox';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import AddItemList from './AddItemList';

class CreateNewRequest extends Component {
  inputOpenFileRef;
  formkiqClient;
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      requiData: {
        status: '',
        reqno: '',
        depart: '',
        ViewDetail: false,
        selectBuyer: false,
        isEdit: false,
      },
      updateValue: {},
      user: {
        name: 'himanshu',
        id: 101,
        accountType: 'admin',
      },
      formData: {
        dueDate: 'yyyy-mm-dd',
        deliveryDate: 'yyyy-mm-dd',
        location: '',
        department: '',
        request: '',
        note: '',
      },
      supplierAndCategoryList: {},
      uploadedFileList: [],
      selectedFile: {},
      openDialog: false,
      openEditDialog: false,
      itemList: [],
      columns: [
        {
          label: 'S.no',
          key: 'sno',
          renderCallback: (value, index) => {
            return <td>{index + 1}</td>;
          },
        },
        {
          label: 'Name',
          key: 'name',
          renderCallback: (value) => {
            return (
              <>
                <td>
                  <span className={'requisitions-no'}>{value}</span>
                </td>
                {this.state.isEdit && (
                  <td>
                    <input type="text" />
                  </td>
                )}
              </>
            );
          },
        },
        {
          label: 'Category',
          key: 'category',
          renderCallback: (value) => {
            return (
              <td>
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
              <td>
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
              <td>
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
              <td>
                <span className="department-value">{value}</span>
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
              <td>
                <span className="department-value">${value}</span>
              </td>
            );
          },
        },
        {
          label: 'Status',
          key: 'status',
          renderCallback: (value, row) => {
            return (
              <td>
                <Button className="primary-btn">{value}</Button>
              </td>
            );
          },
        },
        {
          label: '',
          key: 'sno',
          renderCallback: (value, index) => {
            return (
              <td>
                <div className="d-block position-relative edit-delete-modal">
                  <i
                    class="fa fa-ellipsis-h"
                    aria-hidden="true"
                    onClick={() => this.setState({ activeIndex: index })}
                  ></i>
                  {this.state.activeIndex === index && (
                    <div className="toggale">
                      <i class="fa fa-pencil edit" aria-hidden="true" onClick={this.openEditModal}></i>
                      <i
                        class="fa fa-trash delete"
                        aria-hidden="true"
                        onClick={() => {
                          this.onClickDeleteSelectedItem(index);
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
        // 	label: 'Action',
        // 	key: 'id',
        // 	renderCallback: (value, row) => {
        // 		return (
        // 			<td>
        // 				<Button className="primary-btn" onClick={() => this.setSelectedItemList(row)}>
        // 					Add
        // 				</Button>
        // 			</td>
        // 		);
        // 	}
        // }
      ],
      selectedItemList: [],
    };
    this.inputOpenFileRef = React.createRef();
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
  setUploadedDocID = (res) => {
    const { uploadedFileList } = this.state;
    if (res && res.object && res.object.documents) {
      for (let i = 0; i < res.object.documents.length; i++) {
        let doc = res.object.documents[i];
        uploadedFileList.push(doc.documentId);
      }
    }
    this.setState({
      uploadedFileList,
    });
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;
    this.setState({ formData });
  };

  componentDidMount() {
    this.props.dispatch(requestForPurposeAction.getRequestList());
    this.props.dispatch(requestForPurposeAction.getItemList());
    this.props.dispatch(requestForPurposeAction.SupplierAndCategoryList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.request_for_purpose_status !== prevProps.request_for_purpose_status &&
      this.props.request_for_purpose_status === status.SUCCESS
    ) {
      if (this.props.request_for_purpose_list && this.props.request_for_purpose_list.length > 0) {
        for (let i = 0; i < this.props.request_for_purpose_list.length; i++) {
          this.props.request_for_purpose_list[i].totalCost =
            this.props.request_for_purpose_list[i].price * this.props.request_for_purpose_list[i].quantity;
        }
        this.setState({ tableData: this.props.request_for_purpose_list });
      }
    }
    if (
      this.props.update_document_status !== prevProps.update_document_status &&
      this.props.update_document_status === status.SUCCESS
    ) {
      if (this.props.add_request_response) {
        this.props.history.push('/postlogin/requestforpurpose');
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
      this.props.supplier_category_list_status !== prevProps.supplier_category_list_status &&
      this.props.supplier_category_list_status === status.SUCCESS
    ) {
      if (this.props.supplier_category_list_data) {
        this.setState({ supplierAndCategoryList: { ...this.props.supplier_category_list_data } });
      }
    }
  }

  onClickShowViewDetails = (id) => {
    let url = this.props.match.params.url;
    this.props.history.push(`/postlogin/frp/${url}/${id}`);
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    let isValid = true;
    const retData = {
      dueDate: validObj,
      deliveryDate: validObj,
      location: validObj,
      department: validObj,
      request: validObj,
      note: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { formData } = this.state;
      if (!formData.dueDate) {
        retData.dueDate = {
          isValid: false,
          message: 'Due date is required',
        };
        isValid = false;
      }
      if (!formData.deliveryDate) {
        retData.deliveryDate = {
          isValid: false,
          message: 'Delivery date is required',
        };
        isValid = false;
      }
      if (!formData.location) {
        retData.location = {
          isValid: false,
          message: 'Location is required',
        };
        isValid = false;
      }
      if (!formData.department) {
        retData.department = {
          isValid: false,
          message: 'Department is required',
        };
        isValid = false;
      }
      if (!formData.request) {
        retData.request = {
          isValid: false,
          message: 'Purchase product name is required',
        };
        isValid = false;
      }
      if (!formData.note) {
        retData.note = {
          isValid: false,
          message: 'Note for requester is required',
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
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

  openUploadPopup = () => {
    this.inputOpenFileRef.current.click();
  };

  handleClickUploadDocument = (e) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.setState({
          selectedFile: e.target.files[i],
        });
        let data = document.getElementById('upload_document');
        this.formkiqClient.webFormsHandler.submitFormkiqForm(data);
        // this.props.dispatch(requestForPurposeAction.UploadFile(e.target.files[i].name));
      }
    }
  };

  getUploadedDocument = (docId) => {
    this.formkiqClient.documentsApi.getDocumentUrl(docId).then((response) => {
      window.open(response.url, '_blank', '570', '520');
    });
  };

  openAddNewItemPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  openEditModal = () => {
    const { activeIndex, selectedItemList } = this.state;
    if (activeIndex >= 0) {
      let values = JSON.parse(JSON.stringify(selectedItemList[activeIndex]));
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

  setSelectedItemList = (data) => {
    let { selectedItemList } = this.state;
    let value = JSON.parse(JSON.stringify(data));
    let index = -1;
    if (selectedItemList && selectedItemList.length > 0) {
      for (let i = 0; i < selectedItemList.length; i++) {
        if (selectedItemList[i].id === value.id) {
          index = i;
        }
      }
      if (index >= 0) {
        selectedItemList[index].quantity += value.quantity;
        selectedItemList[index].totalCost = selectedItemList[index].quantity * selectedItemList[index].price;
      } else {
        selectedItemList = [...selectedItemList, value];
      }
    } else {
      selectedItemList = [value];
    }
    this.setState({
      selectedItemList,
    });
  };

  createRequest = (event) => {
    event.preventDefault();
    const { formData, selectedItemList, selectedFile, uploadedFileList } = this.state;
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      if (selectedItemList && selectedItemList.length > 0) {
        let sendData = {
          formData,
          itemList: selectedItemList,
          files: selectedFile,
          documentId: uploadedFileList,
        };
        this.props.dispatch(requestForPurposeAction.addRequest(sendData));
      } else {
        alert.error('Add Request item list');
      }
    }
  };

  openTooltipForEdit = (index) => {
    const { selectedItemList } = this.state;
    if (selectedItemList && selectedItemList.length > 0) {
      for (let i = 0; i < selectedItemList.length; i++) {
        if (i !== index) {
          selectedItemList[i].isOpen = false;
        } else {
          selectedItemList[index].isOpen = true;
        }
      }
    }
    this.setState({
      selectedItemList,
    });
  };

  onClickDeleteSelectedItem = (id) => {
    const { selectedItemList } = this.state;
    selectedItemList.splice(id, 1);
    this.setState({
      selectedItemList,
    });
  };
  handleUpdate = (e) => {
    const { updateValue } = this.state;
    const { name, value } = e.target;
    updateValue[name] = value;
    this.setState({ updateValue });
  };
  updateDataValues = () => {
    const { selectedItemList, activeIndex, updateValue } = this.state;
    let updateForm = this.validateUpdate(true);
    this.setState({ update: true });
    if (updateForm.isValid) {
      updateValue.totalCost = updateValue.price * updateValue.quantity;
      selectedItemList[activeIndex] = updateValue;
      this.setState({ selectedItemList, openEditDialog: !this.state.openEditDialog });
    }
  };
  render() {
    const {
      formData,
      isSubmitted,
      dueDate,
      deliverDate,
      openDialog,
      openEditDialog,
      columns,
      activeIndex,
      updateValue,
      itemList,
      selectedItemList,
      uploadedFileList,
      supplierAndCategoryList,
      update,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    const updateForm = this.validateUpdate(update);
    return (
      <div className="main-content">
        <div className="request-purpose">
          <div className="new-request-heading">
            <h4>{t('Create New Request')}</h4>
          </div>
          <div className="requisitions-filter">
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-form-label">{t('Due Date')}</label>
              <div className="col-sm-12 col-md-8 col-lg-3 col-xl-3 col-form-field">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={dueDate}
                      placeholder={'YYYY-MM-DD'}
                      onChange={(date) => this.handleDates(date, 'dueDate')}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
              </div>
              <label className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-form-label">{t('Delivery Date')}</label>
              <div className="col-sm-12 col-md-8 col-lg-3 col-xl-3 col-form-field">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-picker">
                    <DatePicker
                      selected={deliverDate}
                      placeholder={'YYYY-MM-DD'}
                      onChange={(date) => this.handleDates(date, 'deliveryDate')}
                    />
                    <CalendarTodayTwoToneIcon className="calendar-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-form-label">{t('Location')}</label>
              <div className="col-sm-12 col-md-8 col-lg-3 col-xl-3 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect
                    name="location"
                    value={formData.location}
                    onChange={this.handleStateChange}
                    isvalid={errorData.location.isValid}
                  >
                    <option value="">Main Office USA</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                <span className="d-block w-100 text-danger">{errorData.location.message}</span>
              </div>
              <label className="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-form-label">{t('Department')}</label>
              <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect
                    name="department"
                    value={formData.department}
                    onChange={this.handleStateChange}
                    isvalid={errorData.department.isValid}
                  >
                    <option value="">HR Department</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                <span className="d-block w-100 text-danger">{errorData.department.message}</span>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">{t('Request Type')}</label>
              <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                <FormControl className="select-menu">
                  <NativeSelect
                    name="request"
                    value={formData.request}
                    onChange={this.handleStateChange}
                    isvalid={errorData.request.isValid}
                  >
                    <option value="">Purchase</option>
                    <option value={10}>abc</option>
                    <option value={20}>def</option>
                    <option value={30}>abc</option>
                  </NativeSelect>
                </FormControl>
                <span className="d-block w-100 text-danger">{errorData.request.message}</span>
              </div>
            </div>
            <div className="form-group row col-form-group">
              <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">{t('Note')}</label>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-form-field">
                <div className="new-requeust-massge">
                  <textarea name="note" onChange={this.handleStateChange} value={formData.note} />
                  <span className="d-block w-100 text-danger">{errorData.note.message}</span>
                </div>
              </div>
            </div>
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
                    <i class="fa fa-plus-circle" aria-hidden="true" />
                    Add Items
                  </Button>
                  <Button
                    variant="contained"
                    className="add-custom-btn"
                    disableElevation
                    // onClick={this.handleClickMethod}
                  >
                    Add Custom Item
                  </Button>
                  <Button
                    variant="contained"
                    className="add-custom-btn"
                    disableElevation
                    // onClick={this.handleClickMethod}
                  >
                    <i class="fa fa-plus-circle" aria-hidden="true" />
                    Import Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {selectedItemList && selectedItemList.length > 0 && (
            <Table
              valueFromData={{ columns: columns, data: selectedItemList }}
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
          <div className="new-request-bottom-section">
            {uploadedFileList && uploadedFileList.length > 0 && (
              <Button
                variant="contained"
                className="primary-btn"
                onClick={() => this.getUploadedDocument(uploadedFileList[0])}
              >
                Get Documents
              </Button>
            )}
            <form id="upload_document">
              <Button variant="contained" className="primary-btn" onClick={this.openUploadPopup}>
                <input
                  type="file"
                  id="file"
                  multiple
                  name="upload_doc"
                  ref={this.inputOpenFileRef}
                  onChange={this.handleClickUploadDocument}
                  style={{ display: 'none' }}
                />
                <i class="fa fa-plus-circle" aria-hidden="true" />
                Attach Documents
              </Button>
            </form>

            <React.Fragment>
              <div className="item-submit-buttons">
                <div className="row col-form-group d-flex align-items-end justify-content-end">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-form-button">
                    {selectedItemList && selectedItemList.length > 0 && (
                      <div className="item-delete-buttons">
                        <div className="submit-btn">
                          <Button variant="contained" className="submit" onClick={this.createRequest}>
                            Submit
                          </Button>
                        </div>
                        <div className="delete-btn">
                          <Button variant="contained" className="delete">
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-form-button">
                    <Chat user={this.state.user} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        {
          <AddItemList
            openDialog={openDialog}
            setSelectedItemList={this.setSelectedItemList}
            openAddNewItemPopup={this.openAddNewItemPopup}
            itemList={itemList}
          />
        }

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
    );
  }
}

const mapStateToProps = (state) => {
  const {
    request_for_purpose_status,
    request_for_purpose_list,
    update_document_status,
    update_document_res,
    item_list_status,
    item_list,
    add_request_status,
    add_request_response,
    supplier_category_list_status,
    supplier_category_list_data,
  } = state.procurement;
  return {
    request_for_purpose_status,
    request_for_purpose_list,
    update_document_status,
    update_document_res,
    item_list_status,
    item_list,
    add_request_status,
    add_request_response,
    supplier_category_list_status,
    supplier_category_list_data,
  };
};

const connectedCreateNewRequest = withTranslation()(connect(mapStateToProps)(CreateNewRequest));
export default connectedCreateNewRequest;
