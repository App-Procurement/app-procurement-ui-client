import React, { Component } from "react";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { settingAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import SimpleBar from "simplebar-react";
import groupData from "./Dummy-data.json";
class RollAndPermissions extends Component {
  colorClass;
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openModalView: false,
      activeKey: "roles",
      activeModalKey: "users",
      transionActiveKey: "permitted",
      rolesAndPermissions: [],
      usersList: [],
      groupsList: [],
      dupGroupsList: [],
      dupUsersList: [],
      preferencesList: {},
      groupUsersData: {},
    };
    this.colorClass = [
      "magnolia-btn",
      "onahau-btn",
      "green-btn",
      "magnolia-btn",
      "onahau-btn",
    ];
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getRolesAndPermissions());
    dispatch(settingAction.getUsers());
    dispatch(settingAction.getGroups());
    dispatch(settingAction.getPreferences());
    dispatch(settingAction.getAllSettingGroupData());
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      get_roles_and_permissios_status,
      get_roles_and_permissios_data,
      get_groups_status,
      get_groups_data,
      get_users_status,
      get_users_data,
      get_Preferences_status,
      get_Preferences_data,
      get_group_status,
      group_data,
    } = this.props;

    if (
      get_group_status !== prevProps.get_group_status &&
      get_group_status === status.SUCCESS
    ) {
      if (
        this.props.group_data &&
        Object.keys(this.props.group_data).length > 0
      ) {
        console.log("group data", this.props.group_data);
        this.setState({ groupUsersData: { ...this.props.group_data } });
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
    if (
      get_users_status !== prevProps.get_users_status &&
      get_users_status === status.SUCCESS
    ) {
      this.setState({
        usersList: [...JSON.parse(JSON.stringify(get_users_data))],
        dupUsersList: [...JSON.parse(JSON.stringify(get_users_data))],
      });
    }
    if (
      get_Preferences_status !== prevProps.get_Preferences_status &&
      get_Preferences_status === status.SUCCESS
    ) {
      if (
        get_Preferences_data &&
        Object.keys(get_Preferences_data).length > 0
      ) {
        for (let k = 0; k < Object.keys(get_Preferences_data).length; k++) {
          let key = Object.keys(get_Preferences_data)[k];
          for (let i = 0; i < get_Preferences_data[key].length; i++) {
            get_Preferences_data[key][i].isOpen = false;
            get_Preferences_data[key][i].isChecked = false;
            if (get_Preferences_data[key][i].subList) {
              for (
                let j = 0;
                j < get_Preferences_data[key][i].subList.length;
                j++
              ) {
                get_Preferences_data[key][i].subList[j].isChecked = false;
              }
            }
          }
        }
        this.setState({
          preferencesList: {
            ...JSON.parse(JSON.stringify(get_Preferences_data)),
          },
        });
      }
    }
  }
  openModal = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };
  openModulInvite = () => {
    this.setState({
      openModulInvite: !this.state.openModulInvite,
    });
  };
  openModalView = () => {
    this.setState({
      openModalView: !this.state.openModalView,
    });
  };
  handelKey = (type) => {
    this.setState({ activeKey: type });
  };
  handelModalKey = (type) => {
    this.setState({ activeModalKey: type });
  };
  transionHandelKey = (type) => {
    this.setState({ transionActiveKey: type });
  };
  handleChecked = (e, index) => {
    const { activeKey } = this.state;
    const { checked } = e.target;
    if (activeKey === "roles") {
      const { rolesAndPermissions } = this.state;
      rolesAndPermissions[index].isChecked = checked;
      this.setState({ rolesAndPermissions });
    } else if (activeKey === "groups") {
      const { groupsList } = this.state;

      groupsList[index].isChecked = checked;
      this.setState({ groupsList });
    } else if (activeKey === "users") {
      
      const { usersList } = this.state;
      usersList[index].isChecked = checked;
      this.setState({ usersList });
    }
  };
  handleOpenSubList = (index) => {
    let { preferencesList, transionActiveKey } = this.state;
    for (let i = 0; i < preferencesList[transionActiveKey].length; i++) {
      if (i === index) {
        preferencesList[transionActiveKey][index].isOpen =
          !preferencesList[transionActiveKey][index].isOpen;
      } else {
        preferencesList[transionActiveKey][i].isOpen = false;
      }
    }
    this.setState({ preferencesList });
  };

  handleCheckAll = (index, e) => {
    const { checked } = e.target;
    let { preferencesList, transionActiveKey } = this.state;
    if (preferencesList[transionActiveKey][index].subList) {
      preferencesList[transionActiveKey][index].isChecked = checked;

      for (
        let i = 0;
        i < preferencesList[transionActiveKey][index].subList.length;
        i++
      ) {
        preferencesList[transionActiveKey][index].subList[i].isChecked =
          checked;
      }
    } else {
      preferencesList[transionActiveKey][index]["isChecked"] = checked;
    }

    this.setState({ preferencesList });
  };
  handleSelect = (index, key, e) => {
    const { checked } = e.target;
    let { preferencesList, transionActiveKey } = this.state;
    let checkedList = 0;
    preferencesList[transionActiveKey][index].subList[key].isChecked = checked;
    for (
      let i = 0;
      i < preferencesList[transionActiveKey][index].subList.length;
      i++
    ) {
      let checked = preferencesList[transionActiveKey][index].subList[i];
      if (checked.isChecked) {
        checkedList += 1;
      }
    }
    if (
      checkedList === preferencesList[transionActiveKey][index].subList.length
    ) {
      preferencesList[transionActiveKey][index].isChecked = true;
    } else {
      preferencesList[transionActiveKey][index].isChecked = false;
    }

    this.setState({ preferencesList });
  };
  handleGroupSearch = (e) => {
    const { value } = e.target;
    let values = [];
    const { dupGroupsList } = this.state;
    if (value) {
      for (let i = 0; i < dupGroupsList.length; i++) {
        let group = dupGroupsList[i];
        if (
          group.groupsName.toLowerCase().indexOf(value.toLowerCase()) !== -1
        ) {
          values.push(group);
        }
      }
    } else {
      values = JSON.parse(JSON.stringify(dupGroupsList));
    }
    this.setState({ groupsList: values });
  };
  handleUserSearch = (e) => {
    const { value } = e.target;
    let values = [];
    const { dupUsersList } = this.state;
    if (value) {
      for (let i = 0; i < dupUsersList.length; i++) {
        let user = dupUsersList[i];
        if (user.username.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          values.push(user);
        }
      }
    } else {
      values = JSON.parse(JSON.stringify(dupUsersList));
    }
    this.setState({ usersList: values });
  };
  renderGroupList = () => {
    return groupData.map((data, index) => {
      if (data.grp === true) {
        return (
          <tr key={`${index}${data.name}`}>
            <td>{data.name}</td>
            <td>0</td>
            <td>{data.roles.length}</td>
            <td>
              <a href="#" onClick={this.openModalView}>
                View More
              </a>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  render() {
    const {
      openDialog,
      openModalView,
      openModulInvite,
      activeKey,
      activeModalKey,
      preferencesList,
      transionActiveKey,
      rolesAndPermissions,
      usersList,
      groupsList,
      groupUsersData,
    } = this.state;
    console.log("group Data", groupUsersData);
    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Roles and Permissions</div>
            <div className="tabs">
              <ul>
                <li
                  onClick={() => this.handelKey("roles")}
                  className={activeKey === "roles" ? "active" : ""}
                >
                  Roles
                </li>
                <li
                  onClick={() => this.handelKey("groups")}
                  className={activeKey === "groups" ? "active" : ""}
                >
                  Group
                </li>
                <li
                  onClick={() => this.handelKey("users")}
                  className={activeKey === "users" ? "active" : ""}
                >
                  Users
                </li>
              </ul>
            </div>

            {activeKey === "groups" ? (
              <div className="tabs-content active">
                <div className="d-flex justify-content-end permissions-form">
                  <Button
                    variant="contained"
                    className="group-btn"
                    onClick={this.openModal}
                  >
                    Create New Group
                  </Button>
                  {/* <Button variant="contained" className="group-btn role-btn">
                    Assign Role
                  </Button> */}
                  <div className="form-group form-group-common">
                    <button className="search-icon">
                      <i className="fas fa-search"></i>
                    </button>
                    <input
                      type="text"
                      name="groupSearch"
                      onChange={this.handleGroupSearch}
                      className="form-control"
                      placeholder="Search Group"
                    />
                  </div>
                </div>
                {/* <div className="form-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roles Assigned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupsList &&
                        groupsList.length > 0 &&
                        groupsList.map((value, index) => {
                          return (
                            <tr key={`${index}-groups-list`}>
                              <td>
                                <div className="form-group form-group-common">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="procurementAdmin"
                                        onChange={(e) => this.handleChecked(e, index)}
                                        color="primary"
                                      />
                                    }
                                    label={value.groupsName}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="btn-group">
                                  {value.permissionsAndRoles.map((val, index) => (
                                    <Button
                                      key={`${index}-btn`}
                                      variant="contained"
                                      className={`group-btn ${this.colorClass[Math.floor(Math.random() * 5)]}`}
                                    >
                                      {val.rolesName}
                                    </Button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div> */}
                <div className="form-table permissions-group-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Groups</th>
                        <th>Users</th>
                        <th>Roles Assigned</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGroupList()}</tbody>
                  </table>
                </div>
              </div>
            ) : (
              <></>
            )}
            {activeKey === "users" ? (
              <div className="tabs-content active">
                <div className="d-flex justify-content-end permissions-form">
                  <Button
                    variant="contained"
                    className="group-btn"
                    onClick={this.openModal}
                  >
                    Create New Group
                  </Button>
                  <Button
                    variant="contained"
                    className="group-btn role-btn"
                    onClick={this.openModulInvite}
                  >
                    Add User
                  </Button>
                  <div className="form-group form-group-common">
                    <button className="search-icon">
                      <i className="fas fa-search"></i>
                    </button>
                    <input
                      type="text"
                      name="userSearch"
                      onChange={this.handleUserSearch}
                      className="form-control"
                      placeholder="Search Group"
                    />
                  </div>
                </div>
                <div className="form-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Names</th>
                        <th>User Email Address</th>
                        <th>Groups Assigned To Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList &&
                        usersList.length > 0 &&
                        usersList.map(
                          ({ username, id, email, groups }, index) => {
                            return (
                              <tr key={`${index}-user-list`}>
                                <td>
                                  <div className="form-group form-group-common">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="procurementAdmin"
                                          onChange={(e) =>
                                            this.handleChecked(
                                              e,
                                              index,
                                              "users"
                                            )
                                          }
                                          color="primary"
                                        />
                                      }
                                      label={username}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="email-text">
                                    <a href="#">{email}</a>
                                  </div>
                                </td>
                                <td>
                                  <div className="btn-group">
                                    {groups &&
                                      groups.length > 0 &&
                                      groups.map(
                                        ({ groupsName, id }, index) => (
                                          <Button
                                            key={`${index}-btn`}
                                            variant="contained"
                                            className={`group-btn ${
                                              this.colorClass[
                                                Math.floor(Math.random() * 5)
                                              ]
                                            }`}
                                          >
                                            {groupsName}
                                          </Button>
                                        )
                                      )}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {activeKey === "roles" ? (
            <>
              <div className="roles-tabs">
                <div className="tabs-content active">
                  <div className="form-group-contents">
                    {/* {rolesAndPermissions &&
                      rolesAndPermissions.length > 0 &&
                      rolesAndPermissions.map((roles, index) => (
                        <div className="form-group form-group-common" key={`${index}-roles`}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="isChecked"
                                color="primary"
                                onChange={(e) => this.handleChecked(e, index)}
                              />
                            }
                            label={roles.rolesName}
                          />
                        </div>
                      ))} */}
                    {groupData.map((data, index) => {
                      if (data.grp === false) {
                        return (
                          <div
                            className="form-group form-group-common"
                            key={`${index}-roles`}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="isChecked"
                                  color="primary"
                                  onChange={(e) => this.handleChecked(e, index)}
                                />
                              }
                              label={data.name}
                            />
                          </div>
                        );
                      }
                    })}
                    <div className="form-group form-group-common create-new-roles">
                      <Button
                        color="primary"
                        className="roles-btn"
                        onClick={this.openModal}
                      >
                        Create New Roles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="roles-tabs active">
                <div className="heading">Set transion Preferences</div>
                <div className="tabs">
                  <ul>
                    <li
                      onClick={() => this.transionHandelKey("permitted")}
                      className={
                        transionActiveKey === "permitted" ? "active" : ""
                      }
                    >
                      Permitted
                    </li>
                    <li
                      onClick={() => this.transionHandelKey("prohibited")}
                      className={
                        transionActiveKey === "prohibited" ? "active" : ""
                      }
                    >
                      Prohibited
                    </li>
                    <li
                      onClick={() => this.transionHandelKey("exclusiveRoles")}
                      className={
                        transionActiveKey === "exclusiveRoles" ? "active" : ""
                      }
                    >
                      Exclusive Roles
                    </li>
                  </ul>
                </div>
                <div className="tabs-content active">
                  <div className="form-group-contents">
                    {preferencesList &&
                      preferencesList[transionActiveKey] &&
                      preferencesList[transionActiveKey].length > 0 &&
                      preferencesList[transionActiveKey].map(
                        ({ subList, isChecked, name, isOpen }, index) => (
                          <>
                            <div
                              className="form-group form-group-common"
                              key={`${index}-preferences-list`}
                            >
                              {subList ? (
                                <i
                                  className={
                                    isOpen
                                      ? "fal fa-minus-square plus-icon"
                                      : "fal fa-plus-square plus-icon"
                                  }
                                  onClick={() => this.handleOpenSubList(index)}
                                ></i>
                              ) : (
                                <></>
                              )}

                              <FormControlLabel
                                checked={isChecked}
                                onChange={(e) => this.handleCheckAll(index, e)}
                                control={
                                  <Checkbox
                                    name="purchaseRequisition"
                                    color="primary"
                                  />
                                }
                                label={name}
                              />
                            </div>
                            <div
                              className={
                                isOpen
                                  ? "form-group-contents show py-0 pl-5 position-relative"
                                  : " form-group-contents py-0 pl-5 position-relative "
                              }
                            >
                              {subList && subList.length > 0 && isOpen ? (
                                subList.map(({ name, isChecked }, key) => (
                                  <div
                                    className="form-group form-group-common"
                                    key={`${key}-options`}
                                  >
                                    <FormControlLabel
                                      onChange={(e) =>
                                        this.handleSelect(index, key, e)
                                      }
                                      control={
                                        <Checkbox
                                          name="create"
                                          color="primary"
                                        />
                                      }
                                      checked={isChecked}
                                      label={name}
                                    />
                                  </div>
                                ))
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        )
                      )}
                  </div>
                  <div className="roles-buttons">
                    <Button variant="contained" className="submit">
                      Apply
                    </Button>
                    <Button variant="contained" className="save">
                      save
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <Dialog
          open={openDialog}
          onClose={this.openModal}
          aria-labelledby="form-dialog-title"
          className="custom-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Add Roles
            </DialogTitle>
            <Button onClick={this.openModal} className="modal-close-btn">
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="row">
              <div className="col-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">Add User</label>
                  <div className="col-12 col-form-field">
                    <input
                      type="text"
                      name="groupName"
                      placeholder="Peter Hearter"
                      className="form-control"
                      value={""}
                    />
                  </div>
                </div>
                <div className="form-group row form-group">
                  <div className="col-12 col-form-field">
                    <textarea
                      type={"textarea"}
                      name="groupName"
                      className="form-control"
                      value={""}
                      spanRows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">Search User</label>
                  <div className="col-12 col-form-field">
                    <div
                      style={{
                        background: "#F5F5F5",
                        borderRadius: "10px",
                        padding: "15px",
                      }}
                    >
                      <FormControlLabel
                        onChange={this.handleStateChange}
                        control={
                          <Checkbox
                            checked={false}
                            name="authenticationActivate"
                            color="primary"
                          />
                        }
                        label="Activate 2 - Factor Authentication"
                      />
                      <FormControlLabel
                        onChange={this.handleStateChange}
                        control={
                          <Checkbox
                            checked={false}
                            name="authenticationActivate"
                            color="primary"
                          />
                        }
                        label="Activate 2 - Factor Authentication"
                      />
                      <FormControlLabel
                        onChange={this.handleStateChange}
                        control={
                          <Checkbox
                            checked={false}
                            name="authenticationActivate"
                            color="primary"
                          />
                        }
                        label="Activate 2 - Factor Authentication"
                      />
                      <FormControlLabel
                        onChange={this.handleStateChange}
                        control={
                          <Checkbox
                            checked={false}
                            name="authenticationActivate"
                            color="primary"
                          />
                        }
                        label="Activate 2 - Factor Authentication"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <div className="col-12 col-form-field justify-content-end">
                    <Button variant="contained" className="save">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={openModalView}
          onClose={this.openModalView}
          aria-labelledby="form-dialog-title"
          className="roles-permissions-custom-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Group
            </DialogTitle>
            <Button onClick={this.openModalView} className="modal-close-btn">
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="super-admin-head">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <h5>Super Admin Group</h5>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="search-bar-section">
                    <div className="search-bar">
                      <input
                        type="text"
                        name="searchChat"
                        className="control-form"
                        placeholder="Search  here"
                      />
                      <i className="fa fa-search" aria-hidden="true" />
                    </div>
                    <div className="fillter-btn">
                      <Button
                        variant="contained"
                        className="primary-btn fillter-icon"
                        onClick={this.openModulInvite}
                      >
                        invite User
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-list">
              <p>Users | 45</p>
            </div>
            <div className="user-roles-head">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className="user-head-left active">
                    <div className="roles-tabs">
                      <ul>
                        <li
                          onClick={() => this.handelModalKey("users")}
                          className={activeModalKey === "users" ? "active" : ""}
                        >
                          Users
                        </li>
                        <li
                          onClick={() => this.handelModalKey("roles")}
                          className={activeModalKey === "roles" ? "active" : ""}
                        >
                          Roles
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12 col-xs-12 md-text-left">
                  <div className="user-head-right">
                    <ul>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn fillter-icon"
                          onClick={this.openModulInvite}
                        >
                          Move
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn fillter-icon"
                          onClick={this.openModulInvite}
                        >
                          Move All
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn delete-btn"
                          onClick={this.openModulInvite}
                        >
                          Delete
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn delete-all-btn"
                          onClick={this.openModulInvite}
                        >
                          Delete All
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {activeModalKey === "users" ? (
              <>
                <div className="users-tabs">
                  <div className="tabs-content active">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="users-tabs-content">
                          <h5>Avaliable users</h5>
                          <SimpleBar></SimpleBar>
                          <SimpleBar className="users-tabs-inner-content">
                            {groupUsersData?.avaliableUsers ? (
                              <>
                                {groupUsersData.avaliableUsers.map((data) => (
                                  <FormControlLabel
                                    className="d-block"
                                    control={
                                      <Checkbox
                                        name="checkedB"
                                        color="primary"
                                      />
                                    }
                                    label={data.availble_user}
                                  />
                                ))}
                              </>
                            ) : (
                              <></>
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
            ) : (
              <></>
            )}
            {activeModalKey === "roles" ? (
              <>
                <div className="users-tabs">
                  <div className="tabs-content active">
                    <div className="row">
                      <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                        <div className="users-tabs-content">
                          <h5>Avaliable users</h5>
                          <SimpleBar></SimpleBar>
                          <SimpleBar className="users-tabs-inner-content">
                            {groupUsersData?.avaliableUsersRoles ? (
                              <>
                                {groupUsersData.avaliableUsersRoles.map(
                                  (data) => (
                                    <>
                                      <Button
                                        variant="contained"
                                        className="group-btn green-btn"
                                      >
                                        {data.procurementAdmin}
                                      </Button>
                                      <Button
                                        variant="contained"
                                        className="group-btn onahau-btn"
                                      >
                                        {data.requester}
                                      </Button>
                                      <Button
                                        variant="contained"
                                        className="group-btn magnolia-btn"
                                      >
                                        {data.approver}
                                      </Button>
                                    </>
                                  )
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </SimpleBar>
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div className="users-tabs-content">
                          <h5>Assigned Users</h5>
                          <SimpleBar className="users-tabs-inner-content">
                            <div className="assigned-roles-btn">
                              {groupUsersData?.assignedUsersRoles ? (
                                <>
                                  {groupUsersData.assignedUsersRoles.map(
                                    (data) => (
                                      <>
                                        <Button
                                          variant="contained"
                                          className="group-btn green-btn"
                                        >
                                          {data.procurementAdmin}
                                        </Button>
                                        <Button
                                          variant="contained"
                                          className="group-btn onahau-btn"
                                        >
                                          {data.approver}
                                        </Button>
                                        <Button
                                          variant="contained"
                                          className="group-btn magnolia-btn"
                                        >
                                          {data.requester}
                                        </Button>
                                        <Button
                                          variant="contained"
                                          className="group-btn onahau-btn"
                                        >
                                          {data.basicUser}
                                        </Button>
                                      </>
                                    )
                                  )}
                                </>
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
            ) : (
              <></>
            )}
          </div>
        </Dialog>
        <Dialog
          open={openModulInvite}
          onClose={this.openModulInvite}
          aria-labelledby="form-dialog-title"
          className="invite-btn-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Invite Users
            </DialogTitle>
            <Button onClick={this.openModulInvite} className="modal-close-btn">
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="invite-dialog-form">
              <div className="search-bar form-group">
                <input
                  type="text"
                  name="searchChat"
                  className="control-form"
                  placeholder="Example@example.com"
                />
              </div>
              <div className="search-bar form-group">
                <input
                  type="text"
                  name="searchChat"
                  className="control-form"
                  placeholder="Example@example.com"
                />
              </div>
              <div className="search-bar form-group">
                <input
                  type="text"
                  name="searchChat"
                  className="control-form"
                  placeholder="Example@example.com"
                />
              </div>
            </div>
            <div className="invite-dialog-bottom-content">
              <div className="add-another-text">
                <span>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
                <p>Add Another</p>
              </div>
              <Button variant="contained" className="primary-btn">
                Send Invites
              </Button>
            </div>
          </div>
        </Dialog>
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
    get_users_status,
    get_users_data,
    get_Preferences_status,
    get_Preferences_data,
    get_group_status,
    group_data,
  } = state.procurement;
  return {
    get_roles_and_permissios_status,
    get_roles_and_permissios_data,
    get_groups_status,
    get_groups_data,
    get_users_status,
    get_users_data,
    get_Preferences_status,
    get_Preferences_data,
    get_group_status,
    group_data,
  };
};
export default connect(mapStateToProps)(RollAndPermissions);
