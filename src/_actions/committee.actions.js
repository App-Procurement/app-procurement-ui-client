import { status } from "../_constants";
import { committeeServices } from "../_services";
import { alert } from "../_utilities";

export const committeeAction = {
  addCommittee,

  getCommitteeType,
  searchCommittee,

  addSelectedMember,
};

function addCommittee(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_committee_status: status.IN_PROGRESS,
          addCommittee: null,
        },
      })
    );
    committeeServices.addCommittee(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          alert.success("Send Invitation Successfully");
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  add_committee_status: status.SUCCESS,
                  addCommittee: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_committee_status: status.FAILURE,
                addCommittee: response,
              },
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: status.SUCCESS,
            data: {
              add_committee_status: status.FAILURE,
              addCommittee: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function searchCommittee(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          search_committee_status: status.IN_PROGRESS,
          searchCommittee: null,
        },
      })
    );
    committeeServices.searchCommittee(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  search_committee_status: status.SUCCESS,
                  searchCommittee: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                search_committee_status: status.FAILURE,
                searchCommittee: response,
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
              search_committee_status: status.FAILURE,
              searchCommittee: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getCommitteeType(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_committee_type_status: status.IN_PROGRESS,
          getCommitteeType: null,
        },
      })
    );
    committeeServices.getCommitteeType(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_committee_type_status: status.SUCCESS,
                  getCommitteeType: data,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_committee_type_status: status.FAILURE,
                getCommitteeType: response,
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
              get_committee_type_status: status.FAILURE,
              getCommitteeType: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function addSelectedMember(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.SUCCESS,
        data: {
          selected_committee_status: status.SUCCESS,
          selected_member_list: data,
        },
      })
    );
  };
}

function dispatchFunction(data) {
  return {
    type: data.type,
    data: data.data,
  };
}
