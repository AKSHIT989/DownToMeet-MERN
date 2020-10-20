import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from "reactstrap";
import api from '../../Services/api';

import Toast from '../../components/Toast/Toast';
import checkIcon from '../../assets/check.svg';
import errorIcon from '../../assets/error.svg';
import infoIcon from '../../assets/info.svg';
import warningIcon from '../../assets/warning.svg';

export default function ViewEvent() {
    const user = localStorage.getItem("user");
    const user_id = localStorage.getItem("user_id");
    const eventId = localStorage.getItem("eventId");
    const [eventSelected, setEventSelected] = useState({});
    const [isRequested, setIsRequested] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState('Request Registration');

    const [list, setList] = useState([]);
    let [checkValue, setCheckValue] = useState(false);
    const [autoDeleteTime, setAutoDeleteTime] = useState(5);
    let toastProperties = null;

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

    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } });
            showToast("success", "The registration request for the event made successfully!");
            setRegistrationStatus('Requested');
            setIsRequested(true);
        } catch (error) {
            showToast("danger", "The registration request for the event failed!");
            console.log(error);
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
            showToast("success", "Event deleted successfully!");

        } catch (error) {
            console.log(error)
            showToast("success", "Error while deleting event");
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
            <Toast
                toastList={ list }
                position={ "top-right" }
                autoDelete={ checkValue }
                autoDeleteTime={ autoDeleteTime }
            />
        </div>
    );
}