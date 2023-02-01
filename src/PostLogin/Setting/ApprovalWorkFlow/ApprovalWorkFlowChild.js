import React, { Component } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Dialog,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  FormControl,
  NativeSelect,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const dummyUsers = [
  {
    name: "Mike",
    email: "Mike@mail.com",
    id: "1",
  },
  {
    name: "Jack",
    email: "Jack@mail.com",
    id: "2",
  },
  {
    name: "Arnold",
    email: "Arnold@mail.com",
    id: "3",
  },
  {
    name: "Matthias",
    email: "Matthias@mail.com",
    id: "4",
  },
];

class ApprovalWorkFlowChild extends Component {
  isSortingRef;
  constructor(props) {
    super(props);
    this.isSortingRef = React.createRef();
    this.state = {
      createNewStepOpen: false,
      editStep: false,
      createNewApprover: {
        userId: "",
        minAmount: "",
        maxAmount: "",
        baseLine: { type: "", value: "" },
        location: "",
        order: "",
      },
      createStepValidat: false,
      editIndex: -1,
    };
  }

  handleFormChange = (e) => {
    let { name, value } = e.target;
    let { editStep } = this.state;
    if (editStep) {
      const { editIndex } = this.state;
      const { approversData } = this.props;
      let currentEditData = approversData[editIndex];
      currentEditData[name] = value;
      this.setState({ approversData });
      this.props.onUpdate(approversData);
    } else {
      let { createNewApprover } = this.state;
      createNewApprover[name] = value;
      this.setState({ createNewApprover });
    }
  };

