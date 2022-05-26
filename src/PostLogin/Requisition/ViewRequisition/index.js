import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import { requistionAction } from "../../../_actions";
import { connect } from "react-redux";
import { status } from "../../../_constants";
import { commonFunctions } from "../../../_utilities";
import { Link } from "react-router-dom";
import Table from "../../../Table/Table";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class ViewRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requistionList: [],
      isLoading: true,
      buyersListTable: {
        columns: [
          {
            label: "Buyers Id",
            key: "id",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"id"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Name",
            key: "firstName",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"name"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Dealing Nature",
            key: "company",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"company"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Positions",
            key: "position",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"position"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Email Address",
            key: "email",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"email"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Telephone",
            key: "phoneNumber",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"phoneNumber"}>{value}</span>
                </td>
              );
            },
          },
          {
            label: "Action",
            renderCallback: (index, value) => {
              return (
                <td>
                  <div className="popper-toggle">
                    <Button>
                      <DeleteIcon onClick={() => this.removeSelectedBuyers(value.id)} />
                    </Button>
                  </div>
                </td>
              );
            },
          },
        ],
        data: [],
      },
      requisitionData: {
        createdOn: "",
        id: "",
        extraBudgetoryFile: "",
        currency: "",
        requisitions: "",
        department: "",
        lineItemList: "",
        totalPrice: "",
        status: "",
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(requistionAction.getCurrency());
    if (this.props.match.params.id) {
      this.props.dispatch(
        requistionAction.getRequisition({
          id: this.props.match.params.id,
        })
      );
    }
    if (this.props.selected_buyer_list && this.props.selected_buyer_list.approvedMemberList && this.props.selected_buyer_list.approvedMemberList.length > 0) {
      let { buyersListTable } = this.state;
      const { selected_buyer_list } = this.props;
      if (selected_buyer_list.id == this.props.match.params.id) {
        if (selected_buyer_list.approvedMemberList && selected_buyer_list.approvedMemberList.length > 0) {
          for (let i = 0; i < selected_buyer_list.approvedMemberList.length; i++) {
            if (selected_buyer_list.approvedMemberList[i].isSected == true) {
              buyersListTable.data.push(selected_buyer_list.approvedMemberList[i]);
            }
          }
        }
        this.setState({
          buyersListTable,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { requisitionData } = this.state;
    if (prevProps.requisition_status !== this.props.requisition_status && this.props.requisition_status === status.SUCCESS) {
      this.setState({
        requistionList: this.props.requisition_list,
        isLoading: false,
      });
    }
    if (prevProps.get_edit_requisition_status !== this.props.get_edit_requisition_status && this.props.get_edit_requisition_status === status.SUCCESS) {
      const { editRequisitiondata } = this.props;
      if (editRequisitiondata) {
        requisitionData.createdOn = commonFunctions.convertDateToString(
          new Date(editRequisitiondata.createdOn)
        );
        requisitionData.id = editRequisitiondata.id;
        requisitionData.extraBudgetoryFile =
          editRequisitiondata.extraBudgetoryFile;
        requisitionData.currency = editRequisitiondata.currency;
        requisitionData.requisitions = editRequisitiondata.roleName;
        requisitionData.department = editRequisitiondata.department;
        requisitionData.lineItemList = editRequisitiondata.lineItemList;
        requisitionData.totalPrice = editRequisitiondata.totalPrice;
        requisitionData.status = editRequisitiondata.status;
        this.setState({
          requisitionData,
          isLoading: false,
        });
      }
    }
    if (prevProps.selected_buyer_list !== this.props.selected_buyer_list) {
      let { buyersListTable } = this.state;
      buyersListTable.data = [];
      const { selected_buyer_list } = this.props;
      if (selected_buyer_list.id == this.props.match.params.id) {
        if (selected_buyer_list && selected_buyer_list.approvedMemberList && selected_buyer_list.approvedMemberList.length > 0) {
          for (let i = 0; i < selected_buyer_list.approvedMemberList.length; i++) {
            if (selected_buyer_list.approvedMemberList[i].isSected == true) {
              buyersListTable.data.push(selected_buyer_list.approvedMemberList[i]);
            }
          }
          console.log("buyersListTable====>",buyersListTable)
        }
        this.setState({
          buyersListTable,
        });
      }
    }
    if (
      prevProps.set_buyer_status !== this.props.set_buyer_status &&
      this.props.set_buyer_status === status.SUCCESS
    ) {
      this.props.history.push("/postlogin/approvedrequisition");
      this.props.dispatch(requistionAction.changeAddBuyerState([]));
      this.setState({
        isLoading: false,
      });
    }
  }

  displayTableData = () => {
    const { requisitionData } = this.state;
    let retData = [];
    if (
      requisitionData.lineItemList &&
      requisitionData.lineItemList.length > 0
    ) {
      for (let i = 0; i < requisitionData.lineItemList.length; i++) {
        let data = requisitionData.lineItemList[i];
        retData.push(
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{data.itemDescription}</td>
            <td>{data.orderQuantity}</td>
            <td>{data.ratePerItem}</td>
            <td>{data.price}</td>
          </tr>
        );
      }
    }
    return retData;
  };

  // displaySelectedBuyers = () => {
  //   const { buyersListTable } = this.state;
  //   let retData = [];
  //   if (buyersListTable.data && buyersList.length > 0) {
  //     for (let i = 0; i < buyersList.length; i++) {
  //       if (buyersList[i].isSected) {
  //         let data = buyersList[i];
  //         retData.push(
  //           <tr key={i}>
  //             <td>{i + 1}</td>
  //             <td>{data.id}</td>
  //             <td>{data.name}</td>
  //             <td>{data.company}</td>
  //             <td>{data.position}</td>
  //             <td>{data.email}</td>
  //             <td>{data.contNo}</td>
  //             <td>
  //               <i class="far fa-ellipsis-v"></i>
  //             </td>
  //           </tr>
  //         );
  //       }
  //     }
  //   }
  //   return retData;
  // };

  setSelectedBuyers = () => {
    const { buyersListTable } = this.state;
    console.log("buyersListTable=====>",buyersListTable)
    let buyersId = [];
    if (buyersListTable.data && buyersListTable.data.length > 0) {
      this.setState({
        isLoading: true,
      });
      for (let i = 0; i < buyersListTable.data.length; i++) {
        if (buyersListTable.data[i].isSected == true) {
          buyersId.push(buyersListTable.data[i].id);
        }
      }
      let sendData = {
        requisitionID: this.props.match.params.id,
        buyersId,
      };
      this.props.dispatch(requistionAction.setRequisitionBuyers(sendData));
    }
  };

  removeSelectedBuyers = (id) => {
    const { buyersListTable } = this.state;
    const { selected_buyer_list } = this.props;
    buyersListTable.data.splice(id, 1);
    this.setState({
      buyersListTable,
    });
    let approvedMemberList = [];
    for (let i = 0; i < selected_buyer_list.approvedMemberList.length; i++) {
      if (selected_buyer_list.approvedMemberList[i].id == id) {
        selected_buyer_list.approvedMemberList[i].isSected = false;
      }
    }
    approvedMemberList.push(...selected_buyer_list.approvedMemberList);
    let sendData = {
      approvedMemberList,
      id: this.props.match.params.id,
    };
    this.props.dispatch(requistionAction.changeAddBuyerState(sendData));
  }

  updateSelectedBuyers = () => {
    this.props.history.push(`/postlogin/selectbuyers/${this.props.match.params.id}`);
  }

  render() {
    const { requisitionData, buyersListTable } = this.state;
    return (
      <div className="main-content">
        <div className="approved-content">
          <div className="recieved-content">
            <div className="recieved-heading">
              <h4>Requisitions Approved</h4>
              <div className="heading-content">
                <div className="row align-items-end">
                  <div className="col-xl-6 col-lg-6 col-md-8 col-sm-6 col-12">
                    <span>{requisitionData.status}</span>
                    <Button variant="contained" className="pending-btn">
                      Pendding
                    </Button>
                    <Button
                      variant="contained"
                      className="pending-btn recieved-btn"
                    >
                      Recieved
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-4 col-sm-6 col-12">
                    <div className="creation-box">
                      <span>Creation Date</span>
                      <span>{requisitionData.createdOn}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recieved-body-content">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisitioner</label>
                    <span>{requisitionData.requisitions}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisition No. </label>
                    <span>{requisitionData.id}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Order Currency</label>
                    <span>{requisitionData.currency.countryCode}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Item</label>
                    <span>Servers</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Extra Budgetory</label>
                    <span>{requisitionData.extraBudgetoryFile}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Department</label>
                    <span>{requisitionData.department.name}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>budget Committee </label>
                    <span>{requisitionData.status}</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Price</label>
                    <span>{requisitionData.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="recieved-bottom">
              <table width="100%">
                <thead className="item-content">
                  <tr>
                    <th>Id</th>
                    <th>Requisition Item</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>{this.displayTableData()}</tbody>
              </table>
            </div>
            {buyersListTable.data && buyersListTable.data.length > 0 && (
              <div className="buyers-list">
                <div className="mt-5 mb-3">
                  <div className="row">
                    <div className="col-9">
                      <h4 className="mb-0">Selected Buyers</h4>
                    </div>
                    <div className="col-3 text-right">
                      <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={this.updateSelectedBuyers}
                      >
                        <i className="far fa-edit"></i> Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <Table
                  valueFromData={{
                    columns: buyersListTable.columns,
                    data: buyersListTable.data,
                  }}
                  perPageLimit={10}
                  visiblecheckboxStatus={false}
                  isLoading={this.props.requisition_status === status.IN_PROGRESS}
                  tableClasses={{
                    table: "ticket-tabel",
                    tableParent: "tickets-tabel",
                    parentClass: "all-support-ticket-tabel",
                  }}
                  searchKey="subject"
                  showingLine="Showing %start% to %end% of %total% Tickets"
                />
              </div>
            )}
            <div className="recieved-button">
              {!buyersListTable.data ||
                (buyersListTable.data.length == 0 && (
                  <Button variant="contained" className="primary-btn">
                    <Link to={`/postlogin/selectbuyers/${this.props.match.params.id}`}>
                      Select Buyers
                    </Link>
                  </Button>
                ))}
              {buyersListTable.data && buyersListTable.data.length > 0 && (
                <Button
                  onClick={this.setSelectedBuyers}
                  variant="contained"
                  className="primary-btn"
                >
                  <a>Send</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    create_requisition_status,
    create_requisition,
    currency_status,
    currency_list_data,
    update_requisition_status,
    approve_requisition_status,
    approve_requisition,
    requisition_status,
    requisition_list,
    get_edit_requisition_status,
    editRequisitiondata,
    selected_buyer_list,
    set_buyer_status,
    set_buyer_res,
  } = state.procurement;

  return {
    approve_requisition_status,
    approve_requisition,
    requisition_status,
    requisition_list,
    get_edit_requisition_status,
    editRequisitiondata,
    create_requisition_status,
    create_requisition,
    currency_status,
    currency_list_data,
    update_requisition_status,
    selected_buyer_list,
    set_buyer_status,
    set_buyer_res,
  };
}

const connectedViewRequisition = connect(mapStateToProps)(ViewRequisition);
export default connectedViewRequisition;
