const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDB } = require("./dbConfig");
const { wholesellerRouter } = require("./route/wholeseller");
const { retailerRouter } = require("./route/retailer");
const { Wholeseller } = require("./model/wholeseller");
const { Retailer } = require("./model/retailer");
const { Stock } = require("./model/stock");

const app = express();

Wholeseller;

//dotenv config
require("dotenv").config();

initDB();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

app.post("/api/wholeseller", async (req, res) => {
  const { name, mobile_number } = req.body;
  console.log(name, mobile_number);
  try {
    const newWholeseller = await Wholeseller.create({ name, mobile_number });

    res.status(201).send({ status: "sucsess", newWholeseller });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/retailer", async (req, res) => {
  const { name, mobile_number } = req.body;
  console.log(name, mobile_number);
  try {
    const newRetailer = await Retailer.create({ name, mobile_number });

    res.status(201).send({ status: "sucsess", newRetailer, newStock });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use("/api/wholeseller", wholesellerRouter);
app.use("/", retailerRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
