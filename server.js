const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  //Create User Table
  const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            email VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_time BOOL DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  //Create user_profiles table
  const createUserCompanyTableQuery = `
        CREATE TABLE IF NOT EXISTS companies (
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            timezone VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL,
            hear_about_us VARCHAR(255) NOT NULL,
            managing_assets VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  //Create asset table
  const createAssetTableQuery = `
        CREATE TABLE IF NOT EXISTS assets (
            user_id VARCHAR(255) NOT NULL,
            user_name VARCHAR(255) NOT NULL, 
            device_category VARCHAR(255) NOT NULL,
            serial_number VARCHAR(255) NOT NULL UNIQUE,
            asset_name VARCHAR(255) NOT NULL,
            make VARCHAR(255),
            model VARCHAR(255),
            operating_system VARCHAR(255),
            cpu VARCHAR(255),
            memory VARCHAR(255),
            storage VARCHAR(255),
            date_purchased VARCHAR(255),
            warranty_expiration_date VARCHAR(255),
            location VARCHAR(255),
            assigned_user VARCHAR(255),
            asset_status VARCHAR(255) DEFAULT 'In Use',
            cost VARCHAR(255),
            comment VARCHAR(255),
            custom_field_name VARCHAR(255),
            field_type VARCHAR(255),
            enter_details VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );   
    `;

  // Enable uuid-ossp extension
  const enableUuidOsspQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

  db.query(enableUuidOsspQuery, (err, result) => {
    if (err) throw err;

    // Now, execute the CREATE TABLE query
    db.query(createUserTableQuery, (err, result) => {
      if (err) throw err;
      console.log("user table created successfully");
    });

    // Now, execute the CREATE TABLE query
    db.query(createUserCompanyTableQuery, (err, result) => {
      if (err) throw err;
      console.log("company table created successfully");
    });

    // Now, execute the CREATE TABLE query
    db.query(createAssetTableQuery, (err, result) => {
      if (err) throw err;
      console.log("asset table created successfully");

      // Close the connection after executing the queries
      db.end();
    });
  });
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
