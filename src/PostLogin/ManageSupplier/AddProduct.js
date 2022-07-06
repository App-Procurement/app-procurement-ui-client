import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { status } from '../../_constants';
import { manageSupplierAction } from '../../_actions';
import Table from '../../Table/Table';
import { connect } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeindex: 0,
			productColumn: [
				{
					label: 'S No',
					key: 'sno',
					renderCallback: (index) => {
						return (
							<td>
								<span className={'s-no'}>{index + 1}</span>
							</td>
						);
					}
				},
				{
					label: 'Picture',
					key: 'productImgUrl',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'requisitions-no'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Item Name',
					key: 'productName',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'department-value'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Item Type',
					key: 'itemType',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'department-value'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Unit',
					key: 'currency',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'requestor'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Supplier',
					key: 'supplier',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'requestor'}>{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Price',
					key: 'price',
					renderCallback: (value) => {
						return (
							<td>
								<span className={'requestor'}>${value}</span>
							</td>
						);
					}
				},
				{
					label: 'Stock',
					key: 'stock',
					renderCallback: (value) => {
						return (
							<td>
								<span className="department-value">{value}</span>
							</td>
						);
					}
				},
				{
					label: 'Status',
					key: 'status',
					renderCallback: (value) => {
						return (
							<td>
								<Button variant="outlined" className="department-value active-btn ">
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
							<td>
								<MoreHorizIcon />
							</td>
						);
					}
				}
			],
			name: '',
			price: '',
			unit: '',
			itemType: '',
			supplier: '',
			image: '',
			productList: [],
			isSubmit: false
		};
	}

	componentDidMount() {
		this.props.dispatch(manageSupplierAction.getProductList());
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.suplier_product_status !== prevProps.suplier_product_status &&
			this.props.suplier_product_status === status.SUCCESS
		) {
			if (this.props.supplier_product_list && this.props.supplier_product_list.length > 0) {
				this.setState({ productList: this.props.supplier_product_list });
			}
		}
	}

	handleStateChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleFileStateChange = (e) => {
		const { name, files } = e.target;
		this.setState({
			[name]: files[0]
		});
	};

	saveProduct = () => {
		const { name, price, unit, itemType, supplier, image } = this.state;
		let validate = this.validateForm(true);
		this.setState({ isSubmit: true });
		if (validate.isValid) {
			let formData = new FormData();
			formData.append('name', name);
			formData.append('price', price);
			formData.append('unit', unit);
			formData.append('itemType', itemType);
			formData.append('supplier', supplier);
			formData.append('image', image);
			this.props.dispatch(manageSupplierAction.addProduct(formData));
		}
	};

	validateForm = (isSubmitted) => {
		const validObj = {
			isValid: true,
			message: ''
		};
		let isValid = true;
		const retData = {
			name: validObj,
			price: validObj,
			unit: validObj,
			itemType: validObj,
			supplier: validObj,
			isValid
		};
		if (isSubmitted) {
			const { name, price, unit, itemType, supplier } = this.state;
			if (!name) {
				retData.name = {
					isValid: false,
					message: 'Product name is required'
				};
				isValid = false;
			}
			if (!price) {
				retData.price = {
					isValid: false,
					message: 'Product price is required'
				};
				isValid = false;
			}
			if (!unit) {
				retData.unit = {
					isValid: false,
					message: 'Product unit is Required'
				};
				isValid = false;
			}
			if (!itemType) {
				retData.itemType = {
					isValid: false,
					message: 'Item type is Required'
				};
				isValid = false;
			}
			if (!supplier) {
				retData.supplier = {
					isValid: false,
					message: 'Supplier name is Required'
				};
				isValid = false;
			}
		}
		retData.isValid = isValid;
		return retData;
	};

	clearForm = () => {
		this.setState({
			name: '',
			price: '',
			unit: '',
			itemType: '',
			supplier: '',
			image: ''
		});
	};

	render() {
		const { productColumn, productList, name, price, unit, itemType, supplier, image, isSubmit } = this.state;
		let errorData = this.validateForm(isSubmit);
		return (
			<div className="main-content">
				<div className="manage-supplier-conntent">
					<div className="request-purpose-head">
						<div className="row d-flex align-items-center justify-content-spacebetween">
							<div className="col-12">
								<div className="request-purpose-head-left">
									<h4>Add Product</h4>
								</div>
							</div>
						</div>
					</div>
					<div className="add-product-box">
						<div className="row">
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Item Name</label>
									<input
										type="text"
										name="name"
										className="form-control"
										placeholder="HP printer"
										onChange={(e) => this.handleStateChange(e)}
										value={name}
									/>
									<span className="d-block w-100 text-danger">{errorData.name.message}</span>
								</div>
							</div>
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Price</label>
									<input
										type="text"
										name="price"
										className="form-control"
										placeholder="$625"
										onChange={(e) => this.handleStateChange(e)}
										value={price}
									/>
									<span className="d-block w-100 text-danger">{errorData.price.message}</span>
								</div>
							</div>
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Unit</label>
									<input
										type="text"
										name="unit"
										className="form-control"
										placeholder="Each"
										onChange={(e) => this.handleStateChange(e)}
										value={unit}
									/>
									<span className="d-block w-100 text-danger">{errorData.unit.message}</span>
								</div>
							</div>
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Item Type</label>
									<input
										type="text"
										name="itemType"
										className="form-control"
										placeholder="product"
										onChange={(e) => this.handleStateChange(e)}
										value={itemType}
									/>
									<span className="d-block w-100 text-danger">{errorData.itemType.message}</span>
								</div>
							</div>
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Supplier</label>
									<input
										type="text"
										name="supplier"
										className="form-control"
										placeholder="enter contact number"
										onChange={(e) => this.handleStateChange(e)}
										value={supplier}
									/>
									<span className="d-block w-100 text-danger">{errorData.supplier.message}</span>
								</div>
							</div>
							<div className="col-lg-4 col-sm-4 col-md-6">
								<div className="form-group form-group-common">
									<label className="d-block">Image</label>
									<div className="attach">
										<input
											type="file"
											placeholder="Upload"
											name="image"
											onChange={(e) => this.handleFileStateChange(e)}
										/>
										<div className="file-content">
											<CloudUploadIcon className="icon" />
											<p>Upload file</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='approve-content-buttons text-center'>
						<div className='purchase-order'>
							<Button onClick={this.saveProduct} variant="contained" className="purchase-btn"
								disableElevation>
								Save
							</Button>
						</div>
						<div className='purchase-order'>
							<Button variant="contained" onClick={this.clearForm} className="purchase-btn cancel-btn"
								disableElevation>
								Cancel
							</Button>
						</div>
					</div>
					<div className="recent-suppliers-table">
						<div className="heading">
							<h4>Recent Added Products</h4>
						</div>
						{productList &&
							productList.length > 0 && (
								<Table
									valueFromData={{ columns: productColumn, data: productList }}
									perPageLimit={6}
									visiblecheckboxStatus={false}
									isLoading={this.props.suplier_list_status === status.IN_PROGRESS}
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { supplier_product_list, suplier_product_status } = state.procurement;
	return {
		supplier_product_list,
		suplier_product_status
	};
};
export default connect(mapStateToProps)(AddProduct);
