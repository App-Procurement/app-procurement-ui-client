import { rulesServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const rulesAction = {
    // addRules,
    // deleteRules,
    // searchRules,
    // getRulesByName,
    // updateRules
};

// function addRules(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rulesConstants.ADD_RULES_REQUEST,
//             data: null
//         }));
//         rulesServices.addRules(data)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.ADD_RULES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.ADD_RULES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rulesConstants.ADD_RULES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function deleteRules(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rulesConstants.DELETE_RULES_REQUEST,
//             data: null
//         }));
//         rulesServices.deleteRules(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.DELETE_RULES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.DELETE_RULES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rulesConstants.DELETE_RULES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function searchRules(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rulesConstants.SEARCH_RULES_REQUEST,
//             data: null
//         }));
//         rulesServices.searchRules(data)
//             .then(
//                 response => {
//                     if (response.code==200) {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.SEARCH_RULES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.SEARCH_RULES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rulesConstants.SEARCH_RULES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function getRulesByName(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rulesConstants.RULES_BY_NAME_REQUEST,
//             data: null
//         }));
//         rulesServices.getRulesByName(data)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.RULES_BY_NAME_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.RULES_BY_NAME_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rulesConstants.RULES_BY_NAME_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function updateRules(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rulesConstants.UPDATE_RULES_REQUEST,
//             data: null
//         }));
//         rulesServices.updateRules(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.UPDATE_RULES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rulesConstants.UPDATE_RULES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rulesConstants.UPDATE_RULES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

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