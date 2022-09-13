import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { commonFunctions } from "../../_utilities/commonFunctions";
import purchaseOrder from "../../assets/images/dashbord/purchase-order.png";
import approvedRequisitionIcon from "../../assets/images/dashbord/approved-requisition-icon.png";
import pendingRequisitionIcon from "../../assets/images/dashbord/pending-requisition-icon.png";
import rejectedRequisitionIcon from "../../assets/images/dashbord/rejected-requisition-icon.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import UserImg1 from "../../assets/images/request/user-img1.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { BudgetAction } from "../../_actions";
import MulticolorProgress from "../../_components/MulticolorProgress";

class Budgets extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      activeindex: 0,
      requiData: {
        budgetType: 10,
        status: "",
        reqno: "",
        depart: "",
        ViewDetail: false,
        selectBuyer: false,
        budgetData: {},
        activeStatus: -1,
        status: false,
      },

      tableData: [],
      uploadedFileList: [],
      selectedFile: {},
      readings: [
        {
          value: 35,
          color: "#6418c3",
        },
        {
          value: 35,
          color: "#f2c94c",
        },
        {
          value: 30,
          color: "#ff0000",
        },
      ],
    };
    this.inputOpenFileRef = React.createRef();
  }

  handleStateChange = (e) => {
    const { name, value } = e.target;
    const { requiData } = this.state;
    requiData[name] = value;
    this.setState({
      requiData,
    });
  };
  componentDidMount() {
    this.props.dispatch(BudgetAction.getBudgetData());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_budget_status, budget_data } = this.props;
    if (
      get_budget_status !== prevProps.get_budget_status &&
      get_budget_status === status.SUCCESS
    ) {
      if (
        this.props.budget_data &&
        Object.keys(this.props.budget_data).length > 0
      ) {
        this.setState({ budgetData: { ...this.props.budget_data } });
      }
    }
  }

  //function for count percentage
  budgetPercentage = (totalBudget, spend) => {
    const total = Math.floor((spend / totalBudget) * 100);
    return total;
  };

  render() {
    const { requiData, budgetData } = this.state;

    return (
      <div className="main-content">
        <div className="budget-page-content">
          <div className="budget-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-form-button">
                <div className="budget-head-left">
                  <h4>{t("Budgets")}</h4>
                  <p>Synectiks Budget FY 2022</p>
                </div>
              </div>
              <div className=" col-sm-12 col-md-8 col-lg-8 col-xl-8 col-form-button">
                <div className="budget-head-right">
                  <div className="search-bar">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Search Budget"
                        onChange={this.onSearchChange}
                      />
                      <button>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                  <FormControl className="new-budget-btn">
                    <Select
                      id="demo-simple-select"
                      name="budgetType"
                      value={requiData.budgetType}
                      onChange={(e) => this.handleStateChange(e)}
                    >
                      <MenuItem value={10}>New Budget</MenuItem>
                      <MenuItem value={20}>Create New</MenuItem>
                      <MenuItem value={30}>Import Budget </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-rfp-boxs">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">All Request</div>
                    {budgetData?.budgetHead ? (
                      <>
                        <h4>{budgetData.budgetHead.allRequest}</h4>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="purchased-image">
                    <img src={purchaseOrder} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Approved Request</div>
                    {budgetData?.budgetHead ? (
                      <>
                        <h4>{budgetData.budgetHead.approvedRequest}</h4>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="purchased-image approved">
                    <img src={approvedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 ">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Pendding Request</div>
                    {budgetData?.budgetHead ? (
                      <>
                        <h4>{budgetData.budgetHead.pendingRequest}</h4>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="purchased-image pending">
                    <img src={pendingRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
                <div className="progress-box">
                  <div className="progress-content">
                    <div className="title">Rejected Request</div>
                    {budgetData?.budgetHead ? (
                      <>
                        <h4>{budgetData.budgetHead.rejectedRequest}</h4>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="purchased-image rejected">
                    <img src={rejectedRequisitionIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="budget-allocation-contant">
            <div className="row">
              <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="budget-allocation-left">
                  <div className="heading">Budget Allocation</div>
                  <div className="budget-allocation-inner-contant">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-7">
                        {budgetData?.budgetAllocation?.totalBudget &&
                        budgetData?.budgetAllocation?.spend ? (
                          <div className="budget-progress-bar">
                            <CircularProgressbar
                              value={this.budgetPercentage(
                                budgetData.budgetAllocation.totalBudget,
                                budgetData.budgetAllocation.totalBudget -
                                  budgetData.budgetAllocation.spend
                              )}
                              text={`${this.budgetPercentage(
                                budgetData.budgetAllocation.totalBudget,
                                budgetData.budgetAllocation.totalBudget -
                                  budgetData.budgetAllocation.spend
                              )} %`}
                              strokeWidth={15}
                              styles={buildStyles({
                                strokeLinecap: {},
                                trailColor: "#E5E7E9",
                                pathColor: "#6418c3",
                                textColor: "black",
                              })}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-5">
                        <div className="budget-progress-contant">
                          <ul>
                            <li>
                              <p>Total Budget</p>
                              {budgetData?.budgetAllocation ? (
                                <span>
                                  &#65284;
                                  {budgetData.budgetAllocation.totalBudget}
                                </span>
                              ) : (
                                <></>
                              )}
                            </li>
                            <li className="active">
                              <p>Spend</p>
                              {budgetData?.budgetAllocation ? (
                                <span>
                                  &#65284;{budgetData.budgetAllocation.spend}
                                </span>
                              ) : (
                                <></>
                              )}
                            </li>
                            <li>
                              <p>Remaining</p>
                              {budgetData?.budgetAllocation ? (
                                <span>
                                  &#65284;
                                  {budgetData.budgetAllocation.totalBudget -
                                    budgetData.budgetAllocation.spend}
                                </span>
                              ) : (
                                // </>
                                <></>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="recent-transaction-right">
                  <div className="heading">
                    <h5>Recent Transaction</h5>
                    <div className="head-link">
                      <Link to={`#`}>See all</Link>
                    </div>
                  </div>
                  <div className="form-table budget-group-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Transact by</th>
                          <th>Amount</th>
                          <th>Merchent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budgetData?.recentTransaction ? (
                          budgetData.recentTransaction.map((data) => (
                            <tr>
                              <td>
                                <span>
                                  <div className="d-inline-block user-image">
                                    <img src={UserImg1} alt="" />
                                  </div>
                                  {data.transactBy}
                                </span>
                              </td>
                              <td>
                                <span>&#65284;{data.amount}</span>
                              </td>
                              <td>
                                <span>{data.merchant}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <></>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="department-approver-progress">
            <div className="row">
              <div className="col-xl-6 col-md-6 col-12">
                <div className="deliveries-transit">
                  <div className="deliveries-transit-head">
                    <h5>Department Spend</h5>
                    <div className="head-link">
                      <Link to="#">See all</Link>
                    </div>
                  </div>
                  <SimpleBar className="deliveries-transit-inner">
                    {status && budgetData?.departmentSpend ? (
                      budgetData.departmentSpend.map((data) => (
                        <div className="deliveries-box">
                          <div className="order-id">
                            <label>{data.name}</label>
                            <p>&#65284;{data.amount}</p>
                          </div>
                          <LinearProgress variant="determinate" value={50} />
                          <div className="order-time">
                            <span>
                              {commonFunctions.dateTimeAndYear(data.date)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-12">
                <div className="deliveries-transit">
                  <div className="deliveries-transit-head">
                    <h5>Approver Spend</h5>
                    <div className="head-link">
                      <Link to={`#`}>See all</Link>
                    </div>
                  </div>
                  <SimpleBar className="deliveries-transit-inner">
                    {budgetData?.approvalSpend ? (
                      budgetData.departmentSpend.map((data) => (
                        <div className="deliveries-box">
                          <div className="order-id">
                            <label>{data.name}</label>
                            <p>&#65284;{data.amount}</p>
                          </div>
                          <LinearProgress variant="determinate" value={50} />
                          <div className="order-time">
                            <span>
                              {commonFunctions.dateTimeAndYear(data.date)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
          <div className="active-projects-section">
            <div className="heading">
              <h5>Active Project</h5>
            </div>
            <div className="form-table budget-group-table">
              <table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>End Date</th>
                    <th>Esteemited duration</th>
                    <th>progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData?.activeProject ? (
                    <>
                      {budgetData.activeProject.map((data) => (
                        <tr>
                          <td>
                            <span>{data.projectName}</span>
                          </td>
                          <td>
                            <span>
                              {commonFunctions.timeStampMonthAndYear(
                                data.endDate
                              )}
                            </span>
                          </td>
                          <td>
                            <span>
                              {commonFunctions.estimatedMonth(
                                data.estimatedDuration
                              )}
                            </span>
                          </td>
                          <td>
                            <span>
                              { <LinearProgress
                                variant="determinate"
                                value={data.progress}
                              />
                              }
                              {/* <MulticolorProgress
                                readings={this.state.readings}
                              /> */}
                            </span>
                          </td>
                          <td>
                            <span>
                              <Button className="active-btn">
                                {data.status}
                              </Button>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { get_budget_status, budget_data } = state.procurement;
  return { get_budget_status, budget_data };
};

const budgetsComponet = withTranslation()(connect(mapStateToProps)(Budgets));
export default budgetsComponet;
