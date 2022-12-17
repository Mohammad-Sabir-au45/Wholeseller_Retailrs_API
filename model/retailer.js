const { sequelize } = require("../dbConfig");
const { DataTypes } = require("sequelize");

const Retailer = sequelize.define(
  "retailer",
  {
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
    },
    mobile_number:{
        type:DataTypes.CHAR(10),

    },    
     
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Retailer,
};
