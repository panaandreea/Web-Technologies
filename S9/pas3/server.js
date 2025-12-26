"use strict";

const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/test.db",
});


const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 10], 
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
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
    const employees = await Employee.findAll();
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


app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something broke!" });
});


app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
