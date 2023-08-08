const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql2");
const port = process.env.PORT;


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    throw err;
  }

  console.log('Connected to MySQL server.');

  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Error creating database:', err);
    } else {
      console.log(`Database ${process.env.DB_NAME} created successfully.`);
    }
  });  
});


function golden(){
  setTimeout(()=>{
// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./src/routes/home.routes"));

// Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
},5000)
}
golden()































































// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// const mysqlConfig = {
//   host: 'localhost',
//   user: 'root',
//   database: 'test',
//   password: ''
// };

// // API endpoint for syncing contacts
// app.post('/sync-contacts', async (req, res) => {
//   const userId = req.body.userId;
//   const contacts = req.body.Contacts;

//   const encryptedContacts = contacts.map(contact => ({
//     name: contact.name,
//     number: encryptPhoneNumber(contact.number)
//   }));

//   const connection = mysql.createConnection(mysqlConfig);

//   try {
//     await connection.promise().beginTransaction();

//     for (const contact of encryptedContacts) {
//       const [existingContact] = await connection.promise().query(
//         'SELECT * FROM contacts WHERE user_id = ? AND encrypted_number = ?',
//         [userId, contact.number]
//       );

//       if (existingContact.length === 0) {
//         await connection.promise().query(
//           'INSERT INTO contacts (user_id, name, encrypted_number) VALUES (?, ?, ?)',
//           [userId, contact.name, contact.number]
//         );
//       }
//     }

//     await connection.promise().commit();

//     res.json({ success: true, message: 'Data saved successfully' });
//   } catch (error) {
//     await connection.promise().rollback();
//     console.error(error);
//     res.status(500).json({ success: false, message: 'An error occurred' });
//   } finally {
//     connection.end();
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// function encryptPhoneNumber(phoneNumber) {
//   // Implement your encryption logic here
//   return phoneNumber; // For demonstration purposes, returning the same number
// }
