import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { ChatRoomActions } from '../../_actions';
import { status } from '../../_constants';
import Button from '@material-ui/core/Button';
import officeSuppliesImg from '../../assets/images/chatroom/office-supplies-img.png';
import cardIimg1 from '../../assets/images/chatroom/card-img1.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import IconButton from '@material-ui/core/IconButton';
import { commonFunctions } from '../../_utilities';
import SimpleBar from 'simplebar-react';
import UserInfoImg from '../../assets/images/message/user-info-img.png';
import MediaImg1 from '../../assets/images/message/media-img1.png';
import MediaImg2 from '../../assets/images/message/media-img2.png';
import MediaImg3 from '../../assets/images/message/media-img3.png';
import MediaImg4 from '../../assets/images/message/media-img4.png';
import MediaImg5 from '../../assets/images/message/media-img5.png';
import MediaImg6 from '../../assets/images/message/media-img6.png';
import MediaImg7 from '../../assets/images/message/media-img7.png';
import MediaImg8 from '../../assets/images/message/media-img8.png';
import MediaImg9 from '../../assets/images/message/media-img9.png';
import MediaImg10 from '../../assets/images/message/media-img10.png';
import MediaImg11 from '../../assets/images/message/media-img11.png';
import MediaImg12 from '../../assets/images/message/media-img12.png';
import MediaImg13 from '../../assets/images/message/media-img13.png';
import MediaImg14 from '../../assets/images/message/media-img14.png';
import MediaImg15 from '../../assets/images/message/media-img15.png';
import ClearIcon from '../../assets/images/message/clear-icon.png';
import DeleteIcon from '../../assets/images/message/delete-icon.png';
//import PaperclipiIcon from '../../assets/images/message/paperclipi-icon.png';

class Message extends React.Component {
  socket;
  constructor(props) {
    super(props);
    this.state = {
      openUserInfo: false,
      message: '',
      searchChat: '',
      prevChats: [],
      rooms: [],
      roomIndex: 0,
      chatIndex: 0,
      userName: 'Michel Slatter',
      activeKey: 0,
    };
    this.socket = null;
  }

