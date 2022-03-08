import React, { Component } from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import navigation from './_nav';
import { Link } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { connect } from "react-redux";

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      activeTab: 0,
      openedSubMenus: [],
      emailLength: 0,
      emailType: 'inbox'
    }
  }

  handleDrawerOpenClose = () => {
    const { isOpen, } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };



  componentDidUpdate(prevProps, prevState) {
    const { get_inbox_status, inbox_data } = this.props;
    let { emailLength } = this.state
    if (JSON.stringify(prevProps.inbox_data) !== JSON.stringify(inbox_data)) {
      emailLength = 0;
      if (inbox_data && inbox_data.length > 0) {
        for (let i = 0; i < inbox_data.length; i++) {
          if (inbox_data[i].isRead === "false" || inbox_data[i].isRead === false) {
            emailLength++;
          }
        }
      }
      this.setState({ emailLength })
    }
  }

  changeActiveTabColor = (location) => {
    const pathname = location.pathname;
    for (let i = 0; i < navigation.length; i++) {
      if (pathname.indexOf(navigation[i].to) !== -1) {
        this.setState({
          activeTab: i
        });
        break;
      }
    }
  };

  setActiveTab = (index) => {
    this.setState({
      activeTab: index
    });
  }

  setOpenClose = (e, index) => {
    e.stopPropagation();
    const { openedSubMenus } = this.state;
    openedSubMenus[index] = !openedSubMenus[index];
    this.setState({
      openedSubMenus
    });
  };


  handelSideNav = () => {
    if (window.innerWidth < 922) { this.handleDrawerOpenClose() } { }
  }

  displaySidebarMenu = () => {
    const { activeTab, openedSubMenus, emailLength } = this.state;

    let retData = [];
    for (let i = 0; i < navigation.length; i++) {
      let nav = navigation[i];
      retData.push(
        <li className="sidebar-menu" key={nav.name} onClick={this.handelSideNav}>
          <ListItem className={activeTab === i ? "active" : ""} tabIndex="0" component={Link} to={nav.to} onClick={() => this.setActiveTab(i)}>
            <ListItemIcon className="icon">
              {nav.icon}
            </ListItemIcon>
            <ListItemText primary={nav.name} className="name" />
            {nav.name === 'Email' && emailLength > 0 && <span className="float-right length">{emailLength}</span>}
          </ListItem>
          {nav.children &&
            <div className="float-right arrow" onClick={e => this.setOpenClose(e, i)}>
              {!openedSubMenus[i] &&
                <ExpandMoreIcon />
              }
              {openedSubMenus[i] &&
                <ExpandLessIcon />
              }
            </div>
          }
          {(nav.children && openedSubMenus[i]) &&
            <ul>
              {this.displayChild(nav.children)}
            </ul>
          }
        </li>
      );
    }
    return retData;
  }

  displayChild = (data) => {
    let childData = [];
    for (let j = 0; j < data.length; j++) {
      childData.push(
        <ListItem key={data[j].name} >
          <Link to={data[j].to}>
            {data[j].name}
          </Link>
        </ListItem>
      );
    }
    return childData;
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <div className="d-block d-lg-none mobile-toggale">
          <IconButton className="menu-toggale"
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
                  <a href="/"><img src={Logo} alt="" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="toggale">
                  <IconButton className="menu-toggale"
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
          <SimpleBar style={{ maxHeight: 'calc(100% - 76px)' }} >
            <List className="sidebar-content" >
              <ListItem className="menu-heading"  >
                Main Menu
              </ListItem>
              {this.displaySidebarMenu()}
            </List>
            <div className="increase-box">
              <div className="increase-carcale"></div>
              <span><ViewComfyIcon /></span>
              <p>Increase your <br /> work with kanban</p>
              <span><ArrowRightAltIcon /></span>
            </div>
          </SimpleBar>
        </div>
      </>)
  }
}

const mapStateToProps = (state) => {
  const { get_inbox_status, inbox_data } = state.procurement
  return { get_inbox_status, inbox_data }
}
export default connect(mapStateToProps)(SideMenu);