import React, { Component } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Table from "../../Table/Table";
import { t } from "i18next";
import { DialogContent, Dialog, DialogTitle, Button } from "@mui/material";
class AddlineItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProductListData: [],
      columns: [
        // {
        //   label: "",
        //   key: "imgUrl",
        //   renderCallback: (value) => {
        //     return (
        //       <td>
        //         <img src={value} />
        //       </td>
        //     );
        //   },
        // },
        {
          label: "Item",
          key: "itemName",
        },
        {
          label: "Unit",
          key: "unit",
        },
        {
          label: "Category",
          key: "category",
        },
        {
          label: "Item Type",
          key: "itemType",
        },
        {
          label: "Quantity",
          key: "unit",
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
    if (
      this.props.searchProductListData &&
      this.props.searchProductListData.length > 0
    ) {
      this.setState({
        searchProductListData: this.props.searchProductListData,
        duplicateItemList: this.props.searchProductListData,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
   
  }

  filterItemsData = (event) => {
    const { value } = event.target;
    let { searchProductListData, duplicateItemList } = this.state;
    let cloneItemList = JSON.parse(JSON.stringify(duplicateItemList));
    if (value) {
      searchProductListData = cloneItemList.filter(({ itemName }) =>
        itemName.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      searchProductListData = JSON.parse(JSON.stringify(duplicateItemList));
    }

    this.setState({ searchProductListData });
  };

  render() {
    const { openDialog, openAddNewItemPopup } = this.props;
    const { columns, searchProductListData } = this.state;

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
                valueFromData={{
                  columns: columns,
                  data: searchProductListData,
                }}
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

export default AddlineItemList;
