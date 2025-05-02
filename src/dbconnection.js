const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Databasenin kullanıcı adı
    password: '', // Databasenin şifresi
    database: 'licensedb' // Veritabanı adı
});

db.connect((err) => {
    if (err) {
        console.error('Veritabanına bağlanılamadı:', err);
    } else {
        console.log('Veritabanına başarıyla bağlanıldı!');
    }
});

module.exports = db;
