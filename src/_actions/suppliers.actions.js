import { status } from '../_constants';
import { manageSupplierServices } from '../_services';
import { alert } from '../_utilities';

export const manageSupplierAction = {
	getSupplierList,
	updateSupplierList,
	getProductList,
	deleteProduct,
	deleteSupplier,
	updateProductList,
	getActiveSupplierList,
	updateActiveSupplierList,
	deleteActiveSupplier,
	addSupplier,
	getSupplierDetail,
	addProduct,
};

function getSupplierList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					suplier_list_status: status.IN_PROGRESS,
					supplier_list: null
				}
			})
		);
		manageSupplierServices.getSupplierList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								suplier_list_status: status.SUCCESS,
								supplier_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								suplier_list_status: status.FAILURE,
								supplier_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							suplier_list_status: status.FAILURE,
							supplier_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function updateSupplierList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_suplier_list_status: status.IN_PROGRESS,
					update_supplier_list: null
				}
			})
		);
		manageSupplierServices.updateSupplierList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								update_suplier_list_status: status.SUCCESS,
								update_supplier_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								update_suplier_list_status: status.FAILURE,
								update_supplier_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							update_suplier_list_status: status.FAILURE,
							update_supplier_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function deleteSupplier(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					delete_suplier_list_status: status.IN_PROGRESS,
					delete_supplier_list: null
				}
			})
		);
		manageSupplierServices.deleteSupplier(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								delete_suplier_list_status: status.SUCCESS,
								delete_supplier_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								delete_suplier_list_status: status.FAILURE,
								delete_supplier_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							delete_suplier_list_status: status.FAILURE,
							delete_supplier_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function getActiveSupplierList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					active_supplier_list_status: status.IN_PROGRESS,
					active_supplier_list_data: null
				}
			})
		);
		manageSupplierServices.getActiveSupplierList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								active_supplier_list_status: status.SUCCESS,
								active_supplier_list_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								active_supplier_list_status: status.FAILURE,
								active_supplier_list_data: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							active_supplier_list_status: status.FAILURE,
							active_supplier_list_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function updateActiveSupplierList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_active_supplier_list_status: status.IN_PROGRESS,
					update_active_supplier_list_data: null
				}
			})
		);
		manageSupplierServices.updateActiveSupplierList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								update_active_supplier_list_status: status.SUCCESS,
								update_active_supplier_list_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								update_active_supplier_list_status: status.FAILURE,
								update_active_supplier_list_data: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							update_active_supplier_list_status: status.FAILURE,
							update_active_supplier_list_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function deleteActiveSupplier(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					delete_active_supplier_status: status.IN_PROGRESS,
					delete_active_supplier_data: null
				}
			})
		);
		manageSupplierServices.deleteActiveSupplier(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								delete_active_supplier_status: status.SUCCESS,
								delete_active_supplier_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								delete_active_supplier_status: status.FAILURE,
								delete_active_supplier_data: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							delete_active_supplier_status: status.FAILURE,
							delete_active_supplier_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function getProductList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					suplier_product_status: status.IN_PROGRESS,
					supplier_product_list: null
				}
			})
		);
		manageSupplierServices.getProductList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								suplier_product_status: status.SUCCESS,
								supplier_product_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								suplier_product_status: status.FAILURE,
								supplier_product_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							suplier_product_status: status.FAILURE,
							supplier_product_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function deleteProduct(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					delete_suplier_product_status: status.IN_PROGRESS,
					delete_supplier_product_list: null
				}
			})
		);
		manageSupplierServices.deleteProduct(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								delete_suplier_product_status: status.SUCCESS,
								delete_supplier_product_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								delete_suplier_product_status: status.FAILURE,
								delete_supplier_product_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							delete_suplier_product_status: status.FAILURE,
							delete_supplier_product_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function updateProductList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_suplier_product_status: status.IN_PROGRESS,
					update_supplier_product_list: null
				}
			})
		);
		manageSupplierServices.updateProductList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								update_suplier_product_status: status.SUCCESS,
								update_supplier_product_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								update_suplier_product_status: status.FAILURE,
								update_supplier_product_list: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							update_suplier_product_status: status.FAILURE,
							update_supplier_product_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function addSupplier(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					add_supplier_status: status.IN_PROGRESS,
					add_supplier_res: null
				}
			})
		);
		manageSupplierServices.addSupplier(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								add_supplier_status: status.SUCCESS,
								add_supplier_res: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								add_supplier_status: status.FAILURE,
								add_supplier_res: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							add_supplier_status: status.FAILURE,
							add_supplier_res: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function getSupplierDetail(data){
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					supplier_detail_status: status.IN_PROGRESS,
					supplier_detail_data: null
				}
			})
		);
		manageSupplierServices.getSupplierDetail(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								supplier_detail_status: status.SUCCESS,
								supplier_detail_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								supplier_detail_status: status.FAILURE,
								supplier_detail_data: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							supplier_detail_status: status.FAILURE,
							supplier_detail_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function addProduct(data){
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					add_product_status: status.IN_PROGRESS,
					add_product_res: null
				}
			})
		);
		manageSupplierServices.addProduct(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								add_product_status: status.SUCCESS,
								add_product_res: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								add_product_status: status.FAILURE,
								add_product_res: response
							}
						})
					);
					alert.error(response.message);
				}
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							add_product_status: status.FAILURE,
							add_product_res: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function dispatchFunction(data) {
	// if(data.data && data.data.code === 401){
	//     commonFunctions.onLogout();
	//     return {
	//         type: authConstants.USER_LOGOUT,
	//         data: null
	//     };
	// }
	return {
		type: data.type,
		data: data.data
	};
}
