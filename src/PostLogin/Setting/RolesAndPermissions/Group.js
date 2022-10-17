import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import groupData from "./../Dummy-data.json";
import CloseIcon from "@material-ui/icons/Close";
import SuperAdminUsers from "./SuperAdminUsers";
import SuperAdminRoles from "./SuperAdminRoles";

class Group extends Component {
  constructor(props) {
    super(props);
    this.superAdminUsersRef = React.createRef();
    this.superAdminRolesRef = React.createRef();
    this.state = {
      groupsData: groupData,
      openDialog: false,
      newGroupRoleName: "",
      newGroupRoleNameError: "",
      newGroupRoleDescription: "",
      newGroupRoleDescriptionError: "",
      openModalView: false,
      activeModalKey: "users",
      inviteUserFields: [
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
      ],
    };
  }

  openAddRolesModal = () => {
    this.setState({
      openDialog: !this.state.openDialog,
      newGroupRoleName: "",
      newGroupRoleDescription: "",
      newGroupRoleUsers: [],
      newGroupRoleNameError: "",
      newGroupRoleDescriptionError: "",
      newGroupRoleUsersError: "",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckBoxChange = (e) => {
    let { name, checked, value } = e.target;
    this.setState({ [name]: !checked });
    if (checked) {
      this.setState({
        newGroupRoleUsers: [...this.state.newGroupRoleUsers, value],
      });
    } else {
      this.setState({
        newGroupRoleUsers: this.state.newGroupRoleUsers.filter((item) => {
          return item !== value;
        }),
      });
    }
  };

  handleNewGroupSubmit = () => {
    let { newGroupRoleName, newGroupRoleDescription, newGroupRoleUsers } =
      this.state;
    let valid = false;
    if (!newGroupRoleName) {
      valid = false;
      this.setState({ newGroupRoleNameError: "Group role name is required!" });
    } else {
      this.setState({ newGroupRoleNameError: "" });
    }

    if (!newGroupRoleDescription) {
      valid = false;
      this.setState({
        newGroupRoleDescriptionError: "Group role description is required!",
      });
    } else {
      this.setState({
        newGroupRoleDescriptionError: "",
      });
    }

    if (newGroupRoleUsers.length <= 0) {
      valid = false;
      this.setState({
        newGroupRoleUsersError: "At least one user is required",
      });
    } else {
      this.setState({
        newGroupRoleUsersError: "",
      });
    }

    if (
      newGroupRoleName &&
      newGroupRoleDescription &&
      newGroupRoleUsers.length > 0
    ) {
      valid = true;
    }

    if (valid) {
      this.setState({
        newGroupRoleName: "",
        newGroupRoleDescription: "",
        newGroupRoleUsers: [],
        newGroupRoleNameError: "",
        newGroupRoleDescriptionError: "",
        newGroupRoleUsersError: "",
        openDialog: !this.state.openDialog,
      });
    }
  };

  handleGroupSearch = (e) => {
    const { value } = e.target;
    let values = [];
    if (value) {
      for (let i = 0; i < groupData.length; i++) {
        let group = groupData[i];
        if (group.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          values.push(group);
        }
      }
    } else {
      values = JSON.parse(JSON.stringify(groupData));
    }
    this.setState({ groupsData: values });
  };

  openModalView = () => {
    this.setState({
      openModalView: !this.state.openModalView,
    });
  };

  handelModalKey = (type) => {
    this.setState({ activeModalKey: type });
  };

  openModulInvite = () => {
    this.setState({
      openModulInvite: !this.state.openModulInvite,
    });
  };

  handleInviteFormDelete = (index) => {
    let data = [...this.state.inviteUserFields];
    if (data.length > 1) {
      data.splice(index, 1);
      this.setState({ inviteUserFields: data });
    }
  };

  handleInviteFormAdd = () => {
    let newField = { userEmail: "", inviteError: "" };
    const { inviteUserFields } = this.state;
    let newFields = [...inviteUserFields, newField];
    this.setState({ inviteUserFields: newFields });
  };

  handleSendInvites = () => {
    const { inviteUserFields } = this.state;
    inviteUserFields.forEach((item) => {
      if (item.userEmail) {
        let mail = item.userEmail;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mail.match(mailformat)) {
          item.inviteError = "Please enter valid email address";
        } else {
          item.userEmail = "";
          item.inviteError = "";
        }
      } else {
        item.inviteError = "";
      }
    });
    this.setState({ inviteUserFields });
  };

  handleInviteFormChange = (index, e) => {
    index.userEmail = e.target.value;
  };

  handleSuperUserSearch = (e) => {
    if (this.state.activeModalKey === "users") {
      this.superAdminUsersRef.current.handleSuperUserSearch(e);
    } else {
      this.superAdminRolesRef.current.handleSuperRoleSearch(e);
    }
  };

  render() {
    const {
      openDialog,
      newGroupRoleNameError,
      newGroupRoleDescriptionError,
      newGroupRoleUsersError,
      openModalView,
      activeModalKey,
      openModulInvite,
    } = this.state;

    return (
      <>
        <div className="tabs-content active">
          <div className="d-flex justify-content-end permissions-form">
            <Button
              variant="contained"
              className="group-btn"
              onClick={this.openAddRolesModal}
            >
              Create New Group
            </Button>
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
              <tbody>
                {this.state.groupsData.map((data, index) => {
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
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Dialog
          open={openDialog}
          onClose={this.openAddRolesModal}
          aria-labelledby="form-dialog-title"
          className="custom-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Add Roles
            </DialogTitle>
            <Button
              onClick={this.openAddRolesModal}
              className="modal-close-btn"
            >
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
                      name="newGroupRoleName"
                      placeholder="Peter Hearter"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.newGroupRoleName}
                    />
                    <span className="d-block w-100 text-danger">
                      {newGroupRoleNameError}
                    </span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <div className="col-12 col-form-field">
                    <textarea
                      type={"textarea"}
                      name="newGroupRoleDescription"
                      className="form-control"
                      spanRows={3}
                      onChange={this.handleChange}
                      placeholder="Role Description"
                      value={this.state.newGroupRoleDescription}
                    />
                    <span className="d-block w-100 text-danger">
                      {newGroupRoleDescriptionError}
                    </span>
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
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="user"
                            color="primary"
                            value="user 1"
                            onChange={this.handleCheckBoxChange}
                          />
                        }
                        label="User 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="user"
                            color="primary"
                            value="user 2"
                            onChange={this.handleCheckBoxChange}
                          />
                        }
                        label="User 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="user"
                            color="primary"
                            value="user 3"
                            onChange={this.handleCheckBoxChange}
                          />
                        }
                        label="User 3"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="user"
                            color="primary"
                            value="user 4"
                            onChange={this.handleCheckBoxChange}
                          />
                        }
                        label="User 4"
                      />
                      <span className="d-block w-100 text-danger">
                        {newGroupRoleUsersError}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <div className="col-12 col-form-field justify-content-end">
                    <Button
                      variant="contained"
                      className="save"
                      onClick={this.handleNewGroupSubmit}
                    >
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
                        placeholder="Search here"
                        onChange={this.handleSuperUserSearch}
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
                          onClick={() => {
                            if (activeModalKey === "users") {
                              this.superAdminUsersRef.current.assignSelectedUsers();
                            } else {
                              this.superAdminRolesRef.current.assignSelectedRoles();
                            }
                          }}
                        >
                          Move
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn fillter-icon"
                          onClick={() => {
                            if (activeModalKey === "users") {
                              this.superAdminUsersRef.current.moveAllUsers();
                            } else {
                              this.superAdminRolesRef.current.moveAllRoles();
                            }
                          }}
                        >
                          Move All
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn delete-btn"
                          onClick={() => {
                            if (activeModalKey === "users") {
                              this.superAdminUsersRef.current.deleteSelectedAssignedUsers();
                            } else {
                              this.superAdminRolesRef.current.deleteSelectedAssignedRoles();
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn delete-btn"
                          onClick={() => {
                            if (activeModalKey === "users") {
                              this.superAdminUsersRef.current.deleteAllUsers();
                            } else {
                              this.superAdminRolesRef.current.deleteAllRoles();
                            }
                          }}
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
              <SuperAdminUsers ref={this.superAdminUsersRef} />
            ) : (
              <></>
            )}
            {activeModalKey === "roles" ? (
              <SuperAdminRoles ref={this.superAdminRolesRef} />
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
              {this.state.inviteUserFields.map((index) => {
                return (
                  <div key={Math.random()} className="search-bar form-group">
                    <input
                      type="email"
                      name="userEmail"
                      className="control-form"
                      placeholder="example@example.com"
                      onChange={(e) => this.handleInviteFormChange(index, e)}
                    />
                    <Button
                      variant="contained"
                      className="delete-btn"
                      onClick={() => this.handleInviteFormDelete(index)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </Button>
                    <span className="d-block w-100 text-danger">
                      {index.inviteError}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="invite-dialog-bottom-content">
              <div className="add-another-buttons">
                <Button
                  variant="contained"
                  className="add-btn"
                  onClick={() => this.handleInviteFormAdd()}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  Add Another
                </Button>
              </div>
              <Button
                variant="contained"
                className="primary-btn"
                onClick={() => this.handleSendInvites()}
              >
                Send Invites
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

export default Group;
