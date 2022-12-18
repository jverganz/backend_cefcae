const { request, response } = require("express");

const CourseModel = require("../database/config").Courses;
const CourseHeadquarterModel = require("../database/config").Courses_Headquarters;

module.exports.getCourses = async (req = request, res = response) => {
    try {
        let courses = [];

        courses = await CourseModel.findAll();

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

module.exports.getCoursesByHeadquarter = async (req = request, res = response) => {
    try {
        let courses = [];
        const coursesHeadquarter = await CourseHeadquarterModel.findAll({
            where: {
                headquarter_id: req.query.id
            }
        });

        for (const courseHeadquarter of coursesHeadquarter) {
            let course = await CourseModel.findByPk(courseHeadquarter.course_id);
            if (course) {
                courses.push(course);
            }
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

module.exports.createCourse = async (req = request, res = response) => {
    try {

        let courseNew = new CourseModel( req.body );
        await courseNew.save();

        return res.json({
            ok: true,
            courseNew
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        });
    }
}

module.exports.updateCourse = async ( req, res = response) => {
    try {

        const { id } = req.query;

        await CourseModel.update(req.body, {
            where: {
                id: id
            }
        });

        return res.json({
            ok: true,
            msg: "The course was update"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact with the administrator"
        })
    }
}