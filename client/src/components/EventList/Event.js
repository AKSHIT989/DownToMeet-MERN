import React, { Component } from 'react';
import { ListCard } from "./ListCard";
import './event-item.css';

class EventList extends Component {

    render() {
        return (
            <ul className="list-card-container" >
                {this.props.events.map(event => (
                    <ListCard { ...event } />
                )) }
            </ul>
        );
    }
}

export default EventList;