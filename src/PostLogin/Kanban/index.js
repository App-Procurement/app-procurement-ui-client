import React, { Component } from "react";
import Joannah from "../../assets/images/dashbord/joannah.png";
import Machel from "../../assets/images/dashbord/machel.png";
import Kevin from "../../assets/images/dashbord/kevin.png";
import {LinearProgress} from  "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ReactSortable } from "react-sortablejs";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  NativeSelect,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { kanbanActions } from "../../_actions/kanban.actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { DatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "rc-calendar/assets/index.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { t } from "i18next";
import UserProfileImg from "../../assets/images/message/user-profile-img.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const TaskMenu = () => {
  return (
    <div className="task-menu">
      <ul>
        <li>
          <i class="fas fa-edit"></i>Edit Details
        </li>
        <li>
          <i class="fas fa-trash-alt"></i>Delete
        </li>
        <li>
          <i class="fas fa-external-link-square-alt"></i>Move
        </li>
        <li>
          <i class="fas fa-user"></i>View Users
        </li>
        <li>
          <i class="far fa-paperclip"></i>Attach Files
        </li>
      </ul>
    </div>
  );
};

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        budgetType: 10,
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
      },
      taskName: "",
      taskNameError: "",
      taskDescription: "",
      taskDescriptionError: "",
      taskUser: "",
      taskUserError: "",
      taskDueDate: "",
      taskDueDateError: "",
      tasksList: [],
      toDo: [],
      onProgress: [],
      completed: [],
      revised: [],
      onProgressCount: 0,
      completedCount: 0,
      menuOpen: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(kanbanActions.fetchKanbanList());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.kanban_status !== this.props.kanban_status &&
      this.props.kanban_status === status.SUCCESS
    ) {
      if (this.props.kanban_list && this.props.kanban_list.length) {
        const { toDo, onProgress, completed } = this.state;
        this.props.kanban_list.forEach((item) => {
          if (item.status === "a") {
            toDo.push(item);
          } else if (item.status === "b") {
            onProgress.push(item);
          } else if (item.status === "c") {
            completed.push(item);
          }
        });
        this.setState({
          tasksList: this.props.kanban_list,
          toDo,
          onProgress,
          completed,
        });
      }
    }
  }

  displayTasks = (tasksList) => {
    let retData = [];
    if (tasksList && tasksList.length > 0) {
      for (let i = 0; i < tasksList.length; i++) {
        let row = tasksList[i];
        let time = row.time.split("T");
        let emailtime = time[1].split(".");
        let menuOpen = this.state.menuOpen;
        let index = i;
        retData.push(
          <div
            className={
              row.status === "a"
                ? "col-12 task-todo"
                : row.status === "b"
                ? "col-12 task-inprogress"
                : "col-12 task-complete"
            }
            key={i + 1}
          >
            <div className="suppliers-list">
              <div className="suppliers-content">
                <div
                  className={`heading ${row.color}`}
                  style={{ color: `#ffab2e` }}
                >
                  <span
                    className="icon"
                    style={{ backgroundColor: `#ffab2e` }}
                  ></span>
                  {row.type}
                  <div className="float-right right-icon">
                    <IconButton
                      className="menu-icon"
                      onClick={() => {
                        const { menuOpen } = this.state;
                        if (menuOpen !== null) {
                          this.setState({ menuOpen: null });
                        } else {
                          this.setState({ menuOpen: tasksList[index] });
                        }
                      }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <i className="fas fa-angle-double-up"></i>
                  </div>
                  {tasksList[index] === menuOpen ? <TaskMenu /> : <></>}
                </div>
                <div className="suppliers-details" onClick={this.suppliersList}>
                  <div className="update-status-contant">
                    <p>Status</p>
                    <Button
                      variant="outlined"
                      className={
                        row.status === "a"
                          ? "status-btn"
                          : row.status === "b"
                          ? "in-progress-btn"
                          : "complete-btn"
                      }
                    >
                      {t(
                        row.status === "a"
                          ? "Open"
                          : row.status === "b"
                          ? "In Progress"
                          : "Complete"
                      )}
                    </Button>
                  </div>
                  <div className="user-contant">
                    <div className="department">{row.title}</div>
                    <p>{row.description}</p>
                  </div>
                  <div className="get-proses">
                    <div className="progress-text">
                      <p>{t("Progress")}</p>
                      <span>{row.progressPer}%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={row.progressPer}
                      bar="#ffab2e"
                      style={{ backgroundColor: "#dadada" }}
                    />
                  </div>
                  <div className="user-text">
                    {row.users && row.users.length > 0 && (
                      <div className="user-images">
                        <i className="fal fa-plus-circle"></i>
                        <AvatarGroup max={4}>
                          {row.users.map((val) => {
                            return <Avatar alt="Remy Sharp" src={val.url} />;
                          })}
                        </AvatarGroup>
                      </div>
                    )}
                    <span>
                      <i className="far fa-paperclip"></i> {emailtime[0]}
                      <i className="fas fa-comment-alt-lines"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      retData.push(
        <div className="row">
          <div className="col-12">
            <div className="suppliers-list">
              <div className="suppliers-content important">
                <div className="dragdrop-file">
                  <span>
                    <i className="fal fa-plus"></i> {t("Add Task")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return retData;
  };

  addTaskModal = () => {
    const { addTask } = this.state;
    let dialog = !addTask;
    this.setState({
      addTask: dialog,
      taskName: "",
      taskNameError: "",
      taskDueDate: "",
      taskDueDateError: "",
      taskUser: "",
      taskUserError: "",
      taskDescription: "",
      taskDescriptionError: "",
    });
  };

  validateTask = () => {
    let valid = false;
    const { taskName, taskUser, taskDueDate, taskDescription } = this.state;
    if (!taskName) {
      this.setState({ taskNameError: "Task name is required" });
      valid = false;
    } else {
      this.setState({ taskNameError: "" });
    }

    if (!taskUser) {
      this.setState({ taskUserError: "Select at least one user" });
      valid = false;
    } else {
      this.setState({ taskUserError: "" });
    }

    if (!taskDueDate) {
      this.setState({ taskDueDateError: "Date is required" });
      valid = false;
    } else {
      this.setState({ taskDueDateError: "" });
    }

    if (!taskDescription) {
      this.setState({ taskDescriptionError: "Task description is required" });
      valid = false;
    } else {
      this.setState({ taskDescriptionError: "" });
    }

    if (taskName && taskDescription && taskUser && taskDueDate) {
      valid = true;
    }

    return valid;
  };

  addTask = () => {
    if (this.validateTask()) {
      const {
        addTask,
        taskName,
        taskDescription,
        taskUser,
        taskDueDate,
      } = this.state;
      let dialog = !addTask;
      this.setState({
        addTask: dialog,
      });
      const formData = {
        taskName: taskName,
        taskDescription: taskDescription,
        taskUser: taskUser,
        taskDueDate: taskDueDate,
      };
      this.props.dispatch(kanbanActions.addKanban(JSON.stringify(formData)));
      this.setState({
        taskName: "",
        taskNameError: "",
        taskDueDate: "",
        taskDueDateError: "",
        taskUser: "",
        taskUserError: "",
        taskDescription: "",
        taskDescriptionError: "",
      });
    } else {
      return null;
    }
  };

  suppliersList = () => {
    const { suppliersList } = this.state;
    let dialog = !suppliersList;
    this.setState({
      suppliersList: dialog,
      menuOpen: null,
    });
  };

  handleFormFieldsInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (date) => {
    this.setState({
      taskDueDate: date.$d,
    });
  };

  handleTaskDragAndDrop = () => {
    this.state.revised = this.state.toDo.concat(
      this.state.onProgress,
      this.state.completed
    );
    this.setState(this.state.revised);
    this.props.dispatch(
      kanbanActions.updateKanban(JSON.stringify(this.state.revised))
    );
  };

  render() {
    const {
      addTask,
      suppliersList,
      dueDate,
      requiData,
      taskNameError,
      taskDescriptionError,
      taskDueDateError,
      taskUserError,
    } = this.state;
    let { onProgress, completed, toDo } = this.state;
    return (
      <div className="main-content">
        <div className="kanban-contant">
          <div className="kanban-header-section">
            <div className="heading">
              <h4>Kanban</h4>
            </div>
            <div className="header-search-bar">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-4">
                  <div className="search-bar-left">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Search your project here"
                        onChange={this.onSearchChange}
                      />
                      <button>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="search-bar-right">
                    <ul>
                      <li>
                        <i className="fas fa-clock"></i>
                        <p>05 days remaing</p>
                      </li>
                      <li>
                        <Button
                          variant="contained"
                          className="primary-btn add-task-btn"
                          onClick={this.addTaskModal}
                        >
                          {t("Add Task")}
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="outlined"
                          className="primary-btn add-step-btn "
                        >
                          {t("Add Step")}
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={addTask}
            aria-labelledby="form-dialog-title"
            className="add-task-dialog "
          >
            <DialogTitle id="form-dialog-title " className="top-header">
              {t("New Task")}
              <CloseIcon className="close-icon" onClick={this.addTaskModal} />
            </DialogTitle>
            <DialogContent className="add-task-dialog-content">
              <>
                <div className="row">
                  <div className="col-12">
                    <div className="tast-name-contant">
                      <label className="d-block">{t("Task Name")}</label>
                      <div className="form-group form-group-common">
                        <input
                          type="text"
                          name="taskName"
                          placeholder="Lease Warehoue"
                          className="form-control"
                          onChange={this.handleFormFieldsInput}
                        />
                        <span className="d-block w-100 text-danger">
                          {taskNameError}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="description-contant">
                      <label className="d-block">{t("Description")}</label>
                      <div className="form-group form-group-common">
                        <textarea
                          name="taskDescription"
                          placeholder="Short description regarding the task"
                          onChange={this.handleFormFieldsInput}
                        />
                        <span className="d-block w-100 text-danger">
                          {taskDescriptionError}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="new-requeust-massge">
                      <label className="d-block">{t("Assign to")}</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="taskUser"
                          onChange={this.handleFormFieldsInput}
                        >
                          <option value="">Select User</option>
                          <option value={10}>User 1</option>
                          <option value={20}>User 2</option>
                          <option value={30}>User 3</option>
                        </NativeSelect>
                      </FormControl>
                      <span className="d-block w-100 text-danger">
                        {taskUserError}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="calender-contant">
                      <label className="d-block">{t("Select Due date")}</label>
                      <div className="d-flex align-items-center date-picker">
                        <DatePicker
                          name={"taskDueDate"}
                          selected={dueDate}
                          placeholder={"YYYY-MM-DD"}
                          onChange={this.handleDateChange}
                        />
                        <CalendarTodayIcon className="calendar-icon" />
                      </div>
                      <span className="d-block w-100 text-danger">
                        {taskDueDateError}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            </DialogContent>
            <DialogActions className="add-module-footer mt-4 d-flex align-items-center justify-content-center">
              <Button
                variant="contained"
                className="add-task-btn"
                onClick={this.addTask}
              >
                {t("Add Task")}
              </Button>
            </DialogActions>
          </Dialog>
          <div className="suppliers-section">
            <div className="suppliers-head-section">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <div className="d-block progress-count task-to-do">
                    <p>To Do {`(${toDo.length})`}</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <div className="d-block progress-count task-in-progress">
                    <p>In Progress ({onProgress.length})</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <div className="d-block progress-count task-complete">
                    <p>Done ({completed.length})</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {toDo.length === 0 && this.displayTasks(toDo)}
                <ReactSortable
                  list={toDo}
                  setList={(newState) => {
                    newState.forEach((item) => {
                      item.status = "a";
                    });
                    this.setState({ toDo: newState });
                    this.handleTaskDragAndDrop();
                  }}
                  className="row"
                  group="cards"
                  style={{
                    position: `${toDo <= 0 ? "absolute" : "relative"}`,
                    height: `${toDo <= 0 ? "112px" : "auto"}`,
                    top: "0",
                    width: `${toDo <= 0 ? "100%" : "auto"}`,
                  }}
                >
                  {toDo && toDo.length > 0 && this.displayTasks(toDo)}
                </ReactSortable>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {onProgress.length === 0 && this.displayTasks(onProgress)}
                <ReactSortable
                  list={onProgress}
                  setList={(newState) => {
                    newState.forEach((item) => {
                      item.status = "b";
                    });
                    this.setState({ onProgress: newState });
                    this.handleTaskDragAndDrop();
                  }}
                  className="row"
                  group="cards"
                  style={{
                    position: `${onProgress <= 0 ? "absolute" : "relative"}`,
                    height: `${onProgress <= 0 ? "112px" : "auto"}`,
                    top: "0",
                    width: `${onProgress <= 0 ? "100%" : "auto"}`,
                  }}
                >
                  {onProgress &&
                    onProgress.length > 0 &&
                    this.displayTasks(onProgress)}
                </ReactSortable>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {completed.length === 0 && this.displayTasks(completed)}
                <ReactSortable
                  list={completed}
                  setList={(newState) => {
                    newState.forEach((item) => {
                      item.status = "c";
                    });
                    this.setState({ completed: newState });
                    this.handleTaskDragAndDrop();
                  }}
                  className="row"
                  group="cards"
                  style={{
                    position: `${completed <= 0 ? "absolute" : "relative"}`,
                    height: `${completed <= 0 ? "112px" : "auto"}`,
                    top: "0",
                    width: `${completed <= 0 ? "100%" : "auto"}`,
                  }}
                >
                  {completed &&
                    completed.length > 0 &&
                    this.displayTasks(completed)}
                </ReactSortable>
              </div>
            </div>
            <Dialog
              open={suppliersList}
              aria-labelledby="form-dialog-title"
              className="suppliers-list-dialog"
            >
              <DialogTitle
                id="form-dialog-title"
                className="top-header d-flex justify-content-end align-items-center"
              >
                <CloseIcon
                  className="close-icon"
                  onClick={this.suppliersList}
                />
              </DialogTitle>
              <DialogContent className="suppliers-list-dialog-content">
                <>
                  <div className="suppliers-list-inner-contant">
                    <div className="row">
                      <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 sm-mb-4">
                        <div className="d-block suppliers-list-left">
                          <h4>Logistic support for upcoming shipments</h4>
                          <div className="update-status-contant">
                            <p>Status</p>
                            <Button variant="contained" className="status-btn">
                              {t("Save")}
                            </Button>
                            <p>Step Point 02</p>
                          </div>
                          <div className="description-text">
                            <label>Description</label>
                            <p>
                              Quo est mollitia impedit nostrum iure ratione
                              consequatur Quo est mollitia impedit nostrum iure
                              ratione consequatur utQuo est mollitia impedit
                              nostrum iure ratione consequatur ut Quo est
                              mollitia impedit nostrum iure ratione consequatur
                              Quo est mollitia impedit nostrum iure ratione
                              consequatur utQuo est mollitia impedit nostrum
                              iure ratione consequatur ut
                            </p>
                          </div>
                          <div className="description-Priority">
                            <ul>
                              <li>
                                <p>Assigned by</p>
                                <span>Jerry white</span>
                              </li>
                              <li>
                                <p>Assigned To</p>
                                <span>Tony k, Hearther few,Tiaro o.</span>
                              </li>
                              <li>
                                <p>Due by</p>
                                <span>1 Sep 2022</span>
                              </li>
                              <li>
                                <p>Priority</p>
                                <span>
                                  <i className="fas fa-equals"></i>Medium
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="attechment-files d-flex">
                            <div className="d-inline-block attech-icon">
                              <span>
                                <i className="far fa-paperclip"></i>
                              </span>
                            </div>
                            <div className="d-inline-block attechment-contant">
                              <ul>
                                <li>
                                  <p>
                                    Attachment <i className="fas fa-edit"></i>
                                    <span>
                                      <i className="far fa-trash-alt"></i>
                                    </span>
                                  </p>
                                </li>
                                <li>
                                  <p>file_format_example.zip</p>
                                  <span>1,2MB</span>
                                </li>
                                <li>
                                  <p>low-example.pdf</p>
                                  <span>1,2MB</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                        <div className="d-block suppliers-list-right">
                          <div className="suppliers-list-head">
                            <div className="top-contant">
                              <span>
                                <i className="fal fa-clock"></i> 05 days remaing
                              </span>
                              <FormControl className="new-budget-btn">
                                <Select
                                  id="demo-simple-select"
                                  name="budgetType"
                                  value={requiData.budgetType}
                                  onChange={(e) =>
                                    this.handleFormFieldsInput(e)
                                  }
                                >
                                  <MenuItem value={10}>New Budget</MenuItem>
                                  <MenuItem value={20}>Create New</MenuItem>
                                  <MenuItem value={30}>Import Budget </MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="bottom-contant">
                              <div className="group-imags">
                                <i className="fal fa-plus-circle"></i>
                                <AvatarGroup max={4}>
                                  <Avatar alt="Remy Sharp" src={Joannah} />
                                  <Avatar alt="Travis Howard" src={Machel} />
                                  <Avatar alt="Cindy Baker" src={Kevin} />
                                  <Avatar
                                    alt="Agnes Walker"
                                    src="/static/images/avatar/4.jpg"
                                  />
                                  <Avatar
                                    alt="Trevor Henderson"
                                    src="/static/images/avatar/5.jpg"
                                  />
                                </AvatarGroup>
                              </div>
                            </div>
                          </div>
                          <div className="assignee-progress-contant">
                            <div className="progress-heading">
                              Assignee Progress
                            </div>
                            <SimpleBar className="assignee-progress-inner">
                              <Box
                                sx={{ flexGrow: 1 }}
                                className="deliveries-box"
                              >
                                <div className="user-details">
                                  <div className="image">
                                    <img
                                      src={UserProfileImg}
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time">
                                      <i className="fal fa-plus-circle"></i> 01
                                      Aug 2022
                                    </span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress
                                    variant="determinate"
                                    value={50}
                                  />
                                </div>
                              </Box>
                              <Box
                                sx={{ flexGrow: 1 }}
                                className="deliveries-box"
                              >
                                <div className="user-details">
                                  <div className="image">
                                    <img
                                      src={UserProfileImg}
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time">
                                      <i className="fal fa-plus-circle"></i> 01
                                      Aug 2022
                                    </span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress
                                    variant="determinate"
                                    value={50}
                                  />
                                </div>
                              </Box>
                              <Box
                                sx={{ flexGrow: 1 }}
                                className="deliveries-box"
                              >
                                <div className="user-details">
                                  <div className="image">
                                    <img
                                      src={UserProfileImg}
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time">
                                      <i className="fal fa-plus-circle"></i> 01
                                      Aug 2022
                                    </span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress
                                    variant="determinate"
                                    value={50}
                                  />
                                </div>
                              </Box>
                              <Box
                                sx={{ flexGrow: 1 }}
                                className="deliveries-box"
                              >
                                <div className="user-details">
                                  <div className="image">
                                    <img
                                      src={UserProfileImg}
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time">
                                      <i className="fal fa-plus-circle"></i> 01
                                      Aug 2022
                                    </span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress
                                    variant="determinate"
                                    value={50}
                                  />
                                </div>
                              </Box>
                            </SimpleBar>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="suppliers-list-bottom-contant">
                    <label>Comments</label>
                    <div className="user-profiles-contant">
                      <div className="user-profile">
                        <div className="image">
                          <img
                            src={UserProfileImg}
                            alt=""
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="user-contant">
                          <div className="user-name">
                            <label>Herry Que</label>
                            <span>
                              <i className="fal fa-clock"></i> 01 Aug 2022
                            </span>
                          </div>
                          <div className="user-text">
                            <p>uploaded all attachments</p>
                          </div>
                        </div>
                      </div>
                      <div className="user-profile">
                        <div className="image">
                          <img
                            src={UserProfileImg}
                            alt=""
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="user-contant">
                          <div className="user-name">
                            <label>Herry Que</label>
                            <span>
                              <i className="fal fa-clock"></i> 01 Aug 2022
                            </span>
                          </div>
                          <div className="user-text">
                            <p>uploaded all attachments</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sender-massage">
                      <div className="user-image">
                        <img
                          src={UserProfileImg}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="d-block massege-box">
                        <input
                          type="text"
                          className="control-form"
                          placeholder="type your update here"
                        />
                        <i className="far fa-paperclip"></i>
                      </div>
                    </div>
                    <div className="module-btn row d-flex justify-content-end align-items-center">
                      <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={this.sendInvitation}
                      >
                        {t("Save")}
                      </Button>
                      <Button
                        variant="contained"
                        className="primary-btn cancel-btn"
                        onClick={this.sendInvitation}
                      >
                        {t("Cancel")}
                      </Button>
                    </div>
                  </div>
                </>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { kanban_status, kanban_list } = state.procurement;
  return {
    kanban_status,
    kanban_list,
  };
}

const connectedKanban = withTranslation()(connect(mapStateToProps)(Kanban));

export default connectedKanban;
//  "@material-ui/core": "^4.11.4",
