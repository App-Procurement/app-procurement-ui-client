import { status } from "../_constants";
import { manageSellerServices } from "../_services";
import { alert } from "../_utilities";

export const sellersAction = {
  getSellerList,
};

function getSellerList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          seller_list_status: status.IN_PROGRESS,
          seller_list: null,
        },
      })
    );
    manageSellerServices.getSellerList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                seller_list_status: status.SUCCESS,
                seller_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                seller_list_status: status.FAILURE,
                seller_list: response,
              },
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
              seller_list_status: status.FAILURE,
              seller_list: error.message,
            },
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
    data: data.data,
  };
}
