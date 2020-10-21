import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, ButtonGroup, Container } from "reactstrap";
import api from '../../Services/api';
import "./myRegistration.css";

export default function MyRegistrations() {
    const [myEvents, setMyEvents] = useState([]);
    const user = localStorage.getItem("user");

    useEffect(() => {
        getMyEvents();
    }, []);

    const getMyEvents = async () => {
        try {
            const response = await api.get('/registration', { headers: { user } })
            setMyEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const isApproved = (approved) => approved === true ? "Approved" : "Rejected";

    const eventStatusHandler = async (eventId, status) => {
        try {
            if (status)
                await api.post(`/registration/${eventId}/approval`, {}, { headers: { user } });
            else
                await api.post(`/registration/${eventId}/rejection`, {}, { headers: { user } });
            getMyEvents();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <ul className="events">
                {myEvents.map(event => (
                    <li key={event._id}>
                        <div className="event-title">{event.eventTitle}</div>
                        <div className="event-details">
                            <span>Event Date: {moment(event.eventDate).format('l')}</span>
                            <span>Event Price: ₹ {parseFloat(event.eventPrice).toFixed(2)}</span><br />
                            <span>User Email: {event.userEmail}</span>
                            <span>Status:
                            <span className={event.approved !== undefined ? isApproved(event.approved) : "Pending"}>
                                    {event.approved !== undefined ? isApproved(event.approved) : "Pending"}
                                </span>
                            </span>
                        </div>
                        <ButtonGroup>
                            <Button disabled={event.approved === true || event.approved === false ? true : false} color="secondary" onClick={() => { eventStatusHandler(event._id, true) }}>
                                Accept
                        </Button>
                            <Button disabled={event.approved === true || event.approved === false ? true : false} color="danger" onClick={() => { eventStatusHandler(event._id, false) }}>
                                Reject
                        </Button>
                        </ButtonGroup>
                    </li>
                ))}
            </ul>
        </Container>
    );
}