import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import groupData from "./../Dummy-data.json";
import { settingAction } from "../../../_actions";
import { status } from "../../../_constants";
import { connect } from "react-redux";

class SuperAdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      superAdminUsers: [],
      superAdminUsersSelected: [],
      groupsData: groupData,
      groupUsersData: {},
      superAdminAssignedUserSelected: [],
      superAdminSearch: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getRolesAndPermissions());
    dispatch(settingAction.getGroups());
    dispatch(settingAction.getAllSettingGroupData());
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      get_roles_and_permissios_status,
      get_roles_and_permissios_data,
      get_groups_status,
      get_groups_data,
      get_group_status,
      group_data,
    } = this.props;

    if (
      get_group_status !== prevProps.get_group_status &&
      get_group_status === status.SUCCESS
    ) {
      if (group_data && Object.keys(group_data).length > 0) {
        this.setState({ groupUsersData: { ...group_data } });
      }
    }

    if (
      get_roles_and_permissios_status !==
        prevProps.get_roles_and_permissios_status &&
      get_roles_and_permissios_status === status.SUCCESS
    ) {
      if (
        get_roles_and_permissios_data &&
        get_roles_and_permissios_data.length > 0
      ) {
        let data = [
          ...JSON.parse(JSON.stringify(get_roles_and_permissios_data)),
        ];
        for (let i = 0; i < data.length; i++) {
          data[i]["isChecked"] = false;
        }
        this.setState({ rolesAndPermissions: data });
      }
    }

    if (
      get_groups_status !== prevProps.get_groups_status &&
      get_groups_status === status.SUCCESS
    ) {
      if (get_groups_data && get_groups_data.length > 0) {
        this.setState({
          groupsList: [...JSON.parse(JSON.stringify(get_groups_data))],
          dupGroupsList: [...JSON.parse(JSON.stringify(get_groups_data))],
        });
      }
    }
  }

  superAdminUsersSelect = (e, data) => {
    const { superAdminUsersSelected } = this.state;
    if (e.target.checked) {
      this.setState({
        superAdminUsersSelected: [...superAdminUsersSelected, data],
      });
    } else {
      let selectedArray = superAdminUsersSelected;
      selectedArray = selectedArray.filter(
        (item) => item.availble_user !== e.target.value
      );
      this.setState({ superAdminUsersSelected: selectedArray });
    }
  };

  superAdminAssignedUserSelect = (e, data) => {
    const { superAdminAssignedUserSelected } = this.state;
    if (e.target.checked) {
      this.setState({
        superAdminAssignedUserSelected: [
          ...superAdminAssignedUserSelected,
          data,
        ],
      });
    } else {
      let selectedArray = superAdminAssignedUserSelected;
      selectedArray = selectedArray.filter(
        (item) => item.assign_user !== e.target.value
      );
      this.setState({ superAdminAssignedUserSelected: selectedArray });
    }
  };

  assignSelectedUsers = () => {
    const { superAdminUsersSelected, groupUsersData } = this.state;

    const clone = JSON.parse(JSON.stringify(superAdminUsersSelected));
    for (let i = 0; i < clone.length; i++) {
      clone[i].assign_user = clone[i]["availble_user"];
      delete clone[i].availble_user;
    }

    if (superAdminUsersSelected.length > 0) {
      let assignedUsers = groupUsersData.assignedUsers;

      for (let i = 0, len = assignedUsers.length; i < len; i++) {
        for (let j = 0, len2 = clone.length; j < len2; j++) {
          if (assignedUsers[i].id === clone[j].id) {
            clone.splice(j, 1);
            len2 = clone.length;
          }
        }
      }

      groupUsersData.assignedUsers = [
        ...groupUsersData.assignedUsers,
        ...clone,
      ];
      this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
      this.setState({ superAdminUsersSelected: [] });
    }
  };

  moveAllUsers = () => {
    const { groupUsersData } = this.state;

    let avaliableUsers = groupUsersData.avaliableUsers;
    const clone = JSON.parse(JSON.stringify(avaliableUsers));
    for (let i = 0; i < clone.length; i++) {
      clone[i].assign_user = clone[i]["availble_user"];
      delete clone[i].availble_user;
    }

    let assignedUsers = groupUsersData.assignedUsers;

    for (let i = 0, len = assignedUsers.length; i < len; i++) {
      for (let j = 0, len2 = clone.length; j < len2; j++) {
        if (assignedUsers[i].id === clone[j].id) {
          clone.splice(j, 1);
          len2 = clone.length;
        }
      }
    }

    let newData = assignedUsers.concat(clone);

    groupUsersData.assignedUsers = newData;
    this.setState({ groupUsersData });
    this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
  };

  deleteSelectedAssignedUsers = () => {
    const { groupUsersData, superAdminAssignedUserSelected } = this.state;
    let newData = groupUsersData.assignedUsers;
    newData = newData.filter(
      (item) => !superAdminAssignedUserSelected.includes(item)
    );
    groupUsersData.assignedUsers = newData;
    this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
    this.setState({ superAdminAssignedUserSelected: [] });
  };

  deleteAllUsers = () => {
    const { groupUsersData } = this.state;
    groupUsersData.assignedUsers = [];
    this.setState({ groupUsersData });
    this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
  };

  handleSuperUserSearch = (e) => {
    const { value } = e.target;
    let values = [];
    const { groupUsersData } = this.state;
    const usersList = groupUsersData.avaliableUsers;
    if (value) {
      this.setState({ superAdminSearch: false });
      for (let i = 0; i < usersList.length; i++) {
        let user = usersList[i];
        if (
          user.availble_user.toLowerCase().indexOf(value.toLowerCase()) !== -1
        ) {
          values.push(user);
        }
      }
    } else {
      values = JSON.parse(JSON.stringify(usersList));
      this.setState({ superAdminSearch: true });
    }
    this.setState({ superAdminUsers: values });
  };

  render() {
    const {
      superAdminUsers,
      superAdminUsersSelected,
      groupUsersData,
      superAdminAssignedUserSelected,
    } = this.state;
    return (
      <>
        <div className="users-tabs">
          <div className="tabs-content active">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="users-tabs-content">
                  <h5>Avaliable Users</h5>
                  <SimpleBar className="users-tabs-inner-content">
                    {superAdminUsers.length > 0 ? (
                      <>
                        {superAdminUsers.map((data) => (
                          <FormControlLabel
                            className="d-block"
                            control={
                              <Checkbox
                                name="checkedB"
                                color="primary"
                                value={data.availble_user}
                                checked={
                                  superAdminUsersSelected.find(
                                    (item) => item.id === data.id
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  this.superAdminUsersSelect(event, data);
                                }}
                              />
                            }
                            label={data.availble_user}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {groupUsersData?.avaliableUsers &&
                        this.state.superAdminSearch === true ? (
                          groupUsersData.avaliableUsers.map((data) => (
                            <FormControlLabel
                              className="d-block"
                              control={
                                <Checkbox
                                  name="checkedB"
                                  color="primary"
                                  value={data.availble_user}
                                  checked={
                                    superAdminUsersSelected.find(
                                      (item) => item.id === data.id
                                    )
                                      ? true
                                      : false
                                  }
                                  onChange={(event) => {
                                    this.superAdminUsersSelect(event, data);
                                  }}
                                />
                              }
                              label={data.availble_user}
                            />
                          ))
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="users-tabs-content">
                  <h5>Assigned Users</h5>
                  <SimpleBar className="users-tabs-inner-content">
                    {groupUsersData?.assignedUsers ? (
                      <>
                        {groupUsersData.assignedUsers.map((data) => (
                          <FormControlLabel
                            className="d-block"
                            control={
                              <Checkbox
                                name="checkedB"
                                color="primary"
                                value={data.assign_user}
                                checked={
                                  superAdminAssignedUserSelected.find(
                                    (item) => item.id === data.id
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  this.superAdminAssignedUserSelect(
                                    event,
                                    data
                                  );
                                }}
                              />
                            }
                            label={data.assign_user}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    get_roles_and_permissios_status,
    get_roles_and_permissios_data,
    get_groups_status,
    get_groups_data,
    get_group_status,
    group_data,
  } = state.procurement;
  return {
    get_roles_and_permissios_status,
    get_roles_and_permissios_data,
    get_groups_status,
    get_groups_data,
    get_group_status,
    group_data,
  };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  SuperAdminUsers
);
