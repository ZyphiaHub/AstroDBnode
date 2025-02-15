const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('mydatabase.db');

// Middleware a JSON adatok kezeléséhez
app.use(express.json());

// API végpont az adatok lekérdezéséhez
app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM mytable', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// API végpont az adatok beszúrásához
app.post('/api/data', (req, res) => {
    const { column1, column2 } = req.body;
    db.run('INSERT INTO mytable (column1, column2) VALUES (?, ?)', [column1, column2], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});