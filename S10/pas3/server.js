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
    validate: { len: [3, 20] },
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

app.get("/create", async (req, res) => {
  await sequelize.sync({ force: true });
  res.status(201).json({ message: "Database created" });
});

app.post("/university", async (req, res) => {
  await University.create(req.body);
  res.status(201).json({ message: "University created" });
});

app.post("/universities/:universityId/students", async (req, res) => {
  const university = await University.findByPk(req.params.universityId);
  if (!university) {
    return res.status(404).json({ message: "University not found" });
  }
  const student = await Student.create({
    ...req.body,
    UniversityId: university.id,
  });
  res.status(201).json(student);
});

app.put(
  "/universities/:universityId/students/:studentId",
  async (req, res) => {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        UniversityId: req.params.universityId,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.update({
      studentFullName: req.body.studentFullName,
      studentStatus: req.body.studentStatus,
    });

    res.status(202).json({ message: "Student updated" });
  }
);

app.delete(
  "/universities/:universityId/students/:studentId",
  async (req, res) => {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        UniversityId: req.params.universityId,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    res.status(200).json({ message: "Student deleted" });
  }
);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
