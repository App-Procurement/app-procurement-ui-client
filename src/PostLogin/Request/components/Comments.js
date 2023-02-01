import React from "react";
import UserImg4 from "../../../assets/images/request/user-img4.png";
import { commonFunctions } from "../../../_utilities/commonFunctions";

const Comments = ({ fakerData }) => {
  return (
    <div className="overview-tabs-contant comments-tabs-contant active">
      <div className="order-item-head">
        <h4>Comments</h4>
      </div>
      <div className="user-comments-section">
        {fakerData.map((data) => {
          return (
            <ul>
              <li>
                <div className="user-comments-image">
                  <img className="profilePic" src={data.profilePic} alt="" />
                </div>
                <div className="user-details">
                  <div className="user-name">
                    <label>{data.userName}</label>
                    <span>{commonFunctions.timeDifference(data.postTime)}</span>
                  </div>
                  <div className="user-designation">
                    <p>{data.comment}</p>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}

        <div className="comment-reply-bottom-content">
          <span>
            <img src={UserImg4} alt="" />
          </span>
          <input type="text" placeholder="Reply" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
