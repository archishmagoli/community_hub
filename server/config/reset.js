import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { pool } from "./database.js";
import eventsData from "../data/events.js";
import locationsData from "../data/locations.js";


const dropTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;
`;

const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time TIMESTAMP NOT NULL,
        locationId INTEGER REFERENCES locations(id) ON DELETE CASCADE
    );
`;

const createTables = async () => {
    try {
        await pool.query(dropTablesQuery);
        await pool.query(createTablesQuery);
        console.log('🎉 events and locations tables created successfully');
    } catch (error) {
        console.error('⚠️ error creating events and locations tables', error)
    }
}

const seedTables = async () => {
    await createTables();

    for (const location of locationsData) {
        const insertQuery = {
            text: 'INSERT INTO locations (name, image, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [location.name, location.image, location.address, location.city, location.state, location.zip];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Location "${location.name}" added successfully`);
        } catch (error) {
            console.error('⚠️ error inserting location', error);
        }
    }

    for (const event of eventsData) {
        const insertQuery = {
            text: 'INSERT INTO events (title, image, date, time, locationId) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [event.title, event.image, event.date, event.time, event.locationId];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Event "${event.title}" added successfully`);
        } catch (error) {
            console.error('⚠️ error inserting event', error);
        }
    };
}

await seedTables();