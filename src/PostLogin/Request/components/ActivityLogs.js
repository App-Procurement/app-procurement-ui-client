import { commonFunctions } from "../../../_utilities/commonFunctions";

const ActivityLogs = ({ fakerData }) => {
  return (
    <div className="activity-logs-tabs active">
      <div className="order-item-head">
        <h4>Activity Logs</h4>
      </div>
      <div className="form-table activity-logs-group-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Type</th>
              <th>TimeStamp</th>
            </tr>
          </thead>
          <tbody>
            {fakerData.map((data) => {
              return (
                <tr>
                  <td>
                    <span>
                      <div className="user-profile">
                        <span>
                          <img
                            src={data.User.profilePic}
                            alt=""
                            className="profilePic"
                          />
                        </span>
                        <div className="user-contant">
                          <label className="d-block">
                            {data.User.userName}
                          </label>
                          <span className="d-block">
                            {data.User.description}
                          </span>
                        </div>
                      </div>
                    </span>
                  </td>
                  <td>
                    <span className="green">{data.Action}</span>
                  </td>
                  <td>
                    <span>{data.Type}</span>
                  </td>
                  <td>
                    <span>
                      {commonFunctions.timeStampFormat(data.TimeStamp)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
