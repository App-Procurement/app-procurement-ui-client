import React, { Component } from 'react';
import { FormControlLabel, Checkbox, Button, Dialog, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import { settingAction } from '../../_actions';
import { connect } from 'react-redux';
import { status } from '../../_constants';
class RollAndPermissions extends Component {
  colorClass;
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      activeKey: 'roles',
      transionActiveKey: 'permitted',
      rolesAndPermissions: [],
      usersList: [],
      groupsList: [],
    };
    this.colorClass = ['magnolia-btn', 'onahau-btn', 'green-btn', 'magnolia-btn', 'onahau-btn'];
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getRolesAndPermissions());
    dispatch(settingAction.getUsers());
    dispatch(settingAction.getGroups());
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      get_roles_and_permissios_status,
      get_roles_and_permissios_data,
      get_groups_status,
      get_groups_data,
      get_users_status,
      get_users_data,
    } = this.props;
    if (
      get_roles_and_permissios_status !== prevProps.get_roles_and_permissios_status &&
      get_roles_and_permissios_status === status.SUCCESS
    ) {
      if (get_roles_and_permissios_data && get_roles_and_permissios_data.length > 0) {
        let data = [...JSON.parse(JSON.stringify(get_roles_and_permissios_data))];
        for (let i = 0; i < data.length; i++) {
          data[i]['isChecked'] = false;
        }
        this.setState({ rolesAndPermissions: data });
      }
    }
    if (get_groups_status !== prevProps.get_groups_status && get_groups_status === status.SUCCESS) {
      if (get_groups_data && get_groups_data.length > 0) {
        this.setState({ groupsList: [...JSON.parse(JSON.stringify(get_groups_data))] });
      }
    }
    if (get_users_status !== prevProps.get_users_status && get_users_status === status.SUCCESS) {
      this.setState({ usersList: [...JSON.parse(JSON.stringify(get_users_data))] });
    }
  }
  openModal = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };
  handelKey = (type) => {
    this.setState({ activeKey: type });
  };
  transionHandelKey = (type) => {
    this.setState({ transionActiveKey: type });
  };
  handleChecked = (e, index) => {
    const { activeKey } = this.state;
    const { checked } = e.target;
    if (activeKey === 'roles') {
      const { rolesAndPermissions } = this.state;
      rolesAndPermissions[index].isChecked = checked;
      this.setState({ rolesAndPermissions });
    } else if (activeKey === 'groups') {
      const { groupsList } = this.state;

      groupsList[index].isChecked = checked;
      this.setState({ groupsList });
    } else if (activeKey === 'users') {
      const { usersList } = this.state;
      usersList[index].isChecked = checked;
      this.setState({ usersList });
    }
  };

  render() {
    const { openDialog, activeKey, transionActiveKey, rolesAndPermissions, usersList, groupsList } = this.state;
    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Roles and Permissions</div>
            <div className="tabs">
              <ul>
                <li onClick={() => this.handelKey('roles')} className={activeKey === 'roles' ? 'active' : ''}>
                  Roles
                </li>
                <li onClick={() => this.handelKey('groups')} className={activeKey === 'groups' ? 'active' : ''}>
                  Group
                </li>
                <li onClick={() => this.handelKey('users')} className={activeKey === 'users' ? 'active' : ''}>
                  Users
                </li>
              </ul>
            </div>
            {activeKey === 'groups' ? (
              <div className="tabs-content active">
                <div className="d-flex justify-content-end permissions-form">
                  <Button variant="contained" className="group-btn" onClick={this.openModal}>
                    Create New Group
                  </Button>
                  <Button variant="contained" className="group-btn role-btn">
                    Assign Role
                  </Button>
                  <div className="form-group form-group-common">
                    <button className="search-icon">
                      <i class="fas fa-search"></i>
                    </button>
                    <input type="text" name="name" className="form-control" placeholder="Search Group" />
                  </div>
                </div>
                <div className="form-table">
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
                            <tr>
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
                                <div class="btn-group">
                                  {value.permissionsAndRoles.map((val, index) => (
                                    <Button
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
                </div>
              </div>
            ) : (
              <></>
            )}
            {activeKey === 'users' ? (
              <div className="tabs-content active">
                <div className="d-flex justify-content-end permissions-form">
                  <Button variant="contained" className="group-btn" onClick={this.openModal}>
                    Create New Group
                  </Button>
                  <Button variant="contained" className="group-btn role-btn">
                    Assign Role
                  </Button>
                  <div className="form-group form-group-common">
                    <button className="search-icon">
                      <i class="fas fa-search"></i>
                    </button>
                    <input type="text" name="name" className="form-control" placeholder="Search Group" />
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
                            <tr>
                              <td>
                                <div className="form-group form-group-common">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="procurementAdmin"
                                        onChange={(e) => this.handleChecked(e, index, 'users')}
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
                                <div class="btn-group">
                                  {groups &&
                                    groups.length > 0 &&
                                    groups.map(({ groupsName, id }, index) => (
                                      <Button
                                        id={index}
                                        variant="contained"
                                        className={`group-btn ${this.colorClass[Math.floor(Math.random() * 5)]}`}
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
            ) : (
              <></>
            )}
          </div>
          {activeKey === 'roles' ? (
            <>
              <div className="roles-tabs">
                <div className="tabs-content active">
                  <div className="form-group-contents">
                    {rolesAndPermissions &&
                      rolesAndPermissions.length > 0 &&
                      rolesAndPermissions.map((roles, index) => (
                        <div className="form-group form-group-common">
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
                      ))}
                    <div className="form-group form-group-common create-new-roles">
                      <Button color="primary" className="roles-btn" onClick={this.openModal}>
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
                      onClick={() => this.transionHandelKey('permitted')}
                      className={transionActiveKey === 'permitted' ? 'active' : ''}
                    >
                      Permitted
                    </li>
                    <li
                      onClick={() => this.transionHandelKey('prohibited')}
                      className={transionActiveKey === 'prohibited' ? 'active' : ''}
                    >
                      Prohibited
                    </li>
                    <li
                      onClick={() => this.transionHandelKey('exclusiveRoles')}
                      className={transionActiveKey === 'exclusiveRoles' ? 'active' : ''}
                    >
                      Exclusive Roles
                    </li>
                  </ul>
                </div>
                <div className="tabs-content active">
                  {transionActiveKey === 'permitted' ? (
                    <div className="form-group-contents">
                      <div className="form-group form-group-common">
                        <i class="fal fa-minus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="purchaseRequisition" color="primary" />}
                          label="Purchase Requisition"
                        />
                      </div>
                      <div className="form-group-contents show py-0 pl-5 position-relative">
                        <div className="form-group form-group-common">
                          <FormControlLabel
                            control={<Checkbox name="viewOnly" color="primary" />}
                            label="View Only"
                          />
                        </div>
                        <div className="form-group form-group-common">
                          <FormControlLabel
                            control={<Checkbox name="create" color="primary" />}
                            label="create"
                          />
                        </div>
                        <div className="form-group form-group-common">
                          <FormControlLabel
                            control={<Checkbox name="approve" color="primary" />}
                            label="Approve"
                          />
                        </div>
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="purchaseOrder" color="primary" />}
                          label="Purchase Order"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="requestForProposal" color="primary" />}
                          label="Request for proposal"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="budgets" color="primary" />} label="Budgets" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="approverL2" color="primary" />}
                          label="Approver L2"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="invoices" color="primary" />} label="Invoices" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="deliveries" color="primary" />} label="Deliveries" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {transionActiveKey === 'prohibited' ? (
                    <div className="form-group-contents">
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="purchaseRequisition" color="primary" />}
                          label="Purchase Requisition"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="purchaseOrder" color="primary" />}
                          label="Purchase Order"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="requestForProposal" color="primary" />}
                          label="Request for proposal"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="budgets" color="primary" />} label="Budgets" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="invoices" color="primary" />} label="Invoices" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="deliveries" color="primary" />} label="Deliveries" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {transionActiveKey === 'exclusiveRoles' ? (
                    <div className="form-group-contents">
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="configuration" color="primary" />}
                          label="Configuration"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="manageSupplier" color="primary" />}
                          label="Manage Supplier"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="reports" color="primary" />} label="Reports" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="budgets" color="primary" />} label="Budgets" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel
                          control={<Checkbox name="adminFullAccess" color="primary" />}
                          label="Admin ( Full Access )"
                        />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="invoices" color="primary" />} label="Invoices" />
                      </div>
                      <div className="form-group form-group-common">
                        <i class="fal fa-plus-square plus-icon"></i>
                        <FormControlLabel control={<Checkbox name="deliveries" color="primary" />} label="Deliveries" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
          className="custom-dialog edit-dialog"
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
            <div className="form-group row form-group">
              <label className="col-12 col-form-label">Group Name</label>
              <div className="col-8 col-form-field">
                <input type="text" name="groupName" className="form-control" value={''} />
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-12 col-form-label">Group Name</label>
              <div className="col-12 col-form-field">
                <textarea type="text" name="groupName" className="form-control" value={''} spanRows={3} />
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
  } = state.procurement;
  return {
    get_roles_and_permissios_status,
    get_roles_and_permissios_data,
    get_groups_status,
    get_groups_data,
    get_users_status,
    get_users_data,
  };
};
export default connect(mapStateToProps)(RollAndPermissions);
