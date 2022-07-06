import { status } from '../_constants';
import { requestForPurposeServices } from '../_services';
import { alert } from '../_utilities';

export const requestForPurposeAction = {
	getRequestList,
	UploadFile,
	UploadFileUrlUpdate,
	getRequest,
	getItemList,
	removeRequest,
	addRequest,
	SupplierAndCategoryList,
	updateRequestList
};

function getRequestList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					request_for_purpose_status: status.IN_PROGRESS,
					request_for_purpose_list: null
				}
			})
		);
		requestForPurposeServices.getRequestList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								request_for_purpose_status: status.SUCCESS,
								request_for_purpose_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								request_for_purpose_status: status.FAILURE,
								request_for_purpose_list: response
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
							request_for_purpose_status: status.FAILURE,
							request_for_purpose_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function addRequest(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					add_request_status: status.IN_PROGRESS,
					add_request_response: null
				}
			})
		);
		requestForPurposeServices.addRequest(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								add_request_status: status.SUCCESS,
								add_request_response: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								add_request_status: status.FAILURE,
								add_request_response: response
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
							add_request_status: status.FAILURE,
							add_request_response: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function UploadFile(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_document_status: status.IN_PROGRESS,
					update_document_res: null
				}
			})
		);
		requestForPurposeServices.UploadFile(data).then(
			(response) => {
				const code = response.status;
				response.json().then((data) => {
					if (code === 200) {
						dispatch(
							dispatchFunction({
								type: status.SUCCESS,
								data: {
									update_document_status: status.SUCCESS,
									update_document_res: data
								}
							})
						);
					} else {
						dispatch(
							dispatchFunction({
								type: status.FAILURE,
								data: {
									update_document_status: status.FAILURE,
									update_document_res: data
								}
							})
						);
						alert.error(response.message);
					}
				});
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							update_document_status: status.FAILURE,
							update_document_res: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function UploadFileUrlUpdate(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_document_upload_status: status.IN_PROGRESS,
					update_document_upload_res: null
				}
			})
		);
		requestForPurposeServices.UploadFileUrlUpdate(data).then(
			(response) => {
				const code = response.status;
				response.json().then((data) => {
					if (code === 200) {
						dispatch(
							dispatchFunction({
								type: status.SUCCESS,
								data: {
									update_document_upload_status: status.SUCCESS,
									update_document_upload_res: data
								}
							})
						);
					} else {
						dispatch(
							dispatchFunction({
								type: status.FAILURE,
								data: {
									update_document_upload_status: status.FAILURE,
									update_document_upload_res: data
								}
							})
						);
						alert.error(response.message);
					}
				});
			},
			(error) => {
				dispatch(
					dispatchFunction({
						type: status.FAILURE,
						data: {
							update_document_upload_status: status.FAILURE,
							update_document_upload_res: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function getRequest(data){
	
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					get_request_status: status.IN_PROGRESS,
					get_request_data: null
				}
			})
		);
		requestForPurposeServices.getRequest(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								get_request_status: status.SUCCESS,
								get_request_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								get_request_status: status.FAILURE,
								get_request_data: response
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
							get_request_status: status.FAILURE,
							get_request_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function getItemList() {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					item_list_status: status.IN_PROGRESS,
					item_list: null
				}
			})
		);
		requestForPurposeServices.getItemList().then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								item_list_status: status.SUCCESS,
								item_list: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								item_list_status: status.FAILURE,
								item_list: response
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
							item_list_status: status.FAILURE,
							item_list: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function removeRequest(data){
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					remove_request_status: status.IN_PROGRESS,
					remove_request_data: null
				}
			})
		);
		requestForPurposeServices.removeRequest(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								remove_request_status: status.SUCCESS,
								remove_request_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								remove_request_status: status.FAILURE,
								remove_request_data: response
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
							remove_request_status: status.FAILURE,
							remove_request_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}

function SupplierAndCategoryList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					supplier_category_list_status: status.IN_PROGRESS,
					supplier_category_list_data: null
				}
			})
		);
		requestForPurposeServices.SupplierAndCategoryList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								supplier_category_list_status: status.SUCCESS,
								supplier_category_list_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								supplier_category_list_status: status.FAILURE,
								supplier_category_list_data: response
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
							supplier_category_list_status: status.FAILURE,
							supplier_category_list_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function updateRequestList(data) {
	return (dispatch) => {
		dispatch(
			dispatchFunction({
				type: status.IN_PROGRESS,
				data: {
					update_request_status: status.IN_PROGRESS,
					update_request_data: null
				}
			})
		);
		requestForPurposeServices.updateRequestList(data).then(
			(response) => {
				if (response.code === 200) {
					dispatch(
						dispatchFunction({
							type: status.SUCCESS,
							data: {
								update_request_status: status.SUCCESS,
								update_request_data: response.object
							}
						})
					);
				} else {
					dispatch(
						dispatchFunction({
							type: status.FAILURE,
							data: {
								update_request_status: status.FAILURE,
								update_request_data: response
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
							update_request_status: status.FAILURE,
							update_request_data: error.message
						}
					})
				);
				alert.error(error.message);
			}
		);
	};
}
function dispatchFunction(data) {
	// if (data.data && data.data.code === 401) {
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
