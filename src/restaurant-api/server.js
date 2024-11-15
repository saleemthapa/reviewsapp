// server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root', // Use environment variable or default to 'root'
    password: process.env.DB_PASSWORD || '', // Use environment variable or default to empty
    database: process.env.DB_NAME || 'reviewsbymenu1' // Use environment variable or default to your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Endpoint to get top-rated restaurants
app.get('/api/top-restaurants', (req, res) => {
    const query = `
            SELECT 
                r.restaurant_id, 
                r.name, 
                AVG(rt.rating_value) AS average_rating
            FROM 
                Restaurants r
            JOIN 
                MenuItems mi ON r.restaurant_id = mi.restaurant_id
            JOIN 
                Reviews rev ON mi.item_id = rev.item_id
            JOIN 
                Ratings rt ON rev.review_id = rt.review_id
            GROUP BY 
                r.restaurant_id, r.name
            HAVING 
                COUNT(rt.rating_value) > 0
            ORDER BY 
                average_rating DESC LIMIT 3;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Endpoint to get top-rated food items
app.get('/api/top-food-items', (req, res) => {
    const query = `
        SELECT 
            mi.item_id, 
            mi.name, 
            AVG(rt.rating_value) AS average_rating
        FROM 
            MenuItems mi
        JOIN 
            Reviews rev ON mi.item_id = rev.item_id
        JOIN 
            Ratings rt ON rev.review_id = rt.review_id
        GROUP BY 
            mi.item_id, mi.name
        HAVING 
            COUNT(rt.rating_value) > 0
        ORDER BY 
            average_rating DESC LIMIT 3;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Graceful shutdown on server termination
process.on('SIGINT', () => {
    db.end(err => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit();
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});