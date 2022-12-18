/*
    path: api/employee
*/

const { Router } = require("express");

const {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employee");

const router = Router();

router.get("/all", getEmployees);
router.get("/", getEmployeeById);
router.post("/create", createEmployee);
router.put("/update", updateEmployee);
router.delete("/delete", deleteEmployee);


module.exports = router;
