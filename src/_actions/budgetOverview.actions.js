import { status } from "../_constants";
import { budgetServices } from "../_services";
import { alert } from "../_utilities";

export const budgetActions = {
  getBugetOverview,
  getBugetAllocated,
  sendBudghetAllocation,
};
function getBugetOverview(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          budget_overview_status: status.IN_PROGRESS,
          budget_overview_data: null,
        },
      })
    );
    budgetServices.getBudgetOverview(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                budget_overview_status: status.SUCCESS,
                budget_overview_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                budget_overview_status: status.FAILURE,
                budget_overview_data: response,
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
              budget_overview_status: status.FAILURE,
              budget_overview_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getBugetAllocated(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          budget_allocated_status: status.IN_PROGRESS,
          budget_allocated_data: null,
        },
      })
    );
    budgetServices.getBudgetAllocated(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                budget_allocated_status: status.SUCCESS,
                budget_allocated_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                budget_allocated_status: status.FAILURE,
                budget_allocated_data: response,
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
              budget_allocated_status: status.FAILURE,
              budget_allocated_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function sendBudghetAllocation(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          budgetAllocation_status: status.FAILURE,
          budgetAllocation_data: null,
        },
      })
    );
    budgetServices.sendBudgeAllocation(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                budgetAllocation_status: status.SUCCESS,
                budgetAllocation_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                budgetAllocation_status: status.FAILURE,
                budgetAllocation_data: response,
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
              budgetAllocation_status: status.FAILURE,
              budgetAllocation_data: error.message,
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
