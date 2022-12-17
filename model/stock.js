const { sequelize } = require("../dbConfig");
const{DataTypes} = require("sequelize");
const { Retailer } = require("./retailer");
const { Wholeseller } = require("./wholeseller");




const Stock = sequelize.define(
  "stock",{
    stock_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      default :Date.now
    }
  },
    {
      timestamps: false,
    }
);



module.exports={
  Stock
}

