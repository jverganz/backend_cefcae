const { request, response } = require("express");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

const EmployeeModel = require("../database/config").Employees;
const PersonModel = require("../database/config").Persons;
const UserModel = require("../database/config").Users;

module.exports.getEmployees = async (req = request, res = response) => {
    try {
        let employees = [];

        let users = await UserModel.findAll({
            where: {
                employee_id : { [Op.not]: null }
            }
        });

        for (const user of users) {
            let employee = await EmployeeModel.findByPk(user.employee_id);
            let person = await PersonModel.findByPk(employee.person_id);
            employees.push({
                user,
                employee,
                person
            })
        }

        return res.json({
            ok: true,
            employees
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.getEmployeeById = async (req = request, res = response) => {
    try {

        const employee = await EmployeeModel.findByPk(req.query.id);

        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            })
        }

        return res.json({
            ok: true,
            employee
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.createEmployee = async (req = request, res = response) => {
    try {
        const { person, employee, user } = req.body;

        let personFound = await PersonModel.findOne({ where: { document_number: person.document_number } });
        if (!personFound) {
            personFound = new PersonModel( person );
            await personFound.save();
            employee.person_id = personFound.id;
        } else {
            employee.person_id = personFound.id;
        }

        let employeeNew = new EmployeeModel( employee );
        employeeNew = await employeeNew.save();

        let userNew = new UserModel( user );
        const salt = bcryptjs.genSaltSync();
        userNew.password = bcryptjs.hashSync( userNew.password, salt );
        userNew.created_at = new Date();
        userNew.updated_at = new Date();
        userNew.employee_id = employeeNew.id;
        await userNew.save();

        return res.json({
            ok: true,
            employeeNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.updateEmployee = async ( req, res = response) => {
    try {

        const { id } = req.query;
        const { person, employee } = req.body;

        await EmployeeModel.update(employee, {
            where: {
                id: id
            }
        });

        await PersonModel.update(person, {
            where: {
                id: person.id
            }
        });

        return res.json({
            ok: true,
            msg: "The employee was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}

module.exports.deleteEmployee = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await UserModel.destroy({
            where: {
                employee_id: id
            }
        });

        await EmployeeModel.destroy({
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The employee was delete"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}