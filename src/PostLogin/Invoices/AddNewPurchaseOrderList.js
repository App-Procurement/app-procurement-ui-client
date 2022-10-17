import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Table from "../../Table/Table";
import { t } from "i18next";
import { commonFunctions } from "../../_utilities";
class AddNewPurchaseOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
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
                <span className={"department-value"}>{value}</span>
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
          renderCallback: (value, row) => {
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
          key: "id",
          renderCallback: (value, row) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button
                  className="primary-btn"
                  onClick={() => this.props.setSelectedItemList(row)}
                >
                  Add
                </Button>
              </td>
            );
          },
        },
      ],
      duplicateItemList: [],
    };
  }
  componentDidMount() {
    if (this.props.itemList && this.props.itemList.length > 0) {
      this.setState({
        itemList: this.props.itemList,
        duplicateItemList: this.props.itemList,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.itemList && this.props.itemList !== prevProps.itemList) {
      this.setState({
        itemList: this.props.itemList,
        duplicateItemList: this.props.itemList,
      });
    }
  }

  filterItemsData = (event) => {
    const { value } = event.target;
    let { itemList, duplicateItemList } = this.state;
    let cloneItemList = JSON.parse(JSON.stringify(duplicateItemList));
    if (value) {
      itemList = cloneItemList.filter(({ purchaseOrderNo }) =>
        purchaseOrderNo
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      );
    } else {
      itemList = duplicateItemList;
    }

    this.setState({ itemList });
  };

  render() {
    const { openDialog, openAddNewItemPopup } = this.props;
    const { columns, itemList } = this.state;
 

    return (
      <>
        <div className="additem-list">
          <Dialog
            open={openDialog}
            onClose={openAddNewItemPopup}
            aria-labelledby="form-dialog-title"
            className="custom-dialog"
          >
            <div className="custom-dialog-head">
              <DialogTitle id="form-dialog-title" className="dialog-heading">
                {t("Items")}
              </DialogTitle>
              <Button onClick={openAddNewItemPopup} className="modal-close-btn">
                <CloseIcon />
              </Button>
            </div>
            <div className="custom-dialog-content">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <h5>{t("Add Item from catalog")}</h5>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                  <div className="search-bar-section">
                    <div className="search-bar">
                      <input
                        type="text"
                        onChange={this.filterItemsData}
                        className="control-form"
                        placeholder="Search"
                      />
                      <i className="fa fa-search" aria-hidden="true" />
                    </div>
                    <div className="fillter-btn">
                      <Button
                        variant="contained"
                        className="primary-btn fillter-icon"
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-list">
              <div className="item-number">Item | 5</div>
              <div className="clear-form">Clear-Form</div>
            </div>
            <DialogContent className="dialogSmWidth addNewItemDialogContent">
              <Table
                valueFromData={{ columns: columns, data: itemList }}
                perPageLimit={6}
                visiblecheckboxStatus={false}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                showingLine="Showing %start% to %end% of %total% "
              />
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}

export default AddNewPurchaseOrderList;
