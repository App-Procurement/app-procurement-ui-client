import { status } from '../_constants';
import { committeeServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const committeeAction = {
    addCommittee,
    // deleteCommittee,
    getCommitteeType,
    searchCommittee,
    // updateCommittee,
    addSelectedMember,
    searchCommitteeMembers
};

function addCommittee(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                add_committee_status: status.IN_PROGRESS,
                addCommittee: null
            }
        }));
        committeeServices.addCommittee(data)
            .then(
                response => {
                    if (response == 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                add_committee_status: status.SUCCESS,
                                addCommittee: response.object
                            }
                        }));
                        alert.success(response.message);
                    } else {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                add_committee_status: status.FAILURE,
                                addCommittee: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.SUCCESS,
                        data: {
                            add_committee_status: status.FAILURE,
                            addCommittee: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

// function deleteCommittee(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: committeeConstants.DELETE_COMMITTEE_REQUEST,
//             data: null
//         }));
//         committeeServices.deleteCommittee(id)
//             .then(
//                 response => {
//                     if (response.code === 200) {
//                         dispatch(dispatchFunction({
//                             type: committeeConstants.DELETE_COMMITTEE_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: committeeConstants.DELETE_COMMITTEE_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: committeeConstants.DELETE_COMMITTEE_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function getCommittee(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: committeeConstants.GET_COMMITTEE_REQUEST,
//             data: null
//         }));
//         committeeServices.getCommittee(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: committeeConstants.GET_COMMITTEE_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: committeeConstants.GET_COMMITTEE_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: committeeConstants.GET_COMMITTEE_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

function searchCommittee(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                search_committee_status: status.IN_PROGRESS,
                searchCommittee: null
            }
        }));
        committeeServices.searchCommittee(data)
            .then(
                response => {
                    if (response ) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                search_committee_status: status.SUCCESS,
                                searchCommittee: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                search_committee_status: status.FAILURE,
                                searchCommittee: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            search_committee_status: status.FAILURE,
                            searchCommittee: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function searchCommitteeMembers(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                search_committee_status: status.IN_PROGRESS,
                searchCommittee: null
            }
        }));
        committeeServices.searchCommitteeMembers(data)
            .then(
                response => {
                    if (response ) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                search_committee_status: status.SUCCESS,
                                searchCommittee: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                search_committee_status: status.FAILURE,
                                searchCommittee: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            search_committee_status: status.FAILURE,
                            searchCommittee: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function getCommitteeType(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                get_committee_type_status: status.IN_PROGRESS,
                getCommitteeType: null
            }
        }));
        committeeServices.getCommitteeType(data)
            .then(
                response => {
                    if (response) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                get_committee_type_status: status.SUCCESS,
                                getCommitteeType: response
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                get_committee_type_status: status.FAILURE,
                                getCommitteeType: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            get_committee_type_status: status.FAILURE,
                            getCommitteeType: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}

function addSelectedMember(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.SUCCESS,
            data: {
                selected_committee_status: status.SUCCESS,
                selected_member_list: data
            }
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