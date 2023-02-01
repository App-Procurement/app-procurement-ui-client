import React, { Component } from "react";
import { Button } from "@mui/material";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import "simplebar/dist/simplebar.min.css";
import { requistionAction } from "../../_actions";
import { status } from "../../_constants";
import { Link } from "react-router-dom";
import { commonFunctions } from "../../_utilities/commonFunctions";
class ActiveRequisition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentActivity: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(requistionAction.getRequisitions());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.requisition_status !== this.props.requisition_status &&
      this.props.requisition_status === status.SUCCESS
    ) {
      if (
        this.props.requisition_list &&
        this.props.requisition_list.length > 0
      ) {
        this.setState({ recentActivity: this.props.requisition_list });
      }
    }
  }

  getTimeAndDateDiffrence = (date) => {
    let activityDate = new Date(date);
    let recentTime = new Date();
    let result = 0;
    result = Math.abs(activityDate.getHours() - recentTime.getHours());
    if (result <= 0) {
      result = Math.abs(activityDate.getMinutes() - recentTime.getMinutes());
      return `${result + " minutes"}`;
    } else {
      return `${result + " hours"}`;
    }
  };

  render() {
    const { recentActivity } = this.state;
    return (
      <div className="active-requisition">
        <div className="active-requisition-head">
          <div className="row">
            <div className="col-6">
              <div className="head-left">
                {this.props.t("Active Requsitions")}
              </div>
            </div>
            <div className="col-6">
              <div className="head-right">
                <select name="" className="approved-dropdown">
                  <option value="Month">Month</option>
                  <option value="Month">January</option>
                  <option value="Month">February</option>
                  <option value="Month">March</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <SimpleBar className="activity-requisition-table">
          {recentActivity &&
            recentActivity.length > 0 &&
            recentActivity.map((requisition, index) => {
              if (requisition) {
                const {
                  itemName,
                  requisitionStatus,
                  id,
                  createdBy,
                  createdOn,
                } = requisition;
                if (requisitionStatus === 1) {
                  return (
                    <div className="d-flex table-row" key={id}>
                      <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-10">
                          <div className=" d-flex align-items-center">
                            <div className="item-name">
                              {itemName && (
                                <div className="item-text"> {itemName}</div>
                              )}
                            </div>
                            <div className="col-7">
                              <div className="request-approved-text">
                                {createdBy && (
                                  <span> Request Approved by {createdBy}</span>
                                )}
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="time">
                                <span>
                                  {commonFunctions.convertDateToString(
                                    new Date(createdOn)
                                  )}{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="d-flex justify-content-end flex-wrap rfp-no">
                            <Button variant="contained" className="track-btn">
                              <Link>Track</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            })}
        </SimpleBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requisition_status, requisition_list } = state.procurement;
  return {
    requisition_status,
    requisition_list,
  };
}

export default connect(mapStateToProps)(ActiveRequisition);
