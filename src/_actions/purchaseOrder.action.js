import { status } from "../_constants";
import { purchaseOrderServices } from "../_services";
import { alert } from "../_utilities";

export const purchaseOrderAction = {
  addPurchaseOrder,
  getPurchaseOrder,
  searchPurchaseOrder,
  searchApprovePurchaseOrder,
  getApprovePurchaseOrder,
    approvePurchaseOrder,
};

function searchPurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_purchase_status: status.IN_PROGRESS,
          search_purchase_order: null,
        },
      })
    );
    purchaseOrderServices.searchPurchaseOrder(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_purchase_status: status.SUCCESS,
                search_purchase_order: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_purchase_status: status.FAILURE,
                search_purchase_order: response,
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
              search_purchase_status: status.FAILURE,
              search_purchase_order: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function searchApprovePurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          approvepo_status: status.IN_PROGRESS,
          approvepo_data: null,
        },
      })
    );
    purchaseOrderServices.approvePurchaseOrder(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                approvepo_status: status.SUCCESS,
                approvepo_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                approvepo_status: status.FAILURE,
                approvepo_data: response,
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
              approvepo_status: status.FAILURE,
              approvepo_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getApprovePurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_approvepo_status: status.IN_PROGRESS,
          search_approvepo: null,
        },
      })
    );
    purchaseOrderServices.getApprovePo(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_approvepo_status: status.SUCCESS,
                search_approvepo: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_approvepo_status: status.FAILURE,
                search_approvepo: response,
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
              search_approvepo_status: status.FAILURE,
              search_approvepo: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getPurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          purchase_order_status: status.IN_PROGRESS,
          purchase_order_data: null,
        },
      })
    );
    purchaseOrderServices.getPurchaseOrder(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                purchase_order_status: status.SUCCESS,
                purchase_order_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                purchase_order_status: status.FAILURE,
                purchase_order_data: response,
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
              purchase_order_status: status.FAILURE,
              purchase_order_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function addPurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_purchase_order_status: status.IN_PROGRESS,
          addPurchaseOrder: null,
        },
      })
    );
    purchaseOrderServices.addPurchaseOrder(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                add_purchase_order_status: status.SUCCESS,
                addPurchaseOrder: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_purchase_order_status: status.FAILURE,
                addPurchaseOrder: response,
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
              add_purchase_order_status: status.FAILURE,
              addPurchaseOrder: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function approvePurchaseOrder(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          update_approve_po_status:status.IN_PROGRESS,
          update_approve_po_data:null
        }
      })
    );
    purchaseOrderServices.approvePO(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
        data: {
          update_approve_po_status:status.SUCCESS,
          update_approve_po_data:response.object
        }
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                update_approve_po_status:status.FAILURE,
                update_approve_po_data:response
              }
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
              update_approve_po_status:status.FAILURE,
              update_approve_po_data:error.message
            }
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
