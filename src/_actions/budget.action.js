import { status } from "../_constants";
import { BudgetServices } from "../_services";
import { alert } from "../_utilities";

export const BudgetAction = {
  getBudgetData,
};

function getBudgetData(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_budget_status: status.IN_PROGRESS,
          budget_data: null,
        },
      })
    );
    BudgetServices.getBudgetData(data).then(
      (response) => {
        console.log("api call");
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_budget_status: status.SUCCESS,
                  budget_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_budget_status: status.FAILURE,
                budget_data: response,
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
              get_budget_status: status.FAILURE,
              budget_data: error.message,
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
