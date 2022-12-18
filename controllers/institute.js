const { request, response } = require("express");

const InstitutesModel = require("../database/config").Institutes;

const getInstitutes = async (req = request, res = response) => {
    try {
        let institutes = [];

        institutes = await InstitutesModel.findAll();

        return res.json({
            ok: true,
            institutes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const getInstituteById = async (req = request, res = response) => {
    try {

        const institute = await InstitutesModel.findByPk(req.query.id);

        if (!institute) {
            return res.status(404).json({
                ok: false,
                msg: 'Institute not found'
            })
        }

        return res.json({
            ok: true,
            institute
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const createInstitute = async (req = request, res = response) => {
    try {
        const institute = new InstitutesModel( req.body );

        await institute.save();

        return res.json({
            ok: true,
            institute
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const updateInstitute = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await InstitutesModel.update(req.body, {
            where: {
                id
            }
        });

        return res.json({
            ok: true,
            msg: "The institute was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}

const deleteInstitute = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await InstitutesModel.destroy({
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The institute was delete"
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
    getInstitutes,
    getInstituteById,
    createInstitute,
    updateInstitute,
    deleteInstitute
}