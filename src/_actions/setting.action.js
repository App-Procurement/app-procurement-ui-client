import { status } from "../_constants";
import { settingServices } from "../_services";
import { alert } from "../_utilities";

export const settingAction = {
  getWorkflow,
  createCompanyProfile,
  addWrokFlow,
  updateWorkFlow,
  removeWorkFlow,
  getRolesAndPermissions,
  getGroups,
  getUsers,
  getPreferences,
  getAllSettingGroupData,
  updateSuperAdminUsers,
};

function getWorkflow() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_approval_workflow_status: status.IN_PROGRESS,
          get_approval_workflow_data: null,
        },
      })
    );
    settingServices.getWorkflow().then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_approval_workflow_status: status.SUCCESS,
                  get_approval_workflow_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_approval_workflow_status: status.FAILURE,
                get_approval_workflow_data: response,
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
              get_approval_workflow_status: status.FAILURE,
              get_approval_workflow_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function createCompanyProfile(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          create_company_profile_status: status.IN_PROGRESS,
          create_company_profile_data: null,
        },
      })
    );
    settingServices.createCompanyProfile(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  create_company_profile_status: status.SUCCESS,
                  create_company_profile_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                create_company_profile_status: status.FAILURE,
                create_company_profile_data: response,
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
              create_company_profile_status: status.FAILURE,
              create_company_profile_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function addWrokFlow(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          add_approval_workflow_status: status.IN_PROGRESS,
          add_approval_workflow_data: null,
        },
      })
    );
    settingServices.addWrokFlow(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  add_approval_workflow_status: status.SUCCESS,
                  add_approval_workflow_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                add_approval_workflow_status: status.FAILURE,
                add_approval_workflow_data: response,
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
              add_approval_workflow_status: status.FAILURE,
              add_approval_workflow_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function updateWorkFlow(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          update_approval_workflow_status: status.IN_PROGRESS,
          update_approval_workflow_data: null,
        },
      })
    );
    settingServices.updateWorkFlow(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  update_approval_workflow_status: status.SUCCESS,
                  update_approval_workflow_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                update_approval_workflow_status: status.FAILURE,
                update_approval_workflow_data: response,
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
              update_approval_workflow_status: status.FAILURE,
              update_approval_workflow_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function updateSuperAdminUsers(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          update_super_admin_users_status: status.IN_PROGRESS,
          update_super_admin_users_data: null,
        },
      })
    );
    settingServices.updateSuperAdminUsers(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  update_super_admin_users_status: status.SUCCESS,
                  update_super_admin_users_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                update_super_admin_users_status: status.FAILURE,
                update_super_admin_users_data: response,
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
              update_super_admin_users_status: status.FAILURE,
              update_super_admin_users_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function removeWorkFlow(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          remove_approval_workflow_status: status.IN_PROGRESS,
          remove_approval_workflow_data: null,
        },
      })
    );
    settingServices.removeWorkFlow(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  remove_approval_workflow_status: status.SUCCESS,
                  remove_approval_workflow_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                remove_approval_workflow_status: status.FAILURE,
                remove_approval_workflow_data: response,
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
              remove_approval_workflow_status: status.FAILURE,
              remove_approval_workflow_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getRolesAndPermissions(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_roles_and_permissios_status: status.IN_PROGRESS,
          get_roles_and_permissios_data: null,
        },
      })
    );
    settingServices.getRolesAndPermissions(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_roles_and_permissios_status: status.SUCCESS,
                  get_roles_and_permissios_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_roles_and_permissios_status: status.FAILURE,
                get_roles_and_permissios_data: response,
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
              get_roles_and_permissios_status: status.FAILURE,
              get_roles_and_permissios_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getGroups() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_groups_status: status.IN_PROGRESS,
          get_groups_data: null,
        },
      })
    );
    settingServices.getGroups().then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_groups_status: status.SUCCESS,
                  get_groups_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_groups_status: status.FAILURE,
                get_groups_data: response,
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
              get_groups_status: status.FAILURE,
              get_groups_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getUsers() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_users_status: status.IN_PROGRESS,
          get_users_data: null,
        },
      })
    );
    settingServices.getUsers().then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_users_status: status.SUCCESS,
                  get_users_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_users_status: status.FAILURE,
                get_users_data: response,
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
              get_users_status: status.FAILURE,
              get_users_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}
function getPreferences() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_Preferences_status: status.IN_PROGRESS,
          get_Preferences_data: null,
        },
      })
    );
    settingServices.getPreferences().then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_Preferences_status: status.SUCCESS,
                  get_Preferences_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_Preferences_status: status.FAILURE,
                get_Preferences_data: response,
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
              get_Preferences_status: status.FAILURE,
              get_Preferences_data: error.message,
            },
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getAllSettingGroupData(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: status.IN_PROGRESS,
        data: {
          get_group_status: status.IN_PROGRESS,
          group_data: null,
        },
      })
    );
    settingServices.getAllSettingGroupData(data).then(
      (response) => {
        const code = response.status;
        if (code === 200) {
          response.json().then((data) => {
            dispatch(
              dispatchFunction({
                type: status.SUCCESS,
                data: {
                  get_group_status: status.SUCCESS,
                  group_data: data.object,
                },
              })
            );
          });
        } else {
          dispatch(
            dispatchFunction({
              type: status.FAILURE,
              data: {
                get_group_status: status.FAILURE,
                group_data: response,
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
              get_group_status: status.FAILURE,
              group_data: error.message,
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
