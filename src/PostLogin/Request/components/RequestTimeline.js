import { commonFunctions } from "../../../_utilities";
import { useState } from "react";

const RequestTimeline = ({ requestData }) => {
  const dataKeys = {
    requestInitiate: "Request Initiate",
    approved: "Approved",
    poCreated: "PO Created",
    outOfDelivery: "Out for delivery",
    deliverd: "Delivered",
  };
  const [timelineIndex, setTimelineIndex] = useState(-1);

  const toggleVisibility = (index) => {
    if (index === timelineIndex) {
      setTimelineIndex(-1);
    } else {
      setTimelineIndex(index);
    }
  };

  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <div className="request-content-right">
        <div className="request-timeline">
          <div className="timeline-head">
            <h4>Request Timeline</h4>
          </div>
          <div className="request-timeline-content">
            <ul>
              {Object.keys(requestData).map((key, index) => {
                if (dataKeys[key]) {
                  return (
                    <li>
                      <p className="green">{dataKeys[key]}</p>
                      <span>
                        {commonFunctions.timeStampFormat(requestData[key].date)}
                      </span>
                      {requestData[key].hasOwnProperty("info") ? (
                        <label>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleVisibility(index)}
                          >
                            {timelineIndex !== index
                              ? "View More Info"
                              : "Hide Info"}
                          </a>
                          <span
                            style={{
                              visibility:
                                timelineIndex === index ? "visible" : "hidden",
                            }}
                          >
                            {requestData[key].info}
                          </span>
                        </label>
                      ) : (
                        <></>
                      )}
                    </li>
                  );
                } else {
                  return <></>;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTimeline;
