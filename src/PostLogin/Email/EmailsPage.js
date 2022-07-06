import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AttachFileIcon from '@material-ui/icons/AttachFile';

class EmailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: {},
      otherProps: {},
      createUrl: '',
    };
  }

  componentDidMount() {
    this.setState({ rows: this.props.row, otherProps: this.props.otherData });
  }
  componentDidUpdate(prevProps) {
    if (this.props.otherData !== prevProps.otherData) {
      for (let i = 0; i < this.props.otherData.length; i++) {
        this.rows[i].isChecked = false;
        this.row[i].showIcon = false;
      }
      this.setState({ rows: this.props.row, otherProps: this.props.otherData });
    }
  }
  handleUrl = () => {
    const { otherProps, rows } = this.state;
    otherProps.history.push(`/postlogin/email/${otherProps.searchEmail}/${otherProps.priorty}/${rows.id}`);
    if (rows.isRead === false) {
      let data = { id: rows.id, type: otherProps.searchEmail };
      this.props.handleMessageRead(data);
    }
  };
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

  render() {
    const { rows, otherProps } = this.state;
    return (
      <>
        {rows && rows.id && (
          <div key={rows.id} className="d-flex">
            <div className="user-id mr-3">
              <div className="check-box">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      color="primary"
                      checked={rows.isChecked}
                      onChange={(e) => this.hamndleSelect(e, otherProps.i)}
                    />
                  }
                />
              </div>
              <div className={`user-box ${rows.isStar === 'true' ? 'active' : ''}`}>
                <StarIcon />
              </div>
            </div>
            <div className="d-flex w-100 user-content">
              <div className="col-9 p-0" onClick={this.handleUrl} key={rows.body}>
                <div className="d-flex w-100">
                  <div className="user-img">
                    {' '}
                    {rows && rows.sender && rows.sender.profilePic && (
                      <img src={rows.sender.profilePic} alt="" height="50px" width="50px" />
                    )}
                  </div>
                  <div className="user-inner-content">
                    <span>
                      {rows.sender.email} {rows.time}
                    </span>
                    <h5>{rows.subject}</h5>
                    <p>{rows.body}</p>
                  </div>
                </div>
              </div>
              <div className="col-3 p-0">
                {!rows.showIcon && (
                  <div className="list-icon">
                    <IconButton onClick={() => this.showIcon(otherProps.i)} className="menu-icon">
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                )}
                {rows.showIcon && (
                  <ButtonGroup variant="text" aria-label="text primary button group">
                    {rows.isRead === 'true' && (
                      <IconButton>
                        <DirectionsRailwayIcon />
                      </IconButton>
                    )}
                    {rows.isSnooze === 'true' && (
                      <IconButton>
                        <WatchLaterIcon />
                      </IconButton>
                    )}
                    {rows.attechment && rows.attechment.length > 0 && (
                      <IconButton>
                        <AttachFileIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => this.showIcon(otherProps.i)} className="menu-icon">
                      <MoreVertIcon />
                    </IconButton>
                  </ButtonGroup>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default EmailsPage;
