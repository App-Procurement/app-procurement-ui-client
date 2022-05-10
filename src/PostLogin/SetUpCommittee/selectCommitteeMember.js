import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import { connect } from 'react-redux';
import { committeeAction } from '../../_actions';
import { status } from '../../_constants';
import { alert } from '../../_utilities';
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
class selectCommitteeMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeindex: null,
            committeeMember: [],
        }
    };

    componentDidMount() {
        this.props.dispatch(committeeAction.searchCommitteeMembers());
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.search_committee_status !== this.props.search_committee_status && this.props.search_committee_status === status.SUCCESS) {
            if (this.props.selected_member_list && this.props.selected_member_list.committeeMember && this.props.selected_member_list.committeeMember.length > 0) {
                let committeeMember = this.props.selected_member_list.committeeMember;
                this.setState({
                    committeeMember,
                    isLoading: false,
                });
            } else {
                let committee = this.props.searchCommittee;
                for (let i = 0; i < committee.length; i++) {
                    committee[i].isSelected = false;
                }
                this.setState({
                    committeeMember: committee,
                    isLoading: false,
                });
            }
        }
        console.log(prevProps.selected_member_list !== this.props.selected_member_list && this.props.selected_committee_status === status.SUCCESS)
        if (prevProps.selected_member_list !== this.props.selected_member_list && this.props.selected_committee_status === status.SUCCESS) {
            this.props.history.push('/postlogin/setupcommittee');
        }
    };

    handleClickMethod = () => {
        const { committeeMember } = this.state;
        let count = 0;
        for (let i = 0; i < committeeMember.length; i++) {
            if (committeeMember[i].isSelected) {
                count++;
            }
        }
        if (count > 0) {
            let sendData = {
                committeeMember,
                userid: 5,
            };
            this.props.dispatch(committeeAction.addSelectedMember(sendData))
        } else {
            alert.error("Please Select Committee Member");
        }
    };

    handleStateChange = (index, e) => {
        const { checked } = e.target;
        let { committeeMember } = this.state;
        committeeMember[index].isSelected = checked;
        this.setState({
            committeeMember,
        });
    };

    displayCommiteeLists = () => {
        let retData = [];
        const { activeindex, committeeMember } = this.state;
        console.log("row is here",committeeMember)
        for (let i = 0; i < committeeMember.length; i++) {
            let row = committeeMember[i];
           console.log("commitee row mambers",row)
            retData.push(
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={row.id}>
                    <div className="member-boxs">
                        <Card
                            className={
                                activeindex == i ? "members-box active" : "members-box"
                            }
                            onClick={() => this.setState({ activeindex: i })}
                        >
                            <div className="d-flex justify-content-center align-items-center user-img">
                                <div className="d-flex justify-content-center align-items-center image">
                                    {/* <img src={row.profileImage} alt="" /> */}
                                    <img id="profileImage" src={`data:image/jpeg;base64,${row.profileImage}`}></img>
                                </div>
                            </div>
                            <div className="requisition">
                                <Checkbox
                                    name="saveReq"
                                    color="primary"
                                    checked={row.isSelected}
                                    onChange={(e) => this.handleStateChange(i, e)}
                                />
                            </div>
                            <div className="member-details">
                                <ul>
                                    <li><b>{row.name}</b></li>
                                    <li><span>{row.position}</span></li>
                                    <li><p>{row.company}</p></li>
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
    }

    render() {
        const { isSubmitted } = this.state;
        return (
            <div className="main-content">
                <div className="setup-committee-section">
                    <div className="heading">
                        <div className="row">
                            <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-xs-12">
                                <div className="d-flex w-100 align-items-center">
                                    <IconButton className="head-icon">
                                        <KeyboardBackspaceIcon onClick={() => this.props.history.push(`/postlogin/setupcommittee`)} />
                                    </IconButton>
                                    <h4 className="d-inline-block">Select Committee Members</h4>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-12 text-right">
                                <Button
                                    variant="contained"
                                    className="primary-btn float-md-none float-left"
                                    disableElevation onClick={this.handleClickMethod}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="setup-committee-content">
                        <div className="membar-list">
                            <div className="row">
                                {this.displayCommiteeLists()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { search_committee_status, searchCommittee, selected_committee_status, selected_member_list } = state.procurement;
    return {
        search_committee_status,
        searchCommittee,
        selected_committee_status,
        selected_member_list
    };
}

const connectedSetUpCommittee = connect(mapStateToProps)(selectCommitteeMember);
export default (connectedSetUpCommittee);
