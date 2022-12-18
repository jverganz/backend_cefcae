const { response } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../database/config").Users;

const login = async ( req, res = response ) => {

    const { username, password } = req.body;

    try {

        const userDB = await UserModel.findOne({
            where: { username },
        });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            });
        }

        // Validate password
        const validPassword = bcryptjs.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "The password is wrong"
            });
        }

        if ( userDB.state === "INACTIVE" ) {
            return res.status(400).json({
                ok: false,
                msg: "The user is inactive"
            });
        }

        return res.json({
            ok: true,
            user: userDB
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
    login,
}