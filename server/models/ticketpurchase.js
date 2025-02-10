"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TicketPurchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TicketPurchase.belongsTo(models.User, { foreignKey: "UserId" });
      TicketPurchase.belongsTo(models.Ticket, { foreignKey: "TicketId" });
    }
  }
  TicketPurchase.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id is required",
          },
          notEmpty: {
            msg: "User Id is required",
          },
        },
      },
      TicketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ticket Id is required",
          },
          notEmpty: {
            msg: "Ticket Id is required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity is required",
          },
          notEmpty: {
            msg: "Quantity is required",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Price is required",
          },
          notEmpty: {
            msg: "Total Price is required",
          },
        },
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Purchase Date is required",
          },
          notEmpty: {
            msg: "Purchase Date is required",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TicketPurchase",
    }
  );
  return TicketPurchase;
};
