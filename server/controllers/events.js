import { pool } from '../config/database.js';

const selectTableQuery = `
    SELECT * FROM events;
`;

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(selectTableQuery);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } );
    }
}

const getEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getEvents,
    getEvent
};