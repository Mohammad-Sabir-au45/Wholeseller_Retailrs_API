const express = require("express");

const retailerRouter = express.Router();
const { getRetailerWithSingleWholesaler } = require("../controller/retaler");

retailerRouter.get("/api/retailer/:retailer_id", getRetailerWithSingleWholesaler);

module.exports = {
  retailerRouter,
};
