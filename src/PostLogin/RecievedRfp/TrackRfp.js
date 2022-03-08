import React, { Component } from "react";
import { connect } from "react-redux";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { recievedrfpAction } from '../../_actions';
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities";

class TrackRfp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recievedData: {},
            comment: '',
        }
    }
    componentDidMount() {
        this.props.dispatch(recievedrfpAction.getTrackRfpData({ 'id': this.props.match.params.id }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.track_frp_status !== this.props.track_frp_status && this.props.track_frp_status === status.SUCCESS) {
            if (this.props.track_frp_data && this.props.track_frp_data.trackUpdates.length > 0) {
                this.setState({
                    recievedData: this.props.track_frp_data,
                })
            }
        }
        if (prevProps.add_recieved_rfp_status !== this.props.add_recieved_rfp_status && this.props.add_recieved_rfp_status === status.SUCCESS) {
            this.props.history.push(`/postlogin/frp/recivedrfp/:id/trackrfp`);
        }

    }
    handleStateChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }
    handleTableData = (recievedData) => {
        let retData = [];
        if (recievedData && recievedData.trackUpdates && recievedData.trackUpdates.length > 0) {

            for (let i = 0; i < recievedData.trackUpdates.length; i++) {
                let data = recievedData.trackUpdates[i]
                retData.push(<TableRow key={i}>
                    {data && <TableCell>{commonFunctions.convertDateToString(new Date(data.deliveryDate))}</TableCell>}
                    {data && <TableCell>{data.location}</TableCell>}
                    {data && <TableCell align="right">
                        {data.department}
                        <br />
                        {new Date(data.orderedDate).toLocaleDateString()}<br />{new Date(data.orderedDate).toLocaleTimeString('en-US')}
                    </TableCell>}
                </TableRow>
                )
            }
        }
        return retData;
    }

    // addRecievedRfp = (status) => {
    //     const { comment } = this.state;
    //     if (comment && comment != '') {
    //         this.props.dispatch(recievedrfpAction.addRecieveRFP({ 'id': this.props.match.params.id, 'status': status, 'comment': comment }));
    //     } else {
    //         this.props.dispatch(recievedrfpAction.addRecieveRFP({ 'id': this.props.match.params.id, 'status': status }));
    //     }
    // }

    render() {
        const { recievedData, } = this.state;
        const { orderedDate, poGenerateDate, approvedDate, deliveryDate } = recievedData;
        return (
            <div className="main-content">
                <div className="recieved">
                    <div className="recieved-content">
                        <div className="recieved-heading">
                            <h4>Timeline</h4>
                        </div>
                        <div className="track-progress-bar">
                            <ul className="progress-bar">
                                <li className="progress "></li>
                                <li className="progress "></li>
                                <li className="progress active"><CheckCircleIcon /></li>
                                <li className=""><PanoramaFishEyeIcon /></li>
                            </ul>
                            <ul className="progress-contant">
                                <li>
                                    <strong>Ordered</strong>
                                    {orderedDate && <p>{commonFunctions.convertDateToString(new Date(orderedDate))}</p>}
                                    {orderedDate && <p>{new Date(orderedDate).toLocaleTimeString('en-US')}</p>}
                                </li>
                                <li>
                                    <strong>RFP Approved by Budget Holder</strong>
                                    {approvedDate && <p> {commonFunctions.convertDateToString(new Date(approvedDate))}</p>}
                                    {approvedDate && <p>{new Date(approvedDate).toLocaleTimeString('en-US')}</p>}
                                </li>
                                <li>
                                    <strong>P.O Generate By PSDS Admin</strong>
                                    {poGenerateDate && <p> {commonFunctions.convertDateToString(new Date(poGenerateDate))}</p>}
                                    {poGenerateDate && <p>{new Date(poGenerateDate).toLocaleTimeString('en-US')}</p>}
                                </li>
                                <li>
                                    <strong>Estimated delivery</strong>
                                    {deliveryDate && <p>{commonFunctions.convertDateToString(new Date(deliveryDate))}</p>}
                                    {deliveryDate && <p>{new Date(deliveryDate).toLocaleTimeString('en-US')}</p>}
                                </li>
                            </ul>
                        </div>
                        <div className="updates-table">
                            <h4>Updates:</h4>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell align="right">Events</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recievedData ? this.handleTableData(recievedData) : null}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { track_frp_data, track_frp_status } = state.procurement;
    return {
        track_frp_data, track_frp_status
    }
}
export default connect(mapStateToProps)(TrackRfp);