import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { settingAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import CloseIcon from "@material-ui/icons/Close";

class ApprovalWorkFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workFlowData: {},
      location: [
        { name: "Newyork Branch", isChecked: false },
        { name: "Newyork Branch", isChecked: false },
        { name: "Newyork Branch", isChecked: false },
      ],
      flowKey: "purchaseRequisition",
      createNewStepOpen: false,
      createNewStep: {
        userName: "",
        userEmail: "",
        baseLine: { type: "", value: "" },
        location: [],
      },
      usersList: [],
      createStepValidat: false,
      editStep: false,
      editIndex: -1,
      userIndex: -1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getWorkflow());
    dispatch(settingAction.getUsers());
  }
  clearFields = () => {
    this.setState({
      createNewStep: {
        userName: "",
        userEmail: "",
        baseLine: { type: "", value: "" },
        location: [],
      },
      createStepValidat: false,
      createNewStepOpen: false,
      userIndex: -1,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      get_approval_workflow_status,
      get_approval_workflow_data,
      add_approval_workflow_status,
      remove_approval_workflow_status,
      get_users_status,
      get_users_data,
      update_approval_workflow_status,
      dispatch,
    } = this.props;
    if (
      get_approval_workflow_status !== prevProps.get_approval_workflow_status &&
      get_approval_workflow_status === status.SUCCESS
    ) {
      if (
        get_approval_workflow_data &&
        Object.keys(get_approval_workflow_data).length > 0
      ) {
        this.setState({ workFlowData: { ...get_approval_workflow_data } });
      }
    }
    if (
      add_approval_workflow_status !== prevProps.add_approval_workflow_status &&
      add_approval_workflow_status === status.SUCCESS
    ) {
      this.clearFields();
      dispatch(settingAction.getWorkflow());
    }
    if (
      remove_approval_workflow_status !==
      prevProps.remove_approval_workflow_status &&
      remove_approval_workflow_status === status.SUCCESS
    ) {
      dispatch(settingAction.getWorkflow());
    }
    if (
      get_users_status !== prevProps.get_users_status &&
      get_users_status === status.SUCCESS
    ) {
      this.setState({
        usersList: [...JSON.parse(JSON.stringify(get_users_data))],
      });
    }
    if (
      update_approval_workflow_status !== prevProps.update_approval_workflow_status &&
      update_approval_workflow_status === status.SUCCESS
    ) {
        this.clearFields();
        dispatch(settingAction.getWorkflow());
    }
    
  }
  removeWorkFlowField = (index) => {
    const { dispatch } = this.props;
    const { workFlowData, flowKey } = this.state;
    if (workFlowData[flowKey][index]) {
      dispatch(
        settingAction.removeWorkFlow({
          type: flowKey,
          ...workFlowData[flowKey][index],
        })
      );
    }
  };

  createNewStepModal = () => {
    this.clearFields()
    this.setState({
      createNewStepOpen: !this.state.createNewStepOpen,
      editStep: false,
      editIndex: -1,
    });
  };

  handleCreateNewStep = (e) => {
    let { name, value } = e.target;
    let { createNewStep, userIndex, usersList } = this.state;
    if (name === "value" || name === "type") {
      createNewStep.baseLine[name] = value;
    } else if (name === "userIndex") {
      this.setState({ userIndex: value });
      if (value >= 0 && value !== -1) {
        createNewStep.userEmail = usersList[value].email;
        createNewStep.userName = usersList[value].username;
      }
    } else {
      createNewStep[name] = value;
    }
    this.setState({ createNewStep });
  };

  handleLocation = (index, e) => {
    let { location, createNewStep } = this.state;
    const { name, checked } = e.target;
    let selectedLocations = [];
    location[index].isChecked = checked;
    this.setState({ location });
    for (let i = 0; i < location.length; i++) {
      if (location[i].isChecked) {
        selectedLocations.push(location[i].name);
      }
    }
    createNewStep.location = [...selectedLocations];
    this.setState({ createNewStep });
  };

  createStepValidatingFields = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { createNewStep } = this.state;
    let isValid = true;
    const retData = {
      userName: validObj,
      type: validObj,
      value: validObj,
      location: validObj,
    };
    if (update) {
      if (!createNewStep.userName) {
        retData.userName = {
          isValid: false,
          message: "Name is required",
        };
        isValid = false;
      }
      if (!createNewStep.baseLine.value) {
        retData.value = {
          isValid: false,
          message: "Baseline approval value is required",
        };
        isValid = false;
      }
      if (!createNewStep.baseLine.type) {
        retData.type = {
          isValid: false,
          message: "Baseline approval type is required",
        };
        isValid = false;
      }
      if (!createNewStep.location.length > 0) {
        retData.location = {
          isValid: false,
          message: "Location is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  createNewStep = () => {
    let createStepError = this.createStepValidatingFields(true);
    const { createNewStep, flowKey } = this.state;
    this.setState({ createStepValidat: true });
    if (createStepError.isValid) {
      this.props.dispatch(
        settingAction.addWrokFlow({ type: flowKey, ...createNewStep })
      );
    }
  };

  handleEdit = (index) => {
    let { workFlowData, createNewStep, flowKey } = this.state;
    createNewStep = workFlowData[flowKey][index];
    this.setState({
      editStep: true,
      createNewStep,
      createNewStepOpen: true,
      editIndex: index,
    });

  };

  SubmitEditStep = () => {
    let createStepError = this.createStepValidatingFields(true);
    const { createNewStep, flowKey } = this.state;
    this.setState({ createStepValidat: true });
    if (createStepError.isValid) {
      this.props.dispatch(
        settingAction.updateWorkFlow({ type: flowKey, ...createNewStep })
      );
    }
  }
  render() {
    const {
      workFlowData,
      flowKey,
      createNewStepOpen,
      createNewStep,
      userIndex,
      location,
      createStepValidat,
      usersList,
      editStep,
    } = this.state;
    let createStepError = this.createStepValidatingFields(createStepValidat);
    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Approval Workflow</div>
            <div className="tabs">
              <ul>
                <li
                  className={flowKey === "purchaseRequisition" ? "active" : ""}
                  onClick={() =>
                    this.setState({ flowKey: "purchaseRequisition" })
                  }
                >
                  Purchase Requisition
                </li>
                <li
                  className={flowKey === "purchaseOrder" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "purchaseOrder" })}
                >
                  Purchase Order
                </li>
                <li
                  className={flowKey === "invoice" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "invoice" })}
                >
                  Invoice
                </li>
                <li
                  className={flowKey === "payments" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "payments" })}
                >
                  Payments
                </li>
              </ul>
            </div>
            <div className="tabs-content active">
              <div className="create-step">
                <ul>
                  {workFlowData &&
                    workFlowData[flowKey] &&
                    workFlowData[flowKey].length > 0 &&
                    workFlowData[flowKey].map(
                      ({ userName, email, id }, index) => (
                        <li>
                          <div className="number">
                            <span>{index + 1}</span>
                          </div>
                          <div className="step-box">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-9">
                                  <div className="heading">
                                    Procurement Admin
                                  </div>
                                  {userName && (
                                    <div className="name">{userName}</div>
                                  )}
                                  {email && (
                                    <div className="email">{email}</div>
                                  )}
                                </div>
                                <div className="col-md-3">
                                  <div className="group-btn">
                                    <Button
                                      className="btn btn-primary btn-trash"
                                      onClick={() => {
                                        this.removeWorkFlowField(index);
                                      }}
                                    >
                                      <i class="far fa-trash-alt"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-primary btn-edit"
                                      onClick={() => this.handleEdit(index)}
                                    >
                                      <i class="far fa-edit"></i>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  <li>
                    <div className="number">
                      {workFlowData[flowKey] &&
                        workFlowData[flowKey].length > 0 ? (
                        <span>{workFlowData[flowKey].length + 1}</span>
                      ) : (
                        <span>{1}</span>
                      )}
                    </div>
                    <div className="step-box">
                      <Button
                        className="btn btn-primary btn-create"
                        onClick={this.createNewStepModal}
                      >
                        Create new step
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={createNewStepOpen}
          onClose={this.createNewStepModal}
          aria-labelledby="form-dialog-title"
          className="custom-dialog create-step-dialog"
        >
          <div className="custom-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              {!editStep ? `Create Approval Step` : `Edit Approval Step`}
            </DialogTitle>
            <Button
              onClick={this.createNewStepModal}
              className="modal-close-btn"
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="custom-dialog-content">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">User Name</label>
                  <div className="col-12 col-form-field">
                    <FormControl className="select-menu">
                      <NativeSelect
                        name="userIndex"
                        onChange={this.handleCreateNewStep}
                        value={userIndex}
                      >
                        <option value={"-1"}>Select User</option>
                        {usersList &&
                          usersList.length > 0 &&
                          usersList.map(({ id, username }, index) => (
                            <option value={index}>{username}</option>
                          ))}
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {createStepError.userName.message}
                    </span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={this.handleCreateNewStep}
                  >
                    <label className="col-12 col-form-label">
                      Baseline approval
                    </label>
                    <div className="col-12 col-form-field">
                      {/* <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
                      <FormControlLabel
                        value=""
                        control={<Radio name="type" color="primary" />}
                        label="Edit Approval Step"
                        style={{ margin: "0px" }}
                      />
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Less or Equal"
                        control={<Radio name="type" color="primary" />}
                        label="Less or Equal"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Less or Equal" ? (
                        <>
                          <input
                            type="number"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form"
                        control={<Radio name="type" color="primary" />}
                        label="Form"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Form" ? (
                        <>
                          <input
                            type="number"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form To"
                        control={<Radio name="type" color="primary" />}
                        label="Form To"
                        style={{ margin: "0px" }}
                      />
                      {createNewStep.baseLine.type === "Form To" ? (
                        <>
                          <input
                            type="number"
                            name="value"
                            onChange={this.handleCreateNewStep}
                            value={createNewStep.baseLine.value}
                          />
                          <span className="d-block w-100 text-danger">
                            {createStepError.value.message}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </RadioGroup>
                  <span className="d-block w-100 text-danger">
                    {createStepError.type.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row form-group">
                  <label className="col-12 col-form-label">Location</label>
                  {location &&
                    location.length > 0 &&
                    location.map(({ name, isChecked }, index) => (
                      <div key={index} className="col-12 col-form-field">
                        <FormControlLabel
                          value={isChecked}
                          onChange={(e) => this.handleLocation(index, e)}
                          control={<Checkbox name="location" color="primary" />}
                          label={name}
                          style={{ margin: "0px" }}
                        />
                      </div>
                    ))}
                  <span className="d-block w-100 text-danger">
                    {createStepError.location.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group row form-group justify-content-end">
              <div className="col-3 form-field text-right">
                {!editStep ? (
                  <Button
                    variant="contained"
                    className="create-btn"
                    onClick={this.createNewStep}
                  >
                    Create
                  </Button>
                ) : (
                  <Button variant="contained" className="create-btn" onClick={(this.SubmitEditStep)}>
                    Edit
                  </Button>
                )}
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
    get_approval_workflow_status,
    get_approval_workflow_data,
    add_approval_workflow_status,
    remove_approval_workflow_status,
    get_users_status,
    get_users_data,
    update_approval_workflow_status,
  } = state.procurement;
  return {
    get_approval_workflow_status,
    get_approval_workflow_data,
    add_approval_workflow_status,
    remove_approval_workflow_status,
    get_users_status,
    get_users_data,
    update_approval_workflow_status
  };
};

export default connect(mapStateToProps)(ApprovalWorkFlow);
