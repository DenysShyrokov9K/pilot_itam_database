const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS user_table (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    // Execute the query
    db.query(createUserTableQuery, (err, result) => {
        if (err) throw err;
        console.log("user_table created successfully");
        
        // Close the connection after executing the query
        db.end();
    });
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})