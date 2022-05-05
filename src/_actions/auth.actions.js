import { status } from '../_constants';
import { authServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const authActions = {
    login,
    //logOut
};

function login(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data:  {
                user_login_status: status.IN_PROGRESS,
                user: null
            }
        }));
        authServices.login(data)
            .then(
                
                response => {
                    console.log("login user",response.cause)
                    if (response.cause !== null) {
                        console.log("login user 1---")
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                user_login_status: status.SUCCESS,
                                user: response
                            }
                        }));
                    } else {
                        console.log("login user 2---")
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                user_login_status: status.FAILURE,
                                user: response
                            }
                        }));
                        alert.error("invalid credential");
                    }
                },
                error => {
                    console.log("login user 3---")
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            user_login_status: status.FAILURE,
                            user: error.message
                        }
                    }));
                    alert.error(error.message);
                }
            );
    };
}


// function logOut() {
//     commonFunctions.onLogout();
//     return dispatch => {
//         dispatch(dispatchFunction({
//             type: authConstants.USER_LOGOUT,
//             data: null
//         }));
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