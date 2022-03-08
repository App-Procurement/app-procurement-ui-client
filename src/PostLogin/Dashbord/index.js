import React, { Component } from "react";
import moment from 'moment';
import DateFormat from './DateFormat';
import RecentEmails from './RecentEmails';
import MostTagUsed from './MostTagUsed';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, } from "recharts";
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { createStyles, withStyles } from '@material-ui/core/styles';
import { LineChart, Line } from 'recharts';
import LinearProgress from '@material-ui/core/LinearProgress';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import CollectionsIcon from '@material-ui/icons/Collections';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ColorizeIcon from '@material-ui/icons/Colorize';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AddIcon from '@material-ui/icons/Add';
import EmailIcon from '@material-ui/icons/Email';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AmountIcon from '../../assets/images/amount-icon.png';
import rfpImg from '../../assets/images/rfp-img.png';
import spend from '../../assets/images/spend.png';
import Approval1 from '../../assets/images/dashbord/approval1.png';
import Approval2 from '../../assets/images/dashbord/approval2.png';
import Approval3 from '../../assets/images/dashbord/approval3.png';
import EmailBackground from '../../assets/images/dashbord/email-background.png';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import "react-circular-progressbar/dist/styles.css";
import { connect } from 'react-redux';
import { contactAction, homeAction, invoiceAction } from "../../_actions";
import { status } from "../../_constants";
import RecentActivity from './RecentActivity'
import Requisition from './Requisition'
import StatictisRFP from "./StatictisRFP";
import BudgetOverview from "./BudgetOverview";