  createStepValidatingFields = (update) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const { createNewApprover } = this.state;
    let isValid = true;
    const retData = {
      userId: validObj,
      baseLine: validObj,
      minAmount: validObj,
      maxAmount: validObj,
      location: validObj,
    };
    if (update) {
      if (!createNewApprover.userId) {
        retData.userId = {
          isValid: false,
          message: "User is required",
        };
        isValid = false;
      }
      // if (!createNewApprover.baseLine.value) {
      //   retData.value = {
      //     isValid: false,
      //     message: "Baseline approval value is required",
      //   };
      //   isValid = false;
      // }
      // if (!createNewApprover.baseLine.type) {
      //   retData.type = {
      //     isValid: false,
      //     message: "Baseline approval type is required",
      //   };
      //   isValid = false;
      // }
      if (!createNewApprover.minAmount) {
        retData.minAmount = {
          isValid: false,
          message: "Min Amount is required",
        };
      }
      if (!createNewApprover.maxAmount) {
        retData.maxAmount = {
          isValid: false,
          message: "Max Amount is required",
        };
      }
      if (!createNewApprover.location) {
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

  removeApprover = (index) => {
    const { approversData } = this.props;
    approversData.splice(index, 1);
    this.setState({ approversData });
    this.props.onUpdate(approversData);
  };

  handleEdit = (index) => {
    let { createNewApprover } = this.state;
    let { approversData } = this.props;
    createNewApprover = approversData[index];
    this.setState({
      editStep: true,
      createNewApprover,
      createNewStepOpen: !this.state.createNewStepOpen,
      editIndex: index,
    });
  };

  clearFields = () => {
    this.setState({
      createNewApprover: {
        userId: "",
        minAmount: "",
        maxAmount: "",
        baseLine: { type: "", value: "" },
        location: "",
        order: "",
      },
      createStepValidat: false,
    });
  };

  createNewStepModal = () => {
    this.clearFields();
    this.setState({
      createNewStepOpen: !this.state.createNewStepOpen,
      editStep: false,
      editIndex: -1,
    });
  };

  createNewApprover = () => {
    let { createNewApprover } = this.state;
    let { approversData } = this.props;
    createNewApprover.order = approversData.length + 1;
    approversData.push(createNewApprover);
    this.setState(approversData);
    this.setState({ createNewStepOpen: !this.state.createNewStepOpen });
    this.props.onUpdate(approversData);
  };

  SubmitEditStep = () => {
    const { approversData } = this.props;
    this.props.onUpdate(approversData);
    this.setState({ createNewStepOpen: !this.state.createNewStepOpen });
  };

  emptyData = () => {
    let emptyArray = [];
    emptyArray.push(
      <li>
        <div className="number">
          <span>{1}</span>
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
    );
    return emptyArray;
  };

  render() {
    const { approversData, onUpdate } = this.props;

    const {
      createNewStepOpen,
      editStep,
      createNewApprover,
      createStepValidat,
      editIndex,
    } = this.state;

    let createStepError = this.createStepValidatingFields(createStepValidat);

    return (
      <>
        <ReactSortable
          list={approversData.length > 0 ? approversData : this.emptyData()}
          setList={(newState) => {
            if (!this.isSortingRef.current) return;
            this.isSortingRef.current = false;
            newState.map((item, index) => {
              item.order = `${index + 1}`;
            });
            onUpdate(newState);
          }}
          animation={200}
          sort={true}
          onUpdate={() => (this.isSortingRef.current = true)}
        >
          {approversData.length > 0 ? (
            approversData.map((item, index) => {
              return (
                <li key={`${index}-flow`}>
                  <div className="number">
                    <span>{index + 1}</span>
                  </div>
                  <div className="step-box">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-9 col-9">
                          <div className="heading">
                            {dummyUsers.map((user) => {
                              if (user.id === item.userId) {
                                return user.name;
                              }
                            })}
                          </div>
                          {item.userId && (
                            <div className="name">{item.location}</div>
                          )}
                        </div>
                        <div className="col-md-3 col-3">
                          <div className="group-btn">
                            <Button
                              className="btn btn-primary btn-trash"
                              onClick={() => {
                                this.removeApprover(index);
                              }}
                            >
                              <i className="far fa-trash-alt"></i>
                            </Button>
                            <Button
                              className="btn btn-primary btn-edit"
                              onClick={() => this.handleEdit(index)}
                            >
                              <i className="far fa-edit"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ReactSortable>
        <li>
          <div className="number">
            {approversData && approversData.length > 0 ? (
              <span>{approversData.length + 1}</span>
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
                        name="userId"
                        onChange={this.handleFormChange}
                        value={`${createNewApprover.userId}`}
                      >
                        <option value={""}>Select User</option>
                        {dummyUsers &&
                          dummyUsers.length > 0 &&
                          dummyUsers.map(({ name, id }, index) => (
                            <option value={id} key={`${index}-options`}>
                              {name}
                            </option>
                          ))}
                      </NativeSelect>
                    </FormControl>
                    <span className="d-block w-100 text-danger">
                      {createStepError.userId.message}
                    </span>
                  </div>
                </div>
                <div className="form-group row form-group">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={this.handleFormChange}
                  >
                    <label className="col-12 col-form-label">
                      Baseline approval
                    </label>
                    <div className="col-12 col-form-field">
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
                      <input
                        type="text"
                        name="value"
                        onChange={this.handleFormChange}
                        className="form-control baseLine"
                      />
                      <span className="d-block w-100 text-danger">
                        {/* {createStepError.value.message} */}
                      </span>
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form"
                        control={<Radio name="type" color="primary" />}
                        label="Form"
                        style={{ margin: "0px" }}
                      />
                      <input
                        type="text"
                        name="value"
                        onChange={this.handleFormChange}
                        className="form-control baseLine"
                      />
                      <span className="d-block w-100 text-danger">
                        {/* {createStepError.value.message} */}
                      </span>
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value="Form To"
                        control={<Radio name="type" color="primary" />}
                        label="Form To"
                        style={{ margin: "0px" }}
                      />
                      <input
                        type="text"
                        name="value"
                        onChange={this.handleFormChange}
                        className="form-control baseLine"
                      />
                      <span className="d-block w-100 text-danger">
                        {/* {createStepError.value.message} */}
                      </span>
                    </div>
                  </RadioGroup>
                  <span className="d-block w-100 text-danger">
                    {/* {createStepError.type.message} */}
                  </span>
                </div>
                <div className="form-group row form-group">
                  <div className="col-6 col-form-field">
                    <div className="form-group form-group-common">
                      <input
                        type="text"
                        name="minAmount"
                        placeholder="Min Amount"
                        className="form-control"
                        value={approversData[editIndex]?.minAmount}
                        onChange={this.handleFormChange}
                      />
                    </div>
                    <span className="d-block w-100 text-danger">
                      {createStepError.minAmount.message}
                    </span>
                  </div>
                  <div className="col-6 col-form-field">
                    <div className="form-group form-group-common">
                      <input
                        type="text"
                        name="maxAmount"
                        placeholder="Max Amount"
                        className="form-control"
                        value={approversData[editIndex]?.maxAmount}
                        onChange={this.handleFormChange}
                      />
                    </div>
                    <span className="d-block w-100 text-danger">
                      {createStepError.maxAmount.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row form-group">
                  <RadioGroup
                    defaultValue={approversData[editIndex]?.location}
                    name="location"
                    onChange={this.handleFormChange}
                  >
                    <label className="col-12 col-form-label">Location</label>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value={"Ahmedabad"}
                        control={<Radio name="location" color="primary" />}
                        label={"Ahmedabad"}
                        style={{ margin: "0px" }}
                      />
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value={"Mumbai"}
                        control={<Radio name="location" color="primary" />}
                        label={"Mumbai"}
                        style={{ margin: "0px" }}
                      />
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value={"Delhi"}
                        control={<Radio name="location" color="primary" />}
                        label={"Delhi"}
                        style={{ margin: "0px" }}
                      />
                    </div>
                    <div className="col-12 col-form-field">
                      <FormControlLabel
                        value={"Banglore"}
                        control={<Radio name="location" color="primary" />}
                        label={"Banglore"}
                        style={{ margin: "0px" }}
                      />
                    </div>
                  </RadioGroup>
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
                    onClick={this.createNewApprover}
                  >
                    Create
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="create-btn"
                    onClick={this.SubmitEditStep}
                  >
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

export default ApprovalWorkFlowChild;
