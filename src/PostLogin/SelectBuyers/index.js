import React, { Component } from "react";
import { Button, Card, IconButton, Checkbox } from "@mui/material";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "simplebar/dist/simplebar.min.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";
import { buyerAction, requistionAction } from "../../_actions";
import { status } from "../../_constants";
import { alert } from "../../_utilities";
import Loader from "../../_components/commonLoader";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

class SelectBuyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchval: "",
      approvedMemberList: [],
      duplicateData: [],
      displayOption: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(buyerAction.getBuyer());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.get_buyer_status !== this.props.get_buyer_status &&
      this.props.get_buyer_status === status.SUCCESS
    ) {
      if (
        this.props.selected_buyer_list &&
        this.props.selected_buyer_list.approvedMemberList &&
        this.props.selected_buyer_list.approvedMemberList.length > 0
      ) {
        if (this.props.selected_buyer_list.id === this.props.match.params.id) {
          this.setState({
            approvedMemberList: this.props.selected_buyer_list
              .approvedMemberList,
            duplicateData: this.props.selected_buyer_list.approvedMemberList,
            isLoading: false,
          });
        } else {
          this.setState({
            approvedMemberList: this.props.getBuyer,
            duplicateData: this.props.getBuyer,
            isLoading: false,
          });
        }
      } else {
        this.setState({
          approvedMemberList: this.props.getBuyer,
          duplicateData: this.props.getBuyer,
          isLoading: false,
        });
      }
    }
    if (
      prevProps.selected_buyer_list !== this.props.selected_buyer_list &&
      this.props.selected_buyer_status === status.SUCCESS
    ) {
      this.props.history.push(
        `/postlogin/viewdetails/${this.props.match.params.id}`
      );
    }
  }

  toggleDisplayOptions = () => {
    this.setState({ displayOption: !this.state.displayOption });
  };

  editContact = (id) => {};

  removeContact = (id, index) => {};

  displayApprovedMemberList = () => {
    const { approvedMemberList, activeindex, displayOption } = this.state;
    let retData = [];
    for (let i = 0; i < approvedMemberList.length; i++) {
      let row = approvedMemberList[i];
      retData.push(
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
          key={row.firstName}
        >
          <div className="member-boxs">
            <Card
              className={
                activeindex === i ? "members-box active" : "members-box"
              }
              onClick={() => this.setState({ activeindex: i })}
            >
              <div className="d-flex justify-content-center align-items-center user-img">
                <div className="d-flex justify-content-center align-items-center image">
                  <img src={row.profile} alt="" />
                  <div
                    className="member-position"
                    style={{ backgroundColor: `${row.shortNameColor}` }}
                  >
                    {row.firstName.match(/\b(\w)/g)}
                  </div>
                </div>
              </div>
              <div className="d-inline-block menu-icon">
                <IconButton aria-label="settings">
                  <MoreVertIcon
                    onClick={
                      i === activeindex ? this.toggleDisplayOptions : null
                    }
                  />
                </IconButton>
                <div className="settings-toggle">
                  {displayOption && i === activeindex ? (
                    <>
                      <span onClick={() => this.editContact(row.id)}>
                        <EditTwoToneIcon /> Edit
                      </span>
                      <span onClick={() => this.removeContact(row.id)}>
                        <HighlightOffIcon /> Delete
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="requisition">
                <Checkbox
                  name="saveReq"
                  color="primary"
                  checked={row.isSected}
                  onChange={(e) => this.handleStateChange(i, e)}
                />
              </div>
              <div className="member-details">
                <ul>
                  <li>
                    <b>{row.firstName}</b>
                  </li>
                  <li>
                    <span>{row.middleName}</span>
                  </li>
                  <li>
                    <p>{row.lastName}</p>
                  </li>
                </ul>
              </div>
              <div className="member-contact">
                <ul>
                  <li>
                    <Button className="icon-btn">
                      <CallIcon className="phone-icon" />
                    </Button>
                    <a href={`tel:${row.phoneNumber}`}>{row.phoneNumber}</a>
                  </li>
                  <li>
                    <Button className="icon-btn">
                      <MailIcon className="phone-icon" />
                    </Button>
                    <a href={`mailto: ${row.email}`}>{row.email}</a>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      );
    }
    return retData;
  };

  handleStateChange = (index, e) => {
    const { checked } = e.target;
    const { approvedMemberList } = this.state;
    approvedMemberList[index].isSected = checked;
    this.setState({
      approvedMemberList,
    });
  };

  setSelectedBuyer = () => {
    const { approvedMemberList } = this.state;
    let count = 0;
    for (let i = 0; i < approvedMemberList.length; i++) {
      if (approvedMemberList[i].isSected) {
        count++;
      }
    }
    if (count > 0) {
      let sendData = {
        approvedMemberList,
        id: this.props.match.params.id,
      };
      this.props.dispatch(requistionAction.changeAddBuyerState(sendData));
    } else {
      alert.error("Please Select Buyers");
    }
  };

  searchbuyer = (e) => {
    const { value } = e.target;
    const { duplicateData } = this.state;
    this.setState({
      searchval: value,
    });
    var queryResult = [];
    if (duplicateData && duplicateData.length > 0) {
      if (value.trim()) {
        for (let i = 0; i < duplicateData.length; i++) {
          let row = duplicateData[i];
          if (
            row["firstName"].toLowerCase().indexOf(value) !== -1 ||
            row["firstName"].indexOf(value) !== -1
          ) {
            queryResult.push(duplicateData[i]);
          }
        }
      } else {
        queryResult = duplicateData;
      }
      this.setState({
        approvedMemberList: queryResult,
      });
    }
  };

  render() {
    const { isLoading, searchval } = this.state;
    return (
      <>
        {!isLoading && (
          <div className="main-content">
            <div className="select-buyers-content">
              <div className="buyers-head">
                <div className="row justify-content-center align-items-center">
                  <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="heading">
                      <h4>Select Buyers</h4>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="head-right justify-content-end align-items-center">
                      <div className="search-bar">
                        <div className="form-group">
                          <input
                            type="text"
                            value={searchval}
                            name="searchval"
                            onChange={this.searchbuyer}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Search here"
                          />
                          <button>
                            <SearchIcon />
                          </button>
                        </div>
                      </div>
                      <div className="social-buttom">
                        <ul>
                          <li className="last">
                            <Button
                              variant="contained"
                              onClick={this.setSelectedBuyer}
                              className="add-buyres-btn"
                            >
                              <PersonAddIcon className="user-icon" />
                              Add Buyres
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="membar-list">
                <div className="row">{this.displayApprovedMemberList()}</div>
              </div>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    selected_buyer_list,
    selected_buyer_status,
    get_buyer_status,
    getBuyer,
  } = state.procurement;
  return {
    get_buyer_status,
    getBuyer,
    selected_buyer_list,
    selected_buyer_status,
  };
}

const connectedSelectBuyers = connect(mapStateToProps)(SelectBuyers);

export default connectedSelectBuyers;
