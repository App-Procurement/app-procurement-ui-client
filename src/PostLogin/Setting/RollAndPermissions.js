import React, { Component } from "react";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import Roles from "./RolesAndPermissions/Roles";
import Users from "./RolesAndPermissions/Users";
import Group from "./RolesAndPermissions/Group";

class RollAndPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "roles",
    };
  }

  handelKey = (type) => {
    this.setState({ activeKey: type });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Roles and Permissions</div>
            <div className="tabs">
              <ul>
                <li
                  onClick={() => this.handelKey("roles")}
                  className={activeKey === "roles" ? "active" : ""}
                >
                  Roles
                </li>
                <li
                  onClick={() => this.handelKey("groups")}
                  className={activeKey === "groups" ? "active" : ""}
                >
                  Group
                </li>
                <li
                  onClick={() => this.handelKey("users")}
                  className={activeKey === "users" ? "active" : ""}
                >
                  Users
                </li>
              </ul>
            </div>
            {activeKey === "groups" ? <Group /> : <></>}
            {activeKey === "users" ? <Users /> : <></>}
          </div>
          {activeKey === "roles" ? <Roles /> : <></>}
        </div>
      </>
    );
  }
}
export default RollAndPermissions;
