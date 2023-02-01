import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import "simplebar/dist/simplebar.min.css";
import { recievedrfpAction } from "../../_actions";
import { status } from "../../_constants";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentActivity: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(recievedrfpAction.searchRecievedRFP());
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.recieved_rfp_status !== this.props.recieved_rfp_status &&
      this.props.recieved_rfp_status === status.SUCCESS
    ) {
      if (
        this.props.recieved_rfp_list &&
        this.props.recieved_rfp_list.length > 0
      ) {
        this.setState({ recentActivity: this.props.recieved_rfp_list });
      }
    }
  }

  render() {
    const { recentActivity } = this.state;
    return (
      <div className="recent-activity">
        <div className="heading">{this.props.t("Recent Activity")}</div>
        <SimpleBar className="recent-activity-table">
          {recentActivity &&
            recentActivity.length > 0 &&
            recentActivity.map((activity, index) => {
              let date = new Date(activity.createdOn).toDateString();
              let time = new Date(activity.createdOn).toLocaleTimeString();
              return (
                <div className="d-flex table-row">
                  <div className="row">
                    <div className="col-5">
                      <div className="d-flex">
                        <div className="image">
                          <img
                            src={activity.profilePic}
                            width={50}
                            height={50}
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-wrap name">
                          <span>Apporoved by:</span>
                          {activity.createdBy && (
                            <strong>{activity.createdBy}</strong>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="d-flex flex-wrap order-apporoved">
                        <strong>Order Apporoved</strong>
                        {date && time && <span>{`${date} ${time}`}</span>}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="d-flex justify-content-end flex-wrap rfp-no">
                        <span>RFP No</span>
                        {activity.id && <strong>{activity.id}</strong>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </SimpleBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { recieved_rfp_status, recieved_rfp_list } = state.procurement;
  return {
    recieved_rfp_status,
    recieved_rfp_list,
  };
}

export default connect(mapStateToProps)(RecentActivity);
