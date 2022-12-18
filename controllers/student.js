const { request, response } = require("express");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

const StudentModel = require("../database/config").Students;
const PersonModel = require("../database/config").Persons;
const UserModel = require("../database/config").Users;
const EnrollmentModel = require("../database/config").Enrollments;
const CourseModel = require("../database/config").Courses;

const getStudents = async (req = request, res = response) => {
    try {
        let students = [];

        let users = await UserModel.findAll({
            where: {
                student_id : { [Op.not]: null }
            }
        });

        for (const user of users) {
            let student = await StudentModel.findByPk(user.student_id);
            let person = await PersonModel.findByPk(student.person_id);
            students.push({
                user,
                student,
                person
            })
        }

        return res.json({
            ok: true,
            students
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const getStudentById = async (req = request, res = response) => {
    try {

        const student = await StudentModel.findByPk(req.query.id);

        if (!student) {
            return res.status(404).json({
                ok: false,
                msg: 'Student not found'
            })
        }

        return res.json({
            ok: true,
            student
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const getCourses = async (req = request, res = response) => {
    try {
        let courses = [];

        let enrollments = await EnrollmentModel.findAll({
            where: {
                student_id: req.query.id
            }
        });

        for (const enrollment of enrollments) {
            let course = await CourseModel.findByPk(enrollment.course_id);
            courses.push(course);
        }

        return res.json({
            ok: true,
            courses
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const createStudent = async (req = request, res = response) => {
    try {
        const { person, student, user } = req.body;

        let personFound = await PersonModel.findOne({ where: { document_number: person.document_number } });
        if (!personFound) {
            personFound = new PersonModel( person );
            await personFound.save();
            student.person_id = personFound.id;
        } else {
            student.person_id = personFound.id;
        }

        let studentNew = new StudentModel( student );
        studentNew = await studentNew.save();

        let userNew = new UserModel( user );
        const salt = bcryptjs.genSaltSync();
        userNew.password = bcryptjs.hashSync( userNew.password, salt );
        userNew.created_at = new Date();
        userNew.updated_at = new Date();
        userNew.student_id = studentNew.id;
        await userNew.save();

        return res.json({
            ok: true,
            studentNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

const updateStudent = async ( req, res = response) => {
    try {

        const { id } = req.query;
        const { person, student } = req.body;

        await StudentModel.update(student, {
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
            msg: "The student was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}

const deleteStudent = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await UserModel.destroy({
            where: {
                student_id: id
            }
        });

        await StudentModel.destroy({
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The student was delete"
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
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getCourses
}