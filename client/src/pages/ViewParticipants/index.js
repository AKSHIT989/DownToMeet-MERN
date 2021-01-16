import React, { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../../Services/api';
import "./participants.css";
import { Container } from 'reactstrap';

export default function ViewParticipants() {
    const [eventParticipants, setEventParticipants] = useState([]);
    const user = localStorage.getItem("user");
    const eventId = localStorage.getItem("eventId");

    useEffect(() => {
        getParticipants();
    }, []);

    const getParticipants = async () => {
        try {
            const response = await api.get(`/event/participants/${eventId}`, { headers: { user: user } });
            setEventParticipants(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container style={{marginTop:"10px"}}>
            <ul className="participants">
                <h1>Total participants:{(eventParticipants.length)}</h1>
                {eventParticipants.map(participant => (
                    <li key={participant._id}>
                        <div className="participant-name">{participant.user.firstName + " " + participant.user.lastName}</div>
                        <div>Email: {participant.userEmail}</div>
                        <div>Request Time: {moment(participant.date).format('l')}</div>
                    </li>
                ))}
            </ul>
        </Container>
    );
}