import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import "rc-calendar/assets/index.css";
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'simplebar/dist/simplebar.min.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PrintIcon from '@material-ui/icons/Print';
import Logo from '../../assets/images/logo.png';
import HuntImg from '../../assets/images/hunt-img.png';
import SimpleBar from 'simplebar-react';
import { connect } from "react-redux";
import { invoiceAction } from "../../_actions/invoice.actions"
import { status } from "../../_constants";
import Loader from '../../_components/commonLoader';
import { commonFunctions } from "../../_utilities";

class ViewInvoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            approvedData: {}
        }
    }
    componentDidMount() {
        this.props.dispatch(invoiceAction.getInvoice({ 'id': this.props.match.params.id }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.get_invoice_status !== this.props.get_invoice_status && this.props.get_invoice_status === status.SUCCESS) {
            this.setState({
                approvedData: this.props.getinvoicedata,
            })
        }
    }

    displayTableData = () => {
        const { approvedData } = this.state;
        let retData = [];
        if (
            approvedData.invoiceItem &&
            approvedData.invoiceItem.length > 0
        ) {
            for (let i = 0; i < approvedData.invoiceItem.length; i++) {
                let data = approvedData.invoiceItem[i];
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
        const { approvedData } = this.state;
        return (
            <div className="main-content">
                <div className="groceries-content">
                    <div className="head-top">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-12">
                                <div className="head-left-content">
                                    <IconButton className="head-icon">
                                        <KeyboardBackspaceIcon onClick={() => this.props.history.push(`/postlogin/invoices`)} />
                                    </IconButton>
                                    <h4>Invoice</h4>
                                    <p>#INV-{approvedData.requisitionsNo}</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12 col-12">
                                <div className="head-right-content">
                                    <Button variant="contained" className="invoice-btn">
                                        <DoneAllIcon className="mr-2" />
                                        Invoice Sent
                                    </Button>
                                    <Button variant="contained" className="primary-btn download-btn">
                                        <SaveAltIcon className="mr-2" />
                                        Download
                                    </Button>
                                    <IconButton className="printer-icon p-2">
                                        <PrintIcon />
                                    </IconButton>
                                    <IconButton className="head-menu-icon p-2">
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="groceries-department">
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="address">
                                    <span>FROM</span>
                                    <div className="image">
                                        <img src={Logo} alt="" />
                                    </div>
                                    <div className="address-text">
                                        <h5>SYNECTIKS Inc</h5>
                                        <p>Madhapur, Hyderabad <b>India</b></p>
                                        <ul>
                                            <li><a href="mailto: akbar.khan@synectiks.com">akbar.khan@synectiks.com</a></li>
                                            <li><a href="tel:(+91)88859991552">tel:(+91)88859991552</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="address">
                                    <span>CLIENT</span>
                                    <div className="image-box">
                                        <img src={HuntImg} alt="" />
                                    </div>
                                    <div className="address-text">
                                        <h5>Circle Hunt Inc.</h5>
                                        <p>Franklin Avenue Street New  York,ABC 5562 <b>United State</b></p>
                                        <ul>
                                            <li><a href={approvedData.requestor}>{approvedData.requestor}</a></li>
                                            <li><a href="tel:(+91)88859991552">tel:(+91)88859991552</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="project-name">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="project-left-content">
                                    <span>PROJECT NAME</span>
                                    <h5>Groceries for Department 1</h5>
                                    <label>DUE DATE</label>
                                    <p>{commonFunctions.convertDateToString(
                                        new Date(approvedData.requestDate))}</p>
                                </div>
                            </div>
                            {approvedData && approvedData.invoiceItem ?
                                (<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="project-right-content">
                                        <SimpleBar>
                                            <div className="item-detail">
                                                <table width="100%">
                                                    <thead className="item-content">
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>ITEAM DESCRIPTION</th>
                                                            <th>Quantity</th>
                                                            <th>Rate</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>{this.displayTableData()}</tbody>
                                                </table>
                                            </div>
                                        </SimpleBar>
                                    </div>
                                </div>)
                                : (<Loader />)}
                        </div>
                    </div>
                    <div className="total-iteam">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ml-auto">
                                <div className="total-iteam-content">
                                    <ul>
                                        <li>
                                            <label>SUBTOTAL</label>
                                            <span>${approvedData.requisitionsTotal}</span>
                                        </li>
                                        <li>
                                            <label>TAX</label>
                                            <span>{approvedData.tax} %</span>
                                        </li>
                                        <li>
                                            <label>TOTAL</label>
                                            <span><b>${(approvedData.requisitionsTotal * approvedData.tax) / 100}</b></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { get_invoice_status,
        getinvoicedata, } = state.procurement;
    return {
        get_invoice_status,
        getinvoicedata,
    }
}
export default connect(mapStateToProps)(ViewInvoice);