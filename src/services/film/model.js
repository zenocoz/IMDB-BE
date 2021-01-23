const express = require("express")
const sequelize = require("sequelize")
const {DataTypes} = require("sequelize")

const Film = sequelize.define(
  "film",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    running_time: {type: DataTypes.INTEGER, allowNull: true},
    imgurl: {type: DataTypes.STRING, allowNull: false},
  },
  {timestamps: true}
)

// Cart.associate = (models) => {
//   Cart.belongsTo(models.Product)
//   Cart.belongsTo(models.User)
// }

module.exports = Film
