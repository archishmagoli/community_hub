import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsAPI from '../services/EventsAPI';
import LocationsAPI from '../services/LocationsAPI';
import Event from '../components/Event';
import '../css/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ]);
        setEvents(eventsData);
        setLocations(locationsData);
      } catch (error) {
        setEvents([]);
        setLocations([]);
      }
    })();
  }, []);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    if (value === 'all') return;
    // Map location id to route
    const locationRoutes = {
      1: '/echolounge',
      2: '/houseofblues',
      3: '/pavilion',
      4: '/americanairlines',
    };
    navigate(locationRoutes[value] || '/');
  };

  return (
    <div className="events-page">
      <div id="location-filter-div" style={{ width: '100%', marginBottom: '2rem', textAlign: 'center' }}>
        <h2>All Events</h2>
        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <h3><label htmlFor="location-filter" id="location-filter-text">Filter by location</label></h3>
          <select
            id="location-filter"
            defaultValue="all"
            onChange={handleLocationChange}
            style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="event-list">
        {events.map(event => (
          <Event key={event.id} id={event.id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
