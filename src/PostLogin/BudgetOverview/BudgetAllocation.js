import { Button, FormControl, NativeSelect } from "@material-ui/core";
import React, { Component } from "react";
import { DatePicker } from "@y0c/react-datepicker";
import isValid from "date-fns/isValid";
import { connect } from "react-redux";
import { budgetActions } from "../../_actions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { status } from "../../_constants";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class BudgetAllocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: "",
      employee: "",
      financialYear: "",
      amount: "",
      priorty: "",
      issuedOn: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.budgetAllocation_status !==
        this.props.budgetAllocation_status &&
      this.props.budgetAllocation_status === status.SUCCESS
    ) {
      this.props.history.push("/postlogin/budgetoverview");
    }
  }
  onchaneHandeler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onchangeDate = (value) => {
    this.setState({ issuedOn: value });
  };

  submitForm = (e) => {
    const { employee, financialYear, amount, priorty, issuedOn, isSubmitted } =
      this.state;
    // e.preventDefault()
    this.setState({ isSubmitted: true });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const sendData = {
        employee: employee,
        financialYear: financialYear,
        amount: amount,
        priorty: priorty,
        issuedOn: issuedOn,
      };
      this.props.dispatch(budgetActions.sendBudghetAllocation(sendData));
    }
  };
  validate = (isSubmited) => {
    const { employee, financialYear, amount, priorty, issuedOn } = this.state;
    let validObj = {
      isValid: "",
      message: "",
    };
    const retData = {
      employee: validObj,
      financialYear: validObj,
      amount: validObj,
      priorty: validObj,
      issuedOn: validObj,
      isValid: true,
    };
    let isValid = true;
    if (isSubmited) {
      if (!employee) {
        retData.employee = {
          isValid: false,
          message: "Employee is required",
        };
        isValid = false;
      }
      if (!financialYear) {
        retData.f = {
          isValid: false,
          message: "FinancialYear is required",
        };
        isValid = false;
      }

      if (!amount) {
        retData.amount = {
          isValid: false,
          message: "Amount is required",
        };
        isValid = false;
      }

      if (!priorty) {
        retData.priorty = {
          isValid: false,
          message: "Priorty is required",
        };
        isValid = false;
      }

      if (!issuedOn) {
        retData.issuedOn = {
          isValid: false,
          message: "IssuedOn is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  cancelBudgetAllocation = (e) => {
    e.preventDefault();
    this.props.history.push("/postlogin/budgetoverview");
  };

  render() {
    const { employee, financialYear, amount, priorty, issuedOn, isSubmitted } =
      this.state;
    const errorMessage = this.validate(isSubmitted);
    return (
      <div className='main-content'>
        <div className='budget-allocation-section'>
          <div className='budget-allocation-content'>
            <div className='d-flex w-100 heading'>
              <IconButton
                className='head-icon'
                onClick={this.cancelBudgetAllocation}>
                <KeyboardBackspaceIcon />
              </IconButton>
              <h4 className='d-inline-block'>Budget Allocation</h4>
            </div>
            <div className='budget-allocation-filter'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                  <div className='requisition-form-left'>
                    <div className='requester'>
                      <div className='form-group'>
                        <label>employee</label>
                        <input
                          type='text'
                          name='employee'
                          value={employee}
                          placeholder='PSDS Admin'
                          onChange={this.onchaneHandeler}
                        />
                        {errorMessage &&
                          errorMessage.employee &&
                          errorMessage.employee.message && (
                            <span className='text-danger'>
                              {errorMessage.employee.message}{" "}
                            </span>
                          )}
                      </div>
                      <div className='form-group'>
                        <label>Fincacial Year</label>
                        <FormControl className='select-menu'>
                          <NativeSelect
                            name='financialYear'
                            value={financialYear}
                            onChange={this.onchaneHandeler}>
                            <option value={2021}>2021</option>
                            <option value={2022}>2022</option>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                          </NativeSelect>
                        </FormControl>
                        {errorMessage &&
                          errorMessage.financialYear &&
                          errorMessage.financialYear.message && (
                            <span className='text-danger'>
                              {errorMessage.financialYear.message}{" "}
                            </span>
                          )}
                      </div>

                      <div className='form-group'>
                        <label>amount</label>
                        <input
                          type='number'
                          name='amount'
                          placeholder='0000000000'
                          value={amount}
                          onChange={this.onchaneHandeler}
                        />
                        {errorMessage &&
                          errorMessage.amount &&
                          errorMessage.amount.message && (
                            <span className='text-danger'>
                              {errorMessage.amount.message}{" "}
                            </span>
                          )}
                      </div>
                      <div className='form-group'>
                        <label>priorty</label>
                        <FormControl className='select-menu'>
                          <NativeSelect
                            name='priorty'
                            value={priorty}
                            onChange={this.onchaneHandeler}>
                            <option>--select--</option>
                            <option value={1}>Norm</option>
                            <option value={2}>not-norm</option>
                          </NativeSelect>
                        </FormControl>
                        {errorMessage &&
                          errorMessage.priorty &&
                          errorMessage.priorty.message && (
                            <span className='text-danger'>
                              {errorMessage.priorty.message}{" "}
                            </span>
                          )}
                      </div>

                      <div className='form-group'>
                        <label>Issued On</label>
                        <FormControl className='select-menu'>
                          <DatePicker
                            name='issuedOn'
                            value={issuedOn}
                            onChange={this.onchangeDate}
                            // isvalid={errorData.brithDate.isValid}
                            placeholder='DD/MM/YYYY'
                          />
                        </FormControl>
                        {errorMessage &&
                          errorMessage.issuedOn &&
                          errorMessage.issuedOn.message && (
                            <span className='text-danger'>
                              {errorMessage.issuedOn.message}{" "}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className='budget-allocation-button'>
                      <Button
                        variant='contained'
                        className='primary-btn approve-button'
                        disableElevation
                        onClick={this.submitForm}>
                        <CheckCircleIcon className='approve-icon' />
                        Approve
                      </Button>
                      <Button
                        variant='contained'
                        className='cancel-button'
                        onClick={this.cancelBudgetAllocation}>
                        <NotInterestedIcon className='cancel-icon' />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { budgetAllocation_status, budgetAllocation_data } = state.procurement;
  return {
    budgetAllocation_status,
    budgetAllocation_data,
  };
};

export default connect(mapStateToProps)(BudgetAllocation);
