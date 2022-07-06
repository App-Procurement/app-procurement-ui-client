import React, { Component } from 'react';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import CompanyProfile from './CompanyProfile';
import RollAndPermissions  from './RollAndPermissions';
import ApprovalWorkFlow from './ApprovalWorkFlow';
class Setting extends Component {
  settingNav;
  constructor(props) {
    super(props);
    this.state = {
      authenticationActivate: true,
      navKey:"accountSetting"
    };
    this.settingNav=[
      {
          name: "Account Setting", key :'accountSetting',component:<CompanyProfile/>
      },
      {
        name: "Roles and Permissions", key :'rollAndPermissions',component:<RollAndPermissions/>
    },
    {
      name: "Approval Workflow", key :'approvalWorkflow',component:<ApprovalWorkFlow/>
  },
  ]
  }

  render() {
    const {navKey}=this.state;
    return (
      <div className="main-content">
        <div className="setting-content">
          <div className="heading">
            <h3>Setting</h3>
          </div>
          <div className="setting-content-inner">
            <div className="row">
              <div className="col-4">
                <div className="setting-menu">
                  <ul>
                    <li onClick={()=>this.setState({navKey:"accountSetting"})} className= {navKey==="accountSetting"?'active':""}>
                      <div className="icon">
                        <i class="fas fa-user"></i>
                      </div>
                      <div className="content">
                        <h3>Account setting</h3>
                        <p>Admin Detials, Email, chatroom and Kanban</p>
                      </div>
                      <div className="arrow">
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li onClick={()=>this.setState({navKey:"approvalWorkflow"})}  className= {navKey==="approvalWorkflow"?'active':""}>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>Approval Flows</h3>
                        <p>Purchase Requisition, Purchase Order, Invoices</p>
                      </div>
                      <div className="arrow" >
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li onClick={()=>this.setState({navKey:"rollAndPermissions"})} className= {navKey==="rollAndPermissions"?'active':""}>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>Roles and Permissions</h3>
                        <p>Manage roles and permissions</p>
                      </div>
                      <div className="arrow" >
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>Notifications</h3>
                        <p>Roles and Responsibilites</p>
                      </div>
                      <div className="arrow">
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>Chat Room</h3>
                        <p>Roles and Responsibilites</p>
                      </div>
                      <div className="arrow">
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>Kanban</h3>
                        <p>Roles and Responsibilites</p>
                      </div>
                      <div className="arrow">
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i class="fas fa-cog"></i>
                      </div>
                      <div className="content">
                        <h3>User management</h3>
                        <p>Roles and Responsibilites</p>
                      </div>
                      <div className="arrow">
                        <i class="fas fa-angle-right"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-8">
                {this.settingNav && this.settingNav.length> 0 &&
                  this.settingNav.map((value, index)=>(navKey===value.key?value.component:<></>))
                }
                {/* <CompanyProfile/>
                <RollAndPermissions/>
                <ApprovalWorkFlow/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
