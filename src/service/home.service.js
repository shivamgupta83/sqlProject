const db = require("../db/table.js");

const createUser = async (userId) => {
     const sql = `INSERT INTO users (userId) VALUES (?)`;
     const [result] = await db.query(sql, [userId]);
     return result;
};


const createData = async (body) => {
     let { userId, Contacts } = body;
     var affectedRows = 0;
     let unAffectedRows = {};
 
     async function saveContacts(contactArray) {
         const nameCounts = {};
         for (const contact of contactArray) {
             let name = contact.name;
             if (!nameCounts[name]) {
                 nameCounts[name] = 1;
                 const sql = `INSERT INTO contacts (userId, name, number) VALUES (?,?,AES_ENCRYPT(?,'key') )`;
                 const [result] = await db.execute(sql, [userId, name, contact.number]);
                 if (result.affectedRows == 1) affectedRows++;
             } else {
                 nameCounts[name]++;
                 unAffectedRows[name] = nameCounts[name];
             }
         }
     }
 
     await saveContacts(Contacts);
 
     return affectedRows;
 }
 
const getUsers = async () => {
     const sql = `SELECT * FROM users`;
     const [result] = await db.query(sql);
     return result;
};

module.exports = {
     createUser,
     getUsers,
     createData,
};