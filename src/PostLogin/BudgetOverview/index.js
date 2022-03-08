import React, { Component } from "react";
import DateFormat from "../Dashbord/DateFormat";
import Button from "@material-ui/core/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { connect } from "react-redux";
import { status } from "../../_constants";
import { budgetActions } from "../../_actions";
import Pagination from "../../_components/Pagination";
// import { Link } from "react-router-dom";

class BudgetOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: [],
      perPageLimit: 3,
      currentPage: 0,
    };
    this.paginationRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(budgetActions.getBugetOverview());
  }

  componentDidUpdate(prevProps, prevState) {
    const { budget, perPageLimit, currentPage } = this.state;
    if (
      this.props.budget_overview_status !== prevProps.budget_overview_status &&
      this.props.budget_overview_status === status.SUCCESS
    ) {
      if (
        this.props.budget_overview_data &&
        this.props.budget_overview_data.length > 0
      ) {
        this.setState({ budget: this.props.budget_overview_data });
        let newData = this.props.budget_overview_data;
        let indexOfLastData = Math.ceil(newData.length / perPageLimit);
        this.paginationRef.current.setOptions({
          totalPages: indexOfLastData,
          perPageLimit,
          totalRecords: newData.length,
        });
      }
    }
  }

  onChangeCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };

  displayData = () => {
    const { budget, currentPage, perPageLimit } = this.state;
    let retData = [];
    for (let i = 0; i < budget.length; i++) {
      if (
        i >= currentPage * perPageLimit &&
        i <= currentPage * perPageLimit + (perPageLimit - 1)
      ) {
        let row = budget[i];
        retData.push(
          <div className='allocate-box' key={row[i]}>
            <div className='d-block allocate-heading'>
              <div className='row justify-content-between align-items-center'>
                <div className='col-md-9'>
                  <div className='d-flex justify-content-start align-items-center'>
                    <h4>{row.Department}</h4>
                    <div className='d-flex justify-content-center align-items-center graph-circle'>
                      <CircularProgressbar
                        value={row.UsedBudgetPercentage}
                        text={`${row.UsedBudgetPercentage}%`}
                        strokeWidth={15}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          trailColor: "#f0f0f0",
                          pathColor: "#6418c3",
                          textColor: "#202020",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='d-flex justify-content-end align-items-center'>
                    <a
                      href=''
                      className='primary-link'
                      onClick={() => {
                        this.props.history.push(
                          `/postlogin/budgetoverview/${row.BudgetId}`
                        );
                      }}>
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-block allocate-progress'>
              <div className='d-block impacted'>
                $ {row.UsedBudget} Impacted on $ {row.TotalBudget}
              </div>
              <div class='progress'>
                <div
                  class='progress-bar used'
                  role='progressbar'
                  style={{ width: `${row.UsedBudgetPercentage}%` }}
                  aria-valuenow={row.UsedBudgetPercentage}
                  aria-valuemin='0'
                  aria-valuemax='100'></div>
                <div
                  class='progress-bar commited'
                  role='progressbar'
                  style={{ width: `${row.CommitedBudgetPercentage}%` }}
                  aria-valuenow={row.CommitedBudgetPercentage}
                  aria-valuemin='75'
                  aria-valuemax='100'></div>
              </div>
            </div>
            <div className='d-flex justify-content-center align-items-center allocate-progress-prices'>
              <div className='price used'>
                <h5>Used</h5>
                <p>${row.UsedBudget}</p>
              </div>
              <div className='price commited'>
                <h5>Commited</h5>
                <p>${row.CommitedBudget}</p>
              </div>
              <div className='price avaliable'>
                <h5>Avaliable</h5>
                <p>${row.AvaliableBudget}</p>
              </div>
            </div>
          </div>
        );
      }
    }
    return retData;
  };

  render() {
    const { budget } = this.state;
    return (
      <div className='main-content'>
        <div className='budget-section'>
          <div className='budget-head-section'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                <div className='heading'>
                  <h3>Budget Overview</h3>
                  <span>Synectiks Budget FY 2021</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                <div className='calender float-left float-md-right mt-3 mt-md-0 '>
                  <DateFormat className='d-block' />
                </div>
              </div>
            </div>
          </div>
          <div className='budget-content-section'>
            <div className='d-flex justify-content-end align-items-center'>
              <Button
                variant='contained'
                className='primary-btn allocate-btn'
                onClick={() =>
                  this.props.history.push(`/postlogin/budgetallocation`)
                }>
                Budget Allocate
              </Button>
            </div>
            {this.displayData()}
          </div>
        </div>
        <Pagination
          ref={this.paginationRef}
          changeCurrentPage={this.onChangeCurrentPage}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { budget_overview_status, budget_overview_data } = state.procurement;
  return { budget_overview_status, budget_overview_data };
};
export default connect(mapStateToProps)(BudgetOverview);
