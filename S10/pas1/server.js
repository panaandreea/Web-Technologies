"use strict";

const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/database.db",
});


const University = sequelize.define("University", {
  universityName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
});

const Student = sequelize.define("Student", {
  studentFullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentStatus: {
    type: DataTypes.ENUM("ACTIVE", "INACTIVE", "FREEZED"),
    allowNull: false,
  },
});


University.hasMany(Student);
Student.belongsTo(University);


app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created" });
  } catch (err) {
    next(err);
  }
});


app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});


app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University created" });
  } catch (err) {
    next(err);
  }
});


app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    const student = await Student.create({
      ...req.body,
      UniversityId: university.id,
    });

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});


app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: Student,
    });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    res.status(200).json(university.Students);
  } catch (err) {
    next(err);
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
