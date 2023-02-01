import React, { Component } from "react";
import {
  Button,
  FormControl,
  NativeSelect,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import CloseIcon from "@mui/icons-material/Close";
import TimeRange from "react-time-range";

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
      events: [],
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
          invoiceName: "Jean Graphic Inc.",
          shortNameColor: "#c5bef4",
          shortName: "KG",
          shortNameIcon: "fa fa-bolt",
          invoicePrice: "6,50,000",
          invoiceLable: "2m ago",
          pendiing: "COMPLETED",
          pendiingColor: "#48bfee",
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
              <div className="payment-details">
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

  handleFormInputsChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateSelect = (e) => {
    const { name, value } = e.target;
    let { date } = this.state;
    date[name] = value;
    this.setState(date);
    let currentdate = date.year + "-" + date.month + "-" + "01";
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.gotoDate(currentdate);
  };

  openTaskEditModal = () => {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  };

  setTaskStartTime = (e) => {
    this.setState({ startTime: e.startTime });
  };

  setTaskEndTime = (e) => {
    this.setState({ endTime: e.endTime });
  };

  closeTaskEditModal = () => {
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

  submitTaskEdtiModal = () => {
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
      }

      if (!eventDate) {
        this.setState({ eventDateError: "Date is required!" });
      } else {
        this.setState({ eventDateError: "" });
      }

      if (!eventType) {
        this.setState({ eventTypeError: "Event type is required!" });
        valid = false;
      } else {
        this.setState({ eventTypeError: "" });
      }

      if (!eventPlace) {
        this.setState({ eventPlaceError: "Event place is required!" });
        valid = false;
      } else {
        this.setState({ eventPlaceError: "" });
      }

      if (!eventDescription) {
        this.setState({
          eventDescriptionError: "Event description is reuqired!",
        });
        valid = false;
      } else {
        this.setState({ eventDescriptionError: "" });
      }

      if (
        eventTitle &&
        eventType &&
        eventDate &&
        eventPlace &&
        eventDescription
      ) {
        valid = true;
      } else {
        valid = false;
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
    } = this.state;
    return (
      <div className="main-content">
        <div className="calender-content">
          <div className="row">
            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
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
                          onChange={this.handleDateSelect}
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
                          onChange={this.handleDateSelect}
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
                        onClick={this.openTaskEditModal}
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
            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="calender-content-right">
                <div className="d-block mb-3 heading">
                  <h5 className="mb-1">Invoice Details</h5>
                  <span>Thursday October 10th, 2020</span>
                </div>
                <SimpleBar style={{ height: 595 }}>
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
          onClose={this.closeTaskEditModal}
          onSubmit={this.submitTaskEdtiModal}
          aria-labelledby="form-dialog-title"
          className="calender-dialog"
        >
          <div className="calender-dialog-head">
            <DialogTitle id="form-dialog-title" className="dialog-heading">
              Edit
            </DialogTitle>
            <Button
              onClick={this.closeTaskEditModal}
              className="modal-close-btn"
            >
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
                  onChange={this.handleFormInputsChange}
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
              <div className="col-9 col-form-field d-block custom-event-radio">
                <div className="d-inline-block event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn meet-radio"
                    onChange={this.handleFormInputsChange}
                    defaultValue="meet"
                    label="Meet"
                    checked={eventType === "meet"}
                  />
                </div>
                <div className="d-inline-block event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn reminder-radio"
                    onChange={this.handleFormInputsChange}
                    defaultValue="reminder"
                    label="Reminder"
                    checked={eventType === "reminder"}
                  />
                </div>
                <div className="d-inline-block event-type">
                  <input
                    type="radio"
                    name="eventType"
                    className="redio-btn task-radio"
                    onChange={this.handleFormInputsChange}
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
                  onStartTimeChange={this.setTaskStartTime}
                  onEndTimeChange={this.setTaskEndTime}
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
                  onChange={this.handleFormInputsChange}
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
                  onChange={this.handleFormInputsChange}
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
                  onChange={this.handleFormInputsChange}
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
                    onClick={this.submitTaskEdtiModal}
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
