import React from 'react';
import { io } from 'socket.io-client';
import { ChatRoomActions } from '../_actions';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatToggle: false,
      message: '',
      userName: 'Michel Slatter',
      prevChats: [],
      attachments: [],
    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.props.dispatch(ChatRoomActions.getChats());
      const { prevChats } = this.state;
      this.socket = io.connect('http://localhost:5001');
      this.socket.on('hello from server', (arg) => {
        // let data= JSON.parse(arg)
        if (arg) {
          if (JSON.stringify(prevChats) !== arg) {
            this.setState({ prevChats: [...prevChats, ...JSON.parse(arg)] });
          }
        }
      });
      setInterval(() => {
        if (!this.socket.connected === true && !this.socket.id) {
          this.socket = io.connect('http://localhost:5001');
        }
      }, 5000);
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  sendMessage = () => {
    const { attachment } = this.state;
    let Data;
    if (attachment && attachment.length > 0) {
      Data = { attachment: attachment };
    }
    if (this.state.message !== '' || null) {
      Data = {
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
          <div className={`doc-inner-box ${attachment.length === 1 ? "one-file" : ""}`} >
            <div className="doc-attachment-files">
              <img alt="image" src={payload.url} />
            </div>
          </div>
        );
      }
    }
    return retData;
  };

  handleAttachments = (e) => {
    const { files } = e.target;
    let { attachments } = this.state;
    attachments = [];
    for (let i = 0; i < files.length; i++) {
      attachments.push(files[i]);
      this.setState({ attachments });
    }
  };
  render() {
    const { chatToggle, prevChats, userName, message, attachments } = this.state;

    return (
      <>
        <div className="d-flex flex-row-reverse ">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 sender-bottom-section">
            <div className="chat-box">
              <div className="sender-inner-section">
                <div className="user-head">
                  <div className="user-image">
                    <img
                      src="http://c.files.bbci.co.uk/C870/production/_112921315_gettyimages-876284806.jpg"
                      alt="image"
                    />
                    {!chatToggle ? <span> chatroom</span> : <span>Peter Shawn Admin</span>}
                  </div>
                  <div className="menu-icons">
                    <span className="menu-icon">
                      <i className="far fa-ellipsis-h"></i>
                    </span>
                    <span className="pencil-icon">
                      <i className="fas fa-edit"></i>
                    </span>
                    {chatToggle ? (
                      <span className="uparrow-icon" onClick={() => this.setState({ chatToggle: false })}>
                        <i className="fas fa-angle-down"></i>
                      </span>
                    ) : (
                      <span className="uparrow-icon" onClick={() => this.setState({ chatToggle: true })}>
                        <i className="fas fa-angle-up"></i>
                      </span>
                    )}
                  </div>
                </div>
                {chatToggle && (
                  <div className="chatroom-inner-content-right">
                    <SimpleBar style={{ maxHeight: 285 }} className="massage-chat-section">
                      {prevChats && prevChats.length > 0 ? (
                        prevChats.map(({ sender_name, text, attachment }, index) =>
                          attachment && attachment.length > 0 ? (
                            // doc section
                            <div className="doc-section">
                              <div className="doc-user-img" key={index}>
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
                            // user messages

                            <div className="user-massage-content">
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
                            //sender messages

                            <div className="sender-massage-content">
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
                    </SimpleBar>
                    <div className="sender-bottom-section">
                      <div className="row">
                        <div className="col-12">
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { get_contacts_status, get_contacts_data } = state.procurement;
  return { get_contacts_status, get_contacts_data };
};
const Chat = withTranslation()(connect(mapStateToProps)(ChatBox));
export default Chat;
