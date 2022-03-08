import { rolesServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const rolesAction = {
    // addRoles,
    // deleteRoles,
    // getRoles,
    // searchRoles,
    // updateRoles
};

// function addRoles(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rolesConstants.ADD_ROLES_REQUEST,
//             data: null
//         }));
//         rolesServices.addRoles(data)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.ADD_ROLES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.ADD_ROLES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rolesConstants.ADD_ROLES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function deleteRoles(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rolesConstants.DELETE_ROLES_REQUEST,
//             data: null
//         }));
//         rolesServices.deleteRoles(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.DELETE_ROLES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.DELETE_ROLES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rolesConstants.DELETE_ROLES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function getRoles(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rolesConstants.GET_ROLES_REQUEST,
//             data: null
//         }));
//         rolesServices.getRoles(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.GET_ROLES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.GET_ROLES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rolesConstants.GET_ROLES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function searchRoles(data) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rolesConstants.SEARCH_ROLES_REQUEST,
//             data: null
//         }));
//         rolesServices.searchRoles(data)
//             .then(
//                 response => {
//                     if (response.code==200) {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.SEARCH_ROLES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.SEARCH_ROLES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rolesConstants.SEARCH_ROLES_FAILURE,
//                         data: error.message
//                     }));
//                     alert.error(error.message);
//                 }
//             );
//     };
// }

// function updateRoles(id) {
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: rolesConstants.UPDATE_ROLES_REQUEST,
//             data: null
//         }));
//         rolesServices.updateRoles(id)
//             .then(
//                 response => {
//                     if (response.status) {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.UPDATE_ROLES_SUCCESS,
//                             data: response.object
//                         }));
//                     } else {
//                         dispatch(dispatchFunction({
//                             type: rolesConstants.UPDATE_ROLES_FAILURE,
//                             data: response
//                         }));
//                         alert.error(response.message);
//                     }
//                 },
//                 error => {
//                     dispatch(dispatchFunction({
//                         type: rolesConstants.UPDATE_ROLES_FAILURE,
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