const homeService = require("../service/home.service");
const db = require("../db/table.js");


const createUserAndData = async (req, res) => {
  try {
    const isUserExit = await homeService.getUsers(req.body.userId);
    if (isUserExit.length > 0) {
      return res.json({ message: "User already exist.change your userId" });
    }
    const result = await homeService.createUser(req.body.userId);

    if (result.affectedRows === 1) {
      const data = await homeService.createData(req.body);
      if(data>0){
       return res.status(201).json({ success: true,
         message : "data saved successfully"});
      }
      else {
       return res.status(400).json({ success: false,
          message : "unSuccessfully"});
      }
        }
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};


const getCommonUsers = async (req, res) => {
  let number = req.query.searchNumber;
  const sql = `SELECT userId, name, AES_DECRYPT(number,'key') AS decryptedNumber FROM contacts WHERE number = AES_ENCRYPT(?,'key')`;
  const [result] = await db.query(sql, [number]);
  let CommonUser = result.map((result) => result.userId);
  let decryptedNumber = result.length > 0 ? result[0].decryptedNumber.toString() : null;

  return res.status(200).send({ Name: result.length > 0 ? result[0].name : null, CommonUser});
}

const getUsers = async (req, res) => {
  try {
    const result = await homeService.getUsers();
   return res.json({ users: result });
  } catch (error) {
   return res.status(500).send({ error: error.message });
  }
};

const pagination = async(req,res)=>{

try{  const userId = +req.query.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.PageSize) || 10;
  const searchText = req.query.searchText || '';

  let [rows, fields] = await db.execute(
    `SELECT name, AES_DECRYPT(number,'key') AS decryptedNumber FROM contacts 
    WHERE userId = ?  AND name LIKE ?`,
    [userId,`%${searchText}%`]
  );
  let decryptedNumber = rows.length > 0 ? rows[0].decryptedNumber.toString() : null;

rows.map((row)=>{ row.name=row.name, row.decryptedNumber = decryptedNumber} )

let skipEliment = (page-1)*pageSize;
  
rows= rows.slice(skipEliment)  
rows= rows.splice(0,pageSize)

  const [totalCountRows] = await db.execute(
    `SELECT COUNT(*) AS totalCount FROM contacts 
    WHERE userId = ? AND name LIKE ?`,
    [userId, `%${searchText}%`]
  );

  const totalCount = totalCountRows[0].totalCount;

  const response = {
    totalCount,
    rows
  }
  return res.status(200).send(response);
}
catch (err){
 return res.status(500).send({status:false,message:err.message})
}
}
module.exports = {
  createUserAndData,
  getCommonUsers,
  getUsers,
  pagination
};


