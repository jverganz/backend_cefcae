/*
    path: api/student
*/

const { Router } = require("express");

const {
    getStudents,
    getStudentById,
    getCourses,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/student");

const router = Router();

router.get("/all", getStudents);
router.get("/", getStudentById);
router.get("/courses", getCourses);
router.post("/create", createStudent);
router.put("/update", updateStudent);
router.delete("/delete", deleteStudent);


module.exports = router;
