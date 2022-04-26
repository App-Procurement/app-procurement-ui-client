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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
            console.log("editRequisitiondata",editRequisitiondata)
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
                    extraFile:editRequisitiondata.documentList,
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
    displayExtraTableData = () => {
        const { extraFile } = this.state;
      let retData = [];
        if (
            extraFile&&
            extraFile.length > 0
        ) {
            for (let i = 0; i < extraFile.length; i++) {
                let data = extraFile[i];
                console.log(data)
                if(data.fileType!="XLSX"){
                retData.push(
                    <tr key={i}>
                        {/* <td>{i + 1}</td> */}
                        <a  href="#"onClick={() => this.downloadExtraBudgetaryFile(data)}>{data.fileName}</a>
                    </tr>
                );
            }
        }
        }
        return retData;
     
    };
    downloadExtraBudgetaryFile = (data ) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        // console.log("row",selectedInvoice,"orderId",selectedInvoice.orderId)
        fetch("http://localhost:7050/api/download/requisitionsExtraBudgetary"+ "?extraBudgetaryFile=" + data.fileName,requestOptions )
        .then((response) => response.blob())
        .then((blob) => {
            // console.log("response", blob);
            // Create blob link to download  
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `Synectiks ${data.fileName}`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        });
        
    }
    render() {
        const { requisitionData, buyersListTable } = this.state;
        return (
            <div className="main-content">
                <div className="approved-content">
                    <div className="recieved-content">
                        <Button>
                            <Link to={`/postlogin/managerequisition`}> <ArrowBackIcon /></Link>
                        </Button>
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
                                        <span>{requisitionData.currency&&requisitionData.currency.countryCode}</span>
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
                                        <label>Extra Budgetary</label>
                                        <span>{this.displayExtraTableData()}</span>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                    <div className="requisitioner-text">
                                        <label>Department</label>
                                        <span>{requisitionData.department&&requisitionData.department.name}</span>
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
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                    <div className="requisitioner-text">
                                        <strong>Status</strong>
                                        <span>{requisitionData.status}</span>
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

const connectedViewRequisition = connect(mapStateToProps)(ManageRequisitionData);
export default connectedViewRequisition;
