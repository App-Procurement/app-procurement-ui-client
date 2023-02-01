import React, { Component } from "react";
import { Button } from "@mui/material";

import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import { requistionAction } from "../../../_actions";
import { connect } from "react-redux";
import { status } from "../../../_constants";
import { commonFunctions } from "../../../_utilities";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
class ManageRequisitionData extends Component {
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
            key: "name",
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
            key: "contNo",
            renderCallback: (value) => {
              return (
                <td>
                  <span className={"contNo"}>{value}</span>
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
                      <DeleteIcon
                        onClick={() => this.removeSelectedBuyers(value.id)}
                      />
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
    if (this.props.match.params.id) {
      this.props.dispatch(
        requistionAction.getRequisition({
          id: this.props.match.params.id,
        })
      );
    }
    if (
      this.props.selected_buyer_list &&
      this.props.selected_buyer_list.approvedMemberList &&
      this.props.selected_buyer_list.approvedMemberList.length > 0
    ) {
      let { buyersListTable } = this.state;
      const { selected_buyer_list } = this.props;
      if (selected_buyer_list.id === this.props.match.params.id) {
        if (
          selected_buyer_list.approvedMemberList &&
          selected_buyer_list.approvedMemberList.length > 0
        ) {
          for (
            let i = 0;
            i < selected_buyer_list.approvedMemberList.length;
            i++
          ) {
            if (selected_buyer_list.approvedMemberList[i].isSected === true) {
              buyersListTable.data.push(
                selected_buyer_list.approvedMemberList[i]
              );
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
    if (
      prevProps.requisition_status !== this.props.requisition_status &&
      this.props.requisition_status === status.SUCCESS
    ) {
      this.setState({
        requistionList: this.props.requisition_list,
        isLoading: false,
      });
    }
    if (
      prevProps.get_edit_requisition_status !==
        this.props.get_edit_requisition_status &&
      this.props.get_edit_requisition_status === status.SUCCESS
    ) {
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
        requisitionData.lineItemList = editRequisitiondata.requistionItem;
        requisitionData.totalPrice = editRequisitiondata.totalPrice;
        requisitionData.status = editRequisitiondata.status;
        this.setState({
          requisitionData,
          isLoading: false,
        });
      }
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
  render() {
    const { requisitionData } = this.state;
    return (
      <div className="main-content">
        <div className="approved-content">
          <div className="recieved-content">
            <Button>
              <Link to={`/postlogin/managerequisition`}>
                {" "}
                <ArrowBackIcon />
              </Link>
            </Button>
            <div className="recieved-body-content">
              {requisitionData && (
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Requisitioner</label>
                      {requisitionData.requisitions && (
                        <span>{requisitionData.requisitions}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Requisition No. </label>
                      {requisitionData.id && <span>{requisitionData.id}</span>}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Order Currency</label>
                      {requisitionData.currency &&
                        requisitionData.currency.countryCode && (
                          <span>{requisitionData.currency.countryCode}</span>
                        )}
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
                      {requisitionData.extraBudgetoryFile && (
                        <span>{requisitionData.extraBudgetoryFile}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Department</label>
                      {requisitionData.department &&
                        requisitionData.department.name && (
                          <span>{requisitionData.department.name}</span>
                        )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>budget Committee </label>
                      {requisitionData.status && (
                        <span>{requisitionData.status}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <label>Price</label>
                      {requisitionData.totalPrice && (
                        <span>{requisitionData.totalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="requisitioner-text">
                      <strong>Status</strong>
                      {requisitionData.status && (
                        <span>{requisitionData.status}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
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

const connectedViewRequisition = connect(mapStateToProps)(
  ManageRequisitionData
);
export default connectedViewRequisition;
