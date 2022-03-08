import { status } from "../_constants";
import { kanbanServices } from "../_services";
import { alert, commonFunctions } from "../_utilities";

export const kanbanActions = {
  fetchKanbanList,
};

function fetchKanbanList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          kanban_status: status.IN_PROGRESS,
          kanban_list: null,
        },
      })
    );
    kanbanServices.fetchKanbanList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                kanban_status: status.SUCCESS,
                kanban_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                kanban_status: status.FAILURE,
                kanban_list: response,
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
              kanban_status: status.FAILURE,
              kanban_list: error.message,
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
