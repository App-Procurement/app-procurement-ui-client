import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'rc-calendar/assets/index.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import Table from '../../Table/Table';
import { connect } from 'react-redux';
import { purchaseOrderAction } from '../../_actions';
import { status } from '../../_constants';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { commonFunctions } from '../../_utilities/commonFunctions';
import PdfIcon from '../../assets/images/request/pdf-icon.png';
import UserImg1 from '../../assets/images/request/user-img1.png';
import UserImg2 from '../../assets/images/request/user-img2.png';
import UserImg3 from '../../assets/images/request/user-img3.png';
import UserImg4 from '../../assets/images/request/user-img4.png';
import UserImg5 from '../../assets/images/request/user-img5.png';
import UserImg6 from '../../assets/images/request/user-img6.png';
import UserImg7 from '../../assets/images/request/user-img7.png';
import UserImg8 from '../../assets/images/request/user-img8.png';
import UserImg9 from '../../assets/images/request/user-img9.png';
import UserImg10 from '../../assets/images/request/user-img10.png';
import UserImg11 from '../../assets/images/request/user-img11.png';
import UserImg12 from '../../assets/images/request/user-img12.png';
import UserImg13 from '../../assets/images/request/user-img13.png';

class Request extends Component {
  inputOpenFileRef;
  constructor(props) {
    super(props);
    this.state = {
      activeindex: 0,
      requiData: {
        status: '',
        reqno: '',
        depart: '',
        ViewDetail: false,
        selectBuyer: false,
      },
      formData: {
        dueDate: 'yyyy-mm-dd',
        deliveryDate: 'yyyy-mm-dd',
        location: '',
        Department: '',
        Request: '',
        Note: '',
      },
      columns: [
        {
          label: 'Name',
          key: 'sno',
          renderCallback: (value, index) => {
            return (
              <td key={index}>
                <span className={'s-no'}>{index + 1}</span>
              </td>
            );
          },
        },
        {
          label: 'Category',
          key: 'createdBy',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'requisitions-no'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'supplier',
          key: 'location',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'department-value'}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Quantity',
          key: 'supplier',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'department-value'}>{value.name}</span>
              </td>
            );
          },
        },
        {
          label: 'Unit',
          key: 'totalPrice',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className={'requestor'}>${value}</span>
              </td>
            );
          },
        },
        {
          label: 'Price',
          key: 'createdOn',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <span className="department-value">{commonFunctions.convertDateToString(new Date(value))}</span>
              </td>
            );
          },
        },
        {
          label: 'Total Cost',
          key: 'status',
          renderCallback: (value) => {
            return (
              <td key={`${Math.random()}_${value}`}>
                <Button variant="outlined" className="department-value status-btn ">
                  {value}
                </Button>
              </td>
            );
          },
        },
        // {
        //   label: 'Edit',
        //   key: 'id',
        //   renderCallback: (value) => {
        //     return (
        //       <td key={`${Math.random()}_${value}`}>
        //         <Link to={`/postlogin/purchaseorder/${value}`}>View Details</Link>
        //       </td>
        //     );
        //   },
        // },
      ],
      tableData: [],
      entireData: {},
      uploadedFileList: [],
      selectedFile: {},
      activeKey: 0,
    };
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.approvepo_data) {
      this.setState({
        entireData: this.props.approvepo_data,
        tableData: this.props.approvepo_data.requisitionList,
      });
    } else {
      this.props.dispatch(purchaseOrderAction.searchApprovePurchaseOrder());
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.approvepo_status !== this.props.approvepo_status && this.props.approvepo_status === status.SUCCESS) {
      if (this.props.approvepo_data && this.props.approvepo_data.requisitionList) {
        this.setState({
          entireData: this.props.approvepo_data,
          tableData: this.props.approvepo_data.requisitionList,
        });
      }
    }
  }

  onClickCreateNewRequester = (id) => {
    this.props.history.push(`/postlogin/requestforpurpose/newrequest`);
  };
  handelKey = (type) => {
    this.setState({ activeKey: type });
  };

  render() {
    const { columns, tableData, entireData, activeKey } = this.state;
    return (
      <div className="main-content">
        <div className="request-page-content">
          <div className="request-head">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-form-button">
                <div className="request-purpose-head-left">
                  <h3>{t('Request')}</h3>
                </div>
              </div>
            </div >
          </div >
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="request-content-left">
                <div className="request-overview">
                  <div className="request-overview-head">
                    <h4>Request No. #49</h4>
                    <Button
                      variant="contained" className="group-btn green-btn" disableElevation>
                      #Approve
                    </Button>
                    <Button
                      variant="contained" className="group-btn blue-btn" disableElevation>
                      #Unpaid
                    </Button>
                    <Button
                      variant="contained" className="group-btn yellow-btn" disableElevation>
                      #Undelivered
                    </Button>
                  </div>
                  <div className="request-overview-tabs">
                    <ul>
                      <li onClick={() => this.handelKey(0)} className={activeKey === 0 ? 'active' : ''}>Request Overview</li>
                      <li onClick={() => this.handelKey(1)} className={activeKey === 1 ? 'active' : ''}>Attachments</li>
                      <li onClick={() => this.handelKey(2)} className={activeKey === 2 ? 'active' : ''}>Comments</li>
                      <li onClick={() => this.handelKey(3)} className={activeKey === 3 ? 'active' : ''}>Supplier Info</li>
                      <li onClick={() => this.handelKey(4)} className={activeKey === 4 ? 'active' : ''}>Activity Logs</li>
                    </ul>
                  </div>
                </div>
                {activeKey === 0 &&
                  <div className='overview-tabs-contant active'>
                    <div className="requestor-details">
                      <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Requestor Name</label>
                            <span>James Hartper</span>
                            <p>Jamesharper@example.com</p>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Location</label>
                            <span> Newyork,USA</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Delivery Date</label>
                            <span>10/08/20222</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Creation Date</label>
                            <span>02/08/2022</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Request Type</label>
                            <span>product</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Department</label>
                            <span>IT Team</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Item </label>
                            <span>43 Hp Laptops</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Final Approver</label>
                            <span>John Smith</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom"></div>
                      <div className="requestor-bottom-content">
                        <p>Total Request Amount</p>
                        <span>$9,500</span>
                      </div>
                    </div>
                    <div className="order-item-table">
                      <div className="order-item-head"><h4>Order Line Items</h4></div>
                      {tableData && tableData.length > 0 && (
                        <Table
                          valueFromData={{ columns: columns, data: tableData }}
                          perPageLimit={6}
                          visiblecheckboxStatus={false}
                          isLoading={this.props.recieved_rfp_status === status.IN_PROGRESS}
                          tableClasses={{
                            table: 'ticket-tabel',
                            tableParent: 'tickets-tabel',
                            parentClass: 'all-support-ticket-tabel',
                          }}
                          showingLine="Showing %start% to %end% of %total% "
                        />
                      )}
                    </div>
                  </div>
                }
                {activeKey === 1 &&
                  <div className='overview-tabs-contant attechment-tabs-contant active'>
                    <div className="order-item-table">
                      <div className="order-item-head"><h4>Attachments</h4></div>
                      <div className="form-table attechment-group-table">
                        <table>
                          <thead>
                            <tr>
                              <th>File Name</th>
                              <th>File Size</th>
                              <th>Date Uploaded</th>
                              <th>Uploaded By</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span>
                                <Button className='pdf-icon-btn'>
                                  <img src={PdfIcon} alt="" />
                                </Button>
                                Extra budetory.PDF
                              </span>
                              </td>
                              <td><span>200 Kb</span></td>
                              <td><span>20/07/2022</span></td>
                              <td> <span><div className='d-inline-block user-image'><img src={UserImg1} alt="" /></div> jame harry</span></td>
                            </tr>
                            <tr>
                              <td><span>
                                <Button className='pdf-icon-btn'>
                                  <img src={PdfIcon} alt="" />
                                </Button>
                                Extra budetory.PDF
                              </span>
                              </td>
                              <td><span>200 Kb</span></td>
                              <td><span>20/07/2022</span></td>
                              <td> <span><div className='d-inline-block user-image'><img src={UserImg1} alt="" /></div> jame harry</span></td>
                            </tr>
                            <tr>
                              <td><span>
                                <Button className='pdf-icon-btn'>
                                  <img src={PdfIcon} alt="" />
                                </Button>
                                Extra budetory.PDF
                              </span>
                              </td>
                              <td><span>200 Kb</span></td>
                              <td><span>20/07/2022</span></td>
                              <td> <span><div className='d-inline-block user-image'><img src={UserImg1} alt="" /></div> jame harry</span></td>
                            </tr>
                            <tr>
                              <td><span>
                                <Button className='pdf-icon-btn'>
                                  <img src={PdfIcon} alt="" />
                                </Button>
                                Extra budetory.PDF
                              </span>
                              </td>
                              <td><span>200 Kb</span></td>
                              <td><span>20/07/2022</span></td>
                              <td> <span><div className='d-inline-block user-image'><img src={UserImg1} alt="" /></div> jame harry</span></td>
                            </tr>
                            <tr>
                              <td><span>
                                <Button className='pdf-icon-btn'>
                                  <img src={PdfIcon} alt="" />
                                </Button>
                                Extra budetory.PDF
                              </span>
                              </td>
                              <td><span>200 Kb</span></td>
                              <td><span>20/07/2022</span></td>
                              <td> <span><div className='d-inline-block user-image'><img src={UserImg1} alt="" /></div> jame harry</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                }
                {activeKey === 2 &&
                  <div className='overview-tabs-contant comments-tabs-contant active'>
                    <div className="order-item-head"><h4>Comments</h4></div>
                    <div className="user-comments-section">
                      <ul>
                        <li>
                          <div className="user-comments-image">
                            <img src={UserImg2} alt="" />
                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              <label>William Floy</label>
                              <span>Now</span>
                            </div>
                            <div className="user-designation">
                              <p>Extra budgetory document is missing ?</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="user-comments-image">
                            <img src={UserImg3} alt="" />
                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              <label>William Floy</label>
                              <span>10 mins</span>
                            </div>
                            <div className="user-designation">
                              <p>Let me check</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="user-comments-image">
                            <img src={UserImg4} alt="" />
                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              <label>James haryy</label>
                              <span>25 mins</span>
                            </div>
                            <div className="user-designation">
                              <p>Please accept my request ASAP</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="comment-reply-bottom-content">
                        <span><img src={UserImg4} alt="" /></span>
                        <input type="text" placeholder="Reply" />
                      </div>
                    </div>
                  </div>
                }
                {activeKey === 3 &&
                  <div className="supplier-info-tabs-contant active">
                    <div className="order-item-head"><h4>Comments</h4></div>
                    <div className="supplier-info-section">
                      <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Supplier Name</label>
                            <span>Amazon Inc</span>
                            <p>Amazon@example.com</p>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Supplier Contact</label>
                            <span> 040-5842142</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Business Category</label>
                            <span>Tech pheripherals</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Telephone No.</label>
                            <span>91-4526418161</span>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                          <div className="requisitioner-text">
                            <label>Mailing Address</label>
                            <span>107 Crete St</span>
                            <p>Waverly, Tennessee(TN), 37185</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {activeKey === 4 &&
                  <div className="activity-logs-tabs active">
                    <div className="order-item-head"><h4>Comments</h4></div>
                    <div className="form-table activity-logs-group-table">
                      <table>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Action</th>
                            <th>Type</th>
                            <th>TimeStamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg5} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg6} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="orange"> Update</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg7} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="voilate">Create</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg8} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg9} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg10} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg11} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg12} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                          <tr>
                            <td><span>
                              <div className="user-profile">
                                <span> <img src={UserImg13} alt="" /></span>
                                <div className="user-contant">
                                  <label className='d-block'>Adam James</label>
                                  <span className='d-block'>Approver level 1</span>
                                </div>
                              </div>
                            </span>
                            </td>
                            <td><span className="green">Approve</span></td>
                            <td><span>Request</span></td>
                            <td> <span>29 june  2022 02:30 PM</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="request-content-right">
                <div className="request-timeline">
                  <div className="timeline-head"><h4>Request Timeline</h4></div>
                  <div className="request-timeline-content">
                    <ul>
                      <li>
                        <p>Request Initiate</p>
                        <span>04 Jul 2022 | 10 : 00 AM</span>
                      </li>
                      <li>
                        <p className="green">Approved</p>
                        <span>04 Jul 2022 | 04: 00 PM</span>
                        <label>View More Info</label>
                      </li>
                      <li>
                        <p className="green">PO Created</p>
                        <span>07 Jul 2022 | 12:30 PM</span>
                        <label>
                          Hide Info
                          <span>
                            Purchase created by procurement
                            team and waiting for supplier confirmation
                          </span>
                        </label>
                      </li>
                      <li>
                        <p className="orange">Out for delivery</p>
                        <span>15 Jul 2022 | 12:30 PM</span>
                      </li>
                      <li>
                        <p className="violate">Delivered</p>
                        <span>15 Jul 2022 | 5:00 PM</span>
                      </li>
                    </ul>
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
  const { approvepo_data, approvepo_status } = state.procurement;
  return { approvepo_data, approvepo_status };
};

const requestComponet = withTranslation()(connect(mapStateToProps)(Request));
export default requestComponet;
