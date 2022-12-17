require('dotenv').config()
const  Sequelize = require("sequelize");

 const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    
  }
);

//It will create the table if it is not exist
sequelize.sync({
    force:false
})

async function initDB() {
    try {
      
      await sequelize.authenticate()
      console.log("Connected to DB Successfully")
    } catch (err) {
      console.log("Error connecting to DB")
    }
  }
  
  




module.exports = {initDB, sequelize}