  componentDidMount() {
    this.props.dispatch(ChatRoomActions.getChats());
    const { prevChats } = this.state;
    this.socket = io.connect('http://localhost:5001');
    this.socket.on('hello from server', (arg) => {
      if (arg) {
        this.setState({ prevChats: [...prevChats, ...JSON.parse(arg)] });
      }
    });
    setInterval(() => {
      if (!this.socket.connected === true && !this.socket.id) {
        this.socket = io.connect('http://localhost:5001');
      }
    }, 2000);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.get_contacts_status !== prevProps.get_contacts_status &&
      this.props.get_contacts_status === status.SUCCESS
    ) {
      if (this.props.get_contacts_data && this.props.get_contacts_data.length > 0) {
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
    this.setState({ [name]: value });
    let contacts = JSON.parse(JSON.stringify(this.props.get_contacts_data));
    let searchContacts = [];
    if (name === 'searchChat' && value) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          searchContacts.push(contacts[i]);
        }
      }
    } else {
      searchContacts = contacts;
    }
    this.setState({ rooms: searchContacts });
  };

  sendMessage = () => {
    if (this.state.message !== '' || null) {
      let Data = {
        type: 'text',
        text: this.state.message,
        from: 'jid_1109',
        sender_name: 'Michel Slatter',
        to: 'jid_1111',
      };
      this.socket.emit('hello from client', JSON.stringify(Data));
      this.state.prevChats.push(Data);
    }
    this.setState({ message: '' });
  };

  attachmentsLsit = (attachment) => {
    let retData = [];
    if (attachment.length > 0) {
      for (let i = 0; i < attachment.length; i++) {
        const { payload } = attachment[i];
        retData.push(
          <div className="doc-inner-box" key={`${i}_docs`}>
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
    const { rooms, roomIndex, chatindex, } = this.state;
    let retData = [];
    if (rooms.length > 0) {
      for (let i = 0; i < rooms[roomIndex].members.length; i++) {
        const { category, id, name, profilePic, } = rooms[roomIndex].members[i];
        retData.push(
          <div onClick={() => this.setState({ chatindex: i })} className={chatindex == i ? "user-content active" : "user-content"} key={`${i}_user`}>
            <div className="user-profile-text">
              <div className="image">
                <img src={profilePic} width={50} height={50} alt="" />
              </div>
              <div className="user-text">
                <label>{name}</label>
                <p>{category}</p>
                <p>office supply team</p>
              </div>
            </div>
            <div className="user-time">
              <span>3.01</span>
            </div>
          </div>
        );
      }
    }
    else retData.push(<div key="empty"> NO CONTACT FOUND...</div>);
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
    const { message, searchChat, prevChats, userName, openUserInfo, activeKey, rooms } = this.state;
    return (
      <div className="main-content">
        <div className="message-section">
          <div className="chatroom-head">
            <h3>{this.props.t('Message')}</h3>
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
                    {' '}
                    Chats
                  </Button>
                  <Button variant="contained" className="group-team-btn">
                    {' '}
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
                    value={searchChat}
                    onChange={(e) => this.handleChange(e)}
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
            <div className={`${openUserInfo ? 'chatroom-content-right' : 'chatroom-content-right full'}`}>
              <div className="chatroom-inner-head-right">
                <div className="user-profile">
                  <div className="image">
                    {' '}
                    <img src={officeSuppliesImg} alt="" />
                  </div>
                  <div className="user-content">
                    <p>Office Supplies</p>
                    <span>james is typing...</span>
                  </div>
                </div>
                <div className="user-menu-icon">
                  <Button variant="contained" className="icon-btn" onClick={this.openUserInfo}>
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
                          <div className="doc-user-img" >
                            <img
                              src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/free-Whatsapp-Dp-Boys-Stylish-Girls-Cute-Images-pics.jpg"
                              width={35}
                              height={35}
                              alt="image"
                            />
                          </div>
                          <div className="doc-images-box">{this.attachmentsLsit(attachment)}</div>
                        </div>
                      ) : sender_name === userName ? (
                        <div className="user-massage-content" key={`${index}_chat_rooms`}>
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
                        <div className="sender-massage-content" key={`${index}_chats`}>
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
                  <span>
                    <i className="fas fa-smile-o"></i>
                  </span>
                  <div className="send-btn" onClick={this.sendMessage}>
                    <Button variant="contained" className="massage-send-btn">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {openUserInfo &&
              <div className="user-information">
                <div className="user-information-head">
                  <span className='float-left' onClick={this.openUserInfo}><i class="fal fa-times"></i></span>
                  <p>User Info</p>
                </div>
                <div className="user-profile">
                  <div className="user-profile-details">
                    <div className="user-profile-content">
                      <img src={UserInfoImg} alt="" />
                      <label>James Lycus</label>
                      <span>Approver Level 1</span>
                    </div>
                  </div>
                </div>
                <div className="user-information-tabs">
                  <ul>
                    <li onClick={() => this.handelKey(0)} className={activeKey === 0 ? 'active' : ''}>MEDIA</li>
                    <li onClick={() => this.handelKey(1)} className={activeKey === 1 ? 'active' : ''}>DOCS</li>
                    <li onClick={() => this.handelKey(2)} className={activeKey === 2 ? 'active' : ''}>LINKS</li>
                  </ul>
                </div>
                {
                  activeKey === 0 &&
                  <div className="user-info-tab  active">
                    <div className="media-tab-contant">
                      <ul>
                        <li><a href=""><img src={MediaImg1} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg2} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg3} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg4} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg5} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg6} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg7} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg8} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg9} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg10} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg11} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg12} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg13} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg14} alt="" /></a></li>
                        <li><a href=""><img src={MediaImg15} alt="" /></a></li>
                      </ul>
                    </div>
                    <div className="user-info-media-buttons">
                      <ul>
                        <li>
                          <Button variant="contained" size="large" className='group-btn clear-btn'><i className="clear-btn far fa-comment-alt-lines"></i>Clear Chat</Button>
                        </li>
                        <li>
                          <Button variant="contained" size="large" className='group-btn delete-btn'><i className="delete-btn far fa-trash-alt"></i>Delete Chat</Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
                {
                  activeKey === 1 &&
                  <div className="user-info-tab docs active">
                    <div className="docs-tab-contant">
                      <ul>
                        <li>
                          <div className="attach">
                            <div className="icon"><i class="fas fa-file-pdf"></i></div>
                            <p>Approval Document</p>
                          </div>
                        </li>
                        <li>
                          <div className="attach">
                            <div className="icon"><i class="fas fa-file-pdf"></i></div>
                            <p>RFQ</p>
                          </div>
                        </li>
                        <li>
                          <div className="attach">
                            <div className="icon"><i class="fas fa-file-pdf"></i></div>
                            <p>Final Documents</p>
                          </div>
                        </li>
                        <li>
                          <div className="attach">
                            <div className="icon"><i class="fas fa-file-pdf"></i></div>
                            <p>Approval Document</p>
                          </div>
                        </li>
                        <li>
                          <div className="attach">
                            <div className="icon"><i class="fas fa-file-pdf"></i></div>
                            <p>Approval Document</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="user-info-media-buttons">
                      <ul>
                        <li>
                          <Button variant="contained" size="large" className='group-btn clear-btn'><i className="clear-btn far fa-comment-alt-lines"></i>Clear Chat</Button>
                        </li>
                        <li>
                          <Button variant="contained" size="large" className='group-btn delete-btn'><i className="delete-btn far fa-trash-alt"></i>Delete Chat</Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
                {
                  activeKey === 2 &&
                  <div className="user-info-tab active">
                    <div className="link-tab-contant">
                      <ul>
                        <li className="link-box">
                          <Button variant="contained" className='link-icon'><i class="far fa-paperclip"></i></Button>
                          <div className='link-contant'>
                            <p>https://www.facebook.com/161593694735196/videos/550427263327196/?sfnsn=mo</p>
                          </div>
                        </li>
                        <li className="link-box">
                          <Button variant="contained" className='link-icon'><i class="far fa-paperclip"></i></Button>
                          <div className='link-contant'>
                            <p>https://www.facebook.com/161593694735196/videos/550427263327196/?sfnsn=mo</p>
                          </div>
                        </li>
                        <li className="link-box">
                          <Button variant="contained" className='link-icon'><i class="far fa-paperclip"></i></Button>
                          <div className='link-contant'>
                            <p>https://www.facebook.com/161593694735196/videos/550427263327196/?sfnsn=mo</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="user-info-media-buttons">
                      <ul>
                        <li>
                          <Button variant="contained" size="large" className='group-btn clear-btn'><i className="clear-btn far fa-comment-alt-lines"></i>Clear Chat</Button>
                        </li>
                        <li>
                          <Button variant="contained" size="large" className='group-btn delete-btn'><i className="delete-btn far fa-trash-alt"></i>Delete Chat</Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  const { get_contacts_status, get_contacts_data } = state.procurement;
  return { get_contacts_status, get_contacts_data };
};
const messageComponent = withTranslation()(connect(mapStateToProps)(Message));

export default messageComponent;
