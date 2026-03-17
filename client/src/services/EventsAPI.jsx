
const getAllEvents = async () => {
    const response = await fetch('api/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
}

const getEventById = async (eventId) => {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return await response.json();
}

export default {
    getAllEvents,
    getEventById
}