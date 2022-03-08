import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import SaveIcon from "@material-ui/icons/Save";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import IconButton from "@material-ui/core/IconButton";
import "simplebar/dist/simplebar.min.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { connect } from "react-redux";
import { contactAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities/commonFunctions";
import memberImg from '../../assets/images/Setup/ahmad.png';
import Card from "@material-ui/core/Card";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

class addNewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      firstName: "",
      lastName: "",
      title: "",
      company: "",
      email: "",
      contactNo: "",
      profile: "",
      sendData: {},
      errors: {},
      contacts: [],
      duplicateContacts: [],
      isSubmitted: false,
      profileUrl: "",
      activeIndex: 0,
      displayOption: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(contactAction.fetchContactList());
    if (this.props.match.params.id) {
      this.props.dispatch(contactAction.getContactData({ 'id': this.props.match.params.id }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.get_contact_status !==
      this.props.get_contact_status
      && this.props.get_contact_status ===
      status.SUCCESS) {
      if (this.props.getContact && this.props.getContact.length > 0) {
        this.setState({
          contacts: this.props.getContact,
          duplicateContacts: this.props.getContact
        })
      }
    }
    if (
      prevProps.get_edit_contact_status !==
      this.props.get_edit_contact_status &&
      this.props.get_edit_contact_status === status.SUCCESS
    ) {
      if (this.props.contactData) {
        const { contactData } = this.props;
        let fname = contactData.name.split(' ').slice(0, 1);
        let lname = contactData.name.split(' ').slice(1, 2);
        this.setState({
          isEdit: true,
          firstName: fname,
          lastName: lname,
          title: contactData.position,
          company: contactData.company,
          email: contactData.email,
          contactNo: contactData.contNo,
          profile: contactData.profile,
          profileUrl: contactData.profile,

        });
      }

    }
    if (
      prevProps.add_contact_status !== this.props.add_contact_status &&
      this.props.add_contact_status === status.SUCCESS
    ) {
      this.props.history.push("/postlogin/contact");
    }
    if (
      prevProps.update_contact_status !== this.props.update_contact_status &&
      this.props.update_contact_status === status.SUCCESS
    ) {
      this.props.history.push("/postlogin/contact");
    }
  }

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      email: validObj,
      contactNo: validObj,
      firstName: validObj,
      lastName: validObj,
      title: validObj,
      company: validObj,
      isValid,
    };

    if (isSubmitted) {
      const {
        email,
        contactNo,
        firstName,
        lastName,
        title,
        company,
      } = this.state;
      if (!firstName) {
        retData.firstName = {
          isValid: false,
          message: "FirstName is required",
        };
        isValid = false;
      }
      if (!lastName) {
        retData.lastName = {
          isValid: false,
          message: "LastName is required",
        };
        isValid = false;
      }
      if (!title) {
        retData.title = {
          isValid: false,
          message: "Title is required",
        };
        isValid = false;
      }
      if (!company) {
        retData.company = {
          isValid: false,
          message: "Company name is required",
        };
        isValid = false;
      }

      if (!email) {
        retData.email = {
          isValid: false,
          message: "Email is required",
        };
        isValid = false;
      } else if (email && !commonFunctions.validateEmail(email)) {
        retData.email = {
          isValid: false,
          message: "Enter valid email",
        };
        isValid = false;
      }

      if (!contactNo) {
        retData.contactNo = {
          isValid: false,
          message: "Contact is required",
        };
        isValid = false;
      } else if (contactNo && !commonFunctions.validateNumeric(contactNo)) {
        retData.contactNo = {
          isValid: false,
          message: "Vaid only digits",
        };
        isValid = false;
      } else if (contactNo.length > 12 || contactNo.length < 10) {
        retData.contactNo = {
          isValid: false,
          message: "Contact Number is not valid",
        };
        isValid = false;
      }
    }

    retData.isValid = isValid;
    return retData;
  };

  addNewContact = (prevProps) => {
    const {
      firstName,
      lastName,
      title,
      company,
      email,
      contactNo,
      profile,
      isEdit,
    } = this.state;
    this.setState({ isSubmitted: true });
    let sentdata = {
      firstName: firstName,
      lastName: lastName,
      title: title,
      company: company,
      email: email,
      contactNo: contactNo,
      profile: profile,
    };

    const errorData = this.validate(true);
    if (errorData.isValid) {
      if (isEdit === true) {
        sentdata.id = this.props.match.params.id;
        this.props.dispatch(contactAction.updateContact(sentdata));
      } else {
        this.props.dispatch(contactAction.addContact(sentdata));
      }
    }
  };

  handleBack = () => {
    this.props.history.push('/postlogin/contact')
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    let { profile, profileUrl } = this.state;
    if (name === "profile" && files.length > 0) {
      profile = files[0];
      profileUrl = URL.createObjectURL(files[0]);
      this.setState({
        profile,
        profileUrl,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  toggleDisplayOptions = () => {
    this.setState({ displayOption: !this.state.displayOption });
  }

  editContact = (index, id) => {
    this.props.history.push(`/postlogin/newcontact/${id}`);
  }
  deleteEmailContact = (index) => {
    let { contacts } = this.state
    contacts.splice(index, 1);
    this.setState({ contacts });
  }
  render() {
    const {
      contacts,
      firstName,
      lastName,
      title,
      company,
      email,
      contactNo,
      profileUrl,
      isSubmitted,
      activeIndex,
      displayOption
    } = this.state;
    let errrorMessage = this.validate(isSubmitted);
    return (
      <div className="main-content">
        <div className="contact-content">
          <div className="row">
            <div className="col-md-3">
              <div className="heading"><h4>Contacts</h4><p>Lorem ipsum dolor sit amet</p></div>
              <SimpleBar style={{ maxHeight: 'calc(450px)' }} >
                {contacts && contacts.length > 0 && contacts.map((contact, index) =>
                  <Card className="member-box" key={index}>
                    <div className="d-block w-100 user-img">
                      <div className="d-inline-block image">
                        <img src={contact.profile} alt="" />
                      </div>
                      <div
                        className="d-inline-block menu-icon"
                        style={{ display: "flex" }}
                      >
                        <IconButton aria-label="settings">
                          <MoreVertIcon
                            onClick={
                              this.toggleDisplayOptions
                            }
                          />
                        </IconButton>
                        <div className="settings-toggle">
                          {displayOption &&
                            <>
                              <span onClick={() => this.editContact(index, contact.id)}>
                                <EditTwoToneIcon /> Edit
                              </span>
                              <span onClick={() => this.deleteEmailContact(index)}>
                                <HighlightOffIcon /> Delete
                              </span>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-block w-100 member-name"
                    >
                      {contact.name}
                    </div>
                    <div className="d-block w-100 member-details">
                      <div className="row">
                        <div className="col-md-9">
                          <p>
                            {contact.company}
                            <strong>{contact.position}</strong>
                          </p>
                        </div>
                        <div className="col-md-3">
                          <div class="member-position">JH</div>
                        </div>
                      </div>
                    </div>
                  </Card>)}
              </SimpleBar>
            </div>
            <div className="col-md-9">
              <div className="general-contect">
                <div className="d-flex heading">
                  <IconButton className="head-icon">
                    <KeyboardBackspaceIcon onClick={this.handleBack} />
                  </IconButton>
                  <h4 className="d-inline-block">
                    {this.props.match.params.id ?
                      <>Edit Contact</>
                      :
                      <>Add New Contact</>
                    }
                  </h4>
                </div>
                <div className="general-information">
                  <div className="row">
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                      <div className="user-content">
                        <span className="d-block add-contcat-heading">
                          General Info
                        </span>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">First Name</label>
                              <input
                                type="text"
                                value={firstName}
                                name="firstName"
                                placeholder="Sumuel"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.firstName.message}
                              </span>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">Last Name</label>
                              <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Chen"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.lastName.message}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">Title</label>
                              <input
                                type="text"
                                name="title"
                                value={title}
                                placeholder="Graphic Designer"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.title.message}
                              </span>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">Company</label>
                              <input
                                type="text"
                                name="company"
                                value={company}
                                className="control-form"
                                placeholder="HighSpeed Studios"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.company.message}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="d-block add-contcat-heading">
                          Contacts
                        </span>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">Email Address</label>
                              <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="sumuelchen002@mail.com"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.email.message}
                              </span>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">Phone Number</label>
                              <input
                                type="number"
                                max="12"
                                min="10"
                                name="contactNo"
                                value={contactNo}
                                placeholder="+0123456789"
                                onChange={this.handleChange}
                                className="form-control"
                              />
                              <span className="text-danger">
                                {errrorMessage.contactNo.message}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
                      <div className="requester profile">
                        <div className="form-group">
                          <label className="d-block">Profile Picture</label>
                          <div className="user-profile">
                            <div className="image">
                              <img src={profileUrl} alt="" />
                            </div>
                            <Button className="user-profile-uplod">
                              <CameraAltIcon className="camera-icon" />
                              <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="profile"
                                onChange={this.handleChange}
                              />
                              <span>changes photos</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <Button
                        variant="contained"
                        className="add-buyres-btn"
                        onClick={this.addNewContact}
                      >
                        <SaveIcon className="save-icon" />
                        Save Contacts
                      </Button>
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

function mapStateToProps(state) {
  const {
    get_edit_contact_status,
    contactData,
    getContact,
    get_contact_status,
    add_contact_status,
    update_contact_status,
  } = state.procurement;
  return {
    get_edit_contact_status,
    contactData,
    getContact,
    get_contact_status,
    add_contact_status,
    update_contact_status,
  };
}

const connectedNewContact = connect(mapStateToProps)(addNewContact);
export default connectedNewContact;
