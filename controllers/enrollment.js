const { request, response } = require("express");

const EnrollmentModel = require("../database/config").Enrollments;
const StudentModel = require("../database/config").Students;
const PersonModel = require("../database/config").Persons;
const CourseModel = require("../database/config").Courses;
const HeadquarterModel = require("../database/config").Headquarters;

module.exports.getEnrollments = async (req = request, res = response) => {
    try {
        let enrollments = [];

        const enrollmentsFound = await EnrollmentModel.findAll();

        for (const enrollment of enrollmentsFound) {
            const course = await CourseModel.findOne({ where: { id: enrollment.course_id }});
            let student = await StudentModel.findByPk(enrollment.student_id);
            let person = await PersonModel.findByPk(student.person_id);
            enrollments.push({
                enrollment,
                course,
                student,
                person
            })
        }

        return res.json({
            ok: true,
            enrollments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.getEnrollmentsByStudent = async (req = request, res = response) => {
    try {
        let enrollments = [];

        const enrollmentsFound = await EnrollmentModel.findAll({
            where: {
                student_id: req.query.student_id
            },
        });
        for (const enrollment of enrollmentsFound) {
            const course = await CourseModel.findOne({ where: { id: enrollment.course_id }});
            const headquarter = await HeadquarterModel.findOne({ where: { id: enrollment.headquarter_id } })
            enrollments.push({
                enrollment,
                course,
                headquarter
            });
        }

        return res.json({
            ok: true,
            enrollments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.getEnrollmentById = async (req = request, res = response) => {
    try {

        const enrollment = await EnrollmentModel.findByPk(req.query.id);

        if (!enrollment) {
            return res.status(404).json({
                ok: false,
                msg: 'Enrollment not found'
            })
        }

        return res.json({
            ok: true,
            enrollment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.createEnrollment = async (req = request, res = response) => {
    try {

        let enrollmentNew = new EnrollmentModel(req.body);
        await enrollmentNew.save();

        return res.json({
            ok: true,
            enrollmentNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.updateEnrollment = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await EnrollmentModel.update(req.body, {
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The enrollment was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}
