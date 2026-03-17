import axios from 'axios';

const getAllLocations = async () => {
    const response = await axios.get('api/locations');
    return response.data;
}

const getLocationById = async (locationId) => {
    const response = await axios.get(`/api/locations/${locationId}`);
    return response.data;
}

export default {
    getAllLocations,
    getLocationById
}