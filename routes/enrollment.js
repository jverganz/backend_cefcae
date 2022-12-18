/*
    path: api/enrollment
*/

const { Router } = require("express");

const {
    getEnrollments,
    getEnrollmentById,
    getEnrollmentsByStudent,
    createEnrollment,
    updateEnrollment,
} = require("../controllers/enrollment");

const router = Router();

router.get("/all", getEnrollments);
router.get("/", getEnrollmentById);
router.get("/student", getEnrollmentsByStudent);
router.post("/create", createEnrollment);
router.put("/update", updateEnrollment);


module.exports = router;
