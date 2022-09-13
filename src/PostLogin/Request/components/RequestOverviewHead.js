import { Component } from "react";
import Button from "@material-ui/core/Button";

class RequestOverviewHead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { requestNav, activeKey, handelKey } = this.props;

    return (
      <div className="request-overview">
        <div className="request-overview-head">
          <h4>Request No. #49</h4>
          <Button
            variant="contained"
            className="group-btn green-btn"
            disableElevation
          >
            #Approve
          </Button>
          <Button
            variant="contained"
            className="group-btn blue-btn"
            disableElevation
          >
            #Unpaid
          </Button>
          <Button
            variant="contained"
            className="group-btn yellow-btn"
            disableElevation
          >
            #Undelivered
          </Button>
        </div>
        <div className="request-overview-tabs">
          <ul>
            {requestNav?.length > 0 ? (
              requestNav.map((value, index) => (
                <li
                  onClick={() => handelKey(index)}
                  className={activeKey === index ? "active" : ""}
                >
                  {value.name}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default RequestOverviewHead;
