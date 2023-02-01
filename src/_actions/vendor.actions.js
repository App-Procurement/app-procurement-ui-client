import { status } from "../_constants";
import { vendorServices } from "../_services";
import { alert } from "../_utilities";

export const vendorAction = {
  addVendor,
  deleteVendor,
  fetchVendorList,
  getVendorQuotation,
};

function addVendor(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_vendor_status: status.IN_PROGRESS,
          addVendor: null,
        },
      })
    );
    vendorServices.addVendor(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                add_vendor_status: status.SUCCESS,
                addVendor: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_vendor_status: status.FAILURE,
                addVendor: response,
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
              add_vendor_status: status.FAILURE,
              addVendor: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function deleteVendor(id) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          delete_vendor_status: status.IN_PROGRESS,
          deleteVendor: null,
        },
      })
    );
    vendorServices.deleteVendors(id).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                delete_vendor_status: status.SUCCESS,
                deleteVendor: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_vendor_status: status.FAILURE,
                deleteVendor: response,
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
              delete_vendor_status: status.FAILURE,
              deleteVendor: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function fetchVendorList() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_vendor_status: status.IN_PROGRESS,
          getVendor: null,
        },
      })
    );
    vendorServices.fetchVendors().then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_vendor_status: status.SUCCESS,
                getVendor: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_vendor_status: status.FAILURE,
                getVendor: response,
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
              get_vendor_status: status.FAILURE,
              getVendor: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getVendorQuotation(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          vendor_quotation_status: status.IN_PROGRESS,
          vendor_quotation: null,
        },
      })
    );
    vendorServices.vendorQuotation(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                vendor_quotation_status: status.SUCCESS,
                vendor_quotation: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                vendor_quotation_status: status.FAILURE,
                vendor_quotation: response,
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
              vendor_quotation_status: status.FAILURE,
              vendor_quotation: error.message,
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
