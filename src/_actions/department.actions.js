import { status } from "../_constants";
import { departmentServices } from "../_services";
import { alert } from "../_utilities";

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
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_department_status: status.SUCCESS,
                  department_list: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_department_status: status.FAILURE,
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
  return {
    type: data.type,
    data: data.data,
  };
}
