import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FullCalendar, { EventApi } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Dialog from "@material-ui/core/Dialog";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import TimeRange from "react-time-range";
import { red } from "@material-ui/core/colors";

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
      date: {
        month: "09",
        year: "2022",
      },
      openDialog: false,
      updateValue: {},
      updateForm: false,
      currentdate: "",
      startTime: "2020-02-08T09:00",
      endTime: "2020-02-08T10:00",
      eventTitle: "",
      eventTitleError: "",
      eventType: "",
      eventTypeError: "",
      eventDate: "",
      eventDateError: "",
      eventPlace: "",
      eventPlaceError: "",
      eventDescription: "",
      eventDescriptionError: "",
      eventDeleteButton: false,
      currentEditEventId: "",
      events: [
        {
          id: 1,
          title: "event 1",
          start: "2022-09-06T09:00",
          end: "2022-09-06T11:00",
          type: "meet",
          place: "newyork",
          description: "an event at newyork",
          className: "meet",
        },
        {
          id: 2,
          title: "event 2",
          start: "2022-09-08T12:00",
          end: "2022-09-08T14:00",
          type: "task",
          place: "brooklyn",
          description: "an event at brooklyn",
          className: "task",
        },
        {
          id: 3,
          title: "event 3",
          start: "2022-09-10T12:00",
          end: "2022-09-10T14:00",
          type: "reminder",
          place: "san diego",
          description: "an event at san diego",
          className: "reminder",
        },
      ],
      eventColor: "red",
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
              activeIndex === i ? "payment-process active" : "payment-process"
            }
            onClick={() => this.setState({ activeIndex: i })}
          >
            <div className="d-flex w-100 justify-content-between align-items-start">
              <div
                className="graphic"
                style={{ backgroundColor: `${row.shortNameColor}` }}
              >
                {row.shortNameIcon ? (
                  <i className={row.shortNameIcon}></i>
                ) : (
                  <>{row.shortName}</>
                )}
              </div>
              <div className="payment-content">
                <a href="#foo">{row.invoiceNo}</a>
                <p>{row.invoiceName}</p>
                <span>{row.invoicePrice}</span>
              </div>
              <IconButton className="p-2 menu-btn">
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className="pending-content">
              <i className="fas fa-clock"></i>
              <span>{row.invoiceLable}</span>
              <p style={{ color: `${row.pendiingColor}` }}>{row.pendiing}</p>
            </div>
          </div>
        </li>
      );
    }
    return retData;
  };
  calendarRef = React.createRef();
  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleDateStateChange = (e) => {
    const { name, value } = e.target;
    let { date } = this.state;
    date[name] = value;
    this.setState(date);
    let currentdate = date.year + "-" + date.month + "-" + "01";
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.gotoDate(currentdate);
  };
  openEditModal = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };
  setStartTime = (e) => {
    this.setState({ startTime: e.startTime });
  };
  setEndTime = (e) => {
    this.setState({ endTime: e.endTime });
  };
  closeModal = () => {
    this.setState({
      currentEditEventId: "",
      eventTitle: "",
      eventType: "",
      eventPlace: "",
      eventDescription: "",
      eventDate: "",
      eventDeleteButton: false,
      openDialog: !this.state.openDialog,
    });
  };

  getHoursFromTime = (time) => {
    let hour = new Date(time);
    hour = `${hour.getHours()}`;
    hour = hour.length < 2 ? `0${hour}` : hour;
    return hour;
  };

  submitModal = () => {
    const {
      currentEditEventId,
      eventTitle,
      eventType,
      eventDate,
      eventPlace,
      eventDescription,
      endTime,
      startTime,
    } = this.state;

    let { events } = this.state;

    const eventValidation = () => {
      let valid = false;
      if (!eventTitle) {
        this.setState({ eventTitleError: "The title is required!" });
        valid = false;
      } else {
        this.setState({ eventTitleError: "" });
        valid = true;
      }

      if (!eventDate) {
        this.setState({ eventDateError: "Date is required!" });
        valid = false;
      } else {
        this.setState({ eventDateError: "" });
        valid = true;
      }

      if (!eventType) {
        this.setState({ eventTypeError: "Event type is required!" });
        valid = false;
      } else {
        this.setState({ eventTypeError: "" });
        valid = true;
      }

      if (!eventPlace) {
        this.setState({ eventPlaceError: "Event place is required!" });
        valid = false;
      } else {
        this.setState({ eventPlaceError: "" });
        valid = true;
      }

      if (!eventDescription) {
        this.setState({
          eventDescriptionError: "Event description is reuqired!",
        });
        valid = false;
      } else {
        this.setState({ eventDescriptionError: "" });
        valid = true;
      }

      return valid;
    };

    if (eventValidation()) {
      if (!currentEditEventId) {
        events = [
          ...events,
          {
            id: events.length + 1,
            title: eventTitle,
            start: `${eventDate}T${this.getHoursFromTime(startTime)}:00`,
            end: `${eventDate}T${this.getHoursFromTime(endTime)}:00`,
            type: eventType,
            place: eventPlace,
            description: eventDescription,
            className: eventType,
          },
        ];
      }
      if (currentEditEventId) {
        const currentEdit = events.filter(
          (event) => event.id !== parseInt(currentEditEventId)
        );
        events = [
          ...currentEdit,
          {
            id: parseInt(currentEditEventId),
            title: eventTitle,
            start: `${eventDate}T${this.getHoursFromTime(startTime)}:00`,
            end: `${eventDate}T${this.getHoursFromTime(endTime)}:00`,
            type: eventType,
            place: eventPlace,
            description: eventDescription,
            className: eventType,
          },
        ];
      }

      this.setState({ events });
      this.setState({
        currentEditEventId: "",
        eventTitle: "",
        eventType: "",
        eventDate: "",
        eventPlace: "",
        eventDescription: "",
        openDialog: !this.state.openDialog,
      });
    }
  };

  handleEventClick = (e) => {
    let date = e.event._instance.range.start;
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let newDate = [year, month, day].join("-");
      return newDate;
    }
    this.setState({
      eventTitle: e.event.title,
      eventType: e.event.extendedProps.type,
      eventPlace: e.event.extendedProps.place,
      eventDate: formatDate(date),
      eventDescription: e.event.extendedProps.description,
      openDialog: !this.state.openDialog,
      eventDeleteButton: true,
      currentEditEventId: e.event._def.publicId,
    });
  };

  handleEventDelete = () => {
    let { events } = this.state;
    const newEvents = events.filter(
      (event) => event.id !== parseInt(this.state.currentEditEventId)
    );

    this.setState({
      events: newEvents,
      currentEditEventId: "",
      eventTitle: "",
      eventType: "",
      eventPlace: "",
      eventDescription: "",
      eventDate: "",
      eventDeleteButton: false,
      openDialog: !this.state.openDialog,
    });
  };

  render() {
    const {
      date,
      openDialog,
      updateValue,
      startTime,
      endTime,
      events,
      eventTitleError,
      eventTypeError,
      eventDateError,
      eventPlaceError,
      eventDescriptionError,
      eventTitle,
      eventType,
      eventDate,
      eventPlace,
      eventDescription,
      eventColor,
    } = this.state;
    return (
      <div className="main-content">
        <div className="calender-content">
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="calender-content-left">
                <div className="row justify-content-center align-items-center">
                  <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4>Calender page</h4>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                  <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="calender-btn">
                      <FormControl className="select-menu">
                        <NativeSelect
                          name="month"
                          value={date.month}
                          onChange={this.handleDateStateChange}
                        >
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="08">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </NativeSelect>
                      </FormControl>
                      <FormControl className="select-menu">
                        <NativeSelect
                          name="year"
                          value={date.year}
                          onChange={this.handleDateStateChange}
                        >
                          <option value="2011">2011</option>
                          <option value="2012">2012</option>
                          <option value="2013">2013</option>
                          <option value="2014">2014</option>
                          <option value="2015">2015</option>
                          <option value="2016">2016</option>
                          <option value="2017">2017</option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </NativeSelect>
                      </FormControl>
                      <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={this.openEditModal}
                      >
                        &#43; New Schedule
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="calender">
                  <FullCalendar
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    ref={this.calendarRef}
                    events={[...events]}
                    eventClick={this.handleEventClick}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="calender-content-right">
                <div className="d-block mb-3 heading">
                  <h5 className="mb-1">Invoice Details</h5>
                  <span>Thursday October 10th, 2020</span>
                </div>
                <SimpleBar style={{ height: 598 }}>
                  <div className="invoices-details">
                    <ul>{this.displayInvoiceDetails()}</ul>
                  </div>
                </SimpleBar>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={openDialog}
          onClose={this.closeModal}
          onSubmit={this.submitModal}
          aria-labelledby="form-dialog-title"
          className="calender-dialog"
        >
          <div className="calender-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Edit
            </DialogTitle>
            <Button onClick={this.closeModal} className="modal-close-btn">
              <CloseIcon />
            </Button>
          </div>
          <div className="calender-dialog-content">
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Title</label>
              <div className="col-9 col-form-field">
                <input
                  type="text"
                  name="eventTitle"
                  className="form-control"
                  placeholder="Title"
                  onChange={this.handleStateChange}
                  value={updateValue.name}
                  defaultValue={eventTitle}
                />
                <span className="d-block w-100 text-danger">
                  {eventTitleError}
                </span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Type</label>
              <div className="col-9 col-form-field d-flex custom-event-radio">
                <div className="event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn meet-radio"
                    onChange={this.handleStateChange}
                    defaultValue="meet"
                    label="Meet"
                    checked={eventType === "meet"}
                  />
                </div>
                <div className="event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn reminder-radio"
                    onChange={this.handleStateChange}
                    defaultValue="reminder"
                    label="Reminder"
                    checked={eventType === "reminder"}
                  />
                </div>
                <div className="event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn task-radio"
                    onChange={this.handleStateChange}
                    defaultValue="task"
                    label="Task"
                    checked={eventType === "task"}
                  />
                </div>
                <span className="d-block w-100 text-danger">
                  {eventTypeError}
                </span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Hour</label>
              <div className="col-9 col-form-field">
                <TimeRange
                  startLabel={""}
                  endLabel={"To"}
                  startMoment={startTime}
                  endMoment={endTime}
                  onStartTimeChange={this.setStartTime}
                  onEndTimeChange={this.setEndTime}
                  minuteIncrement={60}
                  sameIsValid={false}
                />
                <span className="d-block w-100 text-danger">{""}</span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Date</label>
              <div className="col-9 col-form-field">
                <input
                  type="date"
                  name="eventDate"
                  className="form-control"
                  placeholder="Date"
                  onChange={this.handleStateChange}
                  value={eventDate}
                  defaultValue={eventDate}
                />
                <span className="d-block w-100 text-danger">
                  {eventDateError}
                </span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Place</label>
              <div className="col-9 col-form-field">
                <input
                  type="text"
                  name="eventPlace"
                  className="form-control"
                  placeholder="Add Place"
                  onChange={this.handleStateChange}
                  value={updateValue.place}
                  defaultValue={eventPlace}
                />
                <span className="d-block w-100 text-danger">
                  {eventPlaceError}
                </span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label">Description</label>
              <div className="col-9 col-form-field">
                <textarea
                  name="eventDescription"
                  placeholder="Description"
                  onChange={this.handleStateChange}
                  value={updateValue.description}
                  defaultValue={eventDescription}
                />
                <span className="d-block w-100 text-danger">
                  {eventDescriptionError}
                </span>
              </div>
            </div>
            <div className="form-group row form-group">
              <label className="col-3 col-form-label"></label>
              <div className="col-9 col-form-field">
                <div className="submit-buttons text-right">
                  <Button
                    variant="contained"
                    className="primary-btn save-btn"
                    onClick={this.submitModal}
                  >
                    Save
                  </Button>
                  {this.state.eventDeleteButton ? (
                    <Button
                      variant="contained"
                      className="primary-btn delete-btn ml-3"
                      onClick={this.handleEventDelete}
                    >
                      Delete
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default Calender;
