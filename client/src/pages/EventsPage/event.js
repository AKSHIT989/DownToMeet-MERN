import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from "reactstrap";
import api from '../../Services/api';
import { Container } from 'reactstrap';

export default function ViewEvent() {
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
            console.log(eventId);
            const response = await api.get(`/events/details/${eventId}`, { headers: { user: user } });
            setEventSelected(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } });
            // setSuccess(true);
            // setMessageHandler(`The registration request for the event ${event.title} made successfully!`);
            setRegistrationStatus('Requested');
            setIsRequested(true);
            // setTimeout(() => {
            //     setSuccess(false);
            //     filterHandler(null);
            //     setMessageHandler('');
            // }, 2500);
        } catch (error) {
            // setError(true);
            // setMessageHandler('Error while registering for event!');
            // // setRegistrationStatus('Failed');
            // setTimeout(() => {
            //     setError(false);
            //     setMessageHandler('');
            //     // setRegistrationStatus('Registration Request');
            // }, 2000);
        }
    }

    const viewParticipantsHandler = async (event) => {
        try {
            localStorage.setItem("eventId", event);
            // history.push('/event/participants')
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, {
                headers: { user: user },
            });
            // setSuccess(true);
            // setMessageHandler('The event was deleted successfully!');
            // setTimeout(() => {
            //     setSuccess(false);
            //     filterHandler(null);
            //     setMessageHandler('');
            // }, 2500);
        } catch (error) {
            // setError(true);
            // setMessageHandler('Error while deleting event!');
            // setTimeout(() => {
            //     setError(false);
            //     setMessageHandler('');
            // }, 2000);
        }
    };

    return (
        <div className="ev-details">
            <h1>{ eventSelected.title }</h1>
            <img className="ev-picture" src={ eventSelected.thumbnail_url } alt="Event-image" />
            <p><b>Event type: </b> { eventSelected.eventType }</p>
            <p><b>Event Date: </b> { moment(eventSelected.date).format('l') }</p>
            <p><b>Event Price: </b> { " ₹ " + eventSelected.price }</p>
            <p><b>Event description: </b> { eventSelected.description }</p>
            { eventSelected.user !== user_id ? (
                <div>
                    <Button color="primary" disabled={ isRequested } onClick={ () => registrationRequestHandler(eventSelected) }>{ registrationStatus }</Button>
                </div>
            ) : (
                    <div className="outer-div">
                        <div className="btn-outer">
                            <Link to='/event/participants/' onClick={ () => viewParticipantsHandler(eventSelected._id) }>View Participants
                            </Link>
                        </div>
                        <div>
                            <Link to="/" className="delBtn" onClick={ () => deleteEventHandler(eventSelected._id) }>
                                Delete
                            </Link>
                        </div>
                    </div>
                ) }
        </div>
    );
}