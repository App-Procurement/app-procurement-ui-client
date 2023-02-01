import { status } from "../_constants";
import { buyerServices } from "../_services";
import { alert } from "../_utilities";

export const buyerAction = {
  getBuyer,
};

function getBuyer(id) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_buyer_status: status.IN_PROGRESS,
          getBuyer: null,
        },
      })
    );
    buyerServices.getBuyer(id).then(
      (response) => {
        const code = response.status;
        response.json().then((data) => {
          if (code === 200) {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_buyer_status: status.SUCCESS,
                  getBuyer: data,
                },
              })
            );
          } else {
            dispatch(
              dispatchFunction({
                type: status.FAILURE,
                data: {
                  get_buyer_status: status.FAILURE,
                  getBuyer: data,
                },
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
              get_buyer_status: status.FAILURE,
              getBuyer: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function dispatchFunction(data) {
  return {
    type: data.type,
    data: data.data,
  };
}
