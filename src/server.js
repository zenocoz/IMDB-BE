const express = require("express")
const server = express()
const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {host: process.env.PGHOST, dialect: "postgres"}
)

//Routes
const filmRoutes = require("./services/film")
server.use("/films", filmRoutes)

server.use(express.json())
const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log("listening on port", port)
})
