import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BlockIcon from "@material-ui/icons/Block";
import { recievedrfpAction } from "../../_actions";
import { status } from "../../_constants";
import Loader from "../../_components/commonLoader";
import { commonFunctions } from "../../_utilities";

class ViewRecievedRfp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recievedData: {},
      comment: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(
      recievedrfpAction.getRecieveRFP({ id: this.props.match.params.id })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.recieved_rfp_status !== this.props.recieved_rfp_status &&
      this.props.recieved_rfp_status === status.SUCCESS
    ) {
      this.setState({
        recievedData: this.props.recieved_rfp_data,
      });
    }
    if (
      prevProps.add_recieved_rfp_status !==
        this.props.add_recieved_rfp_status &&
      this.props.add_recieved_rfp_status === status.SUCCESS
    ) {
      this.props.history.push(`/postlogin/frp/recivedrfp`);
    }
  }
  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addRecievedRfp = (status) => {
    const { comment } = this.state;
    if (comment && comment != "") {
      this.props.dispatch(
        recievedrfpAction.addRecieveRFP({
          id: this.props.match.params.id,
          status: status,
          comment: comment,
        })
      );
    } else {
      this.props.dispatch(
        recievedrfpAction.addRecieveRFP({
          id: this.props.match.params.id,
          status: status,
        })
      );
    }
  };

  onClickTrackRfp = () => {
    let url = this.props.match.params.url;
    this.props.history.push(
      `/postlogin/frp/${url}/trackrfp/${this.props.match.params.id}`
    );
  };

  render() {
    const { recievedData, comment } = this.state;
    return (
      <div className="main-content">
        <div className="recieved">
          <div className="recieved-content">
            <div className="recieved-heading">
              <h4>Recieved RFP</h4>
            </div>
            <div className="heading-content">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                  <span>status</span>
                  <Button variant="contained" className="pending-btn">
                    #pendding
                  </Button>
                  <Button
                    variant="contained"
                    className="waitingforapproval-btn"
                  >
                    #waitingforapproval
                  </Button>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="creation-box">
                    <span>
                      Creation Date
                      {new Date(recievedData.createdOn).toDateString()}
                    </span>
                  </div>
                  {/* <div className="creation-box">
                                    <span>Creation Date</span>
                                    {recievedData.createdOn && <span>{commonFunctions.convertDateToString(
                                        new Date(recievedData.createdOn))}</span>}
                                    </div> */}
                  <Button
                    variant="contained"
                    className="primary-btn track-btn float-right"
                    onClick={() => this.onClickTrackRfp()}
                  >
                    Track RFP
                  </Button>
                </div>
              </div>
            </div>
            <div className="recieved-body-content">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisitioner</label>
                    {recievedData.createdBy && (
                      <span>{recievedData.createdBy}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisition No.</label>
                    {recievedData.id && <span>{recievedData.id}</span>}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>priority</label>
                    <span>Normal</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Order Currency</label>
                    {recievedData.currency && (
                      <span>{recievedData.currency.countryCode}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Item</label>
                    <span>Servers</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Extra Budgetory</label>
                    <span>NO</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Department</label>
                    {recievedData.department && (
                      <span>{recievedData.department.name}</span>
                    )}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Item</label>
                    <span>Dell Leptop (sky blue)</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Purpose</label>
                    {recievedData.notes && <span>{recievedData.notes}</span>}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>CAAC Committee Report</label>
                    <span>not Requiried</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Location</label>
                    <span>Hyderabad </span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                  <div className="requisitioner-text">
                    <label>Requisition Type</label>
                    {recievedData.requisitionType && (
                      <span>{recievedData.requisitionType}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-optional-content">
              <h5>
                Comment <span>(optional)</span>
              </h5>
              <div className="content">
                <textarea
                  name="comment"
                  value={comment}
                  onChange={this.handleStateChange}
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                ></textarea>
              </div>
              <div className="content-buttons">
                <Button
                  variant="contained"
                  className="approve-btn"
                  onClick={() => this.addRecievedRfp("approve")}
                >
                  <CheckCircleIcon className="approve-icon" />
                  Approve
                </Button>
                <br />
                <Button
                  variant="contained"
                  className="decline-btn"
                  onClick={() => this.addRecievedRfp("decline")}
                >
                  <BlockIcon className="decline-icon" />
                  Decline
                </Button>
                <br />
                <Button
                  variant="contained"
                  className="approve-btn"
                  onClick={() => this.addRecievedRfp("holding")}
                >
                  <CheckCircleIcon className="approve-icon" />
                  Holding
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    recieved_rfp_status,
    recieved_rfp_data,
    add_recieved_rfp_status,
    recieved_rfp_res,
  } = state.procurement;
  return {
    recieved_rfp_status,
    recieved_rfp_data,
    add_recieved_rfp_status,
    recieved_rfp_res,
  };
};
export default connect(mapStateToProps)(ViewRecievedRfp);