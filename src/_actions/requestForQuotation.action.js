import { status } from "../_constants";
import { requestForQuotataionServices } from "../_services";
import { alert } from "../_utilities";

export const requestForQuotationAction = {
  getRequestQuotationData,
  createRfq,
  rfqQuotationPost,
};




function rfqQuotationPost(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          rfq_status: status.IN_PROGRESS,
          rfq_data: null,
        },
      })
    );
    requestForQuotataionServices.rfqQuotationPost(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  crfq_status: status.SUCCESS,
                  rfq_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                rfq_status: status.FAILURE,
                fq_data: response,
              },
            })
          );
          alert.error(response.message);
        }
      },
      //   if (response.code == 200) {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.SUCCESS,
      //         data: {
      //           get_request_status: status.SUCCESS,
      //           request_data: response.object,
      //         },
      //       })
      //     );
      //   } else {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.FAILURE,
      //         data: {
      //           department_status: status.FAILURE,
      //           request_data: response,
      //         },
      //       })
      //     );
      //     alert.error(response.message);
      //   }
      // },
      (error) => {
        dispatch(
          dispatchFunction({
            type: status.FAILURE,
            data: {
              rfq_status: status.FAILURE,
              rfq_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}





function createRfq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          create_rfq_status: status.IN_PROGRESS,
          createrfq_data: null,
        },
      })
    );
    requestForQuotataionServices.createRfq(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  create_rfq_status: status.SUCCESS,
                  createrfq_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                create_rfq_status: status.FAILURE,
                createrfq_data: response,
              },
            })
          );
          alert.error(response.message);
        }
      },
      //   if (response.code == 200) {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.SUCCESS,
      //         data: {
      //           get_request_status: status.SUCCESS,
      //           request_data: response.object,
      //         },
      //       })
      //     );
      //   } else {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.FAILURE,
      //         data: {
      //           department_status: status.FAILURE,
      //           request_data: response,
      //         },
      //       })
      //     );
      //     alert.error(response.message);
      //   }
      // },
      (error) => {
        dispatch(
          dispatchFunction({
            type: status.FAILURE,
            data: {
              create_rfq_status: status.FAILURE,
              createrfq_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getRequestQuotationData(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_request_status: status.IN_PROGRESS,
          request_data: null,
        },
      })
    );
    requestForQuotataionServices.getRequestQuotationData(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_request_status: status.SUCCESS,
                  request_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_request_status: status.FAILURE,
                request_data: response,
              },
            })
          );
          alert.error(response.message);
        }
      },
      // (response) => {
      //   if (response.code == 200) {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.SUCCESS,
      //         data: {
      //           get_request_status: status.SUCCESS,
      //           request_data: response.object,
      //         },
      //       })
      //     );
      //   } else {
      //     dispatch(
      //       dispatchFunction({
      //         type: status.FAILURE,
      //         data: {
      //           department_status: status.FAILURE,
      //           request_data: response,
      //         },
      //       })
      //     );
      //     alert.error(response.message);
      //   }
      // },
      (error) => {
        dispatch(
          dispatchFunction({
            type: status.FAILURE,
            data: {
              get_request_status: status.FAILURE,
              request_data: error.message,
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
