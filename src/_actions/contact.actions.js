import { status } from '../_constants';
import { contactServices } from '../_services';
import { alert, commonFunctions } from '../_utilities';

export const contactAction = {
  addContact,
  deleteContact,
  fetchContactList,
  getContactData,
  updateContact,
  sendInvitation
};

function fetchContactList() {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        get_contact_status: status.IN_PROGRESS,
        getContact: null
      }
    }));
    contactServices.fetchContactList()
      .then(
        response => {
          if (response.code == 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_contact_status: status.SUCCESS,
                getContact: response.object
              }
            }));
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                get_contact_status: status.SUCCESS,
                getContact: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.FAILURE,
            data: {
              get_contact_status: status.SUCCESS,
              getContact: error.message
            }
          }));
          alert.error(error.message);
        }
      );
  };
}

function addContact(data) {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        add_contact_status: status.IN_PROGRESS,
        addContact: null
      }
    }));
    contactServices.addContact(data)
      .then(
        response => {
          if (response.code == 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                add_contact_status: status.SUCCESS,
                addContact: response.object
              }
            }));
            alert.success(response.message);
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                add_contact_status: status.FAILURE,
                addContact: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.IN_PROGRESS,
            data: {
              add_contact_status: status.FAILURE,
              addContact: error.message
            }
          }));
          alert.error(error.message);
        }
      );
  };
}

function deleteContact(id) {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        delete_contact_status: status.IN_PROGRESS,
        deleteContact: null
      }
    }));
    contactServices.deleteContact(id)
      .then(
        response => {
          if (response.code == 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                delete_contact_status: status.SUCCESS,
                deleteContact: response.object
              }
            }));
            alert.success(response.message);
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                delete_contact_status: status.FAILURE,
                deleteContact: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.FAILURE,
            data: {
              delete_contact_status: status.FAILURE,
              deleteContact: error.message
            }
          }));
          alert.error(error.message);
        }
      );
  };
}

function getContactData(data) {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        get_contact_status: status.IN_PROGRESS,
        getContact: null
      }
    }));
    contactServices.getContactData(data)
      .then(
        response => {
          if (response.code == 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_contact_status: status.SUCCESS,
                getContact: response.object
              }
            }));
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                get_contact_status: status.FAILURE,
                getContact: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.FAILURE,
            data: {
              get_contact_status: status.FAILURE,
              getContact: error.message
            }
          }));
          alert.error(error.message);
        }
      );
  };
}

function updateContact(data) {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        update_contact_status: status.IN_PROGRESS,
        updateContact: null
      }
    }));
    contactServices.updateContact(data)
      .then(
        response => {
          if (response.code == 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                update_contact_status: status.SUCCESS,
                updateContact: response.object
              }
            }));
            alert.success(response.message);
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                update_contact_status: status.FAILURE,
                updateContact: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.FAILURE,
            data: {
              update_contact_status: status.FAILURE,
              updateContact: error.message
            }
          }));
          alert.error(error.message);
        }
      );
  };
}

function sendInvitation(data) {
  return dispatch => {
    dispatch(dispatchFunction({
      type: status.IN_PROGRESS,
      data: {
        send_invitation_status: status.IN_PROGRESS,
        invitation_res: null
      }
    }));
    contactServices.sendInvitation(data)
      .then(
        response => {
          if (response.code === 200) {
            dispatch(dispatchFunction({
              type: status.SUCCESS,
              data: {
                send_invitation_status: status.SUCCESS,
                invitation_res: response.object
              }
            }));
            alert.success(response.message);
          } else {
            dispatch(dispatchFunction({
              type: status.FAILURE,
              data: {
                send_invitation_status: status.FAILURE,
                invitation_res: response
              }
            }));
            alert.error(response.message);
          }
        },
        error => {
          dispatch(dispatchFunction({
            type: status.FAILURE,
            data: {
              send_invitation_status: status.FAILURE,
              invitation_res: error.message
            }
          }));
          alert.error(error.message);
        }
      )
  }
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
    data: data.data
  };
}