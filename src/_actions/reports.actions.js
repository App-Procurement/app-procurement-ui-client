import { status } from "../_constants";
import { alert } from '../_utilities';
import { reportServices } from "../_services";
export const reportAction = {
    getRepots
}
function getRepots(data) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                reports_status: status.IN_PROGRESS,
                reports_data: null
            }
        }));
        reportServices.fetchReportsList(data)
            .then(
                response => {
                    if (response.code === 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                reports_status: status.SUCCESS,
                                reports_data: response.object
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                reports_status: status.FAILURE,
                                reports_data: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            reports_status: status.FAILURE,
                            reports_data: error.message
                        }
                    }));
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