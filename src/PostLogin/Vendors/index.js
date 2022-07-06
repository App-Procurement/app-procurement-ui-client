import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import "simplebar/dist/simplebar.min.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { connect } from "react-redux";
import { vendorAction } from "../../_actions";
import { status } from "../../_constants";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from "../../_components/commonLoader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Pagination from "../../_components/Pagination";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // requiData: {
      //     status: "",
      //     reqno: "",
      //     depart: "",
      //     isSected: '',
      // },
      perPageLimit: 4,
      currentPage: 0,
      deleteIndex: "",
      openDialog: false,
      openInviteDialog: false,
      newContact: false,
      activeIndex: 0,
      // contactMemberList: [],
      vendorList: [],
      duplicateVendorList: [],
      displayOption: false,
      inviteList: [{ email: "", name: "" }],
      deletePopup: null,
    };
    this.paginationRef = React.createRef();
  }
  componentDidMount() {
    this.props.dispatch(vendorAction.fetchVendorList());
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.delete_vendor_status !== this.props.delete_vendor_status &&
      this.props.delete_vendor_status === status.SUCCESS
    ) {
      this.setState({
        openDialog: false,
        displayOption: false,
      });
      this.props.dispatch(vendorAction.fetchVendorList());
    }

    if (
      prevProps.get_vendor_status !== this.props.get_vendor_status &&
      this.props.get_vendor_status === status.SUCCESS
    ) {
      const { perPageLimit } = this.state;
      if (
        this.props.getVendor &&
        this.props.getVendor &&
        this.props.getVendor.length > 0
      ) {
        let data = this.props.getVendor;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].isChecked = false;
            data[i].isRead = false;
            data[i].showIcon = false;
          }

          let indexOfLastData = Math.ceil(data.length / perPageLimit);
          this.setState({
            vendorList: data,
          });
          this.paginationRef.current.setOptions({
            totalPages: indexOfLastData,
            perPageLimit,
            totalRecords: data.length,
          });
        }
      }
      this.setState({
        vendorList: this.props.getVendor,
        duplicateVendorList: this.props.getVendor,
      });
    }

    // if (prevProps.send_invitation_status !== this.props.send_invitation_status && this.props.send_invitation_status === status.SUCCESS) {
    //     this.setState({
    //         openInviteDialog: false,
    //     })
    // }
  }

  onClickDelete = (id) => {
    const { openDialog } = this.state;
    let deleteItem = !openDialog;
    this.setState({
      openDialog: deleteItem,
      deleteIndex: id,
    });
  };
  onChangeCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };
  removeVendor = () => {
    this.props.dispatch(
      vendorAction.deleteVendor({ id: this.state.deleteIndex })
    );
    this.setState({ openDialog: false });
  };

  toggleDisplayOptions = () => {
    this.setState({ displayOption: !this.state.displayOption });
  };



  editContact = (id) => {
    this.props.history.push(`/postlogin/newcontact/${id}`);
  }




  handleStateChange = (index, e) => {
    let { vendorList } = this.state;
    const { checked } = e.target;
    vendorList[index]["isSelected"] = checked;
    this.setState({ vendorList });
  };
  onSearchChange = (e) => {
    const { value } = e.target;
    let { duplicateVendorList, vendorList } = this.state;
    let queryResult = [];
    if (duplicateVendorList && duplicateVendorList.length > 0) {
      for (let i = 0; i < duplicateVendorList.length; i++) {
        let approvedData = duplicateVendorList[i];
        if (
          approvedData["name"].toLowerCase().indexOf(value.trim()) !== -1 ||
          approvedData["name"].indexOf(value.trim()) !== -1
        ) {
          queryResult.push(approvedData);
        } else if (
          approvedData["email"].toLowerCase().indexOf(value.trim()) !== -1 ||
          approvedData["email"].indexOf(value.trim()) !== -1
        ) {
          queryResult.push(approvedData);
        }
      }
      vendorList = queryResult;
    } else {
      vendorList = duplicateVendorList;
    }
    this.setState({ vendorList });
  };
  //  display contact list -----------------------------------------
  displayVendorList = () => {
    const {
      vendorList,
      activeIndex,
      displayOption,
      currentPage,
      perPageLimit,
    } = this.state;
    let retData = [];
    let isloading = this.props.get_vendor_status === status.IN_PROGRESS;
    if (!isloading) {
      for (let i = 0; i < vendorList.length; i++) {
        if (
          i >= currentPage * perPageLimit &&
          i <= currentPage * perPageLimit + (perPageLimit - 1)
        ) {
          let row = vendorList[i];
          retData.push(
            <div
              className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12'
              key={row.name}>
              <div className='member-boxs'>
                <Card
                  className={
                    activeIndex === i ? "members-box active" : "members-box"
                  }
                  onClick={() => this.setState({ activeIndex: i })}>
                  <div className='d-flex justify-content-center align-items-center user-img'>
                    <div className='d-flex justify-content-center align-items-center image'>
                      <img src={row.profile} alt='' />
                      <div
                        className='member-position'
                        style={{ backgroundColor: `${row.shortNameColor}` }}>
                        {row.name.match(/\b(\w)/g)}{" "}
                      </div>
                    </div>
                  </div>
                  <div
                    className='d-inline-block menu-icon'
                    style={{ display: "flex" }}>
                    <IconButton aria-label='settings'>
                      <MoreVertIcon
                        onClick={
                          i === activeIndex ? this.toggleDisplayOptions : null
                        }
                      />
                    </IconButton>
                    <div className='settings-toggle'>
                      {displayOption && i === activeIndex ? (
                        <>
                          <span onClick={() => this.editContact(row.id)}>
                            <EditTwoToneIcon /> Edit
                          </span>
                          <span onClick={(id) => this.onClickDelete(row.id)}>
                            <HighlightOffIcon /> Delete
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className='requisition'>
                    <Checkbox
                      name='saveReq'
                      color='primary'
                      checked={row.isSelected}
                      onChange={(e) => this.handleStateChange(i, e)}
                    />
                  </div>
                  <div className='member-details'>
                    <ul>
                      <li>
                        {" "}
                        <b>{row.name}</b>
                      </li>
                      <li>
                        {" "}
                        <span>{row.position}</span>{" "}
                      </li>
                      <li>
                        {" "}
                        <p>{row.company}</p>
                      </li>
                    </ul>
                  </div>
                  <div className='member-contact'>
                    <ul>
                      <li>
                        <Button className='icon-btn'>
                          <CallIcon className='phone-icon' />
                        </Button>
                        <a href={`tel:${row.contNo}`}>{row.contNo}</a>
                      </li>
                      <li>
                        <Button className='icon-btn'>
                          <MailIcon className='phone-icon' />
                        </Button>
                        <a href={`mailto: ${row.email}`}>{row.email}</a>
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          );
        }
      }
    } else {
      retData.push(<Loader />);
    }
    return retData;
  };
  openInviteDialog = () => {
    const { openInviteDialog } = this.state;
    let dialog = !openInviteDialog;
    this.setState({
      openInviteDialog: dialog,
    });
  };

  handleStateInviteChange = (event, index) => {
    let { inviteList } = this.state;
    const { name, value } = event.target;
    inviteList[index][name] = value;
    this.setState({
      inviteList,
    });
  };

  addMoreContcat = () => {
    let { inviteList } = this.state;
    if (inviteList && inviteList.length < 5) {
      inviteList.push({ email: '', name: '' });
      this.setState({
        inviteList,
      })
    }
  }

  removeinviter = (index) => {
    let { inviteList } = this.state;
    if (inviteList && inviteList.length > 1) {
      inviteList.splice(index, 1);
      this.setState({
        inviteList,
      });
    }
  };

  render() {
    let { openDialog, openInviteDialog, inviteList } = this.state;
    return (
      <div className='main-content'>
        <div className='contact-content'>
          <div className='user-contact-list'>
            <div className='buyers-head'>
              <div className='row justify-content-center align-items-center'>
                <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 '>
                  <div className='heading'>
                    <h4>{t("Recommended vendors")}</h4>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
                <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 '>
                  <div className='head-right justify-content-lg-end align-items-center'>
                    <div className='search-bar'>
                      <div className='form-group'>
                        <input
                          type='email'
                          className='form-control'
                          id='exampleFormControlInput1'
                          placeholder={t("Search here")}
                          onChange={this.onSearchChange}
                        />
                        <button>
                          <SearchIcon />
                        </button>
                      </div>
                    </div>
                    <div className='social-buttom'>
                      <ul>
                        {/* <li>
                                                <Button
                                                    variant="contained"
                                                    className="plus-btn list-icon"
                                                >
                                                    <ReorderIcon />
                                                </Button>
                                                </li>
                                                <li>
                                                <Button variant="contained" className="plus-btn">
                                                    <ViewModuleIcon />
                                                </Button>
                                                </li> */}
                        <li className='last'>
                          <Button
                            variant='contained'
                            className='invite-btn'
                            onClick={this.openInviteDialog}>
                            <PersonAddIcon className='user-icon' />
                            {t("Add Vendors")}
                          </Button>
                        </li>
                        {/*<li className="last">
                                                     <Link
                                                        to="/postlogin/newcontact"
                                                        variant="contained"
                                                        className="add-buyres-btn"
                                                    >
                                                        <PersonAddIcon className="user-icon" />
                                                        New Contact
                                                    </Link> 
                                                </li>*/}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-content'>
              <div className='select-buyers-content'>
                <div className='membar-list'>
                  <div className='row'>{this.displayVendorList()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={() => this.setState({ openDialog: false })}
          aria-labelledby='form-dialog-title'
          className='addNewItemDialog'>
          <DialogTitle
            id='form-dialog-title'
            className='dialogSmWidth addNewItemDialogTitle'>
            Delete Confirmation
          </DialogTitle>
          <DialogContent className='dialogSmWidth addNewItemDialogContent'>
            <p>Are you sure to delete record?</p>
          </DialogContent>
          <DialogActions className='dialogSmWidth addNewItemDialogActions'>
            <Button
              variant='contained'
              onClick={this.removeVendor}
              className='primary-btn'>
              Yes
            </Button>
            <Button
              variant='contained'
              onClick={() => this.setState({ openDialog: false })}
              className='default-btn'>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openInviteDialog}
          aria-labelledby='form-dialog-title'
          className='invite-module'>
          <DialogTitle id='form-dialog-title' className='invite-module-header'>
            {t("Invite members to your contact list")}
            <CloseIcon className='close-icon' onClick={this.openInviteDialog} />
          </DialogTitle>
          <DialogContent className='invite-module-content'>
            {inviteList && inviteList.length > 0 && (
              <>
                <div className='row'>
                  <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
                    <label className='d-block'>{t("Email Address")}</label>
                  </div>
                  <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
                    <label className='d-block'>{t("Name")} ({t("Optional")})</label>
                  </div>
                </div>
                {inviteList.map((invite, index) => {
                  return (
                    <div className='row'>
                      <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
                        <div className='form-group form-group-common'>
                          <input
                            type='text'
                            value={invite.email}
                            name='email'
                            placeholder='Eg.James@example.com'
                            className='form-control'
                            onChange={(e) =>
                              this.handleStateInviteChange(e, index)
                            }
                          />
                          {/* <span className="text-danger">
                            {errrorMessage.firstName.message}
                          </span> */}
                        </div>
                      </div>
                      <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
                        <div className='form-group form-group-common'>
                          <input
                            type='text'
                            value={invite.name}
                            name='name'
                            placeholder='Eg.james'
                            className='form-control'
                            onChange={(e) =>
                              this.handleStateInviteChange(e, index)
                            }
                          />
                        </div>
                      </div>
                      {inviteList && inviteList.length > 1 && (
                        <div
                          className='col-xl-2 col-lg-2 col-md-2 col-2'
                          onClick={() => this.removeinviter(index)}>
                          <CloseIcon className='close-icon' />
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {inviteList && inviteList.length < 5 && (
              <div className='add-multiples' onClick={this.addMoreContcat}>
                <AddCircleIcon className='plus-icon' />
                <span>Add New </span>
              </div>
            )}
          </DialogContent>
          <DialogActions className='invite-module-footer'>
            <Button
              variant='contained'
              className='invitation-btn'
              onClick={this.sendInvitation}>
              <PersonAddIcon className='user-icon' />
              {t("Send Invitation")}
            </Button>
          </DialogActions>
        </Dialog>
        <Pagination
          ref={this.paginationRef}
          changeCurrentPage={this.onChangeCurrentPage}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { get_vendor_status, getVendor, delete_vendor_status, deleteVendor } =
    state.procurement;
  return {
    get_vendor_status,
    getVendor,
    delete_vendor_status,
    deleteVendor,
  };
}
const connectVendors = withTranslation()(connect(mapStateToProps)(Vendors))
export default connectVendors