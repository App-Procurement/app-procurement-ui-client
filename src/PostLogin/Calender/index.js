import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiData: {
        status: "",
        reqNo: "",
        depart: "",
      },
      activeIndex: 0,
      invoiceDetails: [
        {
          invoiceNo: "INV-0001234",
          invoiceName: "jean Graphic Inc.",
          shortNameColor: "#c1ea79",
          shortName: " ",
          shortNameIcon: "",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "Pending",
          pendiingColor: "#fdb84c",
        },
        {
          invoiceNo: "INV-0001234",
          invoiceName: "jean Graphic Inc.",
          shortName: "KG",
          shortNameIcon: "fa fa-chevron-down",
          shortNameColor: "#84da91",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "Pending",
          pendiingColor: "#43e265",
        },
        {
          invoiceNo: "INV-0001234",
          invoiceName: "jean Graphic Inc.",
          shortName: "KG",
          shortNameIcon: "",
          shortNameColor: "#4b3178",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "INVOICE SENT",
          pendiingColor: "#fdb84c",
        },
        {
          invoiceNo: "INV-0001234",
          invoiceName: "Jean Graphic Inc.",
          shortNameColor: "#c5bef4",
          shortName: "KG",
          shortNameIcon: "fa fa-bolt",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "COMPLETED",
          pendiingColor: "#48bfee",
        },
        {
          invoiceNo: "INV-0001234",
          invoiceName: "jean Graphic Inc.",
          shortName: "KG",
          shortNameIcon: "",
          shortNameColor: "#4b3178",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "INVOICE SENT",
          pendiingColor: "#43e265",
        },
      ],
    };
  }
  displayInvoiceDetails = () => {
    const { invoiceDetails, activeIndex } = this.state;
    let retData = [];
    for (let i = 0; i < invoiceDetails.length; i++) {
      let row = invoiceDetails[i];
      retData.push(
        <li key={row.name}>
          <div
            className={
              activeIndex == i ? "payment-process active" : "payment-process"
            }
            onClick={() => this.setState({ activeIndex: i })}>
            <div className='d-flex w-100 justify-content-between align-items-start'>
              <div
                className='graphic'
                style={{ backgroundColor: `${row.shortNameColor}` }}>
                {row.shortNameIcon ? (
                  <i className={row.shortNameIcon}></i>
                ) : (
                  <>{row.shortName}</>
                )}
              </div>
              <div class='payment-content'>
                <a href='#'>{row.invoiceNo}</a>
                <p>{row.invoiceName}</p>
                <span>{row.invoicePrice}</span>
              </div>
              <IconButton className='p-2 menu-btn'>
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className='pending-content'>
              <i class='fas fa-clock'></i>
              <span>{row.invoiceLable}</span>
              <p style={{ color: `${row.pendiingColor}` }}>{row.pendiing}</p>
            </div>
          </div>
        </li>
      );
    }
    return retData;
  };

  renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };
  render() {
    return (
      <div className='main-content'>
        <div className='calender-content'>
          <div className='row'>
            <div className='col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className='calender-content-left'>
                <div className='row justify-content-center align-items-center'>
                  <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <h4>Calender page</h4>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                  <div className='col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className='calender-btn'>
                      <FormControl className='select-menu'>
                        <NativeSelect name='status'>
                          <option value='january'>January</option>
                          <option value='february'>February</option>
                          <option value='march'>March</option>
                          <option value='april'>April</option>
                          <option value='may'>May</option>
                          <option value='june'>June</option>
                          <option value='july'>July</option>
                          <option value='august'>August</option>
                          <option value='september'>September</option>
                          <option value='october'>October</option>
                          <option value='november'>November</option>
                          <option value='december'>December</option>
                        </NativeSelect>
                      </FormControl>
                      <FormControl className='select-menu'>
                        <NativeSelect name='status'>
                          <option value='2011'>2011</option>
                          <option value='2012'>2012</option>
                          <option value='2013'>2013</option>
                          <option value='2014'>2014</option>
                          <option value='2015'>2015</option>
                          <option value='2016'>2016</option>
                          <option value='2017'>2017</option>
                          <option value='2018'>2018</option>
                          <option value='2019'>2019</option>
                          <option value='2020'>2020</option>
                          <option value='2021'>2021</option>
                        </NativeSelect>
                      </FormControl>
                      <Button variant='contained' className='primary-btn'>
                        {" "}
                        &#43; New Schedule
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='calender'>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    events={[
                      { title: "Invoice 1", date: "2021-11-13" },
                      { title: "Invoice 2", date: "2021-11-01" },
                      { title: "Invoice 3", date: "2021-12-01" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12'>
              <div className='calender-content-right'>
                <div className='d-block mb-3 heading'>
                  <h5 className='mb-1'>Invoice Details</h5>
                  <span>Thursday October 10th, 2020</span>
                </div>
                <SimpleBar style={{ height: 598 }}>
                  <div className='invoices-details'>
                    <ul>{this.displayInvoiceDetails()}</ul>
                  </div>
                </SimpleBar>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Calender;
