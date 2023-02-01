import { status } from "../_constants";
import { ProductServices } from "../_services";
import { alert } from "../_utilities";

export const productActions = {
  searchProductList,
  addProduct,
  deleteProduct,
};
function searchProductList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_product_list_status: status.IN_PROGRESS,
          search_product_list: null,
        },
      })
    );
    ProductServices.searchProductList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_product_list_status: status.SUCCESS,
                search_product_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_product_list_status: status.FAILURE,
                search_product_list: response,
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
              search_product_list_status: status.FAILURE,
              search_product_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function deleteProduct(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          delete_product_status: status.IN_PROGRESS,
          delete_product: null,
        },
      })
    );
    ProductServices.deleteProduct(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  delete_product_status: status.SUCCESS,
                  delete_product: data,
                },
              })
            );
            alert.success("Product delete successfully");
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_product_status: status.FAILURE,
                delete_product: response,
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
              delete_product_status: status.FAILURE,
              delete_product: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function addProduct(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_product_status: status.IN_PROGRESS,
          add_product: null,
        },
      })
    );
    ProductServices.addProduct(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  add_product_status: status.SUCCESS,
                  add_product: data,
                },
              })
            );
            alert.success("Product Added successfully");
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_product_status: status.FAILURE,
                add_product: response,
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
              add_product_status: status.FAILURE,
              add_product: error.message,
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
