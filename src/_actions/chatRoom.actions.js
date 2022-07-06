import { status } from "../_constants";
import { chatRoomServices } from "../_services";
import { alert } from "../_utilities";

export const ChatRoomActions = { getChats, getMembersList, createChatRoom };

function getChats(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_contacts_status: status.IN_PROGRESS,
          get_contacts_data: null,
        },
      })
    );
    chatRoomServices.getChats(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_contacts_status: status.SUCCESS,
                get_contacts_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_contacts_status: status.FAILURE,
                get_contacts_data: response,
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
              get_contacts_status: status.FAILURE,
              get_contacts_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getMembersList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_members_status: status.IN_PROGRESS,
          get_members_data: null,
        },
      })
    );
    chatRoomServices.getMembersList(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                get_members_status: status.SUCCESS,
                get_members_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_members_status: status.FAILURE,
                get_members_data: response,
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
              get_members_status: status.FAILURE,
              get_members_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function createChatRoom(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          create_chat_room_status: status.IN_PROGRESS,
          create_chat_room_data: null,
        },
      })
    );
    chatRoomServices.createChatRoom(data).then(
      (response) => {
        if (response.code === 200) {
          dispatch(
            dispatchFunction({
              type: status.SUCCESS,
              data: {
                create_chat_room_status: status.SUCCESS,
                create_chat_room_data: response.object,
              },
            })
          );
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                create_chat_room_status: status.FAILURE,
                create_chat_room_data: response,
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
              create_chat_room_status: status.FAILURE,
              create_chat_room_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function dispatchFunction(data) {
  // if(data.data && data.data.code === 401){
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
