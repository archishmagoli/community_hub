import { pool } from "./database.js";
import './dotenv.js';
// import cuisineData from "../data/cuisines.js";

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
        time VARCHAR(255) NOT NULL
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
    // cuisineData.forEach((cuisine) => {
    //     const insertQuery = {
    //         text: 'INSERT INTO cuisines (name, image, description, signatureDish, flavorProfile, submittedBy) VALUES ($1, $2, $3, $4, $5, $6)'
    //     }

    //     const values = [
    //         cuisine.name,
    //         cuisine.image,
    //         cuisine.description,
    //         cuisine.signatureDish,
    //         cuisine.flavorProfile,
    //         cuisine.submittedBy
    //     ]

    //     pool.query(insertQuery, values, (error, response) => {
    //         if (error) {
    //             console.error('⚠️ error inserting cuisine', error);
    //             return;
    //         }

    //         console.log(`✅ ${cuisine.name} cuisine added successfully`)
    //     })
    // })
}

await seedTables();