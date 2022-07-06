import { status } from '../_constants';
import { vendorServices } from '../_services';
import { alert } from '../_utilities';

export const vendorAction = {
    addVendor,
    deleteVendor,
    // getVendor,
    fetchVendorList,
    // searchVendor,
    // updateVendor
    getVendorQuotation
};

function addVendor(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                add_vendor_status: status.IN_PROGRESS,
                addVendor: null
            }
        }));
        vendorServices.addVendor(data)
            .then(
                response => {
                    if (response.code === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                add_vendor_status: status.SUCCESS,
                                addVendor: response.object
                            }
                        }));
                        alert.success(response.message);
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                add_vendor_status: status.FAILURE,
                                addVendor: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            add_vendor_status: status.FAILURE,
                            addVendor: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function deleteVendor(id) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                delete_vendor_status: status.IN_PROGRESS,
                deleteVendor: null
            }
        }));
        vendorServices.deleteVendors(id)
            .then(
                response => {
                    if (response.code === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                delete_vendor_status: status.SUCCESS,
                                deleteVendor: response.object
                            }
                        }));
                        alert.success(response.message);
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                delete_vendor_status: status.FAILURE,
                                deleteVendor: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            delete_vendor_status: status.FAILURE,
                            deleteVendor: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function fetchVendorList() {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                get_vendor_status: status.IN_PROGRESS,
                getVendor: null
            }
        }));
        vendorServices.fetchVendors()
            .then(
                response => {
                    if (response.code === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                get_vendor_status: status.SUCCESS,
                                getVendor: response.object
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                get_vendor_status: status.FAILURE,
                                getVendor: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            get_vendor_status: status.FAILURE,
                            getVendor: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

// function searchVendor(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: status.IN_PROGRESS,
//             data: {
//                 search_vendor_status: status.IN_PROGRESS,
//                 searchVendor: null
//             }
//         }));
//         vendorServices.searchVendor(data)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             data: {
//                                 search_vendor_status: status.SUCCESS,
//                                 searchVendor: response.object
//                             }
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: status.FAILURE,
//                             data: {
//                                 search_vendor_status: status.FAILURE,
//                                 searchVendor: response
//                             }
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: status.FAILURE,
//                         data: {
//                             search_vendor_status: status.FAILURE,
//                             searchVendor: error.message
//                         }
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function updateVendor(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: status.IN_PROGRESS,
//             data: {
//                 update_vendor_status: status.IN_PROGRESS,
//                 updateVendor: null
//             }
//         }));
//         vendorServices.updateVendor(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: status.SUCCESS,
//                             data: {
//                                 update_vendor_status: status.SUCCESS,
//                                 updateVendor: response.object
//                             }
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: status.FAILURE,
//                             data: {
//                                 update_vendor_status: status.FAILURE,
//                                 updateVendor: response
//                             }
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: status.FAILURE,
//                         data: {
//                             update_vendor_status: status.FAILURE,
//                             updateVendor: error.message
//                         }
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// vendor quotation actions 

function getVendorQuotation(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                vendor_quotation_status: status.IN_PROGRESS,
                vendor_quotation: null
            }
        }));
        vendorServices.vendorQuotation(data)
            .then(
                response => {
                    if (response.code === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                vendor_quotation_status: status.SUCCESS,
                                vendor_quotation: response.object
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                vendor_quotation_status: status.FAILURE,
                                vendor_quotation: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            vendor_quotation_status: status.FAILURE,
                            vendor_quotation: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    }
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