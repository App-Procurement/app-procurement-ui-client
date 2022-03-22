import { status } from "../_constants";
import { emailServices } from "../_services";
import { alert, commonFunctions } from "../_utilities";

export const emailActions = {
  recentcommunication,
  searchallemails,
  sendEmail,
  getEmailDetail,
  deleteEmail,
  reademail,
  searchallinboxemails,
};

function recentcommunication(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_email_status: status.IN_PROGRESS,
          search_email: null,
        },
      })
    );
    emailServices.recentCommunication(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_email_status: status.SUCCESS,
                search_email: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_email_status: status.FAILURE,
                search_email: response,
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
              search_email_status: status.FAILURE,
              search_email: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function searchallemails(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_all_email_status: status.IN_PROGRESS,
          search_all_email: null,
        },
      })
    );
    emailServices.searchallemails(data).then(
      (response) => {
        
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                search_all_email_status: status.SUCCESS,
                search_all_email: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_all_email_status: status.FAILURE,
                search_all_email: response,
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
              search_all_email_status: status.FAILURE,
              search_all_email: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function sendEmail(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          send_email_status: status.IN_PROGRESS,
          sendEmailRes: null,
        },
      })
    );
    emailServices.sendEmail(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                send_email_status: status.SUCCESS,
                sendEmailRes: response.object,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                send_email_status: status.FAILURE,
                sendEmailRes: response,
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
              send_email_status: status.FAILURE,
              sendEmailRes: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getEmailDetail(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_email_detail_status: status.IN_PROGRESS,
          emaildetail_res: null,
        },
      })
    );
    emailServices.getEmailDetail(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_email_detail_status: status.SUCCESS,
                emaildetail_res: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_email_detail_status: status.FAILURE,
                emaildetail_res: response,
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
              get_email_detail_status: status.FAILURE,
              emaildetail_res: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function deleteEmail(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          delete_email_status: status.IN_PROGRESS,
          delete_email_data: null,
        },
      })
    );
    emailServices.deleteEmail(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                delete_email_status: status.SUCCESS,
                delete_email_data: response.data,
              },
            })
          );
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_email_status: status.FAILURE,
                delete_email_data: response,
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
              delete_email_status: status.FAILURE,
              delete_email_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function reademail(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          read_email_status: status.IN_PROGRESS,
        },
      })
    );
    emailServices.readEmail(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                read_email_status: status.SUCCESS,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                read_email_status: status.FAILURE,
                read_email_data: response,
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
              read_email_status: status.FAILURE,
              read_email_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function searchallinboxemails(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.SUCCESS,
        data: {
          get_inbox_status: status.SUCCESS,
          // search_email: response.object,
        },
      })
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
