const { request, response } = require("express");

const TypeDocumentModel = require("../database/config").Type_Documents;

const getTypesDocuments = async (req = request, res = response) => {
    try {
        let typesDocuments = [];

        typesDocuments = await TypeDocumentModel.findAll();

        return res.json({
            ok: true,
            typesDocuments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const createTypeDocument = async (req = request, res = response) => {
    try {
        const typeDocument = new TypeDocumentModel( req.body );

        await typeDocument.save();

        return res.json({
            ok: true,
            typeDocument
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const updateTypeDocument = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await TypeDocumentModel.update(req.body, {
            where: {
                id
            }
        });

        return res.json({
            ok: true,
            msg: "The typeDocument was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}

const deleteTypeDocument = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await TypeDocumentModel.destroy({
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The type document was delete"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}

module.exports = {
    getTypesDocuments,
    createTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
}