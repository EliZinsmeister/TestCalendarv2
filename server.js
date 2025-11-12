const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/login', (req, res) => {
  const {password, email} = req.body;
  console.log(req.body);

  const query = 'SELECT password FROM users WHERE email = ?';
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.json({ success: false});
      res.send({ message:'Database error' });
    }

    if (result.length === 0) {
      // No user found
      res.json({ success: false});
      res.send({ message:'Username error' });
    }

    console.log('Query result:', result);

    
    user = result[0];

    // if (password === user.password) {
    //   res.json({ boolean: true});
    // }
    // else {
    //   res.json({ boolean: false});
    // }
  });

});

app.post('/api/signUp', (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);

  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  
  db.query(query, [username, password, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User registered successfully!' });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));