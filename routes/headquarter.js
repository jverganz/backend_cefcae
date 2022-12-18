/*
    path: api/headquarters
*/

const { Router } = require("express");

const {
    getHeadquarters,
    createHeadquarter,
    updateHeadquarter,
} = require("../controllers/headquarter");

const router = Router();

router.get("/", getHeadquarters);
router.post("/create", createHeadquarter);
router.put("/update", updateHeadquarter);


module.exports = router;
