const db = require('./db.config');
const dotenv = require("dotenv");
dotenv.config();


const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY
  )
`;

db.execute(createUsersTableQuery)
  .then((result) => {
    console.log('Users table created successfully:');
  })
  .catch((err) => {
    console.error('Error creating users table:',err);
  });

// Create the contacts table
const createContactsTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    userId INT,
    name VARCHAR(255),
    number VARBINARY(255)
  )
`;

db.execute(createContactsTableQuery)
  .then((result) => {
    console.log('Contacts table created successfully:');
  })
  .catch((err) => {
    console.error('Error creating contacts table:', err);
  });


  module.exports = db;


