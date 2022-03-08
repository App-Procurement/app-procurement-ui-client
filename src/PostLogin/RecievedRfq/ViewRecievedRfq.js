import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { recievedrfpAction } from '../../_actions';
import { status } from "../../_constants";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class ViewRecievedRfq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recievedData: {},
            comment: '',
        }
    }
    componentDidMount() {
        this.props.dispatch(recievedrfpAction.getRecieveRFQ({ 'id': this.props.match.params.id }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.recieved_rfq_status !== this.props.recieved_rfq_status && this.props.recieved_rfq_status === status.SUCCESS) {
            this.setState({
                recievedData: this.props.recieved_rfq_data,
            })
        }
        if (prevProps.create_recieved_rfq_status !== this.props.create_recieved_rfq_status && this.props.create_recieved_rfq_status === status.SUCCESS) {
            this.props.history.push(`/postlogin/recievedrfq`);
        }
    }

    displayTableData = () => {
        const { recievedData } = this.state;
        let retData = [];
        if (recievedData && recievedData.requistionItem && recievedData.requistionItem.length > 0) {
            for (let i = 0; i < recievedData.requistionItem.length; i++) {
                let data = recievedData.requistionItem[i];
                retData.push(
                    <tr key={i}>
                        <td>{i + 1}</td>
                        {data.itemDescription &&  <td>{data.itemDescription}</td>}
                        {data.orderQuantity && <td>{data.orderQuantity}</td>} 
                        {data.ratePerItem &&  <td>{data.ratePerItem}</td>}
                        <td>{data.price}</td>
                        <td><a href="#">Download File</a></td>
                    </tr>
                );
            }
        }
        return retData;
    }

    addRecievedRFQ = (status) => {
        this.props.dispatch(recievedrfpAction.addRecieveRFQ({ 'id': this.props.match.params.id, 'status': status }))
    }

    render() {
        const { recievedData } = this.state;
        return (
            <div className="main-content">
                <div className="receivedrfq-content">
                    <div className="heading">
                        <h4>Requisiton Details</h4>
                    </div>
                    <div className="recieved-body-content">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Requisitioner</label>
                                    {recievedData.createdBy && <span>{recievedData.createdBy}</span>}
                                    {recievedData.roleName && <span>{recievedData.roleName}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Requisition No.</label>
                                    {recievedData.id && <span>{recievedData.id}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>priority</label>
                                    <span>Normal</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Order Currency</label>
                                    {recievedData.currency && <span>{recievedData.currency.countryName}</span>}
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
                                    <span>NO</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Department</label>
                                    {recievedData.department && <span>{recievedData.department.name}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Item Name</label>
                                    <span>Dell Leptop (sky blue)</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Purpose</label>
                                    {recievedData.notes && <span>{recievedData.notes}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>CAAC Committee Report</label>
                                    <span>not Requiried</span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Location</label>
                                    <span>Hyderabad </span>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Requisition Type</label>
                                    {recievedData.requisitionType && <span>{recievedData.requisitionType}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="requisiton-items">
                        <h4 className="mb-4">Requisiton Items</h4>
                        <div className="form-row">
                            <div className="col-10">
                                <SimpleBar>
                                    <div className="item-detail">
                                        <table width="100%">
                                            <thead className="item-content texr-center">
                                                <tr>
                                                    <th>RQ.No</th>
                                                    <th>Items Description</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Net Amount</th>
                                                    <th>Quotation</th>
                                                </tr>
                                            </thead>
                                            <tbody className="texr-center">
                                                {this.displayTableData()}
                                            </tbody>
                                        </table>
                                    </div>
                                </SimpleBar>
                            </div>
                        </div>
                    </div>
                    <div className="recieved-body-content" style={{ border: 'none' }}>
                        <h4>Vendor Details</h4>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Vendor Name</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.name && <span>{recievedData.vendoreDetail.name}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Email Address</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.email && <span> {recievedData.vendoreDetail.email}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Business Nature</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.nature && <span>{recievedData.vendoreDetail.nature}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Location</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.location && <span>{recievedData.vendoreDetail.location}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Ralation</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.relation && <span>{recievedData.vendoreDetail.relation}</span>}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                                <div className="requisitioner-text">
                                    <label>Phone No</label>
                                    {recievedData.vendoreDetail && recievedData.vendoreDetail.phone && <span>{recievedData.vendoreDetail.phone}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-buttons">
                        <Button
                            variant="contained"
                            className="approve-btn"
                            onClick={() => this.addRecievedRFQ('confirm')}
                        >
                            Order Confirm
                        </Button>
                        <br />
                        <Button
                            variant="contained"
                            className="decline-btn"
                            onClick={() => this.addRecievedRFQ('decline')}
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { recieved_rfq_status, recieved_rfq_data, create_recieved_rfq_status, create_recieved_rfq_res } = state.procurement;
    return {
        recieved_rfq_status,
        recieved_rfq_data,
        create_recieved_rfq_status,
        create_recieved_rfq_res
    };
}
export default connect(mapStateToProps)(ViewRecievedRfq);