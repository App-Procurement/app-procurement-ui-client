import React, { Component } from "react";
import { Button, FormControl, NativeSelect } from "@mui/material";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import { DatePicker } from "@y0c/react-datepicker";
import "rc-calendar/assets/index.css";
import { t } from "i18next";
import { withTranslation } from "react-i18next";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Table from "../../Table/Table";
import { status } from "../../_constants";
import { invoiceAction, purchaseOrderAction } from "../../_actions";
import { connect } from "react-redux";
import AddNewPurchaseOrderList from "./AddNewPurchaseOrderList";
import { commonFunctions } from "../../_utilities";

class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
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
      allSelectedItemData: [],
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
          key: "id",
        },
        {
          label: "PO Date",
          key: "toDate",
        },
        {
          label: "Department",
          key: "department",
        },
        {
          label: "Total Amount",
          key: "totalAmount",
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
                  onClick={() => this.handlePurchaseOrderDelete(index)}
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
      invoiceData: [],
    };
  }

  validateNewInvoice = (isSubmitted) => {
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

  handlePurchaseOrderDelete(index) {
    const { selectedItemList } = this.state;
    const listAfterDelete = selectedItemList.filter(
      (item, ind) => ind !== index
    );

    this.setState({
      selectedItemList: listAfterDelete,
    });

    return listAfterDelete;
  }

  handleInvoiceDueDate = (date) => {
    let { formData } = this.state;
    formData.invoiceDueDate = commonFunctions.convertDateToString(
      new Date(date.$d)
    );
    this.setState({ formData });
  };

  handleInvoiceIssueDate = (date) => {
    let { formData } = this.state;

    formData.invoiceIssueDate = commonFunctions.convertDateToString(
      new Date(date.$d)
    );
    this.setState({ formData });
  };

  handleNewInvoiceInputs = (e) => {
    const { name, value } = e.target;
    const { formData, currency } = this.state;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  onSubmitCreateInvoice = (event) => {
    event.preventDefault();
    const errorData = this.validateNewInvoice(true);
    const { formData, selectedItemList, itemList } = this.state;
    let selected = this.state.selectedItemList;

    let details;

    if (errorData.isValid) {
      details = {
        url: "http://invoice-location.com",
        issueDate: formData["invoiceIssueDate"],
        invoiceDueDate: formData["invoiceDueDate"],
        amount: formData["invoiceAmount"],
        tax: formData["tax"],
        currency:
          this.props.currency_list_data.object[formData.currency].details,
        purchaseOrder: this.state.itemList[0],
      };
      details.currency.name =
        this.props.currency_list_data.object[formData.currency].details.name;
    }

    this.setState({
      isSubmitted: true,
    });

    if (errorData.isValid) {
      if (selectedItemList && selectedItemList.length > 0) {
        this.props.dispatch(invoiceAction.addRequest(details));
      }
    }
  };

  addSelectedPurchaseOrderToList = (data) => {
    let value = JSON.parse(JSON.stringify(data));

    if (value) {
      this.props.purchase_data.map((item) => {
        if (item && item.id === data.id) {
          this.setState({
            allSelectedItemData: { ...this.state.allSelectedItemData, item },
          });
        }
      });

      this.setState({
        selectedItemList: [...this.state.selectedItemList, value],
      });
    }
  };

  handlePurchaseOrdersPopup = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  componentDidMount() {
    this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
    this.setState({
      invoiceData: this.props.invoice_data,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchase_status !== this.props.purchase_status &&
      this.props.purchase_status === status.SUCCESS
    ) {
      if (this.props.purchase_data && this.props.purchase_data.length > 0) {
        this.setState({
          purchaseData: this.props.purchase_data,
        });

        const { itemList } = this.state;

        this.props.purchase_data.map((item) => {
          itemList.push({
            ...item.details,
            id: item.id,
          });
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
    const { currency_list_data, currency_status } = this.props;
    const errorData = this.validateNewInvoice(isSubmitted);
    return (
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
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) => this.handleInvoiceIssueDate(date)}
                      />
                      {
                        <AddNewPurchaseOrderList
                          openDialog={openDialog}
                          addSelectedPurchaseOrderToList={
                            this.addSelectedPurchaseOrderToList
                          }
                          handlePurchaseOrdersPopup={
                            this.handlePurchaseOrdersPopup
                          }
                          itemList={itemList.length > 0 ? itemList : null}
                        />
                      }
                      <CalendarTodayIcon className="calendar-icon" />
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
                        placeholder={"YYYY-MM-DD"}
                        onChange={(date) => this.handleInvoiceDueDate(date)}
                      />
                      <CalendarTodayIcon className="calendar-icon" />
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
                          onChange={this.handleNewInvoiceInputs}
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
                          onChange={this.handleNewInvoiceInputs}
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
                      onChange={this.handleNewInvoiceInputs}
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
                          value={
                            formData.currency &&
                            currency_list_data[formData.currency]
                              ? currency_list_data[formData.currency].name
                              : null
                          }
                          onChange={this.handleNewInvoiceInputs}
                        >
                          <option value={""}>Currency</option>
                          {currency_status === 1 &&
                            currency_list_data.object?.length &&
                            currency_list_data.object.map((item, index) => (
                              <option value={index}>{item.details.name}</option>
                            ))}
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
                      onChange={this.handleNewInvoiceInputs}
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
                        onClick={this.handlePurchaseOrdersPopup}
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
                  disabled={this.props.add_invoice_status === 0 ? true : false}
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
  const {
    purchase_status,
    purchase_data,
    add_invoice_status,
    approvepo_status,
    approvepo_data,
    invoice_data,
    currency_status,
    currency_list_data,
  } = state.procurement;

  return {
    purchase_status,
    purchase_data,
    add_invoice_status,
    approvepo_status,
    approvepo_data,
    invoice_data,
    currency_status,
    currency_list_data,
  };
};

const ViewInvoiceComponent = withTranslation()(
  connect(mapStateToProps)(CreateInvoice)
);

export default ViewInvoiceComponent;
