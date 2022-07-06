import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Cell, Pie, PieChart } from 'recharts';

class StatictisRFP extends Component {
  constructor() {
    super();
    this.state = {
      staticData: [
        { COLORS: '#6418c3', value: 40, title: 'Total RFP' },
        { COLORS: '#5ecfff', value: 11, title: 'Today RFP' },
        { COLORS: '#e328af', value: 33, title: 'In Progress' },
        { COLORS: '#38e25d', value: 21, title: 'Approved RFP' },
        { COLORS: '#ff4a55', value: 36, title: 'Rejected RFP' },
      ],
    };
  }
  render() {
    const { staticData } = this.state;
    return (
      <div className="d-block statictis-box">
        <div className="d-flex w-100 justify-content-between align-items-center heading">
          <h5>{this.props.t('RFP Statictis')}</h5>
          <Button className="primary-btn">Check All</Button>
        </div>
        <div className="d-flex w-100 justify-content-center align-items-center pie-chart">
          <PieChart height={240} width={400}>
            <Pie data={staticData} innerRadius={70} outerRadius={120} dataKey={staticData.value}>
              {staticData.map((element) => (
                <Cell key={element.value} fill={element.COLORS} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="d-flex w-100 justify-content-center align-items-top">
          <ul className="d-flex w-100 justify-content-center align-items-top p-0 m-0">
            {staticData.map((data) => {
              return (
                <li className="d-inline-block text-center static-data" key={data.title}>
                  <span style={{ backgroundColor: `${data.COLORS}` }}></span>
                  <strong>{data.value}</strong>
                  <p>{data.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default StatictisRFP;
