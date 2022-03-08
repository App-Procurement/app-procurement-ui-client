import { status } from "../_constants";
import { departmentServices } from "../_services";
import { alert, commonFunctions } from "../_utilities";

export const departmentAction = {
  getDepartment,
};

function getDepartment(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_department_status: status.IN_PROGRESS,
          department_list: null,
        },
      })
    );
    departmentServices.getDepartment(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_department_status: status.SUCCESS,
                department_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                department_status: status.FAILURE,
                department_list: response,
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
              get_department_status: status.FAILURE,
              department_list: error.message,
            },
          })
        );
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
    data: data.data,
  };
}
