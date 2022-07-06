import React from "react";
import { connect } from "react-redux";
import { ChatRoomActions } from "../../_actions";
import { withTranslation } from "react-i18next";
import { status } from "../../_constants";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import IconButton from "@material-ui/core/IconButton";
import { commonFunctions } from "../../_utilities";
import cardIimg1 from "../../assets/images/chatroom/card-img1.png";
import joannah from "../../assets/images/chatroom/joannah.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class CreateRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomIndex: 0,
      membersList: [],
      roomName: "",
      description: "",
      isSubmited: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(ChatRoomActions.getChats());
    this.props.dispatch(ChatRoomActions.getMembersList());
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.get_members_status !== prevProps.get_members_status &&
      this.props.get_members_status === status.SUCCESS
    ) {
      if (
        this.props.get_members_data &&
        this.props.get_members_data.length > 0
      ) {
        for (let i = 0; i < this.props.get_members_data.length; i++) {
          this.props.get_members_data[i]["checked"] = this.props
            .get_members_data[i].checked
            ? this.props.get_members_data[i].checked
            : false;
        }
        this.setState({
          membersList: this.props.get_members_data,
        });
      }
    }
    if (
      this.props.get_contacts_status !== prevProps.get_contacts_status &&
      this.props.get_contacts_status === status.SUCCESS
    ) {
      if (
        this.props.get_contacts_data &&
        this.props.get_contacts_data.length > 0
      ) {
        this.setState({
          rooms: this.props.get_contacts_data,
        });
      }
    }
    if (
      this.props.create_chat_room_status !==
      prevProps.create_chat_room_status &&
      this.props.create_chat_room_status === status.SUCCESS
    ) {
      this.clearFields();
    }
  }

  validateForm = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    let membersFound = 0;
    let retData = {
      membersList: validObj,
      roomName: validObj,
      description: validObj
    };
    if (isSubmitted) {
      const { membersList,
        roomName,
        description } = this.state;
      for (let i = 0; i < membersList.length; i++) {
        if (membersList[i].checked) {
          membersFound += 1;
        }
      }
      if (roomName === "") {
        retData.roomName = {
          isValid: false,
          message: "Room name is Required",
        };
        isValid = false;
      }
      if (description === "") {
        retData.description = {
          isValid: false,
          message: "Description is Required",
        };
        isValid = false;
      }
      if (membersFound <= 0) {
        retData.membersList = {
          isValid: false,
          message: "Members are Required",
        };
        isValid = false;

      }
    }
    retData.isValid = isValid;
    return retData;
  };


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleRooms = () => {
    const { rooms, roomIndex, membersList } = this.state;
    let retData = [];
    for (let i = 0; i < rooms.length; i++) {
      const { chatRoomName, members, id, startDate, status } = rooms[i];
      retData.push(
        <div
          className={roomIndex === i ? "chatroom-card active" : "chatroom-card"}
          onClick={() => this.setState({ roomIndex: i })}
        >
          <div className="card-head">
            <div className="card-head-left">
              <div className="images">
                <img src={cardIimg1} alt="" />
              </div>
              <div className="head-content">
                <p>room</p>
                <h5>{chatRoomName}</h5>
              </div>
            </div>
            <IconButton className="head-menu-icon">
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className="card-content">
            <span>Members</span>
            <div className="group-imags">
              <AvatarGroup max={5}>
                {members &&
                  members.length > 0 &&
                  members.map(({ profilePic }, index) => (
                    <Avatar alt="Remy Sharp" src={profilePic} key={index} />
                  ))}
              </AvatarGroup>
            </div>
            <div className="card-bottom-content">
              <div className="star-date">
                <p>Start date</p>
                <span>
                  {commonFunctions.convertDateToString(new Date(startDate))}
                </span>
              </div>
              <div className="end-date">
                <p>Start date</p>
                <span>{status}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return retData;
  };
  clearFields = () => {
    let { roomName, description, membersList } = this.state;
    roomName = "";
    description = "";
    for (let i = 0; i < membersList.length; i++) {
      if (membersList[i].checked) {
        membersList[i].checked = false;
      }
    }
    this.setState({ membersList, description, roomName });
  };
  createRoom = () => {
    let { roomName, description, membersList } = this.state;
    let members = [];
    let validateForm = this.validateForm(true)
    if (validateForm.isSubmited) {
      for (let i = 0; i < membersList.length; i++) {
        if (membersList[i].checked) {
          members.push(membersList[i]);
        }
      }
      this.props.dispatch(
        ChatRoomActions.createChatRoom({ members, description, roomName })
      );
    }
    this.setState({ isSubmited: true })
  };
  selectMembers = (index, e) => {
    const { membersList } = this.state;
    membersList[index].checked = !membersList[index].checked;
    this.setState({ membersList });
  };
  render() {
    const { t } = withTranslation;
    const { membersList, roomName, description, isSubmited } = this.state;
    let validateForm = this.validateForm(isSubmited);
    return (
      <div className="main-content">
        <div className="chatroom-section">
          <div className="chatroom-head">
            <h3>Create Chat Room</h3>
          </div>
          <div className="create-chatroom-main-section">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
                <div className="create-chatroom-cards ">
                  <div className="create-chatroom-head">
                    <p>All chat room</p>
                  </div>
                  <SimpleBar className="create-chatroom-inner-section">
                    {this.handleRooms()}
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12">
                <div className="create-chatroom-right-section">
                  <div className="create-chatroom-head">
                    <p>Create Chat Room</p>
                  </div>
                  <div className="create-chatroom-inner-content">
                    <div className="room-name">
                      <label>Room Name</label>
                      <input
                        type="text"
                        name="roomName"
                        className="form-control"
                        value={roomName}
                        placeholder="Enter New Room Name"
                        onChange={this.handleChange}
                      />
                      <div>
                        <span className='d-block w-100 text-danger'>
                          {validateForm.roomName.message}
                        </span>
                      </div>
                    </div>
                    <div className="room-name">
                      <label>Chat Description</label>
                      <span>
                        <textarea
                          type="text"
                          name="description"
                          value={description}
                          placeholder="Enter New Room Name"
                          onChange={this.handleChange}
                        />
                      </span>
                      <div>
                        <span className='d-block w-100 text-danger'>
                          {validateForm.description.message}
                        </span>
                      </div>
                    </div>
                    <div className="add-members">
                      <label>Add Members</label>
                      <div className="member-list">
                        <div className="member-list-head">
                          <span>Search By Members</span>
                        </div>
                        <SimpleBar className="member-list-inner">
                          {membersList && membersList.length > 0 ? (
                            membersList.map(
                              ({ name, id, level, checked }, index) => (
                                <div className="member-content" key={index}>
                                  <div className="member-name">
                                    <img src={joannah} alt="image" />
                                    <div className="member-text">
                                      <label for="vehicle1">{name}</label>
                                      <span>{level}</span>
                                    </div>
                                  </div>
                                  <FormControlLabel
                                    className="check-box"
                                    control={
                                      <Checkbox
                                        name={name}
                                        color="primary"
                                        className="form-control"
                                        value={checked}
                                        checked={checked}
                                        onChange={(e) =>
                                          this.selectMembers(index, e)
                                        }
                                      />
                                    }
                                  />
                                </div>
                              )
                            )
                          ) : (
                            <>Members Not Found</>
                          )}
                        </SimpleBar>
                        <span className='d-block w-100 text-danger'>
                          {validateForm.membersList.message}
                        </span>
                      </div>
                    </div>
                    <div className="create-chatroom-button">
                      <label></label>
                      <div className="create-chatroom-button-section text-center">
                        <Button
                          variant="contained"
                          className="cancel-btn"
                          onClick={this.clearFields}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          className="create-btn"
                          onClick={this.createRoom}
                        >
                          Create
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    get_contacts_status,
    get_contacts_data,
    get_members_status,
    get_members_data,
    create_chat_room_data,
    create_chat_room_status,
  } = state.procurement;
  return {
    get_contacts_status,
    get_contacts_data,
    get_members_status,
    get_members_data,
    create_chat_room_data,
    create_chat_room_status,
  };
};
const CreatChatRoom = withTranslation()(connect(mapStateToProps)(CreateRooms));

export default CreatChatRoom;
