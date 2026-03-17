
const getAllLocations = async () => {
    const response = await fetch('/api/locations');
    if (!response.ok) throw new Error('Failed to fetch locations');
    return await response.json();
}

const getLocationById = async (locationId) => {
    const response = await fetch(`/api/locations/${locationId}`);
    if (!response.ok) throw new Error('Failed to fetch location');
    return await response.json();
}

export default {
    getAllLocations,
    getLocationById
}