import React from 'react';
import { Link } from 'react-router-dom';
import './event-item.css';
import moment from 'moment';

const user = localStorage.getItem("user");
const user_id = localStorage.getItem("user_id");

const viewParticipantsHandler = async (event) => {
    try {
        localStorage.setItem("eventId", event);
    } catch (error) {
        console.log(error);
    }
}

export const ListCard = (event) => (
    <li className="li-card" key={ event._id }>
        <div className="li-picture" style={ { backgroundImage: `url(${event.thumbnail_url})` } } />
        <div>
            <h3>{ event.title }</h3>
            <p><b>Event type: </b> { event.eventType }</p>
            <p><b>Event Price: </b> { " ₹ " + event.price }</p>
            <p><b>Event Date: </b> { moment(event.date).format('l') }</p>
            <p><b>Event description: </b> { event.description.length > 30 ? event.description.substr(0, 30) + "... " : event.description }</p>
            <Link to={ `/eventdetails` } onClick={ () => viewParticipantsHandler(event._id) }>View Event Details</Link>
        </div>
    </li>
);