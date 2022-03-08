import React, { Component } from "react";
import Joannah from "../../assets/images/dashbord/joannah.png";
import Johnson from "../../assets/images/dashbord/johnson.png";
import Marteens from "../../assets/images/dashbord/marteens.png";
import Machel from "../../assets/images/dashbord/machel.png";
import Kevin from "../../assets/images/dashbord/kevin.png";
import LinearProgress from "@material-ui/core/LinearProgress";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from "@material-ui/icons/Add";
import { ReactSortable } from "react-sortablejs";
import IconButton from "@material-ui/core/IconButton";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Tooltip,
  ThemeProvider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
// import {Dialog} from '@material-ui/core';

import { kanbanActions } from "../../_actions/kanban.actions";
import { connect } from "react-redux";
import { status } from "../../_constants";

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (
      prevProps.kanban_status !== this.props.kanban_status &&
      this.props.kanban_status === status.SUCCESS
    ) {
      if (this.props.kanban_list) {
        const { kanban_list } = this.props;
        for (let i = 0; i < kanban_list.length; i++) {
          let data = kanban_list[i];
          if (data.progressPer == 100) {
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
    // const { quatationList } = this.state;
    let retData = [];
    if (quatationList && quatationList.length > 0) {
      for (let i = 0; i < quatationList.length; i++) {
        let row = quatationList[i];
        let time = row.time.split("T");
        let emailtime = time[1].split(".");
        retData.push(
          <div className="col-12" key={row.title}>
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
                  <IconButton className="float-right right-icon">
                    <MoreHorizIcon />
                  </IconButton>
                </div>
                <div className="department">{row.title}</div>
                <div className="get-proses">
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
                      <AvatarGroup max={4}>
                        {row.users.map((val) => {
                          return <Avatar alt="Remy Sharp" src={val.url} />;
                        })}
                      </AvatarGroup>
                    </div>
                  )}
                  <span>Due in {emailtime[0]}</span>
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
                  <span>Move card hare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return retData;
  };
  //  invite poople onclick
  invitePeoples = () => {
    // alert("wroking")
    const { invitePeoples } = this.state;
    let dialog = !invitePeoples;
    this.setState({
      invitePeoples: dialog,
    });
  };
  // dilog
  render() {
    const { invitePeoples, onProgressCount, completedCount } = this.state;
    let { quatationList, onProgress, revised, completed } = this.state;
    return (
      <div className="main-content">
        <div className="kanban-head">
          <div className="head-top">
            <IconButton className="head-icon">
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className="head-content">
              <h4>Quotations by Suppliers</h4>
              <p>Created by Liolya Chan on June31,200</p>
            </div>
            <IconButton className="head-menu-icon">
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className="head-bottom">
            <div className="row justify-content-center align-items-center">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
                <div className="head-left">
                  <div className="group-imags">
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
                  <div className="head-btn">
                    <Button
                      variant="contained"
                      className="invite-btn"
                      onClick={this.invitePeoples}
                    >
                      <PersonAddIcon className="btn-icon" />
                      Invite People
                    </Button>
                    <Button variant="outlined" className="private-btn">
                      Private
                    </Button>
                    <Button variant="contained" className="edit-btn">
                      Edit
                    </Button>
                    <Button variant="outlined" className="comments-btn">
                      <ChatIcon className="btn-icon" />
                      45 Comments
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                <div className="head-right">
                  <p>Total Progress 60%</p>
                  <span>
                    <LinearProgress
                      variant="determinate"
                      value={40}
                      style={{ backgroundColor: "#dadada" }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* invite friends ---------------*/}
        <Dialog
          open={invitePeoples}
          aria-labelledby="form-dialog-title"
          className="invite-module"
        >
          <DialogTitle id="form-dialog-title" className="invite-module-header">
            Invite members to your contact list
            <CloseIcon className="close-icon" onClick={this.invitePeoples} />
          </DialogTitle>
          <DialogContent className="invite-module-content">
            <>
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                  <label className="d-block">Email Address</label>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                  <label className="d-block">Name (Optional)</label>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                  <div className="form-group form-group-common">
                    <input
                      type="text"
                      name="email"
                      placeholder="Eg.James@example.com"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                  <div className="form-group form-group-common">
                    <input
                      type="text"
                      name="name"
                      placeholder="Eg.james"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-2">
                  <CloseIcon className="close-icon" />
                </div>
              </div>
            </>
            <div className="add-multiples" onClick={this.addMoreContcat}>
              <AddCircleIcon className="plus-icon" />
              <span>Add New </span>
            </div>
          </DialogContent>
          <DialogActions className="invite-module-footer">
            <Button
              variant="contained"
              className="invitation-btn"
              onClick={this.sendInvitation}
            >
              <PersonAddIcon className="user-icon" />
              Send Invitation
            </Button>
          </DialogActions>
        </Dialog>
        <div className="suppliers-section">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="heading d-block">
                To&#8722;Do List &#40;{quatationList.length}&#41;
                <div className="count-btn">
                  <Button variant="contained" className="plus-btn">
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="heading d-block">
                On Progress &#40;{onProgress.length}&#41;
                <div className="count-btn">
                  <Button variant="contained" className="plus-btn">
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="heading d-block">
                Completed &#40;{completed.length}&#41;
                <div className="count-btn">
                  <Button variant="contained" className="plus-btn">
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="heading d-block">
                Revised &#40;{revised.length}&#41;
                <div className="count-btn">
                  <Button variant="contained" className="plus-btn">
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* {this.movecardHerr()} */}
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              {quatationList.length === 0 &&
                this.displayQuatation(quatationList)}
              <ReactSortable
                list={quatationList}
                setList={(newState) =>
                  this.setState({ quatationList: newState })
                }
                className="row"
                group="cards"
                style={{
                  position: `${quatationList <= 0 ? "absolute" : "relative"}`,
                  height: `${quatationList <= 0 ? "112px" : "auto"}`,
                  top: "0",
                  width: `${quatationList <= 0 ? "100%" : "auto"}`,
                }}
                onChange={(order, sortable, evt) => {}}
                onEnd={(evt) => {}}
              >
                {quatationList &&
                  quatationList.length > 0 &&
                  this.displayQuatation(quatationList)}
              </ReactSortable>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              {onProgress.length === 0 && this.displayQuatation(onProgress)}
              <ReactSortable
                list={onProgress}
                setList={(newState) => this.setState({ onProgress: newState })}
                className="row"
                group="cards"
                style={{
                  position: `${onProgress <= 0 ? "absolute" : "relative"}`,
                  height: `${onProgress <= 0 ? "112px" : "auto"}`,
                  top: "0",
                  width: `${onProgress <= 0 ? "100%" : "auto"}`,
                }}
                onChange={(order, sortable, evt) => {}}
                onEnd={(evt) => {}}
              >
                {onProgress &&
                  onProgress.length > 0 &&
                  this.displayQuatation(onProgress)}
              </ReactSortable>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              {completed.length === 0 && this.displayQuatation(completed)}
              <ReactSortable
                list={completed}
                setList={(newState) => this.setState({ completed: newState })}
                className="row"
                group="cards"
                style={{
                  position: `${completed <= 0 ? "absolute" : "relative"}`,
                  height: `${completed <= 0 ? "112px" : "auto"}`,
                  top: "0",
                  width: `${completed <= 0 ? "100%" : "auto"}`,
                }}
                onChange={(order, sortable, evt) => {}}
                onEnd={(evt) => {}}
              >
                {completed &&
                  completed.length > 0 &&
                  this.displayQuatation(completed)}
              </ReactSortable>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              {revised.length === 0 && this.displayQuatation(revised)}
              <ReactSortable
                list={revised}
                setList={(newState) => this.setState({ revised: newState })}
                className="row"
                group="cards"
                style={{
                  position: `${revised <= 0 ? "absolute" : "relative"}`,
                  height: `${revised <= 0 ? "112px" : "auto"}`,
                  top: "0",
                  width: `${revised <= 0 ? "100%" : "auto"}`,
                }}
                onChange={(order, sortable, evt) => {}}
                onEnd={(evt) => {}}
              >
                {revised &&
                  revised.length > 0 &&
                  this.displayQuatation(revised)}
              </ReactSortable>
            </div>
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
export default connect(mapStateToProps)(Kanban);
