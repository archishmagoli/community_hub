import { pool } from "./database.js";
import './dotenv.js';
import eventsData from "../data/events.js";
import locationsData from "../data/locations.js";


const locationTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip VARCHAR(255) NOT NULL
    )
`

const eventsTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        locationId INTEGER REFERENCES locations(id) ON DELETE CASCADE
    )
`

const createTables = async () => {
    try {
        await pool.query(locationTableQuery);
        await pool.query(eventsTableQuery);
        console.log('🎉 events and locations tables created successfully');
    } catch (error) {
        console.error('⚠️ error creating events and locations tables', error)
    }
}

const seedTables = async () => {
    await createTables();

    locationsData.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, image, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [location.name, location.image, location.address, location.city, location.state, location.zip];

        pool.query(insertQuery, values, (error, response) => {
            if (error) {
                console.error('⚠️ error inserting location', error);
                return;
            }

            console.log(`✅ ${location.name} location added successfully`)
        })
    })


    eventsData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (title, image, date, time, locationId) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [event.title, event.image, event.date, event.time, event.locationId];

        pool.query(insertQuery, values, (error, response) => {
            if (error) {
                console.error('⚠️ error inserting event', error);
                return;
            }

            console.log(`✅ ${event.name} event added successfully`)
        })
    });
}

await seedTables();