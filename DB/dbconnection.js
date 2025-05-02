const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Database username
    password: '', // Database password
    database: 'licensedb' // Database name
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Successfully connected to the database!');
    }
});

module.exports = db;
