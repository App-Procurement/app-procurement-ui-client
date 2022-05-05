import { status } from '../_constants';
import { requisitionServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const requistionAction = {
    addRequisition,
    getRequisitions,
    getRequisition,
    editRequisition,
    getCurrency,
    deleteRequitionData,
    approveRequisition,
    changeAddBuyerState,
    setRequisitionBuyers
};


function addRequisition(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                create_requisition_status: status.IN_PROGRESS,
                create_requisition: null
            }
        }));
        requisitionServices.addRequisition(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                create_requisition_status: status.SUCCESS,
                                create_requisition: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                create_requisition_status: status.FAILURE,
                                create_requisition: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            create_requisition_status: status.FAILURE,
                            create_requisition: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getRequisitions(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                requisition_status: status.IN_PROGRESS,
                requisition_list: null
            }
        }));
        requisitionServices.getRequisitions(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                requisition_status: status.SUCCESS,
                                requisition_list: response
                            }
                            
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                requisition_status: status.FAILURE,
                                requisition_list: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            requisition_status: status.FAILURE,
                            requisition_list: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getRequisition(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                get_edit_requisition_status: status.IN_PROGRESS,
                editRequisitiondata: null
            }
        }));
        requisitionServices.getRequisition(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                get_edit_requisition_status: status.SUCCESS,
                                editRequisitiondata: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                get_edit_requisition_status: status.FAILURE,
                                editRequisitiondata: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            get_edit_requisition_status: status.FAILURE,
                            editRequisitiondata: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function editRequisition(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                update_requisition_status: status.IN_PROGRESS,
                updateRequisition: null
            }
        }));
        requisitionServices.editRequisition(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                update_requisition_status: status.SUCCESS,
                                updateRequisition: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                update_requisition_status: status.FAILURE,
                                updateRequisition: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            update_requisition_status: status.FAILURE,
                            updateRequisition: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getCurrency(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                currency_status: status.IN_PROGRESS,
                currency_list_data: null
            }
        }));
        requisitionServices.getCurrency(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                currency_status: status.SUCCESS,
                                currency_list_data: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                currency_status: status.FAILURE,
                                currency_list_data: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            currency_status: status.FAILURE,
                            currency_list_data: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function deleteRequitionData(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                delete_requisition_status: status.IN_PROGRESS,
                deleteRequisition: null
            }
        }));
        requisitionServices.deleteRequisition(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                delete_requisition_status: status.SUCCESS,
                                deleteRequisition: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                delete_requisition_status: status.FAILURE,
                                deleteRequisition: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            delete_requisition_status: status.FAILURE,
                            deleteRequisition: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function approveRequisition(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                approve_requisition_status: status.IN_PROGRESS,
                approve_requisition: null
            }
        }));
        requisitionServices.approveRequisition(data)
            .then(
                response => {
                    console.log("i am res======",response)
                    if (response==200) {
                      
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                approve_requisition_status: status.SUCCESS,
                                approve_requisition: response
                            }
                        }));
                        alert.success(response.message)
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                approve_requisition_status: status.FAILURE,
                                approve_requisition: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            approve_requisition_status: status.FAILURE,
                            approve_requisition: error.message
                        }
                    }));
                    alert.error("Hava no rights to approve requisition");
                }
            );
    };
}

function setRequisitionBuyers(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                set_buyer_status: status.IN_PROGRESS,
                set_buyer_res: null
            }
        }));
        requisitionServices.setRequisitionBuyers(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                set_buyer_status: status.SUCCESS,
                                set_buyer_res: response
                            }
                        }));
                        alert.success(response.message);
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                set_buyer_status: status.FAILURE,
                                set_buyer_res: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            set_buyer_status: status.FAILURE,
                            set_buyer_res: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function changeAddBuyerState(buyerdata) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.SUCCESS,
            data: {
                selected_buyer_status: status.SUCCESS,
                selected_buyer_list: buyerdata
            },
        }));
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