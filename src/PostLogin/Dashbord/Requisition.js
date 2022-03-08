import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { requistionAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities";
class Requisition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requisitionList: [],
        }
    }
    componentDidMount() {
        this.props.dispatch(requistionAction.getRequisitions())
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.requisition_status !== this.props.requisition_status && this.props.requisition_status === status.SUCCESS) {
            if (this.props.requisition_list && this.props.requisition_list.length > 0) {
                this.setState({
                    requisitionList: this.props.requisition_list
                })
            }
        }
    }
    dispalyRequisitionList = () => {
        const { requisitionList } = this.state
        let retData = [];
        if (requisitionList && requisitionList.length > 0) {
            for (let i = 0; i < requisitionList.length; i++) {
                let row = requisitionList[i]
                retData.push(<div className="d-flex table-row" key={i}>
                    {row.status && <div className="d-inline-block track">{row.status}</div>}
                    {row.totalPrice && <div className="d-inline-block nomber">{row.totalPrice}</div>}
                    {row.roleName && <div className="d-inline-block name">{row.roleName}</div>}
                    {row.department.name && <div className="d-inline-block employee">{row.department.name}</div>}
                    {row.startDate && <div className="d-inline-block time"><span>
                        {commonFunctions.convertDateToString(new Date(row.startDate))}</span>
                        <span>  {new Date(row.startDate).toLocaleTimeString()}</span></div>}
                </div>)
            }
        }
        return retData
    }
    render() {
        const { requisitionList } = this.state;
        return (
            <div className="requisition">
                <div className="heading">Requisition</div>
                <SimpleBar className="requisition-table">
                    {this.dispalyRequisitionList()}
                </SimpleBar>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { requisition_status, requisition_list } = state.procurement;
    return {
        requisition_status,
        requisition_list
    }
}
export default connect(mapStateToProps)(Requisition);