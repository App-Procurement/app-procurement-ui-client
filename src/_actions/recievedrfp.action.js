import { status } from "../_constants";
import { recievedrfpServices } from "../_services";
import { alert } from "../_utilities";

export const recievedrfpAction = {
  searchRecievedRFP,
  getRecieveRFP,
  addRecieveRFP,
  searchRecievedRFQ,
  getRecieveRFQ,
  addRecieveRFQ,
  getTrackRfpData,
  sendRFQ,
  getActivites,
};

function searchRecievedRFP(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          recieved_rfp_status: status.IN_PROGRESS,
          recieved_rfp_list: null,
        },
      })
    );
    recievedrfpServices.searchRecievedRFP(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                recieved_rfp_status: status.SUCCESS,
                recieved_rfp_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                recieved_rfp_status: status.FAILURE,
                recieved_rfp_list: response,
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
              recieved_rfp_status: status.FAILURE,
              recieved_rfp_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getActivites(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_activity_status: status.IN_PROGRESS,
          get_activity_list: null,
        },
      })
    );
    recievedrfpServices.getActivites(data).then(
      (response) => {
        if (response.code == 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_activity_status: status.SUCCESS,
                get_activity_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_activity_status: status.FAILURE,
                get_activity_list: response,
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
              get_activity_status: status.FAILURE,
              get_activity_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getRecieveRFP(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          recieved_rfp_status: status.IN_PROGRESS,
          recieved_rfp_data: null,
        },
      })
    );
    recievedrfpServices.getRecieveRFP(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                recieved_rfp_status: status.SUCCESS,
                recieved_rfp_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                recieved_rfp_status: status.FAILURE,
                recieved_rfp_data: response,
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
              recieved_rfp_status: status.FAILURE,
              recieved_rfp_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function addRecieveRFP(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_recieved_rfp_status: status.IN_PROGRESS,
          recieved_rfp_res: null,
        },
      })
    );
    recievedrfpServices.addRecieveRFP(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                add_recieved_rfp_status: status.SUCCESS,
                recieved_rfp_res: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_recieved_rfp_status: status.FAILURE,
                recieved_rfp_res: response,
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
              add_recieved_rfp_status: status.FAILURE,
              recieved_rfp_res: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function searchRecievedRFQ(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          fetch_recieved_rfq_status: status.IN_PROGRESS,
          recieved_rfq_list: null,
        },
      })
    );
    recievedrfpServices.searchRecievedRFQ().then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                fetch_recieved_rfq_status: status.SUCCESS,
                recieved_rfq_list: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                fetch_recieved_rfq_status: status.FAILURE,
                recieved_rfq_list: response,
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
              fetch_recieved_rfq_status: status.FAILURE,
              recieved_rfq_list: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getRecieveRFQ(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          recieved_rfq_status: status.IN_PROGRESS,
          recieved_rfq_data: null,
        },
      })
    );
    recievedrfpServices.getRecieveRFQ(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                recieved_rfq_status: status.SUCCESS,
                recieved_rfq_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                recieved_rfq_status: status.FAILURE,
                recieved_rfq_data: response,
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
              recieved_rfq_status: status.FAILURE,
              recieved_rfq_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function addRecieveRFQ(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          create_recieved_rfq_status: status.IN_PROGRESS,
          create_recieved_rfq_res: null,
        },
      })
    );
    recievedrfpServices.addRecieveRFQ(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                create_recieved_rfq_status: status.SUCCESS,
                create_recieved_rfq_res: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                create_recieved_rfq_status: status.FAILURE,
                create_recieved_rfq_res: response,
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
              create_recieved_rfq_status: status.FAILURE,
              create_recieved_rfq_res: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getTrackRfpData(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          track_frp_status: status.IN_PROGRESS,
          track_frp_data: null,
        },
      })
    );
    recievedrfpServices.getTrackRfpData(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                track_frp_status: status.SUCCESS,
                track_frp_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                track_frp_status: status.FAILURE,
                track_frp_data: response,
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
              track_frp_status: status.FAILURE,
              track_frp_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function sendRFQ(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          send_frq_status: status.IN_PROGRESS,
          send_rfq_data: null,
        },
      })
    );
    recievedrfpServices.sendRFQ(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                send_frq_status: status.SUCCESS,
                send_rfq_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                send_frq_status: status.FAILURE,
                send_rfq_data: response,
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
              send_frq_status: status.FAILURE,
              send_rfq_data: error.message,
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
