const { Retailer } = require("../model/retailer");

const getRetailerWithSingleWholesaler = async (req, res) => {
  try {
    const retailer = await Retailer.findOne({
      include: [
        {
          model: Wholesaler,
          as: "wholesaler",
        },
      ],
      having: {
        "COUNT(wholesaler.id)": 1,
      },
      group: ["retailer.id"],
    });

    return retailer;
  } catch (error) {
    res.status(err.status).send(err);
  }
};

module.exports = {
  getRetailerWithSingleWholesaler,
};
