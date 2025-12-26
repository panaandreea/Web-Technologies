"use strict";

const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");

const app = express();
const PORT = 7000;

app.use(express.json());


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/test.db",
});


const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 10],
    },
  },
  salary: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});


app.get("/api/employees", async (req, res) => {
  try {
    const { name } = req.query;

    const employees = await Employee.findAll({
      where: name
        ? {
            name: {
              [Op.like]: `%${name}%`,
            },
          }
        : {},
    });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json(err);
  }
});


app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ force: true });
    console.log("Database synchronized");
  } catch (err) {
    console.error(err);
  }
});
