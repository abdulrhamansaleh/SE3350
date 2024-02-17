const dotenv = require('dotenv/config');
dotenv.config();
const mysql = require('mysql2/promise');

async function db() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return connection;
}

module.exports = db;
