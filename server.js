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
app.get('/api/login', (req, res) => {
  if (!req.session.user) {
    return res.json({
      boolean: false,
      message: "Not logged in"
    });
  }

  return res.json({
    boolean: true,
    user: req.session.user
  });
});
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT firstName, lastName, email, gradeLevel, password FROM users WHERE email = ?';

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.json({ boolean: false, message: 'Database error' });
    }

    if (result.length === 0) {
      return res.json({ boolean: false, message: 'Email not found' });
    }

    const user = result[0];

    if (password !== user.password) {
      return res.json({ boolean: false, message: 'Incorrect password' });
    }

    // Store user in session
    req.session.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gradeLevel: user.gradeLevel
    };

    return res.json({
      boolean: true,
      user: req.session.user
    });
  });
});

app.post('/api/signUp', (req, res) => {
  const {firstName, password, email } = req.body;
  console.log(req.body);

  const query = 'SELECT email FROM users WHERE email = ?';
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.json({ success: false});
      res.send({ message:'Database error' });
    }

    if (result.length === 0) {
      const query = 'INSERT INTO users (firstName, lastName, email, gradeLevel, password) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [firstName, '', email, 9, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User registered successfully!' });
      });
    }
    else{
      if (err) return res.status(500).send(err);
      res.send({ message: 'Email already registered!' });
    }

    console.log('Query result:', result);
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));