import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import Table from '../../../Table/Table';
import { connect } from 'react-redux';
import { requistionAction } from '../../../_actions';
import { status } from '../../../_constants';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { commonFunctions } from '../../../_utilities/commonFunctions';
import purchaseOrder from '../../../assets/images/dashbord/purchase-order.png';
import approvedRequisitionIcon from '../../../assets/images/dashbord/approved-requisition-icon.png';
import pendingRequisitionIcon from '../../../assets/images/dashbord/pending-requisition-icon.png';
import purchasedRequisitionIcon from '../../../assets/images/dashbord/purchased-requisition-icon.png';

class PurchaseRequisition extends Component {
	inputOpenFileRef;
	constructor(props) {
		super(props);
		this.state = {
			activeindex: 0,
			requiData: {
				status: '',
				reqno: '',
				depart: '',
				ViewDetail: false,
				selectBuyer: false
			},
			formData: {
				dueDate: 'yyyy-mm-dd',
				deliveryDate: 'yyyy-mm-dd',
				location: '',
				Department: '',
				Request: '',
				Note: ''
			},
			columns: [
				{
					label: 'S No',
					key: 'sno',
					renderCallback: (value, index) => {
						return (
							<td key={index+1}>
								<span className={'s-no'} >{index + 1}</span>
							</td>
						);
					}
				},
				{
					label: 'Requester',
					key: 'createdBy',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<span className={'requisitions-no'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Location',
					key: 'location',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<span className={'department-value'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Supplier',
					key: 'supplier',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<span className={'department-value'}>{value.name}</span>
							</td>
						);
					}
				},
				{
					label: 'Total Amount',
					key: 'totalPrice',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<span className={'requestor'}>${value}</span>
							</td>
						);
					}
				},
				{
					label: 'Creation Date',
					key: 'createdOn',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<span className="department-value">
									{commonFunctions.convertDateToString(new Date(value))}
								</span>
							</td>
						);
					}
				},
				{
					label: 'Status',
					key: 'status',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<Button variant="outlined" className="department-value status-btn ">
									{value}
								</Button>
							</td>
						);
					}
				},
				{
					label: 'Edit',
					key: 'id',
					renderCallback: (value) => {
						return (
							<td key={value}>
								<Link to={`/postlogin/purchaserequisition/${value}`}>View Details</Link>
							</td>
						);
					}
				}
			],
			tableData: [],
			entireData: {},
			uploadedFileList: [],
			selectedFile: {}
		};
		this.inputOpenFileRef = React.createRef();
	}

	componentDidMount() {
		if (this.props.requisition_list) {
			this.setState({
				entireData: this.props.requisition_list,
				tableData: this.props.requisition_list.requisitionList
			});
		} else {
			this.props.dispatch(requistionAction.getRequisitions());
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.requisition_status !== this.props.requisition_status &&
			this.props.requisition_status === status.SUCCESS
		) {
			if (this.props.requisition_list && this.props.requisition_list.requisitionList) {
				this.setState({
					entireData: this.props.requisition_list,
					tableData: this.props.requisition_list.requisitionList
				});
			}
		}
	}

	onClickCreateNewRequester = (id) => {
		this.props.history.push(`/postlogin/requestforpurpose/newrequest`);
	};

	render() {
		const { columns, tableData, entireData } = this.state;
		return (
			<div className="main-content">
				<div className="purchase-requisition">
					<div className="request-purpose-head">
						<div className="row d-flex align-items-center justify-content-center">
							<div className="col-sm-12 col-md-7 col-lg-8 col-xl-8 col-form-button">
								<div className="request-purpose-head-left">
									<h3>{t('Purchase Requisition')}</h3>
								</div>
							</div>
							<div className="col-sm-12 col-md-5 col-lg-4 col-xl-4 col-form-button">
								<div className="request-purpose-head-right" />
							</div>
						</div>
					</div>
					<div className="progress-rfp-boxs">
						<div className="row d-flex align-items-center justify-content-center">
							<div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
								<div className="progress-box">
									<div className="progress-content">
										<div className="title">All purchase Requisition</div>
										<h4>{entireData.allPurchaseRequisitions}</h4>
									</div>
									<div className="purchased-image">
										<img src={purchaseOrder} alt="" />
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
								<div className="progress-box">
									<div className="progress-content">
										<div className="title">Approved Requisition</div>
										<h4>{entireData.approveRequisitions}</h4>
									</div>
									<div className="purchased-image approved">
										<img src={approvedRequisitionIcon} alt="" />
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 ">
								<div className="progress-box">
									<div className="progress-content">
										<div className="title">Pendding Requisition</div>
										<h4>{entireData.pendingRequisitions}</h4>
									</div>
									<div className="purchased-image pending">
										<img src={pendingRequisitionIcon} alt="" />
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
								<div className="progress-box">
									<div className="progress-content">
										<div className="title">Rejected Requisition</div>
										<h4>{entireData.rejectedRequisitions}</h4>
									</div>
									<div className="purchased-image rejected">
										<img src={purchasedRequisitionIcon} alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="search-fillter">
						<Button variant="outlined" className="fillter-btn">
							<i className="fa fa-filter" aria-hidden="true" />
							Search By Filters
						</Button>
					</div>
					{tableData &&
						tableData.length > 0 && (
							<Table
								valueFromData={{ columns: columns, data: tableData }}
								perPageLimit={6}
								visiblecheckboxStatus={false}
								isLoading={this.props.recieved_rfp_status === status.IN_PROGRESS}
								tableClasses={{
									table: 'ticket-tabel',
									tableParent: 'tickets-tabel',
									parentClass: 'all-support-ticket-tabel'
								}}
								showingLine="Showing %start% to %end% of %total% "
							/>
						)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { requisition_list, requisition_status } = state.procurement;
	return { requisition_list, requisition_status };
};

const connectedPurchaseRequisition = withTranslation()(connect(mapStateToProps)(PurchaseRequisition));
export default connectedPurchaseRequisition;
