import React, { Component } from "react";
import {
  FormControlLabel,
  Checkbox,
  ButtonGroup,
  IconButton,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Pagination from "../../_components/Pagination";
import EmailDetail from "./EmailDetail";

class EmailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: {},
      otherProps: {},
      currentPage: 0,
      createUrl: "",
      perPageLimit: 2,
      emails: [],
      currentEmailIndex: -1,
    };
    this.paginationRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ rows: this.props.row, otherProps: this.props.otherData });
    let data = this.props.row.details.emails;
    this.setState({ emails: data });
  }

  componentDidUpdate(prevProps) {
    const { perPageLimit } = this.props;

    if (this.props.otherData !== prevProps.otherData) {
      for (let i = 0; i < this.props.otherData.length; i++) {
        this.rows[i].isChecked = false;
        this.row[i].showIcon = false;
      }
      this.setState({ rows: this.props.row, otherProps: this.props.otherData });
    }

    let data = this.props.row.details.emails;
    let indexOfLastData = Math.ceil(data.length / perPageLimit);
    if (this.paginationRef && this.paginationRef.current) {
      this.paginationRef.current.setOptions({
        totalPages: indexOfLastData,
        perPageLimit,
        totalRecords: data.length,
      });
    }
  }

  // handleUrl = () => {
  //   const { otherProps, rows } = this.state;
  //   otherProps.history.push(
  //     `/postlogin/email/${otherProps.searchEmail}/${otherProps.priorty}/${rows.id}`
  //   );
  //   if (rows.isRead === false) {
  //     let data = { id: rows.id, type: otherProps.searchEmail };
  //     this.props.handleMessageRead(data);
  //   }
  // };

  showIcon = () => {
    let { rows } = this.state;
    rows.showIcon = !rows.showIcon;
    this.setState({
      rows,
    });
  };

  hamndleSelect = (e, id) => {
    let { rows } = this.state;
    rows.isChecked = !rows.isChecked;
    this.props.setSelectedMail(e, id, rows.isChecked);
    this.setState({ rows });
  };

  onChangeCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };

  closeDetailPage = () => {
    this.setState({ currentEmailIndex: -1 });
  };

  showEmailDetailPage = (index) => {
    this.setState({ currentEmailIndex: index });
  };

  render() {
    const {
      rows,
      otherProps,
      emails,
      currentPage,
      currentEmailIndex,
    } = this.state;
    const { perPageLimit } = this.props;
    let startIndex = perPageLimit * currentPage;
    let endIndex = perPageLimit * (currentPage + 1);
    return (
      <>
        {currentEmailIndex >= 0 && (
          <EmailDetail
            closeDetailPage={this.closeDetailPage}
            emailIndex={currentEmailIndex}
            allEmails={emails}
          />
        )}
        {emails?.map((item, index) => {
          {
            if (index >= startIndex && index < endIndex) {
              let emailIndex = index;
              return (
                <li onClick={() => this.showEmailDetailPage(emailIndex)}>
                  <div key={rows.id} className="d-flex single-email-list-item">
                    <div className="user-id mr-3">
                      <div className="check-box">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checkedB"
                              color="primary"
                              checked={rows.isChecked}
                              onChange={(e) => this.hamndleSelect(e, index)}
                            />
                          }
                        />
                      </div>
                      <div
                        className={`user-box ${
                          rows.isStar === "true" ? "active" : ""
                        }`}
                      >
                        <StarIcon />
                      </div>
                    </div>
                    <div className="d-flex w-100 user-content">
                      <div
                        className="col-9 p-0"
                        // onClick={this.handleUrl}
                        key={rows.id}
                      >
                        <div className="d-flex w-100">
                          <div className="user-img">
                            {rows && rows.sender && rows.sender.profilePic && (
                              <img
                                src={rows.sender.profilePic}
                                alt=""
                                height="50px"
                                width="50px"
                              />
                            )}
                          </div>
                          <div className="user-inner-content">
                            <span>
                              {item.to[0]}
                              {/* {rows.time} */}
                            </span>
                            <h5>{item.subject}</h5>
                            <p>{item.content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 p-0">
                        {!rows.showIcon && (
                          <div className="list-icon">
                            <IconButton
                              onClick={() => this.showIcon(otherProps.i)}
                              className="menu-icon"
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                        )}
                        {rows.showIcon && (
                          <ButtonGroup
                            variant="text"
                            aria-label="text primary button group"
                          >
                            {rows.isRead === "true" && (
                              <IconButton>
                                <DirectionsRailwayIcon />
                              </IconButton>
                            )}
                            {rows.isSnooze === "true" && (
                              <IconButton>
                                <WatchLaterIcon />
                              </IconButton>
                            )}
                            {rows.attechment && rows.attechment.length > 0 && (
                              <IconButton>
                                <AttachFileIcon />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={() => this.showIcon(otherProps.i)}
                              className="menu-icon"
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </ButtonGroup>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          }
        })}
        <Pagination
          ref={this.paginationRef}
          changeCurrentPage={this.onChangeCurrentPage}
        />
      </>
    );
  }
}

export default EmailsPage;
