import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Table from '../../Table/Table';
import { t } from 'i18next';

class AddItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: '',
          key: 'image',
          renderCallback: (value, index) => {
            return (
              <td>
                <img src={value} height="50px" width="50px" />
              </td>
            );
          },
        },
        {
          label: 'Name',
          key: 'name',
          renderCallback: (value) => {
            return (
              <td>
                <span className={'requisitions-no'}>{value}</span>
              </td>
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
          label: 'Item Type',
          key: 'type',
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
                <span className="department-value">{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Action',
          key: 'id',
          renderCallback: (value, row) => {
            return (
              <td>
                <Button className="primary-btn" onClick={() => this.props.setSelectedItemList(row)}>
                  Add
                </Button>
              </td>
            );
          },
        },
      ],
    };
  }
  componentDidMount;

  render() {
    const { openDialog, itemList, openAddNewItemPopup } = this.props;
    const { columns } = this.state;

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
                {t('Items')}
              </DialogTitle>
              <Button onClick={openAddNewItemPopup} className="modal-close-btn">
                <CloseIcon />
              </Button>
            </div>
            <div className="custom-dialog-content">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <h5>{t('Add Item from catalog')}</h5>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                  <div className="search-bar-section">
                    <div className="search-bar">
                      <input type="text" name="searchChat" className="control-form" placeholder="Search" />
                      <i class="fa fa-search" aria-hidden="true" />
                    </div>
                    <div className="fillter-btn">
                      <Button variant="contained" className="primary-btn fillter-icon">
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
                  table: 'ticket-tabel',
                  tableParent: 'tickets-tabel',
                  parentClass: 'all-support-ticket-tabel',
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

export default AddItemList;
