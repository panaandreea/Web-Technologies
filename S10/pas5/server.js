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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

University.hasMany(Student);
University.hasMany(Course);

Student.belongsTo(University);
Course.belongsTo(University);

Student.belongsToMany(Course, { through: "Enrollments" });
Course.belongsToMany(Student, { through: "Enrollments" });

app.put("/", async (req, res) => {
  await sequelize.sync({ force: true });
  res.sendStatus(204);
});

app.post("/import", async (req, res) => {
  const data = req.body;

  for (const u of data) {
    const university = await University.create({ name: u.name });

    const studentsMap = {};
    for (const s of u.students) {
      const student = await Student.create({
        name: s.name,
        UniversityId: university.id,
      });
      studentsMap[s.id] = student;
    }

    const coursesMap = {};
    for (const c of u.courses) {
      const course = await Course.create({
        name: c.name,
        UniversityId: university.id,
      });
      coursesMap[c.id] = course;
    }

    for (const e of u.enrollments) {
      await studentsMap[e.studentId].addCourse(
        coursesMap[e.courseId]
      );
    }
  }

  res.sendStatus(201);
});

app.get("/export", async (req, res) => {
  const universities = await University.findAll({
    include: [
      {
        model: Student,
        include: Course,
      },
      {
        model: Course,
      },
    ],
  });

  const result = universities.map((u) => {
    const enrollments = [];

    u.Students.forEach((s) => {
      s.Courses.forEach((c) => {
        enrollments.push({
          studentId: s.id,
          courseId: c.id,
        });
      });
    });

    return {
      id: u.id,
      name: u.name,
      students: u.Students.map((s) => ({
        id: s.id,
        name: s.name,
      })),
      courses: u.Courses.map((c) => ({
        id: c.id,
        name: c.name,
      })),
      enrollments,
    };
  });

  res.status(200).json(result);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
