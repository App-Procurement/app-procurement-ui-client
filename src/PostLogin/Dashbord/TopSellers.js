import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import { connect } from 'react-redux';
import 'simplebar/dist/simplebar.min.css';
import { sellersAction } from '../../_actions';
import { status } from '../../_constants';

class TopSellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(sellersAction.getSellerList());
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.seller_list_status !== this.props.seller_list_status &&
      this.props.seller_list_status === status.SUCCESS
    ) {
      if (this.props.seller_list && this.props.seller_list.length > 0) {
        this.setState({ sellerList: this.props.seller_list });
      }
    }
  }
  getPriority = (value) => {
    if (value === 0) {
      return 'Revised';
    } else if (value === 1) {
      return 'Approve';
    } else if (value === 2) {
      return 'Reject';
    }
  };

  getTimeAndDateDiffrence = (date) => {
    let activityDate = new Date(date);
    let recentTime = new Date();
    let result = 0;
    result = Math.abs(activityDate.getHours() - recentTime.getHours());
    if (result <= 0) {
      result = Math.abs(activityDate.getMinutes() - recentTime.getMinutes());
      return result + 'minutes';
    } else {
      return result + 'hours';
    }
  };

  render() {
    const { sellerList } = this.state;
    return (
      <div className="recent-activity">
        <div className="recent-activity-head">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12">
              <div className="head-left">{this.props.t('Top Seller this Week')}</div>
            </div>
          </div>
        </div>
        <SimpleBar className="recent-activity-table">
          {sellerList &&
            sellerList.length > 0 &&
            sellerList.map((activity, index) => {
              if (activity && activity) {
                const { price, id, productName, supplier, productImgUrl } = activity;
                return (
                  <div className="d-flex table-row" key={id}>
                    <div className="row d-flex align-items-center justify-content-space-beetween">
                      <div className="col-9">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="image">
                            {productImgUrl && <img src={productImgUrl} width={50} height={50} alt="" />}
                          </div>
                          <div className="d-flex flex-wrap name row">
                            <div className="col-12">
                              <span>
                                {supplier}
                              </span>
                            </div>
                            <div className="col-12">
                              {' '}
                              {productName && <strong> Request Approved by {productName}</strong>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex justify-content-end flex-wrap rfp-no">
                          <strong> ${price}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </SimpleBar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { seller_list_status, seller_list } = state.procurement;
  return {
    seller_list_status,
    seller_list,
  };
}
export default connect(mapStateToProps)(TopSellers);
