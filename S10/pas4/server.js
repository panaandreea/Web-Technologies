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
  },
});

const Student = sequelize.define("Student", {
  studentFullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Course = sequelize.define("Course", {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

University.hasMany(Student);
Student.belongsTo(University);

University.hasMany(Course);
Course.belongsTo(University);

Student.belongsToMany(Course, { through: "Enrollments" });
Course.belongsToMany(Student, { through: "Enrollments" });

app.put("/", async (req, res) => {
  await sequelize.sync({ force: true });
  res.sendStatus(204);
});

app.post("/universities", async (req, res) => {
  const university = await University.create(req.body);
  res.status(201).json(university);
});

app.post("/universities/:universityId/students", async (req, res) => {
  const university = await University.findByPk(req.params.universityId);
  if (!university) return res.sendStatus(404);
  const student = await Student.create({
    ...req.body,
    UniversityId: university.id,
  });
  res.status(201).json(student);
});

app.post("/universities/:universityId/courses", async (req, res) => {
  const university = await University.findByPk(req.params.universityId);
  if (!university) return res.sendStatus(404);
  const course = await Course.create({
    ...req.body,
    UniversityId: university.id,
  });
  res.status(201).json(course);
});

app.post(
  "/universities/:universityId/students/:studentId/courses/:courseId",
  async (req, res) => {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        UniversityId: req.params.universityId,
      },
    });

    const course = await Course.findOne({
      where: {
        id: req.params.courseId,
        UniversityId: req.params.universityId,
      },
    });

    if (!student || !course) return res.sendStatus(404);

    await student.addCourse(course);
    res.status(201).json({ message: "Enrollment created" });
  }
);

app.get(
  "/universities/:universityId/students/:studentId/enrollments",
  async (req, res) => {
    const student = await Student.findOne({
      where: {
        id: req.params.studentId,
        UniversityId: req.params.universityId,
      },
      include: Course,
    });

    if (!student) return res.sendStatus(404);

    res.status(200).json(student.Courses);
  }
);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
