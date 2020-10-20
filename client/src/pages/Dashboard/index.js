import React, { useEffect, useState, useMemo } from "react";
import api from "../../Services/api";
import moment from "moment";
import { Container } from 'reactstrap';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import EventList from '../../components/EventList/Event';
import Toast from '../../components/Toast/Toast';
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/error.svg';
import infoIcon from '../../assets/info.svg';
import warningIcon from '../../assets/warning.svg';
// import "./Dashboard.css";
// import '../assets/css/main.css'
// import '../../components/assets/css/main.css'

//Dashboard will show all the events
export default function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageHandler, setMessageHandler] = useState('');
  const [eventRequests, setEventRequests] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [list, setList] = useState([]);
  let [checkValue, setCheckValue] = useState(false);
  const [autoDeleteTime, setAutoDeleteTime] = useState(5);
  let toastProperties = null;

  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    getEvents();
  }, []);

  const socket = useMemo(() =>
    socketio('http://localhost:8000', { query: { user: user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on('registration_request', data => (setEventRequests([...eventRequests, data])));
  }, [eventRequests, socket]);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const response = await api.get("/user/events", {
        headers: { user: user },
      });
      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/dashboard/${filter}` : "/dashboard";
      const response = await api.get(url, { headers: { user: user } });
      response.data.events.sort((a, b) => { return new Date(a.date) - new Date(b.date); });
      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const showToast = (type, message) => {
    const id = Math.floor((Math.random() * 101) + 1);

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: message,
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: message,
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: message,
          backgroundColor: '#5bc0de',
          icon: infoIcon
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: message,
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;

      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  }

  const acceptEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/approval`, {}, { headers: { user } });

      showToast("success", "Registration for the Event approved successfully!");
      removeNotificationFromDashboard(eventId);
    } catch (error) {
      showToast("danger", "Registration for the Event not approved!");
      console.log(error);
    }
  }

  const rejectEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/rejection`, {}, { headers: { user } });

      showToast("success", "Registration for the Event rejected successfully!");
      removeNotificationFromDashboard(eventId);
    } catch (error) {
      showToast("danger", "Registration for the Event not rejected!");
      console.log(error);
    }
  }

  const removeNotificationFromDashboard = (eventId) => {
    const newEvent = eventRequests.filter((event) => event._id !== eventId);
    console.log(newEvent);
    setEventRequests(newEvent);
  }
  const redirectHandler = () => {
    history.push("/events");
  }
  return (
    <>
      <section id="banner">
        <div class="inner">
          <h1>Down To Meet:<br /> <span>Host in-person events for people with same interests</span></h1>
          <ul class="actions">
            <Button style={ { backgroundColor: "#212F3C", border: "2px solid white", padding: "10px" } }
              onClick={ redirectHandler }>
              Get Started
            </Button>
          </ul>
        </div>
      </section>
      <ul className="notifications">
        { eventRequests.map(request => {
          return (
            <li key={ request._id }>
              <div>
                <strong>{ request.user.email }</strong> is requesting to register to your event
                <strong>{ request.event.title }</strong>
                <ButtonGroup>
                  <Button color="secondary" onClick={ () => acceptEventHandler(request._id) }>
                    Accept
                  </Button>
                  <Button color="danger" onClick={ () => rejectEventHandler(request._id) }>
                    Reject
                  </Button>
                </ButtonGroup>
              </div>
            </li>
          )
        }) }
      </ul>
      <Container>
        <div className="dashboard-page">
          <div className="filter-panel">
            <Dropdown isOpen={ dropdownOpen } toggle={ toggle } size="lg">
              <DropdownToggle color="success" caret>
                Filter
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={ () => filterHandler(null) } active={ rSelected === null }>All Events</DropdownItem>
                <DropdownItem onClick={ () => filterHandler("webinar") } active={ rSelected === "webinar" }>Webinar</DropdownItem>
                <DropdownItem onClick={ () => filterHandler("workshop") } active={ rSelected === "workshop" }>Workshop</DropdownItem>
                <DropdownItem onClick={ () => filterHandler("seminar") } active={ rSelected === "seminar" }>Seminar</DropdownItem>
                <DropdownItem onClick={ myEventsHandler } active={ rSelected === "myEvents" }>My Events</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            { <EventList events={ events } /> }
          </div>
          {/* <ul className="events-list">
            { events.map((event) => (
              <li key={ event._id }>
                <header style={ { backgroundImage: `url(${event.thumbnail_url})` } }>
                  { event.user === user_id ? (
                    <div>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={ () => deleteEventHandler(event._id) }
                      >
                        Delete
                    </Button>
                    </div>
                  ) : (
                      ""
                    ) }
                </header>
                <strong>{ event.title }</strong>
                <span>Event Type: { event.eventType }</span>
                <span>Event Date: { moment(event.date).format("l") }</span>
                <span>Event Price: { parseFloat(event.price).toFixed(2) }</span>
                <span>Event Description: { event.description }</span>

                { event.user !== user_id ? (
                  <div>
                    <Button color="primary" onClick={ () => registrationRequestHandler(event) }>Registration Request</Button>
                  </div>
                ) : (
                    <Button color="info" onClick={ () => viewParticipantsHandler(event._id) }>View Participants
                    </Button>
                  ) }
              </li>
            )) }
          </ul> */}
          { error ? (
            showToast("danger", messageHandler)
          ) : (
              ""
            ) }
          { success ? (
            showToast("danger", messageHandler)
          ) : (
              ""
            ) }
        </div>

        <Toast
          toastList={ list }
          position={ "top-right" }
          autoDelete={ checkValue }
          autoDeleteTime={ autoDeleteTime }
        />
      </Container>
    </>
  );
}
