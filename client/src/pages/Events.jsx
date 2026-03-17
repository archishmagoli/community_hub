import React, { useState, useEffect } from 'react';
import EventsAPI from '../services/EventsAPI';

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
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date} <strong>Time:</strong> {event.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
