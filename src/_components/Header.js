import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import UserImg from '../assets/images/user-img.png';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import FolderIcon from '@material-ui/icons/Folder';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EvansjohnImg from '../assets/images/dashbord/evansjohn-img.png'
import Kevin from '../assets/images/dashbord/kevin.png';
import Joannah from '../assets/images/dashbord/joannah.png';
import Machel from '../assets/images/dashbord/machel.png';
import Approval1 from '../assets/images/dashbord/approval1.png'
import Approval2 from '../assets/images/dashbord/approval2.png'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { homeAction } from '../_actions'
import { connect } from 'react-redux'
import { status } from '../_constants';

export const proHeader = {
  renderRole
};

function renderRole () {
  var profile = localStorage.getItem("userData");
  var profileJson = JSON.parse(profile);
  let retData = "";
  var row = profileJson.info.user
  if (row) {
    console.log("profileJson",row)
    for (let i = 0; i <row.roles.length; i++) {
    retData = row.roles[i].name;
    }
  }

  return retData;
}


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "US",
      notification: false,
      profile: false,
      profileOnClick: false,
      searchToggle: false,
      notificationData: []
    }
  }
  componentDidMount() {
    this.props.dispatch(homeAction.Notificationdata());
    // this.renderProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.get_notification_status !== prevProps.get_notification_status && this.props.get_notification_status === status.SUCCESS) {
      if (this.props.get_notification_data && this.props.get_notification_data.length > 0) {
        this.setState({ notificationData: this.props.get_notification_data })
      }
    }
  }

  handleSelect = (value) => {
    this.setState({
      selected: value
    })
  }

  handleOnClick = () => {
    const { profileOnClick } = this.state;
    let data = !profileOnClick;
    this.setState({
      profileOnClick: data,
      profile: false,
      notification: false,
      searchToggle: false
    })
  }

  openSearchToggle = () => {
    const { searchToggle } = this.state;
    let data = !searchToggle;
    this.setState({
      searchToggle: data,
      profile: false,
      notification: false,
    })
  }

  openNotificationModel = () => {
    const { notification } = this.state;
    let data = !notification;
    this.setState({
      notification: data,
      profile: false,
      profileOnClick: false,
      searchToggle: false
    })
  }

  openLogOutModel = () => {
    const { profile } = this.state;
    let isData = !profile;
    this.setState({
      profile: isData,
      notification: false,
      profileOnClick: false,
      searchToggle: false
    })
  }

  openModelClose = () => {
    this.setState({
      profile: false,
      notification: false,
      profileOnClick: false
    })
  }

  notificationDisplay = () => {
    const { notificationData } = this.state;
    let retData = [];
    for (let i = 0; i < notificationData.length; i++) {
      let data = notificationData[i];
      retData.push(
        <div className="user-details" key={data.title}>
          <ul>
            <li>
              <Avatar alt="Remy Sharp" src={data.img} className="user-image" />
              <div className="user-massage">
                <p style={{ margin: 0 }}>{data.title}</p>
                <span style={{ margin: 0 }}>{data.description.substring(0, 40)}</span>
              </div>
            </li>
          </ul>
        </div>
      )
    }
    return retData;
  }
  renderProfile = () => {
    var profile = localStorage.getItem("userData");
    var profileJson = JSON.parse(profile);
    let retData = [];
    var row = profileJson.info.user
    
    if (row) {
      console.log("profileJson",row)
      for (let i = 0; i <row.roles.length; i++) {
      retData.push(
        <>
          <div>
            <strong>{row.email}</strong>
            
            <br></br>{row.roles[i].name}

          </div>
        </>
      );
      }
    }

    return retData;
  }

 

  render() {
    const { selected, notification, profile, searchToggle } = this.state;
    return (
      <>
        <div className="navbar-custom">
          <div className="header">
            <div className="row justify-content-center align-items-center">
              <div className="col-xl-4 d-none d-xl-block">
                <div className="app-search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search here" />
                    <button><SearchIcon /></button>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-12">
                <div className="d-block text-right header-notification">
                  <div className="d-none d-xl-inline-block menu"><a href="#">other menus</a></div>
                  <div className="notification-list">
                    <Badge onClick={this.openSearchToggle} className="d-lg-none d-inline-block">
                      <SearchIcon />
                    </Badge>
                    {searchToggle && <div className="search-toggle">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search here" />
                        <button><SearchIcon /></button>
                      </div>
                    </div>}
                    <Badge onClick={this.openNotificationModel} badgeContent={5} className="d-none d-md-inline-block">
                      <NotificationsIcon onClick={this.openNotificationModel} />
                    </Badge>
                    {notification && (<>
                      <div
                        style={{ position: "fixed", width: "100%", height: "100%", left: "0", top: "0" }}
                        onClick={this.openModelClose}
                      ></div>
                      <div className="user-list">
                        <div className="noti-tittle">
                          <h5>Notification</h5>
                          <span><a href="#">Clear All</a></span>
                        </div>
                        <SimpleBar style={{ maxHeight: '300px' }} className="user-content">
                          {this.notificationDisplay()}
                        </SimpleBar>
                        <div className="view-btn">
                          <Button className="noti-btn">View All</Button>
                        </div>
                      </div>
                    </>)}
                    <Badge badgeContent={5} className="d-none d-md-inline-block">
                      <CardGiftcardOutlinedIcon />
                    </Badge>
                    <Badge badgeContent={2} className="d-none d-md-inline-block">
                      <LibraryAddCheckIcon />
                    </Badge>
                    <Badge badgeContent={3} className="d-none d-md-inline-block noti-icon">
                      <FolderIcon />
                    </Badge>
                  </div>
                  <div className="country-menu border-right" onClick={this.handleOnClick}>
                    <ReactFlagsSelect
                      className="selected-country"
                      countries={["US", "GB", "FR"]}
                      customLabels={{ "US": "English", "GB": "English", "FR": "French" }}
                      selected={selected}
                      onSelect={this.handleSelect}
                    />
                  </div>
                  <div className="notification-user">
                    <ul>
                      <li>
                        <Avatar onClick={this.openLogOutModel} alt="Remy Sharp" src={UserImg} className="" />
                      </li>
                      <li>
                        <span className="user-name" onClick={this.openLogOutModel}><div>{this.renderProfile()}</div> </span>
                      </li>
                      <li className="last" onClick={this.openLogOutModel}>
                        <ArrowDropDownIcon className=".sort-down" />
                      </li>
                    </ul>
                    {profile && (<>
                      <div
                        style={{ position: "fixed", width: "100%", height: "100%", left: "0", top: "0" }}
                        onClick={this.openModelClose}
                      ></div>
                      <div className="profile-menu">
                        <ul>
                          <li><AccountCircleIcon className="menu-icon" />Account</li>
                          <li><SettingsIcon className="menu-icon" />Settings</li>
                          <li><SportsSoccerIcon className="menu-icon" />Support</li>
                          <li><LockOutlinedIcon className="menu-icon" />Lock</li>
                          <li><ExitToAppOutlinedIcon className="menu-icon" />Logout</li>
                        </ul>
                      </div>
                    </>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }

}
const mapStateToProps = (state) => {
  const { get_notification_status, get_notification_data } = state.procurement;
  return {
    get_notification_status, get_notification_data
  }
}

export default connect(mapStateToProps)(Header);