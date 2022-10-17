import React, { Component } from "react";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { settingAction } from "../../../_actions";
import { status } from "../../../_constants";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

class Users extends Component {
  colorClass;
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      dupUsersList: [],
      openDialog: false,
      newGroupRoleNameError: "",
      newGroupRoleDescriptionError: "",
      newGroupRoleUsersError: "",
      inviteUserFields: [
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
        { userEmail: "", inviteError: "" },
      ],
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
    dispatch(settingAction.getUsers());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_users_status, get_users_data } = this.props;

    if (
      get_users_status !== prevProps.get_users_status &&
      get_users_status === status.SUCCESS
    ) {
      this.setState({
        usersList: [...JSON.parse(JSON.stringify(get_users_data))],
        dupUsersList: [...JSON.parse(JSON.stringify(get_users_data))],
      });
    }
  }

  handleUserCheckBox = (e, index) => {
    const { checked } = e.target;
    const { usersList } = this.state;
    usersList[index].isChecked = checked;
    this.setState({ usersList });
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

  openModulInvite = () => {
    this.setState({
      openModulInvite: !this.state.openModulInvite,
    });
  };

  handleInviteFormAdd = () => {
    let newField = { userEmail: "", inviteError: "" };
    const { inviteUserFields } = this.state;
    let newFields = [...inviteUserFields, newField];
    this.setState({ inviteUserFields: newFields });
  };

  handleInviteFormDelete = (index) => {
    let data = [...this.state.inviteUserFields];
    if (data.length > 1) {
      data.splice(index, 1);
      this.setState({ inviteUserFields: data });
    }
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

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

  render() {
    const {
      usersList,
      openDialog,
      newGroupRoleNameError,
      newGroupRoleDescriptionError,
      newGroupRoleUsersError,
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
                  usersList.map(({ username, id, email, groups }, index) => {
                    return (
                      <tr key={`${index}-user-list`}>
                        <td>
                          <div className="form-group form-group-common">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="procurementAdmin"
                                  onChange={(e) =>
                                    this.handleUserCheckBox(e, index)
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
                              groups.map(({ groupsName, id }, index) => (
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
                              ))}
                          </div>
                        </td>
                      </tr>
                    );
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

const mapStateToProps = (state) => {
  const { get_users_status, get_users_data } = state.procurement;
  return {
    get_users_status,
    get_users_data,
  };
};
export default connect(mapStateToProps)(Users);
