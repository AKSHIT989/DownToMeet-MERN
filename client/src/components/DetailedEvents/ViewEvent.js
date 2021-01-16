import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from "reactstrap";
import api from '../../Services/api';
import './ViewEvent.css'

export default function ViewEvent({ history }) {
    const user = localStorage.getItem("user");
    const user_id = localStorage.getItem("user_id");
    const eventId = localStorage.getItem("eventId");
    const [eventSelected, setEventSelected] = useState({});
    const [isRequested, setIsRequested] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState('Request Registration');

    useEffect(() => {
        getEventDetails();
    }, []);

    const getEventDetails = async () => {
        try {
            const response = await api.get(`/events/details/${eventId}`, { headers: { user: user } });
            setEventSelected(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } });
            setRegistrationStatus('Requested');
            setIsRequested(true);
        } catch (error) {
        }
    }

    const viewParticipantsHandler = async (event) => {
        try {
            localStorage.setItem("eventId", event);
            history.push('/event/participants')
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, {
                headers: { user: user },
            });
            history.push('/')
        } catch (error) {
        }
    };

    return (
        // <Container>
        <div className="info-container" width="100%">
            <div className="header-image"
                style={{ backgroundImage: `url(${eventSelected.thumbnail_url})` }}
            ></div>
            <center><h1 className="title">{eventSelected.title}</h1></center>
            <div className="content">
                <b>Event description: </b> {eventSelected.description} <br />
                <b>Event type: </b> {eventSelected.eventType} <br />
                <b>Event Date: </b> {moment(eventSelected.date).format('l')} <br />
                <b>Event Price: </b> {" ₹ " + eventSelected.price}
            </div>
            { eventSelected.user !== user_id ? (
                <div>
                    <Button style={{ width: "100%" }} color="primary" disabled={isRequested} onClick={() => registrationRequestHandler(eventSelected)}>{registrationStatus}</Button>
                </div>
            ) : (
                    <div className="outer-div">
                        <div className="btn-outer">
                            <Button style={{ width: "100%" }} color="info" onClick={() => viewParticipantsHandler(eventSelected._id)}>View Participants
                            </Button>
                        </div>
                        <div>
                            <Button style={{ width: "100%" }} color="danger" to="/" className="delBtn" onClick={() => deleteEventHandler(eventSelected._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    );
}