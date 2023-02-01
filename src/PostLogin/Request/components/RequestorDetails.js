import React, { Component } from "react";
import Table from "../../../Table/Table";

class RequestorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Name",
          key: "itemName",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.itemName}</span>
              </td>
            );
          },
        },
        {
          label: "Category",
          key: "category",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.category}</span>
              </td>
            );
          },
        },
        {
          label: "Supplier",
          key: "supplier",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.supplier.name}</span>
              </td>
            );
          },
        },
        {
          label: "Quantity",
          key: "quantity",
        },
        {
          label: "Unit",
          key: "unit",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.unit}</span>
              </td>
            );
          },
        },
        {
          label: "Price",
          key: "price",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.price}</span>
              </td>
            );
          },
        },
        {
          label: "Total Cost",
          key: "status",
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={"s-no"}>{index.item.price}</span>
              </td>
            );
          },
        },
      ],
    };
  }

  render() {
    const { requestData } = this.props;
    const { columns } = this.state;
    return (
      <>
        <div className="requestor-details">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Requestor Name</label>
                <span>{requestData ? requestData.details.createdBy : ""}</span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Location</label>
                <span>{requestData ? requestData.details.location : ""}</span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Delivery Date</label>
                <span>
                  {requestData ? requestData.details.desiredDate : ""}
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Creation Date</label>
                <span>{requestData ? requestData.details.createdOn : ""}</span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Request Type</label>
                <span>
                  {requestData ? requestData.details.requestType : ""}
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Department</label>
                <span>{requestData ? requestData.details.department : ""}</span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Item</label>
                <span>{requestData ? requestData.details.department : ""}</span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
              <div className="requisitioner-text">
                <label>Final Approver</label>
                <span>{requestData ? requestData.details.updatedBy : ""}</span>
              </div>
            </div>
          </div>
          <div className="border-bottom"></div>
          <div className="requestor-bottom-content">
            <p>Total Request Amount</p>
            <span>${requestData ? requestData.details.totalAmount : ""}</span>
          </div>
        </div>
        <div className="order-item-table">
          <div className="order-item-head">
            <h4>Order Line Items</h4>
          </div>
          {requestData &&
            requestData.details.products &&
            requestData.details.products.length > 0 && (
              <Table
                valueFromData={{
                  columns: columns,
                  data: requestData.details.products,
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
            )}
        </div>
      </>
    );
  }
}

export default RequestorDetails;
