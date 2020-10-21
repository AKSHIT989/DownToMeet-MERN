import React from 'react';
import { Link } from 'react-router-dom';
import './event-item.css';
import moment from 'moment';
import ViewEvent from '../DetailedEvents/ViewEvent'
import { Button } from 'reactstrap';

const user = localStorage.getItem("user");
const user_id = localStorage.getItem("user_id");
export const ListCard = (event) => (
    <li className="li-card" key={ event._id }>

        <div className="li-picture" style={ { backgroundImage: `url(${event.thumbnail_url})` } } />
        <div>
            <h3>{ event.title }</h3>
            <p><b>Event type: </b> { event.eventType }</p>
            <p><b>Event Date: </b> { moment(event.date).format('l') }</p>
            <p><b>Event description: </b> { event.description.length > 30 ? event.description.substr(0, 10) + "... " : event.description }</p>

    
            <Link to={ `/eventdetails`} >Link to Event</Link>
            <Button onClick={console.log("Hello")}>Click here</Button>
            {/* { event.user !== user_id ? (
                <div>
                    <Button color="primary" onClick={ () => registrationRequestHandler(event) }>Registration Request</Button>
                </div>
            ) : (
                    <Button color="info" onClick={ () => viewParticipantsHandler(event._id) }>View Participants
                    </Button>
                ) } */}
        </div>
    </li>
); 