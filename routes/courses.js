/*
    path: api/courses
*/

const { Router } = require("express");

const {
    getCourses,
    getCoursesByHeadquarter,
    createCourse,
    updateCourse,
} = require("../controllers/course");

const router = Router();

router.get("/", getCourses);
router.get("/headquarter", getCoursesByHeadquarter);
router.post("/create", createCourse);
router.put("/update", updateCourse);


module.exports = router;
