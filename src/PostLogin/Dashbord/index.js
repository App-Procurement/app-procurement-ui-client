import React, { Component } from "react";
import {
  LinearProgress,
  IconButton,
  Box,
} from "@mui/material";
import moment from "moment";
import DateFormat from "./DateFormat";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ColorizeIcon from "@mui/icons-material/Colorize";
import AmountIcon from "../../assets/images/amount-icon.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import "react-circular-progressbar/dist/styles.css";
import { connect } from "react-redux";
import { homeAction, invoiceAction } from "../../_actions";
import { status } from "../../_constants";
import ActivityFeeds from "./ActivityFeeds";
import TopSellers from "./TopSellers";
import { withTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment,
      dashboardData: {},
      data: [],
      startDate: new Date(),
      endDate: new Date(),
      checkedA: true,
      checkedB: true,
      invoices: [],
      lineData: {
        labels: ["", "", "", "", ""],
        datasets: [
          {
            fill: false,
            borderColor: "#9b51e0",
            cubicInterpolationMode: "monotone",
            tension: 0.4,
            pointRadius: 0,
            data: [10, 400, 700, 200, 300, 10],
          },
        ],
      },
      lineOptions: {
        plugins: {
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
            },
          },
          tooltips: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
      purchaseOrderLine: {
        total: null,
        labels: [
          "Tech",
          "operations",
          "Sanitations",
          "office supplies",
          "marketing",
          "Tech",
          "operations",
          "Sanitations",
          "office supplies",
          "marketing",
        ],
        datasets: [
          {
            data: [210, 600, 600, 500, 100, 300, 800, 900, 400],
            lineTension: 0.2,
            backgroundColor: ["#b792d1", "#b792d1", "#4f0a80", "#b792d1"],
          },
        ],
      },
      purchaseOrderLineOptions: {
        plugins: {
          scales: {
            y: {
              ticks: {
                fontColor: "black",
                stepSize: 10,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
            x: {
              ticks: {
                fontColor: "black",
                display: false,
                stepSize: 10,
              },
              gridLines: {
                display: false,
              },
            },
          },
          legend: {
            display: false,
          },
          responsive: true,
        },
      },
      PieChartEmailData: [
        { COLORS: "#5dbafb", value: 321, title: "Todays RFP", per: 11 },
        { COLORS: "#44d7b6", value: 69, title: "In Progress", per: 22 },
        { COLORS: "#dd8aff", value: 154, title: "Completed ", per: 15 },
        { COLORS: "#ffb833", value: 154, title: "Completed ", per: 15 },
        { COLORS: "#6418c3", value: 696, title: "Approved ", per: 25 },
      ],
      spendAnalysis: {
        total: null,
        labels: [
          "Tech",
          "operations",
          "Sanitations",
          "office supplies",
          "marketing",
        ],
        datasets: [
          {
            data: [210, 600, 600, 500, 100],
            lineTension: 0.2,
            backgroundColor: ["#b792d1", "#b792d1", "#4f0a80", "#b792d1"],
          },
        ],
      },
      spendAnalysisOptions: {
        indexAxis: "y",
        plugins: {
          scales: {
            y: {
              ticks: {
                fontColor: "black",
                stepSize: 10,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
            x: {
              ticks: {
                fontColor: "black",
                display: false,
                stepSize: 10,
              },
              gridLines: {
                display: false,
              },
            },
          },
          legend: {
            display: false,
          },
          responsive: true,
        },
      },
      requisitionStatusData: {
        labels: ["Active RFP", "Approve RFP", "Reject RFP"],
        datasets: [
          {
            data: [103, 27, 22],
            backgroundColor: ["#4f0a80", "#1fad96", "#f2b40a"],
          },
        ],
      },
      requisitionStatusOptions: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
            display: true,
            position: "bottom",
            responsive: true,
            align: "middle",
          },
        },
      },
      purchaseOrder: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Active",
            fill: false,
            borderColor: "#4f0f7a",
            cubicInterpolationMode: "monotone",
            tension: 0.3,
            pointRadius: 0,
            data: [80, 120, 110, 150, 160, 90, 70, 50, 160, 100, 120, 70],
          },
          {
            label: "Approved",
            fill: false,
            borderColor: "#0f7a6f",
            cubicInterpolationMode: "monotone",
            tension: 0.3,
            pointRadius: 0,
            data: [50, 80, 90, 100, 80, 40, 60, 70, 80, 60, 40, 90],
          },
          {
            label: "Settled",
            fill: false,
            borderColor: "#ac9dc4",
            cubicInterpolationMode: "monotone",
            tension: 0.3,
            pointRadius: 0,
            data: [10, 20, 10, 50, 60, 40, 70, 20, 60, 70, 40, 70],
          },
        ],
      },
      purchaseOrderOptions: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
        },
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(homeAction.Dashboarddata());
    this.props.dispatch(invoiceAction.searchInvoice());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.get_dashboard_data_status !==
        prevProps.get_dashboard_data_status &&
      this.props.get_dashboard_data_status === status.SUCCESS
    ) {
      if (this.props.dashboarddata) {
        this.setState({
          dashboardData: this.props.dashboarddata,
          data: this.props.dashboarddata.requisitionChart,
        });
      }
    }
    if (
      prevProps.search_invoice_status !== this.props.search_invoice_status &&
      this.props.search_invoice_status === status.SUCCESS
    ) {
      if (
        this.props.search_invoice_data &&
        this.props.search_invoice_data.length > 0
      ) {
        this.setState({
          invoices: this.props.search_invoice_data,
        });
      }
    }
  }

  displayInvoice = () => {
    const { invoices } = this.state;
    let invoiceData = [];
    if (invoices && invoices.length > 0) {
      for (let i = 0; i < invoices.length; i++) {
        let element = invoices[i];
        invoiceData.push(
          <div
            className="d-flex justify-content-center align-items-center pb-3"
            key={element.id}
          >
            <div className="col-xl-5 col-lg-5 col-md-5 col-5 px-0">
              <div className="payment">
                <div className="graphic" />
                <div className="payment-content">
                  <a href="#foo">&#35;{element.RequisitionsNo}</a>
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
              <div className="timing"></div>
            </div>
          </div>
        );
      }
    }
    return invoiceData;
  };

  onChangeData = (value, value1) => {
    this.setState({
      endDate: value,
      startDate: value1,
    });
  };

  handleUrls = (url, type) => {
    if (type) {
      this.props.history.push(`${url}/${type}`);
    } else {
      this.props.history.push(`${url}`);
    }
  };

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
  };

  onClickCreateNewRequester = (id) => {
    this.props.history.push(`/postlogin/requestforpurpose/newrequest`);
  };

  render() {
    const {
      dashboardData,
      lineData,
      purchaseOrderLine,
      purchaseOrderLineOptions,
      lineOptions,
      spendAnalysis,
      spendAnalysisOptions,
      requisitionStatusData,
      requisitionStatusOptions,
      purchaseOrder,
      purchaseOrderOptions,
    } = this.state;
    const { Requisitions } = dashboardData;
    const { t } = this.props;

    return (
      <div className="main-content">
        <div className="dashbord-content">
          <div className="dashbord-top-section">
            <div className="row justify-content-center align-items-center">
              <div className="col-xl-8 col-lg-7 col-md-6 col-sm-6 col-xs-12">
                <div className="heading">
                  <h3>{this.props.t("Dashboard")}</h3>
                  <span>Hello, James, Welcome to Synectiks</span>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6 col-xs-12">
                <div className="calender">
                  <DateFormat className="d-block" />
                </div>
              </div>
            </div>
          </div>
          {dashboardData && Requisitions && (
            <div className="progress-rfp-boxs">
              <div className="row">
                <div
                  key={Requisitions.purchase.id}
                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2"
                  onClick={() =>
                    this.handleUrls(`/postlogin/purchaserequisition`, "")
                  }
                >
                  <div className="progress-box">
                    <div className="progress-content">
                      <div className="title">Purchase Requistion</div>
                      {Requisitions && Requisitions.purchase && (
                        <h4>{Requisitions.purchase.val}</h4>
                      )}
                      <div className="progres-bar-text">
                        <span className="purchase_requistion-box">&#8605;</span>
                        <p>&#43; 14 &#37; Last Month</p>
                      </div>
                    </div>
                    <div className="purchased-image">
                      <CircularProgressbar
                        value={66}
                        text={`+74%`}
                        strokeWidth={15}
                        styles={buildStyles({
                          strokeLinecap: {},
                          trailColor: "#E5E7E9",
                          pathColor: "#38cb89",
                          textColor: "black",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div
                  key={Requisitions.approve.id}
                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2"
                  onClick={() =>
                    this.handleUrls(`/postlogin/purchaseorder`, "")
                  }
                >
                  <div className="progress-box">
                    <div className="progress-content">
                      <div className="title">Purchase Order</div>
                      {Requisitions && Requisitions.approve && (
                        <h4>{Requisitions.approve.val}</h4>
                      )}
                      <div className="progres-bar-text">
                        <span className="purchase-order-box">&#8605;</span>
                        <p>&#43; 14 &#37; Last Month</p>
                      </div>
                    </div>
                    <div className="purchased-image approved">
                      <CircularProgressbar
                        value={66}
                        text={`+74%`}
                        strokeWidth={15}
                        styles={buildStyles({
                          strokeLinecap: {},
                          trailColor: "#E5E7E9",
                          pathColor: "#ffa600",
                          textColor: "black",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div
                  key={Requisitions.pending.id}
                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2"
                >
                  <div className="progress-box">
                    <div className="progress-content">
                      <div className="title">Budget</div>
                      {Requisitions && Requisitions.pending && (
                        <h4>{Requisitions.pending.val}</h4>
                      )}
                      <div className="progres-bar-text">
                        <span className="budget-box">&#8605;</span>
                        <p>&#43; 14 &#37; Last Month</p>
                      </div>
                    </div>
                    <div className="purchased-image pending">
                      <CircularProgressbar
                        value={66}
                        text={`+74%`}
                        strokeWidth={15}
                        styles={buildStyles({
                          strokeLinecap: {},
                          trailColor: "#E5E7E9",
                          pathColor: "#ff5630",
                          textColor: "black",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div
                  key={Requisitions.rejected.id}
                  className="col-xl-3 col-lg-6 col-md-6 col-sm-6 pr-lg-2"
                >
                  <div className="progress-box">
                    <div className="progress-content">
                      <div className="title">Report</div>
                      {Requisitions && Requisitions.rejected && (
                        <h4>{Requisitions.rejected.val}</h4>
                      )}
                      <div className="progres-bar-text">
                        <span className="purchase_requistion-box">&#8605;</span>
                        <p>&#43; 39&#8228;69 &#37;</p>
                      </div>
                    </div>
                    <div className="graph-chart">
                      <div className="invoice">
                        <Line
                          data={lineData}
                          options={lineOptions}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="progress-categories-section">
            <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12">
                <div className="statistics-requisitions-chart">
                  <div className="requisitions-chart-header">
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-lg-6">
                        <div className="header-left">
                          <h4>Spend Analysis</h4>
                          <span>Top Spending categories</span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="header-right"></div>
                      </div>
                    </div>
                  </div>
                  <SimpleBar
                    style={{ maxHeight: "400px" }}
                    className="user-content"
                  >
                    <div className="chartbar-content">
                      <Bar
                        data={spendAnalysis}
                        options={spendAnalysisOptions}
                        height={110}
                      />
                    </div>
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                <div className="email-categories">
                  <div className="purchase-order-head">
                    <h4>Requistion Status</h4>
                    <div className="dropdown-menu">
                      <select name="" className="approved-dropdown">
                        <option value="Month">Month</option>
                        <option value="Month">January</option>
                        <option value="Month">February</option>
                        <option value="Month">March</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-content">
                    <div className="chart-box">
                      <Pie
                        data={requisitionStatusData}
                        options={requisitionStatusOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="purchase-order-section">
            <div className="row">
              <div className="col-12">
                <div className="purchase-order-head">
                  <h5>Purchase Order</h5>
                  <div className="dropdown-menu">
                    <select name="" className="approved-dropdown">
                      <option value="Month">Month</option>
                      <option value="Month">January</option>
                      <option value="Month">February</option>
                      <option value="Month">March</option>
                    </select>
                  </div>
                </div>
                <div className="line-graph-text">
                  <ul>
                    <li>
                      <h4 className="active">3254</h4>
                      <span>Active</span>
                    </li>
                    <li>
                      <h4 className="approved">251</h4>
                      <span>Approved</span>
                    </li>
                    <li>
                      <h4 className="settled">320</h4>
                      <span>Settled</span>
                    </li>
                  </ul>
                </div>
                <div className="line-graph-content">
                  <Line
                    data={purchaseOrder}
                    options={purchaseOrderOptions}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="recent-requisition-section">
            <div className="row">
              <div className="col-xl-6 col-md-6 col-12">
                <ActivityFeeds t={t} />
              </div>
              <div className="col-xl-6 col-md-6 col-12">
                <div className="deliveries-transit">
                  <div className="deliveries-transit-head">
                    <h5>Deliveries in transit</h5>
                  </div>
                  <SimpleBar className="deliveries-transit-inner">
                    <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                      <div className="order-id">
                        <label>Order Id: 4523451</label>
                        <i className="far fa-ellipsis-h"></i>
                      </div>
                      <LinearProgress variant="determinate" value={50} />
                      <div className="order-time">
                        <span>14:45 AM,July 03</span>
                        <span>14:45 AM,July 03</span>
                      </div>
                      <div className="order-id mb-0">
                        <label>New york USA</label>
                        <label>New york USA</label>
                      </div>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                      <div className="order-id">
                        <label>Order Id: 4523451</label>
                        <i className="far fa-ellipsis-h"></i>
                      </div>
                      <LinearProgress variant="determinate" value={80} />
                      <div className="order-time">
                        <span>14:45 AM,July 03</span>
                        <span>14:45 AM,July 03</span>
                      </div>
                      <div className="order-id mb-0">
                        <label>New york USA</label>
                        <label>New york USA</label>
                      </div>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                      <div className="order-id">
                        <label>Order Id: 4523451</label>
                        <i className="far fa-ellipsis-h"></i>
                      </div>
                      <LinearProgress variant="determinate" value={40} />
                      <div className="order-time">
                        <span>14:45 AM,July 03</span>
                        <span>14:45 AM,July 03</span>
                      </div>
                      <div className="order-id mb-0">
                        <label>New york USA</label>
                        <label>New york USA</label>
                      </div>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} className="deliveries-box">
                      <div className="order-id">
                        <label>Order Id: 4523451</label>
                        <i className="far fa-ellipsis-h"></i>
                      </div>
                      <LinearProgress variant="determinate" value={40} />
                      <div className="order-time">
                        <span>14:45 AM,July 03</span>
                        <span>14:45 AM,July 03</span>
                      </div>
                      <div className="order-id mb-0">
                        <label>New york USA</label>
                        <label>New york USA</label>
                      </div>
                    </Box>
                  </SimpleBar>
                </div>
              </div>
            </div>
          </div>
          <div className="top-seller-section">
            <div className="row">
              <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12">
                <div className="statistics-requisitions-chart">
                  <div className="requisitions-chart-header">
                    <h4>Spend Analysis</h4>
                    <div className="dropdown-menu">
                      <select name="" className="approved-dropdown">
                        <option value="Year">2022</option>
                        <option value="Year">2023</option>
                        <option value="Year">2024</option>
                        <option value="Year">2025</option>
                      </select>
                    </div>
                  </div>
                  <SimpleBar
                    style={{ maxHeight: "500px" }}
                    className="user-content"
                  >
                    <div className="chartbar-content">
                      <Bar
                        data={purchaseOrderLine}
                        options={purchaseOrderLineOptions}
                      />
                    </div>
                  </SimpleBar>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                <TopSellers t={t} />
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
    get_dashboard_data_status,
    dashboarddata,
    search_invoice_status,
    search_invoice_data,
  } = state.procurement;
  return {
    get_dashboard_data_status,
    dashboarddata,
    search_invoice_status,
    search_invoice_data,
  };
};

const connectedDeshboard = withTranslation()(
  connect(mapStateToProps)(Dashbord)
);

export default connectedDeshboard;
