import axios from 'axios';

const getAllEvents = async () => {
    const response = await axios.get('api/events');
    return response.data;
}

const getEventById = async (eventId) => {
    const response = await axios.get(`/api/events/${eventId}`);
    return response.data;
}

export default {
    getAllEvents,
    getEventById
}