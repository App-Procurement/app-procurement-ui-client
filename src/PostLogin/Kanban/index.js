import React, { Component } from 'react';
import Joannah from '../../assets/images/dashbord/joannah.png';
import Machel from '../../assets/images/dashbord/machel.png';
import Kevin from '../../assets/images/dashbord/kevin.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';
import { ReactSortable } from 'react-sortablejs';
import IconButton from '@material-ui/core/IconButton';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { kanbanActions } from '../../_actions/kanban.actions';
import { connect } from 'react-redux';
import { status } from '../../_constants';
import { withTranslation } from 'react-i18next';
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import 'rc-calendar/assets/index.css';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import { t } from 'i18next';
import UserProfileImg from '../../assets/images/message/user-profile-img.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Box from '@material-ui/core/Box';


class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        budgetType: 10,
        status: '',
        reqno: '',
        depart: '',
        ViewDetail: false,
        selectBuyer: false
      },
      quatationList: [],
      onProgress: [],
      completed: [],
      revised: [],
      onProgressCount: 0,
      completedCount: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(kanbanActions.fetchKanbanList());
  }

  componentDidUpdate(prevProps, prevState) {
    let { onProgressCount, completedCount } = this.state;
    if (prevProps.kanban_status !== this.props.kanban_status && this.props.kanban_status === status.SUCCESS) {
      if (this.props.kanban_list) {
        const { kanban_list } = this.props;
        for (let i = 0; i < kanban_list.length; i++) {
          let data = kanban_list[i];
          if (data.progressPer === 100) {
            completedCount++;
          } else {
            onProgressCount++;
          }
        }
        this.setState({
          quatationList: this.props.kanban_list,
          completedCount,
          onProgressCount,
        });
      }
    }
  }
  displayQuatation = (quatationList) => {
    let retData = [];
    if (quatationList && quatationList.length > 0) {
      for (let i = 0; i < quatationList.length; i++) {
        let row = quatationList[i];
        let time = row.time.split('T');
        let emailtime = time[1].split('.');
        retData.push(
          <div className="col-12" key={i + 1}>
            <div className="suppliers-list" onClick={this.suppliersList}>
              <div className="suppliers-content">
                <div className={`heading ${row.color}`} style={{ color: `#ffab2e` }}>
                  <span className="icon" style={{ backgroundColor: `#ffab2e` }}></span>
                  {row.type}
                  <div className="float-right right-icon">
                    <IconButton className="menu-icon">
                      <MoreHorizIcon />
                    </IconButton>
                    <i class="fas fa-angle-double-up"></i>
                  </div>
                </div>
                <div className="update-status-contant">
                  <p>Status</p>
                  <Button variant="outlined" className="status-btn">
                    {t('Open')}
                  </Button>
                </div>
                <div className="user-contant">
                  <div className="department">{row.title}</div>
                  <p>
                    Quo est mollitia impedit nostrum iure ratione consequatur Quo est mollitia impedit nostrum iure ratione consequatur utQuo est mollitia impedit nostrum iure ratione consequatur ut
                  </p>
                </div>
                <div className="get-proses">
                  <div className="progress-text">
                    <p>{t('Progress')}</p>
                    <span>10%</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={row.progressPer}
                    bar="#ffab2e"
                    style={{ backgroundColor: '#dadada' }}
                  />
                </div>
                <div className="user-text">
                  {row.users && row.users.length > 0 && (
                    <div className="user-images">
                      <i class="fal fa-plus-circle"></i>
                      <AvatarGroup max={4}>
                        {row.users.map((val) => {
                          return <Avatar alt="Remy Sharp" src={val.url} />;
                        })}
                      </AvatarGroup>
                    </div>
                  )}
                  <span><i class="far fa-paperclip"></i> {emailtime[0]} <i class="fas fa-comment-alt-lines"></i></span>
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
                  <span><i class="fal fa-plus"></i> {t('Add Task')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return retData;
  };
  // invitePeoples = () => {
  //   const { invitePeoples } = this.state;
  //   let dialog = !invitePeoples;
  //   this.setState({
  //     invitePeoples: dialog,
  //   });
  // };
  addTask = () => {
    const { addTask } = this.state;
    let dialog = !addTask;
    this.setState({
      addTask: dialog,
    });
  };
  suppliersList = () => {
    const { suppliersList } = this.state;
    let dialog = !suppliersList;
    this.setState({
      suppliersList: dialog,
    })
  };
  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };
  render() {
    const { invitePeoples, addTask, suppliersList, dueDate, requiData, } = this.state;
    let { quatationList, onProgress, revised, completed } = this.state;
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
                      <li><i class="fas fa-clock"></i><p>05 days remaing</p></li>
                      <li>
                        <Button variant="contained" className="primary-btn add-task-btn"
                          onClick={this.addTask}>
                          {t('Add Task')}
                        </Button>
                      </li>
                      <li>
                        <Button variant="outlined" className="primary-btn add-step-btn ">
                          {t('Add Step')}
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog open={addTask} aria-labelledby="form-dialog-title" className="add-task-dialog">
            <DialogTitle id="form-dialog-title" className="top-header">
              {t('New Task')}
              <CloseIcon className="close-icon" onClick={this.addTask} />
            </DialogTitle>
            <DialogContent className="add-task-dialog-content">
              <>
                <div className="row">
                  <div className="col-12">
                    <div className="tast-name-contant">
                      <label className="d-block">{t('Task Name')}</label>
                      <div className="form-group form-group-common">
                        <input type="text" name="email" placeholder="Lease Warehous|" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="description-contant">
                      <label className="d-block">{t('Description')}</label>
                      <div className="form-group form-group-common">
                        <textarea name="note" placeholder=" Quo est mollitia impedit nostrum iure ratione consequatur Quo est mollitia impedit nostrum iure ratione consequatur utQuo est mollitia impedit nostrum iure ratione consequatur ut" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="new-requeust-massge">
                      <label className="d-block">{t('Assign to')}</label>
                      <FormControl className="payment-select-menu">
                        <NativeSelect
                          name="bankName"
                          onChange={(e) => this.handleStateChange(e, 'bank')}
                        >
                          <option value="">Main Office USA</option>
                          <option value={10}>abc</option>
                          <option value={20}>def</option>
                          <option value={30}>abc</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="calender-contant">
                      <label className="d-block">{t('Select Due date')}</label>
                      <div className="d-flex align-items-center date-picker">
                        <DatePicker
                          selected={dueDate}
                          placeholder={'YYYY-MM-DD'}
                          onChange={(date) => this.handleDates(date, 'dueDate')}
                        />
                        <CalendarTodayTwoToneIcon className="calendar-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </DialogContent>
            <DialogActions className="add-module-footer mt-4 d-flex align-items-center justify-content-center">
              <Button variant="contained" className="add-task-btn" onClick={this.sendInvitation}>
                {t('Add Task')}
              </Button>
            </DialogActions>
          </Dialog>
          <div className="suppliers-section">
            <div className="suppliers-head-section">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  {/* <div className="heading d-block">
                  To&#8722;Do List &#40;{quatationList.length}&#41;
                  <div className="count-btn">
                    <Button variant="contained" className="plus-btn">
                      <AddIcon />
                    </Button>
                  </div>
                </div> */}
                  <div className="d-block progress-count">
                    <p>To DO (20)</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  {/* <div className="heading d-block">
                  On Progress &#40;{onProgress.length}&#41;
                  <div className="count-btn">
                    <Button variant="contained" className="plus-btn">
                      <AddIcon />
                    </Button>
                  </div>
                </div> */}
                  <div className="d-block progress-count">
                    <p>In Progress (06)</p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  {/* <div className="heading d-block">
                  Completed &#40;{completed.length}&#41;
                  <div className="count-btn">
                    <Button variant="contained" className="plus-btn">
                      <AddIcon />
                    </Button>
                  </div>
                </div> */}
                  <div className="d-block progress-count">
                    <p>Done (02)</p>
                  </div>
                </div>
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="heading d-block">
                  Revised &#40;{revised.length}&#41;
                  <div className="count-btn">
                    <Button variant="contained" className="plus-btn">
                      <AddIcon />
                    </Button>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {quatationList.length === 0 && this.displayQuatation(quatationList)}
                <ReactSortable
                  list={quatationList}
                  setList={(newState) => this.setState({ quatationList: newState })}
                  className="row"
                  group="cards"
                  style={{
                    position: `${quatationList <= 0 ? 'absolute' : 'relative'}`,
                    height: `${quatationList <= 0 ? '112px' : 'auto'}`,
                    top: '0',
                    width: `${quatationList <= 0 ? '100%' : 'auto'}`,
                  }}
                  onChange={() => { }}
                  onEnd={() => { }}
                >
                  {quatationList && quatationList.length > 0 && this.displayQuatation(quatationList)}
                </ReactSortable>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {onProgress.length === 0 && this.displayQuatation(onProgress)}
                <ReactSortable
                  list={onProgress}
                  setList={(newState) => this.setState({ onProgress: newState })}
                  className="row"
                  group="cards"
                  style={{
                    position: `${onProgress <= 0 ? 'absolute' : 'relative'}`,
                    height: `${onProgress <= 0 ? '112px' : 'auto'}`,
                    top: '0',
                    width: `${onProgress <= 0 ? '100%' : 'auto'}`,
                  }}
                  onChange={() => { }}
                  onEnd={() => { }}
                >
                  {onProgress && onProgress.length > 0 && this.displayQuatation(onProgress)}
                </ReactSortable>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {completed.length === 0 && this.displayQuatation(completed)}
                <ReactSortable
                  list={completed}
                  setList={(newState) => this.setState({ completed: newState })}
                  className="row"
                  group="cards"
                  style={{
                    position: `${completed <= 0 ? 'absolute' : 'relative'}`,
                    height: `${completed <= 0 ? '112px' : 'auto'}`,
                    top: '0',
                    width: `${completed <= 0 ? '100%' : 'auto'}`,
                  }}
                  onChange={() => { }}
                  onEnd={() => { }}
                >
                  {completed && completed.length > 0 && this.displayQuatation(completed)}
                </ReactSortable>
              </div>
            </div>
            <Dialog open={suppliersList} aria-labelledby="form-dialog-title" className="suppliers-list-dialog">
              <DialogTitle id="form-dialog-title" className="top-header d-flex justify-content-end align-items-center">
                <CloseIcon className="close-icon" onClick={this.suppliersList} />
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
                              {t('Save')}
                            </Button>
                            <p>Step Point 02</p>
                          </div>
                          <div className="description-text">
                            <label>Description</label>
                            <p>Quo est mollitia impedit nostrum iure ratione consequatur Quo est mollitia impedit nostrum iure ratione consequatur utQuo est mollitia impedit nostrum iure ratione consequatur ut Quo est mollitia impedit nostrum iure ratione consequatur Quo est mollitia impedit nostrum iure ratione consequatur utQuo est mollitia impedit nostrum iure ratione consequatur ut</p>
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
                                <span><i class="fas fa-equals"></i>Medium</span>
                              </li>
                            </ul>
                          </div>
                          <div className="attechment-files d-flex">
                            <div className="d-inline-block attech-icon">
                              <span><i class="far fa-paperclip"></i></span>
                            </div>
                            <div className="d-inline-block attechment-contant">
                              <ul>
                                <li>
                                  <p>Attachment <i class="fas fa-edit"></i>
                                    <span><i class="far fa-trash-alt"></i></span>
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
                              <span><i class="fal fa-clock"></i> 05 days remaing</span>
                              <FormControl className="new-budget-btn">
                                <Select
                                  id="demo-simple-select" name="budgetType"
                                  value={requiData.budgetType}
                                  onChange={(e) => this.handleStateChange(e)}>
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
                            <div className='progress-heading'>Assignee Progress</div>
                            <SimpleBar className="assignee-progress-inner">
                              <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                                <div className="user-details">
                                  <div className="image"><img src={UserProfileImg} alt="" width={40} height={40} /></div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time"> <i className="fal fa-plus-circle"></i> 01 Aug 2022</span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress variant="determinate" value={50} />
                                </div>
                              </Box>
                              <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                                <div className="user-details">
                                  <div className="image"><img src={UserProfileImg} alt="" width={40} height={40} /></div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time"> <i className="fal fa-plus-circle"></i> 01 Aug 2022</span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress variant="determinate" value={50} />
                                </div>
                              </Box>
                              <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                                <div className="user-details">
                                  <div className="image"><img src={UserProfileImg} alt="" width={40} height={40} /></div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time"> <i className="fal fa-plus-circle"></i> 01 Aug 2022</span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress variant="determinate" value={50} />
                                </div>
                              </Box>
                              <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                                <div className="user-details">
                                  <div className="image"><img src={UserProfileImg} alt="" width={40} height={40} /></div>
                                  <div className="user-text">
                                    <label className="name">Tony Kopper</label>
                                    <span className="time"> <i className="fal fa-plus-circle"></i> 01 Aug 2022</span>
                                  </div>
                                </div>
                                <div className="get-proses">
                                  <div className="progress-text">
                                    <p>Progress</p>
                                    <span>43%</span>
                                  </div>
                                  <LinearProgress variant="determinate" value={50} />
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
                    <div className='user-profiles-contant'>
                      <div className="user-profile">
                        <div className="image">
                          <img src={UserProfileImg} alt="" width={40} height={40} />
                        </div>
                        <div className="user-contant">
                          <div className="user-name">
                            <label>Herry Que</label>
                            <span><i class="fal fa-clock"></i> 01 Aug 2022</span>
                          </div>
                          <div className="user-text">
                            <p>uploaded all attachments</p>
                          </div>
                        </div>
                      </div>
                      <div className="user-profile">
                        <div className="image">
                          <img src={UserProfileImg} alt="" width={40} height={40} />
                        </div>
                        <div className="user-contant">
                          <div className="user-name">
                            <label>Herry Que</label>
                            <span><i class="fal fa-clock"></i> 01 Aug 2022</span>
                          </div>
                          <div className="user-text">
                            <p>uploaded all attachments</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sender-massage">
                      <div className="user-image">
                        <img src={UserProfileImg} alt="" width={40} height={40} />
                      </div>
                      <div className="d-block massege-box">
                        <input type="text" className="control-form" placeholder="type your update here" />
                        <i class="far fa-paperclip"></i>
                      </div>
                    </div>
                    <div className="module-btn row d-flex justify-content-end align-items-center">
                      <Button variant="contained" className="primary-btn" onClick={this.sendInvitation}>
                        {t('Save')}
                      </Button>
                      <Button variant="contained" className="primary-btn cancel-btn" onClick={this.sendInvitation}>
                        {t('Cancel')}
                      </Button>
                    </div>
                  </div>
                </>
              </DialogContent>
              {/* <DialogActions className="add-module-footer mb-4">
              </DialogActions> */}
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
