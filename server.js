const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const db = new Database('./game_data.db');
const row = db.prepare("SELECT * FROM potions WHERE id = ?").get(1);
console.log(row);

// Middleware a JSON adatok kezeléséhez
app.use(express.json());

// API végpont az adatok lekérdezéséhez
app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM potions', (err, rows) => {
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
    db.run('INSERT INTO potions (column1, column2) VALUES (?, ?)', [column1, column2], function(err) {
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