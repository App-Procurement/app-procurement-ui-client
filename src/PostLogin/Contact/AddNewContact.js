import React, { Component } from "react";
import { Button, IconButton, Card } from "@mui/material";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import SaveIcon from "@mui/icons-material/Save";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "simplebar/dist/simplebar.min.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { connect } from "react-redux";
import { contactAction } from "../../_actions";
import { status } from "../../_constants";
import { commonFunctions } from "../../_utilities/commonFunctions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

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
      this.props.dispatch(
        contactAction.getContactData({ id: this.props.match.params.id })
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.get_contact_status !== this.props.get_contact_status &&
      this.props.get_contact_status === status.SUCCESS
    ) {
      if (this.props.getContact && this.props.getContact.length > 0) {
        this.setState({
          contacts: this.props.getContact,
          duplicateContacts: this.props.getContact,
        });
      }
    }
    if (
      prevProps.get_edit_contact_status !==
        this.props.get_edit_contact_status &&
      this.props.get_edit_contact_status === status.SUCCESS
    ) {
      if (this.props.contactData) {
        const { contactData } = this.props;
        let fname = contactData.name.split(" ").slice(0, 1);
        let lname = contactData.name.split(" ").slice(1, 2);
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
          message: "First Name is Required",
        };
        isValid = false;
      }
      if (!lastName) {
        retData.lastName = {
          isValid: false,
          message: "Last Name is Required",
        };
        isValid = false;
      }
      if (!title) {
        retData.title = {
          isValid: false,
          message: "Title is Required",
        };
        isValid = false;
      }
      if (!company) {
        retData.company = {
          isValid: false,
          message: "Company Name is Required",
        };
        isValid = false;
      }

      if (!email) {
        retData.email = {
          isValid: false,
          message: "Email is Required",
        };
        isValid = false;
      } else if (email && !commonFunctions.validateEmail(email)) {
        retData.email = {
          isValid: false,
          message: "Enter a Valid Email",
        };
        isValid = false;
      }

      if (!contactNo) {
        retData.contactNo = {
          isValid: false,
          message: "Contact is Required",
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
          message: "Enter a Valid Contact Number",
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
    this.props.history.push("/postlogin/contact");
  };

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
  };

  editContact = (index, id) => {
    this.props.history.push(`/postlogin/newcontact/${id}`);
  };

  deleteEmailContact = (index) => {
    let { contacts } = this.state;
    contacts.splice(index, 1);
    this.setState({ contacts });
  };

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
      displayOption,
    } = this.state;
    let errrorMessage = this.validate(isSubmitted);
    return (
      <div className="main-content">
        <div className="contact-content">
          <div className="row">
            <div className="col-md-3">
              <div className="heading">
                <h4>Contacts</h4>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <SimpleBar style={{ maxHeight: "calc(450px)" }}>
                {contacts &&
                  contacts.length > 0 &&
                  contacts.map((contact, index) => (
                    <Card className="member-box" key={index + 1}>
                      <div className="d-block w-100 user-img">
                        <div className="d-inline-block image">
                          <img src={contact.profile} alt="" />
                        </div>
                        <div
                          className="d-inline-block menu-icon"
                          style={{ display: "flex" }}
                        >
                          <IconButton
                            aria-label="settings"
                            onClick={this.toggleDisplayOptions}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <div className="settings-toggle">
                            {displayOption && (
                              <>
                                <span
                                  onClick={() =>
                                    this.editContact(index, contact.id)
                                  }
                                >
                                  <EditTwoToneIcon /> Edit
                                </span>
                                <span
                                  onClick={() => this.deleteEmailContact(index)}
                                >
                                  <HighlightOffIcon />
                                  Delete
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-block w-100 member-name">
                        {contact.firstName}
                      </div>
                      <div className="d-block w-100 member-details">
                        <div className="row">
                          <div className="col-md-9">
                            <p>
                              {contact.company}
                              <strong>{contact.designation}</strong>
                            </p>
                          </div>
                          <div className="col-md-3">
                            <div className="member-position">JH</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </SimpleBar>
            </div>
            <div className="col-md-9">
              <div className="general-contect">
                <div className="d-flex heading">
                  <IconButton className="head-icon" onClick={this.handleBack}>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                  <h4 className="d-inline-block">
                    {this.props.match.params.id ? (
                      <>{t("Edit Contact")}</>
                    ) : (
                      <>{t("Add New Contact")}</>
                    )}
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
                              <label className="d-block">
                                {t("First Name")}
                              </label>
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
                              <label className="d-block">
                                {t("Last Name")}
                              </label>
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
                              <label className="d-block">{t("Title")}</label>
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
                              <label className="d-block">{t("Company")}</label>
                              <input
                                type="text"
                                name="company"
                                value={company}
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
                          {t("Contacts")}
                        </span>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group form-group-common">
                              <label className="d-block">
                                {t("Email Address")}
                              </label>
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
                        {t("Save Contacts")}
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

const connectedNewContact = withTranslation()(
  connect(mapStateToProps)(addNewContact)
);

export default connectedNewContact;
