import { pool } from '../config/database.js';

const selectTableQuery = `
    SELECT * FROM locations;
`;

const getLocations = async (req, res) => {
    try {
        const results = await pool.query(selectTableQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } );
    }
}

const getLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const results = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getLocations,
    getLocation
};