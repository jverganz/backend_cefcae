/*
    path: api/institute
*/

const { Router } = require("express");

const {
    getInstitutes,
    getInstituteById,
    createInstitute,
    updateInstitute,
    deleteInstitute
} = require("../controllers/institute");

const router = Router();

router.get("/all", getInstitutes);
router.get("/", getInstituteById);
router.post("/create", createInstitute);
router.put("/update", updateInstitute);
router.delete("/delete", deleteInstitute);


module.exports = router;
