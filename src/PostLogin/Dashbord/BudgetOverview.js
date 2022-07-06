import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { t } from 'i18next';

class BudgetOverview extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="d-block budget-overview-box">
        <div className="d-flex w-100 justify-content-between align-items-center heading">
          <h5>{t('Budget Overview')}</h5>
          <div className="d-inline-block">
            <div className="d-inline-block grow-text">
              <TrendingUpIcon /> +16,5%
            </div>
            <Button className="primary-btn">{t('Week')}</Button>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-center align-items-center heading"></div>
      </div>
    );
  }
}
export default BudgetOverview;
