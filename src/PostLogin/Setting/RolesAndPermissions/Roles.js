import React, { Component } from "react";
import groupData from "../Dummy-data.json";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { settingAction } from "../../../_actions";
import { connect } from "react-redux";
import { status } from "../../../_constants";

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transionActiveKey: "permitted",
      preferencesList: {},
      newRoleName: "",
      newRoleNameError: "",
      newRoleDescription: "",
      newRoleDescriptionError: "",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getPreferences());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_Preferences_data, get_Preferences_status } = this.props;

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

  handleCheckAll = (index, e) => {
    const { checked } = e.target;
    let { transionActiveKey, preferencesList } = this.state;
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

  handleOpenSubList = (index) => {
    let { transionActiveKey, preferencesList } = this.state;
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

  handleSelect = (index, key, e) => {
    const { checked } = e.target;
    let { transionActiveKey, preferencesList } = this.state;
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

  handleNewRoleSubmit = () => {
    const { newRoleName, newRoleDescription } = this.state;
    let valid = false;
    if (!newRoleName) {
      this.setState({ newRoleNameError: "New role name is required!" });
      valid = false;
    } else {
      this.setState({ newRoleNameError: "" });
    }

    if (!newRoleDescription) {
      this.setState({
        newRoleDescriptionError: "New role description is required!",
      });
      valid = false;
    } else {
      this.setState({
        newRoleDescriptionError: "",
      });
    }

    if (newRoleName && newRoleDescription) {
      this.setState({ newRoleNameError: "", newRoleDescriptionError: "" });
      valid = true;
    }

    if (valid) {
      this.setState({
        newRoleName: "",
        newRoleDescription: "",
        newRoleNameError: "",
        newRoleDescriptionError: "",
        openModulCreateNew: !this.state.openModulCreateNew,
      });
    }
  };

  openModulCreateNew = () => {
    this.setState({
      openModulCreateNew: !this.state.openModulCreateNew,
      newRoleName: "",
      newRoleDescription: "",
      newRoleNameError: "",
      newRoleDescriptionError: "",
    });
  };

  handleNewRoleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      transionActiveKey,
      preferencesList,
      openModulCreateNew,
      newRoleNameError,
      newRoleDescriptionError,
    } = this.state;

    return (
      <>
        <div className="roles-tabs">
          <div className="tabs-content active">
            <div className="form-group-contents">
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
                  onClick={this.openModulCreateNew}
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
                className={transionActiveKey === "permitted" ? "active" : ""}
              >
                Permitted
              </li>
              <li
                onClick={() => this.transionHandelKey("prohibited")}
                className={transionActiveKey === "prohibited" ? "active" : ""}
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
                                  <Checkbox name="create" color="primary" />
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
        <Dialog
          open={openModulCreateNew}
          onClose={this.openModulCreateNew}
          aria-labelledby="form-dialog-title"
          className="create-new-role-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Add Role
            </DialogTitle>
            <Button
              onClick={this.openModulCreateNew}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="invite-dialog-form">
              <div className="search-bar form-group">
                <label>Role Name</label>
                <div className="d-block">
                  <input
                    type="text"
                    name="newRoleName"
                    className="control-form"
                    placeholder="Super Admin"
                    onChange={this.handleNewRoleInputChange}
                    value={this.state.newRoleName}
                  />
                  <span className="d-block w-100 text-danger">
                    {newRoleNameError}
                  </span>
                </div>
              </div>
              <div className="search-bar form-group">
                <label>Role Description</label>
                <div className="d-block">
                  <textarea
                    type={"textarea"}
                    name="newRoleDescription"
                    className="form-control"
                    placeholder="Role Description"
                    spanRows={3}
                    onChange={this.handleNewRoleInputChange}
                    value={this.state.newRoleDescription}
                  />
                  <span className="d-block w-100 text-danger">
                    {newRoleDescriptionError}
                  </span>
                </div>
              </div>
            </div>
            <div className="invite-dialog-bottom-content text-center">
              <Button
                variant="contained"
                className="primary-btn"
                onClick={this.handleNewRoleSubmit}
              >
                Create
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { get_Preferences_status, get_Preferences_data } = state.procurement;
  return {
    get_Preferences_status,
    get_Preferences_data,
  };
};
export default connect(mapStateToProps)(Roles);
