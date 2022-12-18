/*
    path: api/type_document
*/

const { Router } = require("express");

const { 
    getTypesDocuments,
    createTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
} = require("../controllers/type_document");

const router = Router();

router.get("/", getTypesDocuments);
router.post("/create", createTypeDocument);
router.put("/update", updateTypeDocument);
router.delete("/delete", deleteTypeDocument);


module.exports = router;
