const express = require("express");
const { getMaxWholesalerTurnoverFromSingleRetailer,getWholesalerAndAssociatedRetailers,getYearlyWholesalerTurnover } = require("../controller/wholeseller");


const wholesellerRouter = express.Router();

getMaxWholesalerTurnoverFromSingleRetailer
wholesellerRouter.get(
  "/:id",
  getWholesalerAndAssociatedRetailers
);
wholesellerRouter.get(
  "/:id",
  getYearlyWholesalerTurnover
);
wholesellerRouter.get(
  "/:id",
  getMaxWholesalerTurnoverFromSingleRetailer
);



 module.exports={

    wholesellerRouter



}