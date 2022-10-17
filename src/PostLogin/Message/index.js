import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import Card from "@material-ui/core/Card";
import { ChatRoomActions } from "../../_actions";
import { status } from "../../_constants";
import Button from "@material-ui/core/Button";
import officeSuppliesImg from "../../assets/images/chatroom/office-supplies-img.png";
import cardIimg1 from "../../assets/images/chatroom/card-img1.png";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import IconButton from "@material-ui/core/IconButton";
import { commonFunctions } from "../../_utilities";
import SimpleBar from "simplebar-react";
import UserInfoImg from "../../assets/images/message/user-info-img.png";
import UserProfileImg from "../../assets/images/message/user-profile-img.png";
import SettingIcon from "../../assets/images/message/setting-icon.png";
import ClearInvoiceImg from "../../assets/images/message/clear-invoice-img.png";
import SocialMediaImg1 from "../../assets/images/message/social-media-img1.png";
import SocialMediaImg2 from "../../assets/images/message/social-media-img2.png";

//import PaperclipiIcon from '../../assets/images/message/paperclipi-icon.png';

class Message extends React.Component {
  socket;
  constructor(props) {
    super(props);
    this.state = {
      openUserInfo: false,
      message: "",
      searchChat: "",
      prevChats: [],
      rooms: [],
      roomIndex: 0,
      chatIndex: 0,
      userName: "Michel Slatter",
      activeKey: 0,
    };
    this.socket = null;
  }

