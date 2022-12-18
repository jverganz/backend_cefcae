const { request, response } = require("express");

const HeadquarterModel = require("../database/config").Headquarters;

const getHeadquarters = async (req = request, res = response) => {
    try {
        let headquarters = [];

        headquarters = await HeadquarterModel.findAll();

        return res.json({
            ok: true,
            headquarters
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const createHeadquarter = async (req = request, res = response) => {
    try {

        let headquarter = new HeadquarterModel( req.body );
        await headquarter.save();

        return res.json({
            ok: true,
            headquarter
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const updateHeadquarter = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await HeadquarterModel.update(req.body, {
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The headquarter was update"
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
    getHeadquarters,
    createHeadquarter,
    updateHeadquarter
}