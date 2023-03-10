const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql2 = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use(cors());
app.use(bodyParser.json());
const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  connection.connect();
  
  const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
  
  connection.query(createUsersTable, function(err, results) {
      if (err) {
          return console.log(err.message);
      }
      console.log("users table created successfully");
  });

  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if email and password match with any user in db
    connection.query("SELECT * FROM users WHERE email = ?", [email], function (err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'Incorrect email or password' });
        }
        if (result.length > 0) {
            // compare hashed password
            bcrypt.compare(password, result[0].password, function (err, match) {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'Incorrect email or password' });
                }
                if (match) {
                    // create jwt token and send it as response
                    var token = jwt.sign({ email: result[0].email, username: result[0].username }, process.env.SECRET_KEY);
                    res.status(200).json({ token: token });
                } else {
                    res.status(401).json({ message: 'Incorrect email or password' });
                }
            });
        } else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    });
});



app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // hash password
    bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error while registering' });
        }
        // store email and hashed password in db
        connection.query("INSERT INTO users (email, password, username) VALUES (?, ?, ?)", [email, hashedPassword, username], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error while registering' });
            }
            res.status(200).json({ message: 'Registered successfully' });
        });
    });
});


router.post('/watchlist', async (req, res) => {
    try {
        let {userId, seriesId, dateAdded, status} = req.body;
        let connection = await mysql.createConnection({
            host: 'your_host',
            user: 'your_user',
            password: 'your_password',
            database: 'your_database'
        });
        let [result] = await connection.execute(
            'INSERT INTO watchlist (user_id, series_id, date_added, status) VALUES (?, ?, ?, ?)',
            [userId, seriesId, dateAdded, status]
        );
        connection.end();
        res.status(200).json({status:'success'});
    } catch (err) {
        console.log(err);
        res.status(500).json({status:'error', error:err});
    }
});
