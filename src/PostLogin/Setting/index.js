import React, { Component } from "react";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import CompanyProfile from "./CompanyProfile";
import RollAndPermissions from "./RollAndPermissions";
import ApprovalWorkFlow from "./ApprovalWorkFlow";
import SimpleBar from "simplebar-react";

class Setting extends Component {
  settingNav;
  constructor(props) {
    super(props);
    this.state = {
      authenticationActivate: true,
      navKey: "accountSetting",
      mobNav: false,
    };
    this.settingNav = [
      {
        name: "Account Setting",
        id: "101",
        key: "accountSetting",
        component: <CompanyProfile key={"1_accountSetting"} />,
      },
      {
        name: "Roles and Permissions",
        id: "111",
        key: "rollAndPermissions",
        component: <RollAndPermissions key={"2_accountSetting"} />,
      },
      {
        name: "Approval Workflow",
        id: "109",
        key: "approvalWorkflow",
        component: <ApprovalWorkFlow key={"3_accountSetting"} />,
      },
    ];
  }

  handleClickSettingMenu = () => {
    this.setState({ mobNav: !this.state.mobNav });
  };

  handleMobNav = (key) => {
    this.setState({ mobNav: !this.state.mobNav, navKey: key });
  };

  render() {
    const { navKey, mobNav } = this.state;
    return (
      <div className="main-content">
        <div className="setting-content">
          <div className="heading">
            <h3>Setting</h3>
          </div>
          <div className="setting-content-inner">
            <div className="row">
              <div className="col-lg-4 col-12">
                <SimpleBar className="setting-menu-main">
                  <div className="setting-menu">
                    <ul>
                      <li
                        onClick={() =>
                          this.setState({ navKey: "accountSetting" })
                        }
                        key="0"
                        className={navKey === "accountSetting" ? "active" : ""}
                      >
                        <div className="icon">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="content">
                          <h3>Account setting</h3>
                          <p>Admin Detials, Email, chatroom and Kanban</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li
                        onClick={() =>
                          this.setState({ navKey: "approvalWorkflow" })
                        }
                        key="1"
                        className={
                          navKey === "approvalWorkflow" ? "active" : ""
                        }
                      >
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>Approval Flows</h3>
                          <p>Purchase Requisition, Purchase Order, Invoices</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li
                        onClick={() =>
                          this.setState({ navKey: "rollAndPermissions" })
                        }
                        key="2"
                        className={
                          navKey === "rollAndPermissions" ? "active" : ""
                        }
                      >
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>Roles and Permissions</h3>
                          <p>Manage roles and permissions</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li key="3">
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>Notifications</h3>
                          <p>Roles and Responsibilites</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li key="4">
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>Chat Room</h3>
                          <p>Roles and Responsibilites</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li key="5">
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>Kanban</h3>
                          <p>Roles and Responsibilites</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                      <li key="6">
                        <div className="icon">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="content">
                          <h3>User management</h3>
                          <p>Roles and Responsibilites</p>
                        </div>
                        <div className="arrow">
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </SimpleBar>
                <div className="setting-menu-mobile">
                  <button
                    className="btn btn-primary btn-menu"
                    onClick={this.handleClickSettingMenu}
                  >
                    Menu
                  </button>
                  {mobNav ? (
                    <ul className="menu show">
                      <li
                        onClick={() => this.handleMobNav("accountSetting")}
                        key="0"
                        className={navKey === "accountSetting" ? "active" : ""}
                      >
                        Account setting
                      </li>
                      <li
                        onClick={() => this.handleMobNav("approvalWorkflow")}
                        key="1"
                        className={
                          navKey === "approvalWorkflow" ? "active" : ""
                        }
                      >
                        {" "}
                        Approval Flows
                      </li>
                      <li
                        onClick={() => this.handleMobNav("rollAndPermissions")}
                        key="2"
                        className={
                          navKey === "rollAndPermissions" ? "active" : ""
                        }
                      >
                        Roles and Permissions
                      </li>
                      <li>Notifications</li>
                      <li>Chat Room</li>
                      <li>User management</li>
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-lg-8 col-12">
                <SimpleBar className="setting-right-content-main">
                  {this.settingNav &&
                    this.settingNav.length > 0 &&
                    this.settingNav.map(
                      (value, index) =>
                        navKey === value.key && (
                          <div key={`${value.id}${index}`}>
                            {value.component}
                          </div>
                        )
                    )}
                </SimpleBar>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
