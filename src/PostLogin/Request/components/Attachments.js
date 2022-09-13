import React from "react";
import Button from "@material-ui/core/Button";
import PdfIcon from "../../../assets/images/request/pdf-icon.png";

const Attachments = ({ requestData }) => {
  return (
    <div className="overview-tabs-contant attechment-tabs-contant active">
      <div className="order-item-table">
        <div className="order-item-head">
          <h4>Attachments</h4>
        </div>
        <div className="form-table attechment-group-table">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Size</th>
                <th>Date Uploaded</th>
                <th>Uploaded By</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((data) => {
                return (
                  <tr>
                    <td>
                      <span>
                        <Button className="pdf-icon-btn">
                          <img src={PdfIcon} alt="" />
                        </Button>
                        {data.fileName}
                      </span>
                    </td>
                    <td>
                      <span>{data.fileSize}</span>
                    </td>
                    <td>
                      <span>
                        {new Date(data.dateUploaded).toLocaleDateString()}
                      </span>
                    </td>

                    <td>
                      <span>
                        <div className="d-inline-block user-image">
                          <img
                            src={data.uploadedBy[0].profilePic}
                            alt=""
                            className="attachmentsPic"
                          />
                        </div>
                        {data.uploadedBy[0].userName}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attachments;
