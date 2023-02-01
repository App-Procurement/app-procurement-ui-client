import { status } from "../_constants";
import { requestServices } from "../_services";
import { alert } from "../_utilities";

export const requestAction = {
  getRequestData,
};

function getRequestData(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_request_status: status.IN_PROGRESS,
          request_data: null,
        },
      })
    );
    requestServices.getRequestData(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_request_status: status.SUCCESS,
                  request_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_request_status: status.FAILURE,
                request_data: response,
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
              get_request_status: status.FAILURE,
              request_data: error.message,
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
