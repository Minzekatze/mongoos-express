import { Router } from "express";
import Student from "../models/Student.js";
import asyncHandler from "../utils/AsyncHandler.js";

const studentRoutes = Router();

studentRoutes
  .route("/")
  .get(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
  })

  .post(
    asyncHandler(async (req, res) => {
      const {
        body: { name, first_name, email },
      } = req;

      const newStudent = {
        name: name,
        first_name: first_name,
        email: email,
      };

      const student = await Student.create(newStudent);
      res.status(201).json(student);
    })
  );

studentRoutes
  .route("/:id")
  .put(
    asyncHandler(async (req, res) => {
      const {
        params: { id },
      } = req;
      const {
        body: { name, first_name, email },
      } = req;

      const newStudent = {
        name: name,
        first_name: first_name,
        email: email,
      };

      const student = await Student.findByIdAndUpdate(id, {
        $set: newStudent,
      });
      res.json(student);
    })
  )
  .delete(
    asyncHandler(async (req, res) => {
      const {
        params: { id },
      } = req;

      const goneStudent = await Student.findByIdAndDelete(id);
      if (!goneStudent) throw new Error("couldn't find user to be deleted");
      res.json(goneStudent);
    })
  );

export default studentRoutes;
