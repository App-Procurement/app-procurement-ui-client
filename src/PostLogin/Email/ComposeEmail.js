import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ReplyIcon from '@material-ui/icons/Reply';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Multiselect } from 'multiselect-react-dropdown';
import { IconButton } from '@material-ui/core';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { emailActions } from '../../_actions/email.actions';
import { connect } from 'react-redux';
import { status } from "../../_constants";
class ComposeEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendEmailData: {
        subject: '',
        emailDetail: '',
        to: [],
        bcc: [],
        senderId: '2',
        attechment: [],
      },
      isSubmitted: '',
      options: [
        { name: 'Olivia Johnson', email: 'oliviaJohnson@mail.com', id: 1 },
        { name: 'Marteens', email: 'marteen404@mail.com', id: 2 },
        { name: 'evanernest', email: 'evanernest@mail.com', id: 3 },
        { name: 'ddd', email: 'ddd@a.com', id: 4 },
        { name: 'efg', email: 'efg@a.com', id: 5 },
      ],

      contacts: [
        { name: 'evanernest', email: 'evanernest@mail.com', id: 1 },
        { name: 'evanernest2', email: 'evanernest2@mail.com', id: 2 },
        { name: 'evanernest3', email: 'evanernest3@mail.com', id: 3 },
        { name: 'ddd', email: 'ddd@a.com', id: 4 },
        { name: 'efg', email: 'efg@a.com', id: 5 },
      ], preselectValue: [
        { name: 'Olivia Johnson', email: 'oliviaJohnson@mail.com', id: 1 },
        { name: 'Marteens', email: 'marteen404@mail.com', id: 2 },
      ],
    }
  }
  sendEmail = () => {
    const { sendEmailData } = this.state;
    this.setState({ isSubmitted: true })
    const errorData = this.validate(true);
    let sendData = {
      subject: sendEmailData.subject,
      emailDetail: sendEmailData.emailDetail,
      to: sendEmailData.to,
      bcc: sendEmailData.bcc,
      senderId: '2',
    }
    if (errorData.isValid === true) {
      this.props.dispatch(emailActions.sendEmail({ 'obj': sendData, 'attechment': sendEmailData.attechment }));
    }
  }
  handleStateChange = (e) => {
    let { sendEmailData } = this.state;
    const { name, value } = e.target;
    sendEmailData[name] = value;
    this.setState({
      sendEmailData,
    })
  }
  setSelectedEmailUser = (val, type) => {
    let { sendEmailData } = this.state;
    sendEmailData[type] = val;
    this.setState({
      sendEmailData,
    })
  }
  handleFile = (e) => {
    const { files } = e.target;
    let { sendEmailData } = this.state;
    if (files && files.length === 1) {
      sendEmailData.attechment.push(files[0])
      this.setState({ sendEmailData });
    }
    else {
      for (let i = 0; i < files.length; i++) {
        sendEmailData.attechment.push(files[i])
      }
      this.setState({ sendEmailData });
    }
  }

  handleRemoveFile = (indx) => {
    let { sendEmailData } = this.state
    sendEmailData.attechment.splice(indx, 1);
    this.setState({ sendEmailData })
  }
  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      emailDetail: validObj,
      to: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { sendEmailData } = this.state;
      if (!sendEmailData.emailDetail) {
        retData.emailDetail = {
          isValid: false,
          message: "Email details is required",
        };
        isValid = false;
      }
      if (sendEmailData.to && sendEmailData.to.length <= 0) {
        retData.to = {
          isValid: false,
          message: "TO is Required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const { options, contacts, preselectValue, sendEmailData, isSubmitted } = this.state
    const errorData = this.validate(isSubmitted);
    return (
      <div>
        <div className="compose-right">
          <div className="head-top progress-form">
            <div className="row justify-content-center align-items-center">
              <div className="col-xl-4 col-lg-5 col-md-5 col-sm-5 col-12">
                <div className="heading">
                  <span onClick={this.props.onClickShowCompos}><KeyboardBackspaceIcon /></span>
                  <h4>Compose Email</h4>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-7 col-sm-7 col-12">
                <div className="progress-draft-btn">
                  <Button variant="outlined" className="draft-btn">
                    <span><SaveIcon className="btn-icon" /></span>
                    Save to Draft
                  </Button>
                  <Button variant="outlined" className="delete-btn" onClick={this.props.onClickShowCompos}>
                    <span><DeleteForeverIcon className="btn-icon"/></span>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-content">
            <div className="email-section">
              <div className="d-inline-block heading">to</div>
              <Multiselect
                options={options}
                selectedValues={preselectValue}
                displayValue="email"
                placeholder=''
                onSelect={(val) => this.setSelectedEmailUser(val, 'to')}
                onRemove={(value) => this.setSelectedEmailUser(value, 'to')}
              />
              <span className="text-danger">
                {errorData.to.message}
              </span>
            </div>
            <div className="email-bcc">
              <div className="d-inline-block heading">bcc</div>
              <Multiselect
                options={contacts}
                // selectedValues={selectedValue}
                displayValue="email"
                placeholder=''
                onSelect={(val) => this.setSelectedEmailUser(val, 'bcc')}
              />
            </div>
            <div className="email-subject">
              <div className="d-inline-block heading">subject</div>
              <div className="content">
                <span>Follow Up Progress From Order &#35;0001241251</span>
                <input type="text" name="subject"
                  onChange={this.handleStateChange} value={sendEmailData.subject}
                />
              </div>
            </div>
            <div className="email-massage">
              <div className="d-inline-block heading">massage</div>
              <div className="content">
                <textarea placeholder="Hello guys Lorem ipsum dolor sit amet ,consectetur adipiscing elit, 
                        sed do eiusmod temod tempor incidiunt ut labore et dolore magna aliqua." name="emailDetail"
                  value={sendEmailData.emailDetail} onChange={this.handleStateChange}
                >
                </textarea>
                <span className="text-danger">
                  {errorData.emailDetail.message}
                </span>
              </div>
              <div className="col-4 pr-0">

                {
                  sendEmailData.attechment.map((file, indx) =>
                  (<span>
                    <div className="upload-screenshort">
                      <a href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
                        <div className="file-name" aria-label={file.name} > {file.name}</div></a>
                      <IconButton className="CancelIcon" onClick={() => this.handleRemoveFile(indx, file)}>
                        <CancelIcon />
                      </IconButton>
                    </div>
                  </span>
                  )
                  )
                }

              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-section-inner">
              <Button variant="contained" className="send-email-btn" onClick={this.sendEmail}><i class="fas fa-paper-plane">
              </i>send email</Button>
              <IconButton className="attache-icon" >
                <input type="file" accept="image/png, image/jpeg"
                  onChange={this.handleFile} multiple /><AttachFileIcon />
              </IconButton>
              <IconButton className="reply-icon"><ReplyIcon /></IconButton>
              <IconButton className="symbols-icon">T</IconButton>
              <div className="opensens-dropdown">
                <FormControl className="opensens-content">
                  <NativeSelect >
                    <option value="">Open sens</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <div className="symbols">
                <ul>
                  <li><IconButton className="symbols-icon">B</IconButton></li>
                  <li><IconButton className="symbols-icon">I</IconButton></li>
                  <li><IconButton className="symbols-icon">U</IconButton></li>
                  <li ><IconButton className="symbols-icon"><TagFacesIcon /></IconButton></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null)(ComposeEmail);