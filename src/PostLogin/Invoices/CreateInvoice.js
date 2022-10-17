import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
// import ViewInvoiceComponent from "./AddPurchaseOrderList";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Link } from "react-router-dom";
import Table from "../../Table/Table";
import CheckIcon from "@material-ui/icons/Check";
import { status } from "../../_constants";
import { invoiceAction, purchaseOrderAction } from "../../_actions";
// import AddPurchaseOrderList from "./AddPurchaseOrderList";
// import AddInvoiceList from "./AddInvoiceList";
// import ViewRequestComponet from "./AddPurchaseOrderList";
// import DoneAllIcon from '@material-ui/icons/DoneAll';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import SaveAltIcon from '@material-ui/icons/SaveAlt';
// import PrintIcon from '@material-ui/icons/Print';
// import Logo from '../../assets/images/logo.png';
// import HuntImg from '../../assets/images/hunt-img.png';
import { connect } from "react-redux";
import AddNewPurchaseOrderList from "./AddNewPurchaseOrderList";
import { commonFunctions } from "../../_utilities";
// import { invoiceAction } from '../../_actions/invoice.actions';
// import { status } from '../../_constants';
//  import { commonFunctions } from '../../_utilities';

class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedData: {},
      formData: {
        invoiceIssueDate: "",
        invoiceDueDate: "",
        supplier: "",
        department: "",
        invoiceAmount: "",
        currency: "",
        tax: "",
      },
      columns: [
        {
          label: "S no",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${index + 1}`}>
                <span className={"requisitions-no"}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: "Purchase Order No.",
          key: "purchaseOrderNo",
          renderCallback: (value) => {
            return (
              // <td>
              //   <span className={"s-no"}>William James</span>
              // </td>

              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "PO Date",
          key: "poDate",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>
                  {commonFunctions.dateTimeAndYear(value)}
                </span>
                {/* <span className={"department-value"}>{value}</span> */}
              </td>
            );
          },
        },
        {
          label: "Department",
          key: "department",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Total Amount",
          key: "totalAmount",
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={"department-value"}>{value}</span>
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
                  variant="contained"
                  className="invoices-list-btn completed-btn"
                >
                  {value}
                </Button>
              </td>
            );
          },
        },
        {
          label: "Action",
          key: "sno",
          renderCallback: (value, index) => {
            return (
              <td key={`${Math.random()}_${index}`}>
                <Button
                  className="primary-btn"
                  onClick={() => this.handleDelete(index)}
                >
                  delete
                </Button>
              </td>
            );
          },
        },
      ],
      tableData: [{}],
      itemList: [],
      openDialog: false,
      selectedItemList: [],
      purchaseData: [],
    };
  }

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      invoiceIssueDate: validObj,
      invoiceDueDate: validObj,
      supplier: validObj,
      department: validObj,
      invoiceAmount: validObj,
      currency: validObj,
      tax: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { formData } = this.state;

      if (!formData.invoiceDueDate) {
        retData.invoiceDueDate = {
          isValid: false,
          message: "Invoice Due date is required",
        };
        isValid = false;
      }

      if (!formData.invoiceIssueDate) {
        retData.invoiceIssueDate = {
          isValid: false,
          message: "Invoice Issue date is  Date is Required",
        };
        isValid = false;
      }

      if (!formData.supplier) {
        retData.supplier = {
          isValid: false,
          message: "Supplier is required",
        };
        isValid = false;
      }
      if (!formData.department) {
        retData.department = {
          isValid: false,
          message: "Department is required",
        };
        isValid = false;
      }
      if (!formData.invoiceAmount) {
        retData.invoiceAmount = {
          isValid: false,
          message: "Invoice Amount is is required",
        };
        isValid = false;
      }
      if (!formData.currency) {
        retData.currency = {
          isValid: false,
          message: "Currency is required",
        };
        isValid = false;
      }

      if (!formData.tax) {
        retData.tax = {
          isValid: false,
          message: "Tax field is required",
        };
        isValid = false;
      }
    }

    retData.isValid = isValid;
    return retData;
  };

  handleDelete(index) {
    const { selectedItemList } = this.state;
    const listAfterDelete = selectedItemList.filter(
      (item, ind) => ind !== index
    );

    this.setState({
      selectedItemList: listAfterDelete,
    });

    return listAfterDelete;
  }
  handleAmountChange = (event) => {
    const { value } = event.target;
    let { formData } = this.state;
    formData[value] = event;
    this.setState({
      formData,
    });
  };

  handleTaxChange = (event) => {
    const { value } = event.target;
    let { formData } = this.state;
    formData[value] = value;
    this.setState({
      formData,
    });
    console.log("tax value ", value);
  };

  handleInvoiceDueDate = (date) => {
    let { formData } = this.state;
    formData.invoiceDueDate = commonFunctions.convertDateToString(
      new Date(date.$d)
    );
    this.setState({ formData });
    console.log(this.state.formData.invoiceDueDate);
  };

  handleInvoiceIssueDate = (date) => {
    let { formData } = this.state;

    formData.invoiceIssueDate = commonFunctions.convertDateToString(
      new Date(date.$d)
    );
    this.setState({ formData });
  };

  handleDates = (date, name) => {
    let { formData } = this.state;
    formData[name] = date;

    // formData[name] = formData.date;
    this.setState({ formData });
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  onSubmitCreateInvoice = (event) => {
    event.preventDefault();
    const { formData, selectedItemList } = this.state;

    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);

    if (errorData.isValid) {
      if (selectedItemList && selectedItemList.length > 0) {
        let sendData = {
          formData,
          itemList: selectedItemList,
        };
        this.props.dispatch(invoiceAction.addRequest(sendData));
      }
    }

    // this.setState({
    //   formData: {
    //     invoiceDueDate: "",
    //     invoiceIssueDate: "",
    //     supplier: "",
    //     department: "",
    //     invoiceAmount: "",
    //     currency: "",
    //     tax: "",
    //   },
    // });
  };

  setSelectedItemList = (data) => {
    let value = JSON.parse(JSON.stringify(data));

    if (value) {
      this.setState({
        selectedItemList: [...this.state.selectedItemList, value],
      });
    }
  };
  openAddNewItemPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  componentDidMount() {
    this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevProps.approvepo_status !== this.props.approvepo_status &&
    //   this.props.approvepo_status === status.SUCCESS
    // ) {
    //   if (
    //     this.props.approvepo_data &&
    //     this.props.approvepo_data.requisitionList
    //   ) {
    //     this.setState({
    //       itemList: this.props.approvepo_data.requisitionList,
    //     });
    //   }
    // }

    if (
      prevProps.approvepo_status !== this.props.approvepo_status &&
      this.props.approvepo_status === status.SUCCESS
    ) {
      if (this.props.approvepo_data) {
        this.setState({
          purchaseData: this.props.approvepo_data,
        });

        let invoiceData = this.state.purchaseData;
        let resultantData = {};
        const { itemList } = this.state;

        this.props.approvepo_data.map((item) => {
          let itemData = item.details;
          console.log("item", itemData.totalAmount);
          resultantData.totalAmount = itemData.totalAmount;
          resultantData.purchaseOrderNo = itemData.totalNumberOfProduct;
          resultantData.poDate = itemData.toDate;
          resultantData.status = itemData.status;
          resultantData.department = itemData.shippingTerms;
          itemList.push(resultantData);
          this.setState({
            itemList,
          });
        });
      }
    }
  }

  render() {
    const {
      formData,
      isSubmitted,
      columns,
      itemList,
      openDialog,
      selectedItemList,
    } = this.state;
    console.log("aprpo data", this.props.approvepo_data);
    console.log("list data", itemList);
    const errorData = this.validate(isSubmitted);
    return (
      // <ViewRequestComponet/>
      <div className="main-content">
        <div className="invoices-content">
          <div className="invoices-head-section">
            <div className="row d-flex justify-content-start align-items-center ">
              <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="heading">
                  <h4>Invoices</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="create-invoice-contant">
            <div className="create-invoice-form">
              <div className="form-group row col-form-group">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">{t("Invoice Issue Date")}</label>
                    <div className="d-flex align-items-center date-picker">
                      <DatePicker
                        reque
                        name="invoiceIssueDate"
                        value={formData.invoiceIssueDate}
                        // selected={formData.invoiceIssueDate}
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) => this.handleInvoiceIssueDate(date)}
                      />

                      {
                        <AddNewPurchaseOrderList
                          openDialog={openDialog}
                          setSelectedItemList={this.setSelectedItemList}
                          openAddNewItemPopup={this.openAddNewItemPopup}
                          itemList={itemList.length > 0 ? itemList : null}
                        />
                      }
                      <CalendarTodayTwoToneIcon className="calendar-icon" />
                    </div>
                    <span className="d-block w-100 text-danger">
                      {errorData.invoiceIssueDate.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">{t("Invoice Due Date")}</label>
                    <div className="d-flex align-items-center date-picker">
                      <DatePicker
                        name="invoiceIssueDate"
                        value={formData.invoiceDueDate}
                        // selected={formData.invoiceIssueDate}
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) => this.handleInvoiceDueDate(date)}
                      />

                      <CalendarTodayTwoToneIcon className="calendar-icon" />
                    </div>
                    <span className="d-block w-100 text-danger">
                      {errorData.invoiceDueDate.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Supplier</label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="supplier"
                          value={formData.supplier}
                          onChange={this.handleStateChange}
                        >
                          <option value={"Main Office Usa"}>
                            Main Office USA
                          </option>
                          <option value={"abc"}>abc</option>
                          <option value={"def"}>def</option>
                          <option value={"abc"}>abc</option>
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.supplier.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-100 d-none d-xl-block"></div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Department</label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="department"
                          value={formData.department}
                          onChange={this.handleStateChange}
                        >
                          <option value="">Main Office USA</option>
                          <option value={10}>abc</option>
                          <option value={20}>def</option>
                          <option value={30}>abc</option>
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.department.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Invoice Amount</label>
                    <input
                      type="text"
                      name="invoiceAmount"
                      className="form-control"
                      placeholder="Enter Amount"
                      value={formData.invoiceAmount}
                      onChange={this.handleStateChange}
                    />
                    <span className="d-block w-100 text-danger">
                      {errorData.invoiceAmount.message}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Currency </label>
                    <div className="new-requeust-massge">
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="currency"
                          value={formData.currency}
                          onChange={this.handleStateChange}
                          // onChange={(e) => this.handleStateChange(e, 'company')}
                        >
                          <option value="">Main Office USA</option>
                          <option value={"abc"}>abc</option>
                          <option value={"def"}>def</option>
                          <option value={"abd"}>abd</option>
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {errorData.currency.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-100 d-none d-xl-block"></div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-form-label">
                  <div className="form-group form-group-common">
                    <label className="d-block">Tax</label>
                    <input
                      type="text"
                      name="tax"
                      className="form-control"
                      placeholder="Tax"
                      value={formData.tax}
                      // value={companyDetail.postalcode}
                      onChange={this.handleStateChange}
                      // onChange={(e) => this.handleStateChange(e, 'company')}
                    />
                    <span className="d-block w-100 text-danger">
                      {errorData.tax.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-purchase-order-inner-contant">
              <div className="inner-head my-4">
                <div className="row d-flex justify-content-center align-items-center ">
                  <div className="col-6">
                    <div className="head-left">
                      <h4>Purchase Order</h4>
                    </div>
                  </div>
                  <div className="col-6 text-md-right text-sm-right">
                    <div className="head-right">
                      <Button
                        variant="contained"
                        className="primary-btn invoices-button"
                        onClick={this.openAddNewItemPopup}
                        // onClick={() =>
                        //   this.props.history.push(
                        //     `/postlogin/invoices/createinvoicepurchaseorder`
                        //   )
                        // }
                      >
                        <i class="fas fa-plus-circle"></i>
                        Add Purchase Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="invoices-tabale">
                <Table
                  valueFromData={{
                    columns: columns,
                    data: selectedItemList,
                  }}
                  searchValue={this.state.searchValue}
                  perPageLimit={6}
                  visiblecheckboxStatus={false}
                  isLoading={
                    this.props.search_invoice_status === status.IN_PROGRESS
                  }
                  tableClasses={{
                    table: "ticket-tabel",
                    tableParent: "tickets-tabel",
                    parentClass: "all-support-ticket-tabel",
                  }}
                  searchKey="RequestDepartment"
                  showingLine="Showing %start% to %end% of %total% Tickets"
                />
              </div>

              <div className="create-btn text-center">
                <Button
                  variant="contained"
                  className="primary-btn invoices-button"
                  onClick={this.onSubmitCreateInvoice}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { approvepo_status, approvepo_data } = state.procurement;
  console.log("data", approvepo_data);
  return {
    approvepo_status,
    approvepo_data,
  };
};

const ViewInvoiceComponent = withTranslation()(
  connect(mapStateToProps)(CreateInvoice)
);
export default ViewInvoiceComponent;
