import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag } from "sortablejs";
import { Button } from "@mui/material";
import { settingAction } from "../../../_actions";
import { status } from "../../../_constants";
import { connect } from "react-redux";

Sortable.mount(new MultiDrag());

class SuperAdminRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      superAdminRoles: [],
      groupUsersData: {},
      superAdminSearch: true,
      superAdminRolesSelected: [],
      superAdminAssignedRolesSelected: [],
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

  getCSSClassBasedOnRole = (type) => {
    if (type === "a") {
      return "group-btn green-btn";
    } else if (type === "b") {
      return "group-btn onahau-btn";
    }
    return "group-btn magnolia-btn";
  };

  superAdminRolesSelect = (index) => {
    const { superAdminRolesSelected, groupUsersData, superAdminRoles } =
      this.state;

    if (superAdminRoles.length > 0) {
      if (superAdminRoles[index].selected) {
        superAdminRoles[index].selected = false;
        this.setState({
          superAdminRolesSelected: [
            ...superAdminRolesSelected,
            superAdminRoles[index],
          ],
        });
      } else {
        let newRolesData = superAdminRolesSelected.filter(
          (item) => item.id !== superAdminRoles[index].id
        );
        this.setState({ superAdminRolesSelected: newRolesData });
      }
    } else {
      if (groupUsersData.avaliableUsersRoles[index].selected) {
        groupUsersData.avaliableUsersRoles[index].selected = false;
        this.setState({
          superAdminRolesSelected: [
            ...superAdminRolesSelected,
            groupUsersData.avaliableUsersRoles[index],
          ],
        });
      } else {
        let newRolesData = superAdminRolesSelected.filter(
          (item) => item.id !== groupUsersData.avaliableUsersRoles[index].id
        );
        this.setState({ superAdminRolesSelected: newRolesData });
      }
    }
  };

  deleteSelectedAssignedRoles = () => {
    const { groupUsersData, superAdminAssignedRolesSelected } = this.state;
    groupUsersData.assignedUsersRoles =
      groupUsersData.assignedUsersRoles.filter((item) => {
        if (superAdminAssignedRolesSelected.includes(item.id)) {
          return null;
        } else {
          return item;
        }
      });
    this.setState({ groupUsersData });
    this.setState({ superAdminAssignedRolesSelected: [] });
  };

  assignSelectedRoles = () => {
    const { superAdminRolesSelected, groupUsersData } = this.state;
    if (superAdminRolesSelected.length > 0) {
      const assignedUserRoles = groupUsersData.assignedUsersRoles;
      const availableRoles = JSON.parse(
        JSON.stringify(superAdminRolesSelected)
      );

      for (let i = 0, len = assignedUserRoles.length; i < len; i++) {
        for (let j = 0, len2 = availableRoles.length; j < len2; j++) {
          if (assignedUserRoles[i].id === availableRoles[j].id) {
            availableRoles.splice(j, 1);
            len2 = availableRoles.length;
          }
        }
      }

      groupUsersData.assignedUsersRoles = [
        ...groupUsersData.assignedUsersRoles,
        ...availableRoles,
      ];

      this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
      this.setState({ superAdminRolesSelected: [] });
    }
  };

  deleteAllRoles = () => {
    const { groupUsersData } = this.state;
    groupUsersData.assignedUsersRoles = [];
    this.setState({ groupUsersData });
    this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
  };

  moveAllRoles = () => {
    const { groupUsersData } = this.state;
    let avaliableUsersRoles = groupUsersData.avaliableUsersRoles;
    let assignedUserRoles = groupUsersData.assignedUsersRoles;

    const availableRoles = JSON.parse(JSON.stringify(avaliableUsersRoles));

    for (let i = 0, len = assignedUserRoles.length; i < len; i++) {
      for (let j = 0, len2 = availableRoles.length; j < len2; j++) {
        if (assignedUserRoles[i].id === availableRoles[j].id) {
          availableRoles.splice(j, 1);
          len2 = availableRoles.length;
        }
      }
    }

    let newData = assignedUserRoles.concat(availableRoles);
    groupUsersData.assignedUsersRoles = newData;
    this.setState({ groupUsersData });
    this.props.dispatch(settingAction.updateSuperAdminUsers(groupUsersData));
  };

  selectSuperAdminAssignedRoles = (index) => {
    let { groupUsersData, superAdminAssignedRolesSelected } = this.state;
    let assignedUserRole = groupUsersData.assignedUsersRoles[index];
    if (assignedUserRole.selected) {
      assignedUserRole.selected = true;
      superAdminAssignedRolesSelected.push(assignedUserRole.id);
    } else {
      assignedUserRole.selected = false;
      let elementIndex = superAdminAssignedRolesSelected.indexOf(
        assignedUserRole.id
      );
      if (elementIndex > -1) {
        superAdminAssignedRolesSelected.splice(elementIndex, 1);
      }
    }
  };

  handleSuperRoleSearch = (e) => {
    const { value } = e.target;
    let values = [];
    const { groupUsersData } = this.state;
    const rolesList = groupUsersData.avaliableUsersRoles;
    if (value) {
      this.setState({ superAdminSearch: false });
      for (let i = 0; i < rolesList.length; i++) {
        let user = rolesList[i];
        if (user.basicUser.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          values.push(user);
        }
      }
    } else {
      values = JSON.parse(JSON.stringify(rolesList));
      this.setState({ superAdminSearch: true });
    }
    this.setState({ superAdminRoles: values });
  };

  render() {
    const { superAdminRoles, groupUsersData } = this.state;
    return (
      <>
        <div className="users-tabs">
          <div className="tabs-content active">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <div className="users-tabs-content">
                  <h5>Avaliable Roles</h5>
                  <SimpleBar className="users-tabs-inner-content">
                    {superAdminRoles.length > 0 ? (
                      <ReactSortable
                        list={superAdminRoles}
                        setList={(newState) => {
                          this.setState({ superAdminRoles: newState });
                        }}
                        group={{
                          name: "groupRoles",
                          put: false,
                          pull: "clone",
                        }}
                        animation={200}
                        multiDrag={true}
                        selectedClass="roleSelected"
                        sort={false}
                      >
                        {superAdminRoles.map((data, index) => (
                          <>
                            <Button
                              variant="contained"
                              className={this.getCSSClassBasedOnRole(
                                data.userType
                              )}
                              onClick={() => this.superAdminRolesSelect(index)}
                            >
                              {data.basicUser}
                            </Button>
                          </>
                        ))}
                      </ReactSortable>
                    ) : (
                      <>
                        {groupUsersData?.avaliableUsersRoles &&
                        this.state.superAdminSearch === true ? (
                          <ReactSortable
                            list={groupUsersData.avaliableUsersRoles}
                            setList={(newState) => {
                              this.setState((prevState) => {
                                let groupUsersData = Object.assign(
                                  {},
                                  prevState.groupUsersData
                                );
                                groupUsersData.avaliableUsersRoles = newState;
                                return { groupUsersData };
                              });
                            }}
                            sort={false}
                            group={{
                              name: "groupRoles",
                              put: false,
                              pull: "clone",
                            }}
                            animation={200}
                            multiDrag={true}
                            selectedClass="roleSelected"
                          >
                            {groupUsersData.avaliableUsersRoles.map(
                              (data, index) => (
                                <>
                                  <Button
                                    variant="contained"
                                    className={this.getCSSClassBasedOnRole(
                                      data.userType
                                    )}
                                    onClick={() =>
                                      this.superAdminRolesSelect(index)
                                    }
                                  >
                                    {data.basicUser}
                                  </Button>
                                </>
                              )
                            )}
                          </ReactSortable>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <div className="users-tabs-content">
                  <h5>Assigned Roles</h5>
                  <SimpleBar className="users-tabs-inner-content">
                    <div className="assigned-roles-btn">
                      {groupUsersData?.assignedUsersRoles ? (
                        <ReactSortable
                          list={groupUsersData.assignedUsersRoles}
                          setList={(newState) => {
                            this.setState((prevState) => {
                              let groupUsersData = prevState.groupUsersData;
                              const uniqueIds = [];
                              const unique = newState.filter((element) => {
                                const isDuplicate = uniqueIds.includes(
                                  element.id
                                );
                                if (!isDuplicate) {
                                  uniqueIds.push(element.id);
                                  return true;
                                }
                                return false;
                              });
                              groupUsersData.assignedUsersRoles = unique;
                              return { groupUsersData };
                            });
                          }}
                          group={{
                            name: "groupRoles",
                            pull: "clone",
                          }}
                          animation={200}
                          multiDrag
                        >
                          {groupUsersData.assignedUsersRoles.map(
                            (data, index) => (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  this.selectSuperAdminAssignedRoles(index)
                                }
                                className={`${this.getCSSClassBasedOnRole(
                                  data.userType
                                )} ${data.selected ? "roleSelected" : ""}`}
                              >
                                {data.basicUser}
                              </Button>
                            )
                          )}
                        </ReactSortable>
                      ) : (
                        <></>
                      )}
                    </div>
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
  SuperAdminRoles
);
