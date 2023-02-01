import { status } from "../_constants";
import { manageSupplierServices } from "../_services";
import { alert } from "../_utilities";

export const manageSupplierAction = {
  searchSupplierList,
  updateSupplierList,
  addSupplier,
  deleteSupplier,
};

function searchSupplierList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_suplier_list_status: status.IN_PROGRESS,
          search_supplier_list: null,
        },
      })
    );
    manageSupplierServices.searchSupplierList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_suplier_list_status: status.SUCCESS,
                search_supplier_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_suplier_list_status: status.FAILURE,
                search_supplier_list: response,
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
              search_suplier_list_status: status.FAILURE,
              search_supplier_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function updateSupplierList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          update_suplier_list_status: status.IN_PROGRESS,
          update_supplier_list: null,
        },
      })
    );
    manageSupplierServices.updateSupplierList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                update_suplier_list_status: status.SUCCESS,
                update_supplier_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                update_suplier_list_status: status.FAILURE,
                update_supplier_list: response,
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
              update_suplier_list_status: status.FAILURE,
              update_supplier_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function deleteSupplier(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          delete_suplier_list_status: status.IN_PROGRESS,
          delete_supplier_list: null,
        },
      })
    );
    manageSupplierServices.deleteSupplier(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                delete_suplier_list_status: status.SUCCESS,
                delete_supplier_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_suplier_list_status: status.FAILURE,
                delete_supplier_list: response,
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
              delete_suplier_list_status: status.FAILURE,
              delete_supplier_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function addSupplier(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_supplier_status: status.IN_PROGRESS,
          add_supplier_res: null,
        },
      })
    );
    manageSupplierServices.addSupplier(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                add_supplier_status: status.SUCCESS,
                add_supplier_res: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_supplier_status: status.FAILURE,
                add_supplier_res: response,
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
              add_supplier_status: status.FAILURE,
              add_supplier_res: error.message,
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