  componentDidMount() {
    this.props.dispatch(ChatRoomActions.getChats());
    const { prevChats } = this.state;
    this.socket = io.connect("http://localhost:5001");
    this.socket.on("hello from server", (arg) => {
      if (arg) {
        this.setState({ prevChats: [...prevChats, ...JSON.parse(arg)] });
      }
    });
    setInterval(() => {
      if (!this.socket.connected === true && !this.socket.id) {
        this.socket = io.connect("http://localhost:5001");
      }
    }, 2000);
  }
  componentDidUpdate(prevProps) {
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
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  // handleRooms = () => {
  //   const { rooms, roomIndex } = this.state;
  //   let retData = [];
  //   for (let i = 0; i < rooms.length; i++) {
  //     const { chatRoomName, members, startDate, status } = rooms[i];
  //     retData.push(
  //       <div key={`${i}_chatroom`}
  //         className={roomIndex === i ? 'chatroom-card active' : 'chatroom-card'}
  //         onClick={() => this.setState({ roomIndex: i })}
  //       >
  //         <div className="card-head">
  //           <div className="card-head-left">
  //             <div className="images">
  //               <img src={cardIimg1} alt="" />
  //             </div>
  //             <div className="head-content">
  //               <p>room</p>
  //               <h5>{chatRoomName}</h5>
  //             </div>
  //           </div>
  //           <IconButton className="head-menu-icon">
  //             <MoreVertIcon />
  //           </IconButton>
  //         </div>
  //         <div className="card-content">
  //           <span>Members</span>
  //           <div className="group-imags">
  //             <AvatarGroup max={5}>
  //               {members &&
  //                 members.length > 0 &&
  //                 members.map(({ profilePic }, index) => <Avatar alt="Remy Sharp" src={profilePic} key={`${index}pics`} />)}
  //             </AvatarGroup>
  //           </div>
  //           <div className="card-bottom-content">
  //             <div className="star-date">
  //               <p>Start date</p>
  //               <span>{commonFunctions.convertDateToString(new Date(startDate))}</span>
  //             </div>
  //             <div className="end-date">
  //               <p>Start date</p>
  //               <span>{status}</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return retData;
  // };

  handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, "name", name);
    this.setState({ [name]: value });
    let contacts = JSON.parse(JSON.stringify(this.props.get_contacts_data));
    console.log(contacts);
    // let searchContacts = [];
    // if (name === "searchChat" && value) {
    //   for (let i = 0; i < contacts.length; i++) {
    //     if (
    //       contacts[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    //     ) {
    //       searchContacts.push(contacts[i]);
    //     }
    //   }
    // } else {
    //   searchContacts = contacts;
    // }
    // this.setState({ rooms: searchContacts });
  };

  sendMessage = () => {
    if (this.state.message !== "" || null) {
      let Data = {
        type: "text",
        text: this.state.message,
        from: "jid_1109",
        sender_name: "Michel Slatter",
        to: "jid_1111",
      };
      this.socket.emit("hello from client", JSON.stringify(Data));
      this.state.prevChats.push(Data);
    }
    this.setState({ message: "" });
  };

  attachmentsLsit = (attachment) => {
    let retData = [];
    if (attachment.length > 0) {
      for (let i = 0; i < attachment.length; i++) {
        const { payload } = attachment[i];
        retData.push(
          <div
            className={`doc-inner-box ${attachment.length === 1 ? "one-file" : ""
              }`}
            key={`${i}_docs`}
          >
            <div className="doc-attachment-files">
              <img alt="image" src={payload.url} />
            </div>
          </div>
        );
      }
    }
    return retData;
  };

  chatRooms = () => {
    const { rooms, roomIndex, chatindex } = this.state;
    let retData = [];
    if (rooms.length > 0) {
      for (let i = 0; i < rooms[roomIndex].members.length; i++) {
        const { category, id, name, profilePic } = rooms[roomIndex].members[i];
        retData.push(
          <div
            onClick={() => this.setState({ chatindex: i })}
            className={chatindex == i ? "user-content active" : "user-content"}
            key={`${i}_user`}
          >
            <div className="user-profile-text">
              <div className="image">
                <img src={profilePic} width={50} height={50} alt="" />
              </div>
              <div className="user-text">
                <label>{name}</label>
                <p>{category}</p>
                {/* <p>office supply team</p> */}
              </div>
            </div>
            <div className="user-time">
              <span>3.01</span>
              <div className="noti-symbol">6</div>
            </div>
          </div>
        );
      }
    } else retData.push(<div key="empty"> NO CONTACT FOUND...</div>);
    return retData;
  };
  openUserInfo = () => {
    this.setState({
      openUserInfo: !this.state.openUserInfo,
    });
  };

  handelKey = (type) => {
    this.setState({ activeKey: type });
  };

  render() {
    const { t } = withTranslation;
    const {
      message,
      searchChat,
      prevChats,
      userName,
      openUserInfo,
      activeKey,
      rooms,
    } = this.state;
    return (
      <div className="main-content">
        <div className="message-section">
          <div className="chatroom-head">
            <h3>{this.props.t("Message")}</h3>
            {/* <Button
              variant="contained"
              className="create-room-btn"
              onClick={() => this.props.history.push('/postlogin/chatroom/createchatroom')}
            >
              Create Room
            </Button> */}
          </div>
          {/* <div className="chatroom-cards ">
            <div className="chatroom-inner-section">{this.handleRooms()}</div>
          </div> */}
          <div className="chatroom-inner-content">
            <div className="chatroom-content-left">
              <div className="chatroom-inner-head-left">
                <div className="user-chat-buttons">
                  <Button variant="contained" className="supplies-team-btn">
                    {" "}
                    Chats
                  </Button>
                </div>
                <div className="user-chat-buttons">
                  <Button variant="contained" className="group-team-btn">
                    {" "}
                    Groups
                  </Button>
                </div>
                <div className="user-menu-icon">
                  <Button variant="contained" className="icon-btn">
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </Button>
                </div>
              </div>
              <div className="search-bar-section">
                <div className="search-bar">
                  <input
                    type="text"
                    name="searchChat"
                    className="control-form"
                    // value={searchChat}
                    onChange={this.handleChange}
                    placeholder="Search"
                  />
                  <i className="fa fa-search" aria-hidden="true" />
                </div>
                <div className="fillter-btn">
                  <Button variant="contained" className="fillter-icon">
                    <i className="fa fa-filter" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <SimpleBar className="user-list">{this.chatRooms()}</SimpleBar>
            </div>
            <div
              className={`${openUserInfo
                ? "chatroom-content-right"
                : "chatroom-content-right full"
                }`}
            >
              <div className="chatroom-inner-head-right">
                <div className="user-profile">
                  <div className="image">
                    {" "}
                    <img src={officeSuppliesImg} alt="" />
                  </div>
                  <div className="user-content">
                    <p>Office Supplies</p>
                    <span>james is typing...</span>
                  </div>
                </div>
                <div className="user-menu-icon">
                  <Button
                    variant="contained"
                    className="icon-btn"
                    onClick={this.openUserInfo}
                  >
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </Button>
                </div>
              </div>
              <SimpleBar className="chatroom-inner-content-right">
                <div className="massage-chat-section">
                  {prevChats && prevChats.length > 0 ? (
                    prevChats.map(({ sender_name, text, attachment }, index) =>
                      attachment && attachment.length > 0 ? (
                        <div className="doc-section" key={`${index}_chats`}>
                          <div className="doc-user-img">
                            <img
                              src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg"
                              width={35}
                              height={35}
                              alt="image"
                            />
                          </div>
                          <div className="doc-images-box">
                            {this.attachmentsLsit(attachment)}
                          </div>
                        </div>
                      ) : sender_name === userName ? (
                        <div
                          className="user-massage-content"
                          key={`${index}_chat_rooms`}
                        >
                          <div className="user-image" key={index}>
                            <img
                              alt="image"
                              height="35px"
                              width="35px"
                              src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg"
                            />
                          </div>
                          {
                            <div className="user-massage-box">
                              <div className="user-massage-text">
                                <p>{text}</p>
                              </div>
                            </div>
                          }
                        </div>
                      ) : (
                        <div
                          className="sender-massage-content"
                          key={`${index}_chats`}
                        >
                          <div className="sender-massage-section">
                            <div className="sender-massage-box">
                              <div className="sender-massage-text">
                                <p>{text}</p>
                              </div>
                            </div>
                            <div className="user-image">
                              <img
                                alt="image"
                                height="35px"
                                width="35px"
                                src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg"
                              />
                            </div>
                          </div>
                          <div className="attech-download-file">
                            <ul>
                              <li>
                                <div className="file-contant d-flex align-items-center justify-content-center">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <div className="attech-icon">
                                      <i className="fas fa-paperclip"></i>
                                    </div>
                                    <div className="file-text">
                                      <p>file_format_example.zip</p>
                                      <span>1,2MB</span>
                                    </div>
                                  </div>
                                  <div className="down-icon">
                                    <i className="fas fa-arrow-alt-to-bottom"></i>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="file-contant d-flex align-items-center justify-content-center">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <div className="attech-icon">
                                      <i className="fas fa-paperclip"></i>
                                    </div>
                                    <div className="file-text">
                                      <p>file_format_example.zip</p>
                                      <span>1,2MB</span>
                                    </div>
                                  </div>
                                  <div className="down-icon">
                                    <i className="fas fa-arrow-alt-to-bottom"></i>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <>loading</>
                  )}
                </div>
              </SimpleBar>
              <div className="sender-bottom-section">
                <div className="type-massage">
                  <input
                    type="text"
                    className="control-form"
                    name="message"
                    onChange={(e) => this.handleChange(e)}
                    value={message}
                    placeholder="write your message"
                  />
                  <div className="user-image">
                    <img
                      height="30px"
                      width="30px"
                      src="http://c.files.bbci.co.uk/C870/production/_112921315_gettyimages-876284806.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="social-icon">
                    <i class="fal fa-microphone-alt"></i>
                    <i class="fal fa-paperclip"></i>
                    <i class="far fa-smile"></i>
                  </div>
                  <div className="send-btn" onClick={this.sendMessage}>
                    <Button variant="contained" className="massage-send-btn">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {openUserInfo && (
              <div className="user-information">
                <div className="user-information-head">
                  <span className="float-left" onClick={this.openUserInfo}>
                    <i class="fal fa-times"></i>
                  </span>
                  <p>User Info</p>
                </div>
                {/* <div className="user-profile">
                  <div className="user-profile-details">
                    <div className="user-profile-content">
                      <img src={UserInfoImg} alt="" />
                      <label>James Lycus</label>
                      <span>Approver Level 1</span>
                    </div>
                  </div>
                </div> */}
                <div className="user-profile-details">
                  <div className="user-profile-content">
                    <div className="user-img">
                      <img src={UserProfileImg} alt="" />
                    </div>
                    <div className="user-profile-text">
                      <label>James Lycus</label>
                      <span>Approver Level 1</span>
                    </div>
                  </div>
                  <div className="setting-icon">
                    <img src={SettingIcon} alt="" />
                  </div>
                </div>
                <div className="social-media-images">
                  <div className="head-menu">
                    <ul>
                      <li className="active">Media</li>
                      <li>See all</li>
                    </ul>
                  </div>
                  <div className="media-images">
                    <ul>
                      <li>
                        <div className="image">
                          <img src={SocialMediaImg1} alt="" />
                        </div>
                      </li>
                      <li>
                        <div className="image">
                          <img src={SocialMediaImg2} alt="" />
                        </div>
                      </li>
                      <li>
                        <div className="total-images">&#43;174</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="user-information-tabs">
                  <ul>
                    <li
                      onClick={() => this.handelKey(0)}
                      className={activeKey === 0 ? "active" : ""}
                    >
                      file
                    </li>
                    <li
                      onClick={() => this.handelKey(1)}
                      className={activeKey === 1 ? "active" : ""}
                    >
                      Links
                    </li>
                    {/* <li onClick={() => this.handelKey(1)} className={activeKey === 1 ? 'active' : ''}>DOCS</li> */}
                  </ul>
                </div>
                {activeKey === 0 && (
                  <div className="user-info-tab  active">
                    <div className="media-tab-contant">
                      <ul>
                        <li>
                          <div className="document-contant">
                            <span className="blue-color">
                              <i class="fas fa-file-pdf"></i>
                            </span>
                            <div className="document-text">
                              <label>Corrigendum update.pdf</label>
                              <div className="timing-text">
                                <p>1.2MB</p>
                                <p>19 July 2022</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="document-contant">
                            <span className="dark-violet">
                              <i class="fas fa-file"></i>
                            </span>
                            <div className="document-text">
                              <label>Vendor Docs.jpg</label>
                              <div className="timing-text">
                                <p>1.2MB</p>
                                <p>19 July 2022</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="document-contant">
                            <span className="dark-orange">
                              <i class="fas fa-microphone"></i>
                            </span>
                            <div className="document-text">
                              <label>Voice.Mp4</label>
                              <div className="timing-text">
                                <p>1.2MB</p>
                                <p>19 July 2022</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="document-contant">
                            <span className="deep-sky-blue">
                              <i class="fas fa-file-pdf"></i>
                            </span>
                            <div className="document-text">
                              <label>Logistics Bills.pdf</label>
                              <div className="timing-text">
                                <p>1.2MB</p>
                                <p>19 July 2022</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="d-block text-center">
                        <Button
                          variant="contained"
                          color="primary"
                          className="primary-btn document-btn"
                        >
                          See All
                        </Button>
                      </div>
                      <div className="pinned-message">
                        <div className="head-menu">
                          <ul>
                            <li className="active">Media</li>
                            <li>See all</li>
                          </ul>
                        </div>
                        <div className="pinned-message-inner-contant">
                          <ul>
                            <li>
                              <div className="message-box">
                                <p>Hello Jacob we have a start new bid </p>
                                <span>
                                  <i class="fas fa-thumbtack"></i>
                                </span>
                              </div>
                              <div className="timing-text">
                                <p>Adriance wayne</p>
                                <p>22 June 2022</p>
                              </div>
                            </li>
                            <li>
                              <div className="message-box">
                                <p>Hello Jacob we have a start new bid </p>
                                <span>
                                  <i class="fas fa-thumbtack"></i>
                                </span>
                              </div>
                              <div className="timing-text">
                                <p>Adriance wayne</p>
                                <p>22 June 2022</p>
                              </div>
                            </li>
                            <li>
                              <div className="message-box">
                                <p>Hello Jacob we have a start new bid </p>
                                <span>
                                  <i class="fas fa-thumbtack"></i>
                                </span>
                              </div>
                              <div className="timing-text">
                                <p>Adriance wayne</p>
                                <p>22 June 2022</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="user-info-media-buttons">
                      <ul>
                        <li>
                          <Button variant="contained" size="large" className='group-btn clear-btn'><i className="clear-btn far fa-comment-alt-lines"></i>Clear Chat</Button>
                        </li>
                        <li>
                          <Button variant="contained" size="large" className='group-btn delete-btn'><i className="delete-btn far fa-trash-alt"></i>Delete Chat</Button>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                )}
                {activeKey === 1 && (
                  <div className="user-info-tab active">
                    <div className="link-tab-contant">
                      <ul>
                        <li>
                          <Card className="link-card">
                            <div className="link-box">
                              <div className="link-image">
                                <img src={ClearInvoiceImg} alt="" />
                              </div>
                              <div className="link-contant">
                                <label>Clear invoice</label>
                                <p>Clear all pending invoice of this month</p>
                                <span>https://www.iconfinder.com</span>
                              </div>
                            </div>
                            <div className="link-card-bottom">
                              <ul>
                                <li>
                                  <a href="#">View Purchase order</a>
                                  <span>
                                    <i class="fas fa-angle-right"></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#">Track Request</a>
                                  <span>
                                    <i class="fas fa-angle-right"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </Card>
                        </li>
                        <li>
                          <Card className="link-card">
                            <div className="link-box">
                              <div className="link-image">
                                <img src={ClearInvoiceImg} alt="" />
                              </div>
                              <div className="link-contant">
                                <label>Clear invoice</label>
                                <p>Clear all pending invoice of this month</p>
                                <span>https://www.iconfinder.com</span>
                              </div>
                            </div>
                            <div className="link-card-bottom">
                              <ul>
                                <li>
                                  <a href="#">View Purchase order</a>
                                  <span>
                                    <i class="fas fa-angle-right"></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#">Track Request</a>
                                  <span>
                                    <i class="fas fa-angle-right"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </Card>
                        </li>
                      </ul>
                      <div className="d-block text-center">
                        <Button
                          variant="contained"
                          color="primary"
                          className="primary-btn document-btn"
                        >
                          See All
                        </Button>
                      </div>
                      <div className="pinned-message">
                        <div className="head-menu">
                          <ul>
                            <li className="active">Media</li>
                            <li>See all</li>
                          </ul>
                        </div>
                        <div className="pinned-message-inner-contant">
                          <ul>
                            <li>
                              <div className="message-box">
                                <p>Hello Jacob we have a start new bid </p>
                                <span>
                                  <i class="fas fa-thumbtack"></i>
                                </span>
                              </div>
                              <div className="timing-text">
                                <p>Adriance wayne</p>
                                <p>22 June 2022</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {
                  // activeKey === 2 &&
                  // <div className="user-info-tab docs active">
                  //   <div className="docs-tab-contant">
                  //     <ul>
                  //       <li>
                  //         <div className="attach">
                  //           <div className="icon"><i class="fas fa-file-pdf"></i></div>
                  //           <p>Approval Document</p>
                  //         </div>
                  //       </li>
                  //       <li>
                  //         <div className="attach">
                  //           <div className="icon"><i class="fas fa-file-pdf"></i></div>
                  //           <p>RFQ</p>
                  //         </div>
                  //       </li>
                  //       <li>
                  //         <div className="attach">
                  //           <div className="icon"><i class="fas fa-file-pdf"></i></div>
                  //           <p>Final Documents</p>
                  //         </div>
                  //       </li>
                  //       <li>
                  //         <div className="attach">
                  //           <div className="icon"><i class="fas fa-file-pdf"></i></div>
                  //           <p>Approval Document</p>
                  //         </div>
                  //       </li>
                  //       <li>
                  //         <div className="attach">
                  //           <div className="icon"><i class="fas fa-file-pdf"></i></div>
                  //           <p>Approval Document</p>
                  //         </div>
                  //       </li>
                  //     </ul>
                  //   </div>
                  //   <div className="user-info-media-buttons">
                  //     <ul>
                  //       <li>
                  //         <Button variant="contained" size="large" className='group-btn clear-btn'><i className="clear-btn far fa-comment-alt-lines"></i>Clear Chat</Button>
                  //       </li>
                  //       <li>
                  //         <Button variant="contained" size="large" className='group-btn delete-btn'><i className="delete-btn far fa-trash-alt"></i>Delete Chat</Button>
                  //       </li>
                  //     </ul>
                  //   </div>
                  // </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { get_contacts_status, get_contacts_data } = state.procurement;
  return { get_contacts_status, get_contacts_data };
};
const messageComponent = withTranslation()(connect(mapStateToProps)(Message));

export default messageComponent;
