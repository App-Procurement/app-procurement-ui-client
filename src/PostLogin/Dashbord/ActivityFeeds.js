import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import { connect } from 'react-redux';
import 'simplebar/dist/simplebar.min.css';
import { recievedrfpAction } from '../../_actions';
import { status } from '../../_constants';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

class ActivityFeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentActivity: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(recievedrfpAction.getActivites());
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.get_activity_status !== this.props.get_activity_status &&
      this.props.get_activity_status === status.SUCCESS
    ) {
      if (this.props.get_activity_list && this.props.get_activity_list.length > 0) {
        this.setState({ recentActivity: this.props.get_activity_list });
      }
    }
  }
  getPriority = (value) => {
    if (value === 0) {
      return 'Revised';
    } else if (value === 1) {
      return 'Approve';
    } else if (value === 2) {
      return 'Reject';
    }
  };
  getTimeAndDateDiffrence = (date) => {
    let activityDate = new Date(date);
    let recentTime = new Date();
    let result = 0;
    result = Math.abs(activityDate.getHours() - recentTime.getHours());
    if (result <= 0) {
      result = Math.abs(activityDate.getMinutes() - recentTime.getMinutes());
      return result + 'minutes';
    } else {
      return result + 'hours';
    }
  };
  render() {
    const { recentActivity } = this.state;
    return (
      <div className="recent-activity">
        <div className="recent-activity-head">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-6">
              <div className="head-left">{this.props.t('Activity Feed')}</div>
            </div>
            <div className="col-6">
              <div className="head-right">
                <Link to={"/postlogin/dashboard"}>{this.props.t('See More Activiy')} </Link>
              </div>
            </div>
          </div>
        </div>
        <SimpleBar className="recent-activity-table">
          {recentActivity &&
            recentActivity.length > 0 &&
            recentActivity.map((activity, index) => {
              if (activity && activity.Activity) {
                const { userName, time, id, priority, userMail, userProfile } = activity.Activity;
                return (
                  <div className="d-flex table-row" key={id}>
                    <div className="row d-flex align-items-center justify-content-space-beetween">
                      <div className="col-10">
                        <div className="d-flex">
                          <div className="image">
                            {userProfile && <img src={userProfile} width={50} height={50} alt="" />}
                          </div>
                          <div className="d-flex flex-wrap name row">
                            <div className="col-12">
                              <span>
                                {this.getTimeAndDateDiffrence(time)} ago /{userName}
                              </span>
                            </div>
                            <div className="col-12">
                              {' '}
                              {userName && <strong> Request Approved by {userName}</strong>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="d-flex justify-content-end flex-wrap rfp-no">
                          <Button variant="contained" className="user-icon-btn">
                            <Link to ={"/postlogin/dashboard"}>
                              <i className="fa fa-angle-right"></i>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </SimpleBar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { get_activity_status, get_activity_list } = state.procurement;
  return {
    get_activity_status,
    get_activity_list,
  };
}
export default connect(mapStateToProps)(ActivityFeeds);
