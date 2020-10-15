import React, { useEffect, useState, useMemo } from "react";
import api from "../../Services/api";
import moment from "moment";
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import "./Dashboard.css";

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
  const [eventRequestMessage, setEventRequestMessage] = useState('');
  const [eventRequestSuccess, setEventRequestSuccess] = useState(false);

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

  const deleteEventHandler = async (eventId) => {
    try {
      await api.delete(`/event/${eventId}`, {
        headers: { user: user },
      });
      setSuccess(true);
      setMessageHandler('The event was deleted successfully!');
      setTimeout(() => {
        setSuccess(false);
        filterHandler(null);
        setMessageHandler('');
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler('Error while deleting event!');
      setTimeout(() => {
        setError(false);
        setMessageHandler('');
      }, 2000);
    }
  };

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/dashboard/${filter}` : "/dashboard";
      const response = await api.get(url, { headers: { user: user } });

      // console.log(response.data);
      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const registrationRequestHandler = async (event) => {
    try {
      await api.post(`/registration/${event.id}`, {}, { headers: { user } });
      setSuccess(true);
      setMessageHandler(`The registration request for the event ${event.title} made successfully!`);
      // setRegistrationStatus('Requested');
      setTimeout(() => {
        setSuccess(false);
        filterHandler(null);
        setMessageHandler('');
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler('Error while registering for event!');
      // setRegistrationStatus('Failed');
      setTimeout(() => {
        setError(false);
        setMessageHandler('');
        // setRegistrationStatus('Registration Request');
      }, 2000);
    }
  }

  const viewParticipantsHandler = async (event) => {
    try {
      localStorage.setItem("eventId", event);
    } catch (error) {
      console.log(error);
    }
  }

  const acceptEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/approval`, {}, { headers: { user } });

      setEventRequestSuccess(true);
      setEventRequestMessage("Event approved successfully!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const rejectEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/rejection`, {}, { headers: { user } });

      setEventRequestSuccess(true);
      setEventRequestMessage("Event rejected!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const removeNotificationFromDashboard = (eventId) => {
    const newEvent = eventRequests.filter((event) => event._id !== eventId);
    console.log(newEvent);
    setEventRequests(newEvent);
  }

  return (
    <>
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
      {eventRequestSuccess ?
        <Alert className="event-validation" color="success">{ eventRequestMessage }</Alert>
        : "" }
      <div className="dashboard-page">
        <div className="filter-panel">
          <Dropdown isOpen={ dropdownOpen } toggle={ toggle }>
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
        <ul className="events-list">
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
                  <div className="viewBtn">
                    <Link to={ "/event/participants" } onClick={ () => viewParticipantsHandler(event._id) }>View Participants</Link>
                  </div>
                ) }
            </li>
          )) }
        </ul>
        { error ? (
          <Alert className="event-validation" color="danger">
            {messageHandler }
          </Alert>
        ) : (
            ""
          ) }
        { success ? (
          <Alert className="event-validation" color="success">
            {messageHandler }
          </Alert>
        ) : (
            ""
          ) }
      </div>
    </>
  );
}
