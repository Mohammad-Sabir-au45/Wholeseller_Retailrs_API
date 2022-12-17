const { sequelize } = require("../dbConfig");
const{DataTypes} = require("sequelize");
const { Retailer } = require("./retailer");
const { Stock } = require("./stock");



const Wholeseller = sequelize.define(
  "wholeseller",{
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


// Set up the association between the wholesaler and retailer tables
Wholeseller.belongsToMany(Retailer, { through: "stock", as : "retailer", foreignKey: 'wholeseller_id' });
Retailer.belongsToMany(Wholeseller, { through: "stock", as : "wholeseller", foreignKey: 'retailer_id' });





// Set up the association between the wholesaler and stock tables
Wholeseller.hasMany(Stock);
Stock.belongsTo(Wholeseller, { as: 'wholeseller', foreignKey: 'wholeseller_id' });

// Set up the association between the retailer and stock tables
Retailer.hasMany(Stock);
Stock.belongsTo(Retailer, { as: 'retailer', foreignKey: 'retailer_id' });



















module.exports={
  Wholeseller


}




