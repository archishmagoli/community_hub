import React, { useState, useEffect } from 'react';
import EventsAPI from '../services/EventsAPI';
import Event from '../components/Event';
import '../css/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        // Optionally handle error (e.g., show a message)
        setEvents([]);
      }
    })();
  }, []);

  return (
    <div className="events-page">
      <h2>All Events</h2>
      <div className="event-list">
        {events.map(event => (
          <Event key={event.id} id={event.id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
