const { Stock } = require("../model/stock");
const { Wholeseller } = require("../model/wholeseller");

const getWholesalerAndAssociatedRetailers = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const wholeseller = await Wholeseller.findByPk(id, {
      include: [
        {
          model: Retailer,
          as: "retailer",
          through: {
            attributes: ["retailer_id"],
          },
        },
      ],
    });
    console.log(wholeseller);
    res.status(200).json({
      success: true,
      wholeseller,
    });
  } catch (err) {
    res.status(501).send(err);
  }
};

const getYearlyWholesalerTurnover = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const results = await Wholeseller.findAll({
      attributes: [
        "id",
        "name",
        [
          Sequelize.fn("SUM", Sequelize.col("orders.total")),
          "total_monthly_turnover",
        ],
        [Sequelize.fn("MONTH", Sequelize.col("orders.created_at")), "month"],
      ],
      include: [
        {
          model: Retailer,
          as: "retailer",
          attributes: [],
          include: [
            {
              model: Stock,
              as: "stock",
              attributes: [],
              where: {
                created_at: {
                  [Sequelize.Op.gte]: new Date(`${currentYear}-01-01`),
                  [Sequelize.Op.lte]: new Date(`${currentYear}-12-31`),
                },
              },
            },
          ],
        },
      ],
      group: ["wholesaler.id", "month"],
    });

    return results;
  } catch (error) {
    res.status(err.status).send(err);
  }
};

const getMaxWholesalerTurnoverFromSingleRetailer = async (req, res) => {
  try {
    const wholesalers = await Wholeseller.findAll();

    for (const wholesaler of wholesalers) {
      const maxTurnover = await Stock.max("turnover", {
        where: {
          wholesalerId: wholesaler.id,
        },
        include: [
          {
            model: Retailer,
            attributes: ["name"],
          },
        ],
      });

      console.log(
        `${wholesaler.name} had a maximum turnover of ${maxTurnover} with retailer ${Retailer.name}.`
      );
    }
  } catch (error) {
    res.status(err.status).send(err);
  }
};

module.exports = {
  getWholesalerAndAssociatedRetailers,
  getYearlyWholesalerTurnover,
  getMaxWholesalerTurnoverFromSingleRetailer,
};
