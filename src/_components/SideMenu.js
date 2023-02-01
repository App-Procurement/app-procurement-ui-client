import React, { Component } from "react";
import {
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import navigation from "./_nav";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { connect } from "react-redux";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      activeTab: 0,
      openedSubMenus: [],
      emailLength: 0,
      emailType: "inbox",
    };
  }

  handleDrawerOpenClose = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { inbox_data } = this.props;
    let { emailLength } = this.state;
    if (JSON.stringify(prevProps.inbox_data) !== JSON.stringify(inbox_data)) {
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
      }
      this.setState({ emailLength });
    }
  }

  changeActiveTabColor = (location) => {
    const pathname = location.pathname;
    for (let i = 0; i < navigation.topNav.length; i++) {
      if (pathname.indexOf(navigation[i].to) !== -1) {
        this.setState({
          activeTab: i,
        });
        break;
      }
    }
  };

  setActiveTab = (index) => {
    this.setState({
      activeTab: index,
    });
  };

  setOpenClose = (e, index) => {
    e.stopPropagation();
    const { openedSubMenus } = this.state;
    openedSubMenus[index] = !openedSubMenus[index];
    this.setState({
      openedSubMenus,
    });
  };

  handelSideNav = () => {
    if (window.innerWidth < 922) {
      this.handleDrawerOpenClose();
    }
  };

  displaySidebarMenu = (navValues) => {
    const { activeTab, openedSubMenus, emailLength } = this.state;
    let path = this.props.history.location.pathname;
    let retData = [];
    for (let i = 0; i < navValues.length; i++) {
      let nav = navValues[i];
      let navName = nav.to.split("/").length;
      let pathName = path.split("/").splice(0, navName);
      let activePathName = pathName.join("/") === nav.to;
      retData.push(
        <li
          className="sidebar-menu"
          key={nav.name}
          onClick={this.handelSideNav}
        >
          <ListItem
            className={activePathName ? "active" : ""}
            tabIndex="0"
            component={Link}
            to={nav.to}
            onClick={() => this.setActiveTab(i)}
          >
            <ListItemIcon className="icon">{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} className="name" />
            {nav.name === "Email" && emailLength > 0 && (
              <span className="float-right length">{emailLength}</span>
            )}
          </ListItem>
          {nav.children && (
            <div
              className="float-right arrow"
              onClick={(e) => this.setOpenClose(e, i)}
            >
              {!openedSubMenus[i] && <ExpandMoreIcon />}
              {openedSubMenus[i] && <ExpandLessIcon />}
            </div>
          )}
          {nav.children && openedSubMenus[i] && (
            <ul>{this.displayChild(nav.children)}</ul>
          )}
        </li>
      );
    }
    return retData;
  };

  displayChild = (data) => {
    let childData = [];
    for (let j = 0; j < data.length; j++) {
      childData.push(
        <ListItem key={data[j].name}>
          <Link to={data[j].to}>{data[j].name}</Link>
        </ListItem>
      );
    }
    return childData;
  };

  render() {
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <div className="d-block d-lg-none mobile-toggale">
          <IconButton
            className="menu-toggale"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpenClose}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className={isOpen ? "sidebar open" : "sidebar"}>
          <div className="d-block logo-container">
            <div className="row">
              <div className="col-10">
                <div className="logo">
                  <a href="/">
                    <img src={Logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-2">
                <div className="toggale">
                  <IconButton
                    className="menu-toggale"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpenClose}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <SimpleBar style={{ maxHeight: "calc(100% - 76px)" }}>
            <List className="sidebar-content">
              <ListItem className="menu-heading">Menu</ListItem>
              {navigation &&
                navigation.menuNav.length > 0 &&
                this.displaySidebarMenu(navigation.menuNav)}
            </List>
            <List className="sidebar-content">
              <ListItem className="menu-heading">Approval Centre</ListItem>
              {navigation &&
                navigation.approvalCentreNav.length > 0 &&
                this.displaySidebarMenu(navigation.approvalCentreNav)}
            </List>
            <List className="sidebar-content">
              <ListItem className="menu-heading">Supplier Management</ListItem>
              {navigation &&
                navigation.supplierManagementNav.length > 0 &&
                this.displaySidebarMenu(navigation.supplierManagementNav)}
            </List>
            <List className="sidebar-content">
              <ListItem className="menu-heading">Support</ListItem>
              {navigation &&
                navigation.supportNav.length > 0 &&
                this.displaySidebarMenu(navigation.supportNav)}
            </List>

            {/* <div className="increase-box">
							<div className="increase-carcale" />
							<span>
								<ViewComfyIcon />
							</span>
							<p>
								Increase your <br /> work with kanban
							</p>
							<span>
								<ArrowRightAltIcon />
							</span>
						</div> */}
          </SimpleBar>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { get_inbox_status, inbox_data } = state.procurement;
  return { get_inbox_status, inbox_data };
};
export default connect(mapStateToProps)(SideMenu);
