import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import moment from "moment";
import { Button, ButtonGroup } from "reactstrap";
import "./Dashboard.css";
//Dashboard will show all the events
export default function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user_id = localStorage.getItem("user");
  // const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const getEvents = async (filter) => {
    const url = filter ? `/dashboard/${filter}` : "/dashboard";
    const response = await api.get(url, { headers: { user_id } });

    setEvents(response.data);
  };

  return (
    <div className="dashboard-page">
      <div>
        Filter:
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => filterHandler(null)}
            active={rSelected === null}
          >
            All Sports
          </Button>
          <Button
            color="primary"
            onClick={() => filterHandler("webinar")}
            active={rSelected === "webinar"}
          >
            Webinar
          </Button>
          <Button
            color="primary"
            onClick={() => filterHandler("workshop")}
            active={rSelected === "workshop"}
          >
            Workshop
          </Button>
          <Button
            color="primary"
            onClick={() => filterHandler("seminar")}
            active={rSelected === "seminar"}
          >
            Seminar
          </Button>
        </ButtonGroup>
        <Button color="secondary" onClick={() => history.push("/events")}>
          Create an event?
        </Button>
      </div>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event._id}>
            <header
              style={{ backgroundImage: `url(${event.thumbnail_url})` }}
            />
            <strong>{event.title}</strong>
            <span>Event Type: {event.eventType}</span>
            <span>Event Date: {moment(event.date).format("l")}</span>
            <span>Event Price: {parseFloat(event.price).toFixed(2)}</span>
            <span>Event Description: {event.description}</span>
            <Button color="primary">Subscribe</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
