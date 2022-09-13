import { status } from "../_constants";
import { invoiceServices } from "../_services";
import { alert } from "../_utilities";

export const invoiceAction = {
  addInvoice,
  deleteInvoice,
  getInvoice,
  searchInvoice,
  updateInvoice,
  getNewInvoice,
};

function addInvoice(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_invoice_status: status.IN_PROGRESS,
          addInvoice: null,
        },
      })
    );
    invoiceServices.addInvoice(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  add_invoice_status: status.SUCCESS,
                  addInvoice: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_invoice_status: status.FAILURE,
                addInvoice: response,
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
              add_invoice_status: status.FAILURE,
              addInvoice: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function deleteInvoice(id) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          delete_invoice_status: status.IN_PROGRESS,
          deleteInvoice: null,
        },
      })
    );
    invoiceServices.deleteInvoice(id).then(
      (response) => {
        if (response.status) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                delete_invoice_status: status.SUCCESS,
                deleteInvoice: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_invoice_status: status.FAILURE,
                deleteInvoice: response,
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
              delete_invoice_status: status.FAILURE,
              deleteInvoice: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getInvoice(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_invoice_status: status.IN_PROGRESS,
          get_invoice_data: null,
        },
      })
    );
    invoiceServices.getInvoice(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_invoice_status: status.SUCCESS,
                  get_invoice_data: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_invoice_status: status.FAILURE,
                get_invoice_data: response,
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
              get_invoice_status: status.FAILURE,
              get_invoice_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getNewInvoice(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_new_invoice_status: status.IN_PROGRESS,
          new_invoice_data: null,
        },
      })
    );
    invoiceServices.getNewInvoice(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_new_invoice_status: status.SUCCESS,
                new_invoice_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_new_invoice_status: status.FAILURE,
                new_invoice_data: response,
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
              get_new_invoice_status: status.FAILURE,
              new_invoice_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function searchInvoice(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_invoice_status: status.IN_PROGRESS,
          search_invoice_data: null,
        },
      })
    );
    invoiceServices.searchInvoice(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  search_invoice_status: status.SUCCESS,
                  search_invoice_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_invoice_status: status.FAILURE,
                search_invoice_data: response,
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
              search_invoice_status: status.FAILURE,
              search_invoice_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function updateInvoice(id) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          update_invoice_status: status.IN_PROGRESS,
          update_invoice: null,
        },
      })
    );
    invoiceServices.updateInvoice(id).then(
      (response) => {
        if (response.status) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                update_invoice_status: status.SUCCESS,
                update_invoice: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                update_invoice_status: status.FAILURE,
                update_invoice: response,
              },
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
              update_invoice_status: status.FAILURE,
              update_invoice: error.message,
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
