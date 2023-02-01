import React, { Component } from "react";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from "../../Table/Table";
import { t } from "i18next";

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
                  onClick={() => this.props.addSelectedPurchaseOrderToList(row)}
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

  handleSearch = (event) => {
    const { value } = event.target;
    let { itemList, duplicateItemList } = this.state;
    let cloneItemList = JSON.parse(JSON.stringify(duplicateItemList));
    if (value) {
      itemList = cloneItemList.filter(({ id }) =>
        id.toString().toLowerCase().includes(value.toString().toLowerCase())
      );
    } else {
      itemList = duplicateItemList;
    }

    this.setState({ itemList });
  };

  render() {
    const { openDialog, handlePurchaseOrdersPopup } = this.props;
    const { columns, itemList } = this.state;
    return (
      <>
        <div className="additem-list">
          <Dialog
            open={openDialog}
            onClose={handlePurchaseOrdersPopup}
            aria-labelledby="form-dialog-title"
            className="custom-dialog"
          >
            <div className="custom-dialog-head">
              <DialogTitle id="form-dialog-title" className="dialog-heading">
                {t("Items")}
              </DialogTitle>
              <Button
                onClick={handlePurchaseOrdersPopup}
                className="modal-close-btn"
              >
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
                        onChange={this.handleSearch}
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
