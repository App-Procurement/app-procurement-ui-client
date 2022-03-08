import { status } from '../_constants';
import { buyerServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const buyerAction = {
    getBuyer
};

function getBuyer(id) {
    return dispatch => {
        dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
                get_buyer_status: status.IN_PROGRESS,
                getBuyer: null
            }
        }));
        buyerServices.getBuyer(id)
            .then(
                response => {
                    if (response.code == 200) {
                        dispatch(dispatchFunction({
                            type: status.SUCCESS,
                            data: {
                                get_buyer_status: status.SUCCESS,
                                getBuyer: response.object
                            }
                        }));
                    } else {
                        dispatch(dispatchFunction({
                            type: status.FAILURE,
                            data: {
                                get_buyer_status: status.FAILURE,
                                getBuyer: response
                            }
                        }));
                        alert.error(response.message);
                    }
                },
                error => {
                    dispatch(dispatchFunction({
                        type: status.FAILURE,
                        data: {
                            get_buyer_status: status.FAILURE,
                            getBuyer: error.message
                        }
                    }));
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