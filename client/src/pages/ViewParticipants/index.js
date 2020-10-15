import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import { Button, ButtonGroup } from "reactstrap";
import api from '../../Services/api';
import "./participants.css";

export default function ViewParticipants() {
    const [eventParticipants, setEventParticipants] = useState([]);
    const user = localStorage.getItem("user");
    const eventId = localStorage.getItem("eventId");

    useEffect(() => {
        getParticipants();
    }, []);

    const getParticipants = async () => {
        try {
            // console.log(eventId);
            const response = await api.get(`/event/participants/${eventId}`, { headers: { user: user } });
            setEventParticipants(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ul className="participants">
                { eventParticipants.map(participant => (
                    <li key={ participant._id }>
                        <div className="participant-name">{ participant.user.firstName + " " + participant.user.lastName }</div>
                        <div>Email: { participant.userEmail }</div>
                        <div>Request Time: { moment(participant.date).format('l') }</div>
                    </li>
                )) }
            </ul>
        </>
    );
}