class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment,
      dashboardData: {},
      data: [],
      lineData: [
        {
          name: "",
          pv: 10
        },
        {
          name: "Sun",
          pv: 400
        },
        {
          name: "Mon",
          pv: 700
        },
        {
          name: "Tue",
          pv: 200
        },
        {
          name: "Wed",
          pv: 300
        },
        {
          name: "Thu",
          pv: 500
        },
        {
          name: "Fri",
          pv: 800
        },
        {
          name: "Sat",
          pv: 300
        },
        {
          name: "",
          pv: 10
        },
      ],
      lineCharData: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'blue',
          tension: 0.1
        }],

      },
      secondLineChart: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{
          label: '46 Eemail',
          borderColor: 'blue',
        }],
      },
      startDate: new Date(),
      endDate: new Date(),
      checkedA: true,
      checkedB: true,
      invoices: [],
      PieChartEmailData: [
        { COLORS: '#0088FE', value: 763, title: 'Total RFP', per: 27 },
        { COLORS: '#00C49F', value: 321, title: 'Todays RFP', per: 11 },
        { COLORS: '#FFBB28', value: 69, title: 'In Progress', per: 22 },
        { COLORS: '#FF8042', value: 154, title: 'Completed ', per: 15 },
        { COLORS: 'blue', value: 696, title: 'Approved ', per: 25 },
      ],
      statisticsData: [
        { name: 'Production Parts', value: 81, trailColor: "rgba(241, 231, 254, 1)", pathColor: "blue" },
        { name: 'Appliances', value: 44, trailColor: "rgba(241, 231, 254, 1)", pathColor: "rgba(154, 18, 179, 1)" },
        { name: 'It & Telecom', value: 75, trailColor: "rgba(241, 231, 254, 1)", pathColor: "DodgerBlue" },
        { name: 'Office Equipments', value: 70, trailColor: "rgba(241, 231, 254, 1)", pathColor: "Tomato" },
        { name: 'Marketing', value: 22, trailColor: "rgba(241, 231, 254, 1)", pathColor: "Orange" },
        { name: 'Educational Supplies', value: 62, trailColor: "rgba(241, 231, 254, 1)", pathColor: "DodgerBlue" },
      ],
      pinnedEmailsData: [
        {
          title: "New RFP for our department",
          des: "Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker",
          img: Approval1,
        },
        {
          title: "Need approval for the quotation",
          des: "Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker",
          img: Approval2,
        },
        {
          title: "Please release the quotation amount",
          des: "Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker",
          img: Approval3,
        },
      ],
      contactsData: [],
      contLimt: 5
    };
  }

  componentDidMount() {
    this.props.dispatch(contactAction.fetchContactList());
    this.props.dispatch(homeAction.Dashboarddata());
    this.props.dispatch(invoiceAction.searchInvoice());

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.get_contact_status !== this.props.get_contact_status && this.props.get_contact_status === status.SUCCESS) {
      if (this.props.getContact && this.props.getContact.length > 0) {
        this.setState({
          contactsData: this.props.getContact,
        });
      }
    }
    if (this.props.get_dashboard_data_status !== prevProps.get_dashboard_data_status &&
      this.props.get_dashboard_data_status === status.SUCCESS) {
      if (this.props.dashboarddata) {
        this.setState({
          dashboardData: this.props.dashboarddata,
          data: this.props.dashboarddata.requisitionChart
        });
      }
    }
    if (prevProps.search_invoice_status !== this.props.search_invoice_status && this.props.search_invoice_status === status.SUCCESS) {
      if (this.props.search_invoice_data && this.props.search_invoice_data.length > 0) {
        this.setState({
          invoices: this.props.search_invoice_data,
        })
      }
    }
  }

  displayInvoice = () => {
    const { invoices } = this.state;
    let invoiceData = [];
    if (invoices && invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        let element = invoices[i];
        let time = element.RequestDate.split('T');
        invoiceData.push(
          <div className="d-flex justify-content-center align-items-center pb-3" key={element.RequisitionsNo}>
            <div className="col-xl-5 col-lg-5 col-md-5 col-5 px-0">
              <div className="payment">
                <div className="graphic" ></div>
                <div className="payment-content">
                  <a href="#">&#35;{element.RequisitionsNo}</a>
                  <p>{element.RequestDepartment}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-4">
              <div className="payment-amount">
                <div className="image">
                  <img src={AmountIcon} alt="" />
                </div>
                <div className="amount-content">
                  <p>Amount</p>
                  <span>&#36;{element.RequisitionsTotal}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-3 px-0 text-right">
              <div className="timing">
                <span>{time[0]}</span>
              </div>
            </div>
          </div>
        )
      }
    }
    return invoiceData
  }

  onChangeData = (value, value1) => {
    this.setState({
      endDate: value,
      startDate: value1
    })
  }

  displayContactData = () => {
    const { contactsData, contLimt } = this.state;
    let retData = [];
    for (let i = 0; i < contactsData.length; i++) {
      let element = contactsData[i]
      if (i < contLimt) {
        retData.push(
          <div className="user-content" key={element.name}>
            <div className="d-inline-block user-img">
              <img src={element.profile} alt="" />
            </div>
            <div className="d-inline-block user-position">
              <p>{element.name}</p>
              <span>{element.email}</span>
            </div>
            <div className="d-inline-block mail-icon disabled">
              <IconButton className="d-inline-block mail-icon disabled">
                <EmailIcon />
              </IconButton>
            </div>
          </div>
        )
      }
    }
    return retData;
  }

  displayStatisticsData = () => {
    const { statisticsData } = this.state;
    let retData = [];
    if (statisticsData) {
      for (let i = 0; i < statisticsData.length; i++) {
        let data = statisticsData[i];
        retData.push(
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6" key={data.name}>
            <div className="production-progress">
              <CircularProgressbar
                value={data.value}
                text={`${data.value}%`}
                strokeWidth={20}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  trailColor: data.trailColor,
                  pathColor: data.pathColor,
                  textColor: "black"
                })}
              />
              <p>{data.name}</p>
            </div>
          </div>
        );
      }
    }
    return retData;
  }

  handleUrls = (url, type) => {
    if (type) {
      this.props.history.push(`${url}/${type}`)
    }
    else {
      this.props.history.push(`${url}`)
    }
  }

  displayPinedEmail = () => {
    const { pinnedEmailsData } = this.state;
    let pinData = [];
    if (pinnedEmailsData) {
      for (let i = 0; i < pinnedEmailsData.length; i++) {
        let pin = pinnedEmailsData[i];
        pinData.push(
          <li key={pin.title}>
            <div className="user-id">
              <img src={pin.img} alt="" />
            </div>
            <div className="user-content">
              <div className="row">
                <div className="col-10">
                  <span>{pin.title}</span>
                  <p>{pin.des}</p>
                </div>
                <div className="col-2">
                  <IconButton className="contect-btn">
                    <ColorizeIcon className="social-icon" />
                  </IconButton>
                </div>
              </div>
            </div>
          </li>
        );
      }
    }
    return pinData;
  }
  render() {
    const { lineData, data, invoices, PieChartEmailData, contactsData, dashboardData } = this.state;
    const BorderLinearProgress = withStyles((theme) =>
      createStyles({
        root: {
          height: 10,
          borderRadius: 5,
        },
        colorPrimary: {
          backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
          borderRadius: 5,
          backgroundImage: 'linear-gradient(to right, #6418c3 , #9f19c5)',
        },
      }),

    )(LinearProgress);
    return (
      <div className="main-content">
        <div className="dashbord-top-section">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4">
              <div className="heading">
                <h3>Dashbord</h3>
                <span>Lorem ipsum dolor sit amet</span>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row justify-content-center align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-lg-2">
                  <div className="search-bar">
                    <div className="form-group">
                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search here" />
                      <button><i className="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-lg-2">
                  <div className="calender">
                    <DateFormat className="d-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {dashboardData &&
          <div className="progress-rfp-boxs">
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2" onClick={() => this.handleUrls(`/postlogin/frp`, "todayfrp")}>
                <div className="progress-box">
                  <div className="progress-img">
                    <img src={rfpImg} alt="" />
                  </div>
                  <div className="progress-content" >
                    {dashboardData.todayRFP && <h3>{dashboardData.todayRFP}</h3>}
                    <span>Today's RFP</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2 pl-lg-2" onClick={() => this.handleUrls(`/postlogin/frp`, 'totalfrp')}>
                <div className="progress-box">
                  <div className="progress-img">
                    <img src={rfpImg} alt="" />
                  </div>
                  <div className="progress-content">
                    {dashboardData.totalRFP && <h3>{dashboardData.totalRFP}</h3>}
                    <span>Total RFP</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2 pl-lg-2" onClick={() => this.handleUrls(`/postlogin/frp`, 'rejectedrfp')}>
                <div className="progress-box">
                  <div className="progress-img">
                    <img src={rfpImg} alt="" />
                  </div>
                  <div className="progress-content">
                    {dashboardData.totalRFP && <h3>{dashboardData.totalRFP}</h3>}
                    <span>Rejected RFP</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pl-lg-2" onClick={() => this.handleUrls('/postlogin/email/inbox', `important`)}>
                <div className="progress-box">
                  <div className="progress-img">
                    <div className="mail-icon"><i className="fa fa-envelope"></i></div>
                    <span>&#33;</span>
                  </div>
                  <div className="progress-content">
                    <h3>35</h3>
                    <span>Important Emails</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2 pt-3">
                <div className="progress-box">
                  <div className="progress-img order">
                    <div className="in-progress"></div>
                    <div className="complate-progress"></div>
                  </div>
                  <div className="progress-content">
                    <div className="completed">
                      {dashboardData.completeOrder && <h5>{dashboardData.completeOrder}</h5>}
                      <span>Completed Orders</span>
                    </div>
                    <div className="in-progrss">
                      {dashboardData.inprogressOrder && <h5>{dashboardData.inprogressOrder}</h5>}
                      <span>In-progrss Orders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="recent-requisition-section">
          <div className="row">
            <div className="col-xl-7 col-md-7 col-12">
              <RecentActivity />
            </div>
            <div className="col-xl-5 col-md-5 col-12">
              <Requisition />
            </div>
          </div>
        </div>
        <div className="average-section">
          <div className="row">
            {dashboardData &&
              <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 pr-lg-2">
                <div className="average-left">
                  <div className="average-form">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-lg-7 col-md-7 col-sm-7">
                        <div className="total-spend">
                          <div className="spend-img">
                            <img src={spend} alt="" />
                          </div>
                          <div className="spend-content">
                            <span>Total Spend</span>
                            {dashboardData.totalspent && <h4>${dashboardData.totalspent}</h4>}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5">
                        <div className="last-month">
                          <span>Average form last month</span>
                          <p> <strong><TrendingUpIcon />  &#43; 0&#44; 5&#37; </strong> increase</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="requisition-section">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-lg-2">
                        <div className="Requisition-box">
                          <div className="Requisition-content">
                            <span className="d-block">Pendding Requisition</span>
                            {dashboardData.requisitionPendding && <h4>{dashboardData.requisitionPendding}</h4>}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-lg-2">
                        <div className="Requisition-box">
                          <div className="Requisition-content">
                            <span className="d-block">Invoices</span>
                            {dashboardData.invoices && <h4>{dashboardData.invoices}</h4>}
                          </div>
                          <div className="invoices-img">
                            <img src={invoices} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-lg-2">
                        <div className="Requisition-box">
                          <div className="Requisition-content">
                            <span>Total PO&#39;s</span>
                            {dashboardData.totalPO && <h4>{dashboardData.totalPO}</h4>}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-lg-2">
                        <div className="Requisition-box">
                          <div className="Requisition-content">
                            <span>Pendding PO&#39;s</span>
                          </div>
                          <div className="d-block pendding-progress">
                            <BorderLinearProgress variant="determinate" value={(dashboardData.totalPO / dashboardData.penddingPo) * 100} className="" />
                            {dashboardData.penddingPo && <h4>{dashboardData.penddingPo}</h4>}
                            <div className="last-month">
                              <p> <strong>&#8722; 0&#44; 8&#37; </strong> From last month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 pl-lg-2">
              <div className="average-right">
                <div className="statistics-graph">
                  <div className="requistions-heading">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 ">
                        <h5 className="d-block">Requistions Spend Overview</h5>
                        <div className="totalpaid">
                          <div className="paid-content">
                            <span>Total Paid</span>
                            <label>1,567</label>
                          </div>
                          <div className="paid-content unpaid">
                            <span>Total Unpaid</span>
                            <label>569</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="requistions-dropdown">
                          <div className="opensens-dropdown">
                            <FormControl className="opensens-content">
                              <NativeSelect>
                                <option value="">Monthly</option>
                                <option value={10}>abc</option>
                                <option value={20}>def</option>
                                <option value={30}>abc</option>
                              </NativeSelect>
                            </FormControl>
                            <IconButton className="meore-menu-icon">
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                          <div className="requistions-checkbox">
                            <label>Number</label>
                            <Switch
                              size="small"
                              color="primary"
                              name="checkedB"
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <label>Analytics</label>
                            <Switch
                              size="small"
                              color="primary"
                              name="checkedB"
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SimpleBar style={{ maxHeight: '300px' }} className="user-content">
                    <div className="chartbar-content">
                      <BarChart
                        width={550}
                        height={255}
                        data={data}
                        margin={{
                          right: 30,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis tickCount={6} />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Bar dataKey="TotalUnpaid" fill="#8884d8" />
                        <Bar dataKey="TotalPaid" fill="#82ca9d" />
                      </BarChart>
                    </div>
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="latest-invoices-secton">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pr-lg-2">
              <div className="production-progress-left">
                <div className="row justify-content-center align-items-center pb-3">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="heading">Statistics</div>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-12">
                    <div className="show-value">
                      <ul>
                        <li className="frist">
                          <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <label>Chart</label>
                        </li>
                        <li>
                          <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'seco ndary checkbox' }}
                          />
                          <label>Show Value</label>
                        </li>
                      </ul>
                      <IconButton className="more-menu-icon">
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.displayStatisticsData()}
                </div>
              </div>
            </div>
            {/* <LatestPayment /> */}
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pl-lg-2">
              <div className="production-progress-right">
                <div className="heading">
                  Latest Invoice Payment
                  <IconButton className="meore-menu-icon">
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <div className="payment-update">
                  <SimpleBar className="invoice">
                    <div className="invoice-inner">
                      {this.displayInvoice()}
                    </div>
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cenversation-sectin">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pr-lg-2">
              <div className="cenversation-left">
                <div className="image"><img src={EmailBackground} alt="" /></div>
                <div className="cenversation-content">
                  {dashboardData && dashboardData.email && <h2>{dashboardData.email}</h2>}
                  <b className="d-block">Total emails that you have</b>
                  <span className="d-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  </span>
                  <div className="compose-btn">
                    <Button variant="contained" className="compose-email">&#43; Compose Email</Button>
                    <Button variant="contained" className="compose-email inbox-btn">Go To inbox</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pl-lg-2">
              <div className="cenversation-right">
                <div className="pagemaker-heading">
                  <h5>Conversation Statistics</h5>
                  <div className="conversation-btn">
                    <Button variant="outlined" className="report-btn"><SystemUpdateAltIcon />Save Reports</Button>
                  </div>
                </div>
                <div className="cenversation-content">
                  <span>software like Aldus PageMaker including versions.</span>
                  <div className="graph-chart">
                    <SimpleBar className="invoice">
                      <LineChart width={480} height={225} data={lineData}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={6} />
                        <XAxis dataKey="name" />
                      </LineChart>
                    </SimpleBar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-section">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 pr-lg-2">
              <div className="contact-left">
                <div className="row justify-content-center align-items-center">
                  <div className="col-9">
                    <div className="heading">
                      <h4>Contacts</h4>
                      <span>You have <strong>{contactsData.length}</strong> contacts</span>
                    </div>
                  </div>
                  <div className="col-3 text-right">
                    <IconButton className="contect-btn">
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="contect-list">
                  {this.displayContactData()}
                  <div className="view-btn">
                    <Button variant="contained" className="view-more">View More</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 pl-lg-2">
              <RecentEmails />
            </div>
          </div>
        </div>
        <div className="progress-categories-section">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 pr-lg-2">
              <MostTagUsed />
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 pr-lg-2 pl-lg-2">
              <div className="email-categories">
                <h4>Email Categories</h4>
                <span>Lorem ipsum dolor sit amet</span>
                <div className="chart-content">
                  <ResponsiveContainer height={200} width={200}>
                    <PieChart height={200} width={200}>
                      <Pie
                        data={PieChartEmailData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {PieChartEmailData.map((element) => (
                          <Cell key={element.value} fill={element.COLORS} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="chart-details">
                    <ul style={{ listStyle: 'none' }}>
                      {PieChartEmailData.map(element => (
                        <li style={{ display: 'block', alignItems: 'center' }} key={element.title}><div style={{ backgroundColor: element.COLORS, height: 15, width: 15, borderRadius: 5, display: 'inline-block', marginRight: '10px', marginTop: '-2px', verticalAlign: 'middle' }} />{element.title}({element.per}%) <span><b>{element.value}</b></span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 pl-lg-2">
              <div className="pinned-emails">
                <div className="heading">
                  <h5>Pinned Emails</h5>
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <Button variant="outlined" className="report-btn">View More <ArrowRightIcon /></Button>
                <div className="publishing">
                  <div className="d-block heading">
                    <span>Please review the Quotation</span>
                    <IconButton className="contect-btn">
                      <ColorizeIcon className="social-icon" />
                    </IconButton>
                  </div>
                  <p>Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker</p>
                  <div className="publish-btn">
                    <Button variant="outlined" className="cover-preview-btn"><InsertDriveFileIcon className="social-icon" />Master_file.fig</Button>
                    <Button variant="outlined" className="cover-preview-btn"><CollectionsIcon className="social-icon" />CoverPreview.jpg</Button>
                    <Button variant="outlined" className="cover-preview-btn file-moe active">4 files more</Button>
                  </div>
                </div>
                <div className="publish-content">
                  <SimpleBar style={{ maxHeight: '225px' }}>
                    <ul>
                      {this.displayPinedEmail()}
                    </ul>
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="budget-statictis-section">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 pr-lg-2">
              <BudgetOverview />
            </div>
            <div className="col-xl-5 col-lg-7 col-md-7 col-sm-12 pl-lg-2">
              <StatictisRFP />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { get_contact_status, getContact, get_dashboard_data_status, dashboarddata, search_invoice_status, search_invoice_data } = state.procurement;

  return {
    get_contact_status,
    getContact,
    get_dashboard_data_status,
    dashboarddata,
    search_invoice_status,
    search_invoice_data
  }
}

export default connect(mapStateToProps)(Dashbord);
