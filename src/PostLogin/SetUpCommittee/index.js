import React, { Component } from "react";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { connect } from 'react-redux';
import { committeeAction } from '../../_actions';
import { status } from '../../_constants';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
class SetUpCommittee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requiData: {
                status: ""
            },
            activeindex: null,
            committeeMember: [],
            comitteeType: [],
            deletePopup: null,
            displayOption: false
        }
    };

    componentDidMount() {
        this.props.dispatch(committeeAction.getCommitteeType());
        if (this.props.selected_member_list && this.props.selected_member_list.committeeMember && this.props.selected_member_list.committeeMember.length > 0) {
            this.setState({
                committeeMember: this.props.selected_member_list.committeeMember,
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.selected_committee_status !== this.props.selected_committee_status && this.props.selected_committee_status === status.SUCCESS) || (prevProps.selected_member_list !== this.props.selected_member_list && this.props.selected_committee_status === status.SUCCESS)) {
            this.setState({
                committeeMember: this.props.selected_member_list.committeeMember,
            });
        }
        if (prevProps.get_committee_type_status !== this.props.get_committee_type_status && this.props.get_committee_type_status === status.SUCCESS) {
            if (this.props.getCommitteeType) {
                this.setState({
                    comitteeType: this.props.getCommitteeType,
                })
            }
        }
        if (prevProps.add_committee_status !== this.props.add_committee_status && this.props.add_committee_status === status.SUCCESS) {
            let sendData = {
                committeeMember: [],
                userid: 5,
            };
            this.props.dispatch(committeeAction.addSelectedMember(sendData));
        }
    };

    handleStateChange = (e) => {
        const { name, value } = e.target;
        const { requiData } = this.state;
        requiData[name] = value;
        this.setState({
            requiData,
        });
    };

    handleClickMethod = () => {
        this.props.history.push("/postlogin/selectecommittee");
    };

    validate = (isSubmitted) => {
        const validObj = {
            isValid: true,
            message: ""
        };
        let isValid = true;
        const retData = {
            status: validObj,
            reqno: validObj,
            depart: validObj,
            isValid
        };
        if (isSubmitted) {
            const { requiData } = this.state;
            if (!requiData.status) {
                retData.status = {
                    isValid: false,
                    message: "Filter By Status is required"
                };
                isValid = false;
            }
        }
        retData.isValid = isValid;
        return retData;
    };

    onClickShowDeletePopup = () => {
        this.setState({ displayOption: !this.state.displayOption })
    }

    onClickCommitteeItemDelete = (i) => {
        let { committeeMember } = this.state;
        committeeMember[i].isSelected = false;
        let sendData = {
            committeeMember: this.state.committeeMember,
            userid: 5,
        };
        this.props.dispatch(committeeAction.addSelectedMember(sendData))
        this.setState({ displayOption: !this.state.displayOption })
    };

    toggleDisplayOptions = () => {
        this.setState({ displayOption: !this.state.displayOption });
    };

    displayCommiteeLists = () => {
        let retData = [];
        const { activeindex, deletePopup, committeeMember, displayOption } = this.state;
        for (let i = 0; i < committeeMember.length; i++) {
            let row = committeeMember[i];
            if (row.isSelected == true) {
                retData.push(
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" key={row.id}>
                        <div className="member-boxs">
                            <Card className={
                                activeindex == i ? "members-box active" : "members-box"
                            } onClick={() => this.setState({ activeindex: i })}>
                                <div className="d-inline-block menu-icon" style={{ display: "flex" }}>
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon
                                            onClick={this.toggleDisplayOptions}
                                        />
                                    </IconButton>
                                    <div className="settings-toggle">
                                        {displayOption && i === activeindex ? (
                                            <span onClick={(id) => this.onClickCommitteeItemDelete(i)}>
                                                <HighlightOffIcon /> Delete
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center user-img">
                                    <div className="d-flex justify-content-center align-items-center image">
                                        <img src={row.profile} width='50px' height="50px" alt="" />
                                    </div>
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
                                            <Button className="icon-btn"><CallIcon className="phone-icon" /></Button>
                                            <a href={`tel:${row.contNo}`}>{row.contNo}</a>
                                        </li>
                                        <li>
                                            <Button className="icon-btn"><MailIcon className="phone-icon" /></Button>
                                            <a href={`mailto: ${row.email}`}>{row.email}</a>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    </div>
                );
            }
        }
        return retData;
    }

    displayCommitee = () => {
        const { comitteeType } = this.state;
        let retoption = [];
        if (comitteeType && comitteeType.length > 0) {
            for (let i = 0; i < comitteeType.length; i++) {
                retoption.push(
                    <option value={comitteeType[i].id}>{comitteeType[i].name}</option>
                );
            }
        }
        return retoption;
    }

    addCommitteeMember = () => {
        const { committeeMember } = this.state;
        let selectedMember = [];
        if (committeeMember && committeeMember.length > 0) {
            for (let i = 0; i < committeeMember.length; i++) {
                if (committeeMember[i].isSelected == true) {
                    selectedMember.push(committeeMember[i].id);
                }
            }
        }
        if (selectedMember.length > 0) {
            let sendData = {
                selectedMember,
                userid: 5,
            }
            this.props.dispatch(committeeAction.addCommittee(sendData));
        }
    }

    render() {
        const { requiData, committeeMember } = this.state;
        return (
            <div className="main-content">
                <div className="setup-committee-section">
                    <div className="d-flex w-100 align-items-center heading">
                        <h4 className="d-inline-block">SetUp Committee</h4>
                    </div>
                    <div className="setup-committee-content">
                        <div className="add-members">
                            <div className="form-group row col-form-group">
                                <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                                    Select Committee Type
                                </label>
                                <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                                    <FormControl className="select-menu">
                                        <NativeSelect name="status" value={requiData.status}
                                            onChange={this.handleStateChange} >
                                            <option value="">-Select-</option>
                                            {this.displayCommitee()}
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="form-group row col-form-group">
                                <label className="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label">
                                    Add Committee Members
                                </label>
                                <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10 col-form-field">
                                    <Button variant="contained" className="primary-btn" disableElevation onClick={this.handleClickMethod}>
                                        <AddCircleIcon className="plus-icon" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {committeeMember && committeeMember.length > 0 &&
                            <div className="pt-4 select-members">
                                <div className="mb-4 heading">
                                    <h5>Selected Committee Members</h5>
                                </div>
                                <div className="membar-list">
                                    <div className="row">
                                        {this.displayCommiteeLists()}
                                    </div>
                                </div>
                                <div className="d-block text-center committee-btn">
                                    <Button variant="contained" className="primary-btn" onClick={this.addCommitteeMember}>
                                        <i className="fas fa-paper-plane"></i>
                                        Save &#38; Send Invites
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { addCommittee, add_committee_status, selected_committee_status, selected_member_list, get_committee_type_status, getCommitteeType } = state.procurement;
    return {
        add_committee_status,
        addCommittee,
        selected_committee_status,
        selected_member_list,
        get_committee_type_status,
        getCommitteeType
    };
}

const connectedSetUpCommittee = connect(mapStateToProps)(SetUpCommittee);
export default (connectedSetUpCommittee);
