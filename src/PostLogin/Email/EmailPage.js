import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ArchiveIcon from "@material-ui/icons/Archive";
import StarIcon from "@material-ui/icons/Star";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MailIcon from "@material-ui/icons/Mail";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { emailActions } from "../../_actions/email.actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import EmailDetail from "./emailDetail";
import Pagination from "../../_components/Pagination";
import EmailsPage from "./EmailsPage";
import ComposeEmail from "./ComposeEmail";
import CancelIcon from "@material-ui/icons/Cancel";
import { withRouter } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
class EmailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      composEmail: false,
      detailEmail: "",
      activendex: [],
      isSelectAll: false,
      perPageLimit: 5,
      currentPage: 0,
      emailData: [],
      isSubmitted: false,
      searchEmail: "inbox",
      priorty: "important",
      sendEmailData: {
        subject: "",
        emaildetail: "",
        to: [],
        bcc: [],
        senderId: "2",
        attechment: [],
        emailLength: 0,
      },
    };
    this.paginationRef = React.createRef();
  }

  onClickShowCompos = () => {
    const { composEmail } = this.state;
    this.setState({
      composEmail: !composEmail,
    });
  };

  closeDetailPage = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const { id, draftId, type, priorty } = this.props.match.params;

    if (type && !priorty) {
      this.props.history.push(`/postlogin/email/${type}/${this.state.priorty}`);
    }
    if (type) {
      this.setState({ searchEmail: this.props.match.params.type });
    }
    if (id) {
      this.setState({
        detailEmail: id,
      });
    } else {
      let { sendEmailData, preselectValue } = this.state;
      this.props.dispatch(emailActions.recentcommunication());
      this.props.dispatch(
        emailActions.searchallemails({ search: this.state.searchEmail })
      );
      sendEmailData.to = preselectValue;
      this.setState({ sendEmailData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { perPageLimit } = this.state;
    let { emailLength } = this.state;
    const { get_inbox_status, inbox_data } = this.props;
    const { priorty } = this.props.match.params;
    if (
      this.props.search_email_status !== prevProps.search_email_status &&
      this.props.search_email_status === status.SUCCESS
    ) {
      if (this.props.search_email && this.props.search_email.length > 0) {
        this.setState({
          emails: this.props.search_email,
          priorty: priorty,
        });
      }
    }
    if (
      prevProps.get_inbox_status === get_inbox_status &&
      prevProps.get_inbox_status === status.SUCCESS &&
      !emailLength
    ) {
      emailLength = 0;
      if (inbox_data && inbox_data.length > 0) {
        for (let i = 0; i < inbox_data.length; i++) {
          if (
            inbox_data[i].isRead === "false" ||
            inbox_data[i].isRead === false
          ) {
            emailLength++;
          }
        }
        this.setState({ emailLength });
      }
    }
    if (
      this.props.search_all_email_status !==
      prevProps.search_all_email_status &&
      this.props.search_all_email_status === status.SUCCESS
    ) {
      if (this.props.search_all_email && this.props.search_all_email.length > 0) {
        let data = this.props.search_all_email;
        if (this.props.match.params.type === "inbox") {
          this.props.dispatch(emailActions.searchallinboxemails(data));
        }
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].isChecked = false;
            data[i].showIcon = false;
          }
          let indexOfLastData = Math.ceil(data.length / perPageLimit);
          this.setState({
            emailData: data,
          });
          if (this.paginationRef && this.paginationRef.current) {
            this.paginationRef.current.setOptions({
              totalPages: indexOfLastData,
              perPageLimit,
              totalRecords: data.length,
            });
          }
        }
      }
    }
    if (
      prevProps.send_email_status !== this.props.send_email_status &&
      this.send_email_status === status.SUCCESS
    ) {
      this.setState({
        composEmail: false,
        sendEmailData: {},
      });
    }
    // this.setState({searchEmail:this.props.params})
  }
  displayEmailList = () => {
    const {
      emailData,
      activIndex,
      currentPage,
      perPageLimit,
      searchEmail,
      priorty,
    } = this.state;
    let otherData = {};
    let retData = [];
    if (emailData && emailData.length > 0) {
      for (let i = 0; i < emailData.length; i++) {
        if (
          i >= currentPage * perPageLimit &&
          i <= currentPage * perPageLimit + (perPageLimit - 1)
        ) {
          let row = emailData[i];
          let time = row.time.split("T");
          time = time[1].split(".");
          otherData = {
            perPageLimit,
            currentPage,
            i,
            history: this.props.history,
            searchEmail,
            priorty,
          };
          retData.push(
            <li className={emailData[i].isChecked === true ? "active" : ""}>
              <EmailsPage
                row={row}
                otherData={otherData}
                setSelectedMail={this.setSelectedMail}
                handleMessageRead={this.handleMessageRead}
              />
            </li>
          );
        }
      }
    }
    return retData;
  };
  handleMessageRead = (data) => {
    const { id, type } = data;
    this.props.dispatch(emailActions.reademail({ id: id, type: type }));
  };
  setSelectedMail = (e, index, value) => {
    let { emailData, isSelectAll, activendex } = this.state;
    let count = 0;
    emailData[index].isChecked = value;
    for (let i = 0; i < emailData.length; i++) {
      if (emailData[i].isChecked === true) {
        count++;
      } else {
        count--;
      }
    }
    if (count === emailData.length) {
      isSelectAll = true;
    } else {
      isSelectAll = false;
    }
    this.setState({
      emailData,
      isSelectAll,
    });
  };

  setSelectAllEmail = (e) => {
    let { emailData } = this.state;
    const { checked } = e.target;
    for (let i = 0; i < emailData.length; i++) {
      emailData[i].isChecked = checked;
    }
    this.setState({
      emailData,
      isSelectAll: checked,
    });
  };

  displayEmail = () => {
    const { emails } = this.state;
    let retData = [];
    if (emails && emails.length > 0) {
      for (let i = 0; i < emails.length; i++) {
        let email = emails[i];
        retData.push(
          <li>
            <div className='recent-image'>
              <img src={email.profile} height='50px' width='50px' alt='' />
              <div className='enabled'></div>
            </div>
            <div className='recent-name'>
              <span>{email.name}</span>
            </div>
          </li>
        );
      }
    }
    return retData;
  };
  countryToFlag = (isoCode) => {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
      : isoCode;
  };

  setEmailType = (type) => {
    this.setState({
      searchEmail: type,
      composEmail: false,
    });
    this.props.history.push(`/postlogin/email/${type}`);
    this.props.dispatch(emailActions.searchallemails({ search: type }));
  };

  emailType = (priorty) => {
    const { searchEmail } = this.state;
    this.setState({
      priorty: priorty,
    });
    this.props.history.push(`/postlogin/email/${searchEmail}/${priorty}`);
    this.props.dispatch(emailActions.searchallemails({ search: priorty }));
  };

  onChangeCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };

  render() {
    const {
      composEmail,
      isSelectAll,
      detailEmail,
      searchEmail,
      emailLength,
      priorty,
    } = this.state;
    return (
      <div className='main-content'>
        <div className='compose-email-section'>
          <div className='row'>
            <div className='col-xl-3 col-lg-4 col-md-4 col-sm-12'>
              <div className='compose-left'>
                <div className='compose-btn'>
                  <Button
                    type='button'
                    onClick={this.onClickShowCompos}
                    className='compose active'>
                    <CreateIcon />
                    ComposEmail
                  </Button>
                </div>
                <div className='compose-tabs'>
                  <div className='heading'>
                    folders
                    <span className='last'>
                      <ChevronRightIcon />
                    </span>
                    <span>
                      <ChevronRightIcon />
                    </span>
                  </div>
                  <ul>
                    <li
                      className={searchEmail === "inbox" ? "active" : ""}
                      onClick={() => this.setEmailType("inbox")}>
                      <button className='btn'>
                        <span>
                          <MoveToInboxIcon />
                        </span>
                        Inbox
                        {emailLength && emailLength > 0 && (
                          <span className='float-right length'>
                            {emailLength}
                          </span>
                        )}
                      </button>
                    </li>
                    <li
                      className={searchEmail === "sent" ? "active" : ""}
                      onClick={() => this.setEmailType("sent")}>
                      <button className='btn'>
                        <span>
                          <i class='fas fa-paper-plane'></i>
                        </span>
                        Sent
                      </button>
                    </li>
                    <li
                      className={searchEmail === "draft" ? "active" : ""}
                      onClick={() => this.setEmailType("draft")}>
                      <button className='btn'>
                        <span>
                          <DraftsIcon />
                        </span>
                        Draft
                      </button>
                    </li>
                    <li
                      className={searchEmail === "archived" ? "active" : ""}
                      onClick={() => this.setEmailType("archived")}>
                      <button className='btn'>
                        <span>
                          <ArchiveIcon />
                        </span>
                        Archived
                      </button>
                    </li>
                    <li
                      className={searchEmail == "favorites" ? "active" : ""}
                      onClick={() => this.setEmailType("favorites")}>
                      <button className='btn'>
                        <span>
                          <StarIcon />
                        </span>
                        Favourites
                      </button>
                    </li>
                    <li
                      className={searchEmail === "spam" ? "active" : ""}
                      onClick={() => this.setEmailType("spam")}>
                      <button className='btn'>
                        <span>
                          <CreateNewFolderIcon />
                        </span>
                        Spam
                      </button>
                    </li>
                  </ul>
                </div>
                <div className='recent-content'>
                  <div className='heading'>Recent communication</div>
                  <ul>{this.displayEmail()}</ul>
                </div>
                <div className='tag-btn'>
                  <div className='heading'>Tags</div>
                  <Button variant='contained' className='primary'>
                    &#35;Waitingfor approval
                  </Button>
                  <Button variant='contained' className='secondary'>
                    &#35;pending
                  </Button>
                  <Button variant='contained' className='danger'>
                    confirm
                  </Button>
                  <Button variant='contained' className='info'>
                    &#35;weeklymeetings
                  </Button>
                </div>
              </div>
            </div>
            <div className='col-xl-9 col-lg-8 col-md-8 col-sm-12'>
              {composEmail === true ? (
                <ComposeEmail onClickShowCompos={this.onClickShowCompos} />
              ) : (
                <>
                  {detailEmail !== "" ? (
                    <EmailDetail
                      closeDetailPage={this.closeDetailPage}
                      emailid={detailEmail}
                    />
                  ) : (
                    <div className='compose-right'>
                      <div className='head-top'>
                        <div className='row justify-content-center align-items-center'>
                          <div className='col-xl-7 col-lg-10 col-md-10 col-sm-10 col-10'>
                            <div className='social-button'>
                              <div className='check-box'>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name='checkedB'
                                      color='primary'
                                      checked={isSelectAll}
                                      onChange={this.setSelectAllEmail}
                                    />
                                  }
                                />
                              </div>
                              <ul>
                                <li onClick={() => this.emailType("important")}>
                                  <a
                                    href='#'
                                    className={
                                      priorty === "important" ? "active" : ""
                                    }
                                    onClick={(e) => e.preventDefault()}>
                                    <span>
                                      <MailIcon />
                                    </span>
                                    Important
                                  </a>
                                </li>
                                <li onClick={() => this.emailType("socials")}>
                                  <a
                                    onClick={(e) => e.preventDefault()}
                                    href='#'
                                    className={
                                      priorty === "socials" ? "active" : ""
                                    }>
                                    <span>
                                      <SupervisorAccountIcon />
                                    </span>
                                    Socials
                                  </a>
                                </li>
                                <li onClick={() => this.emailType("promotion")}>
                                  <a
                                    href='#'
                                    className={
                                      priorty === "promotion" ? "active" : ""
                                    }
                                    onClick={(e) => e.preventDefault()}>
                                    <span>
                                      <ConfirmationNumberIcon />
                                    </span>
                                    Promotion
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='col-xl-5 col-lg-2 col-md-2 col-sm-2 col-2'>
                            <div className='social-icons'>
                              <ul>
                                <li>
                                  <IconButton className='icon'>
                                    <MoreVertIcon />
                                  </IconButton>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='recent-content'>
                        <SimpleBar>
                          <ul>{this.displayEmailList()}</ul>
                        </SimpleBar>
                      </div>
                      <Pagination
                        ref={this.paginationRef}
                        changeCurrentPage={this.onChangeCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    search_email_status,
    search_email,
    search_all_email_status,
    inbox_data,
    get_inbox_status,
    search_all_email,
    send_email_status,
  } = state.procurement;
  return {
    search_email_status,
    search_email,
    search_all_email_status,
    search_all_email,
    send_email_status,
    inbox_data,
    get_inbox_status,
  };
};

export default withRouter(connect(mapStateToProps)(EmailPage));
