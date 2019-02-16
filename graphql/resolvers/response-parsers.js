const { parseDate } = require('../../helpers/date');


const transformCourse = course => {
    return {
        ...course._doc,
        id: course.id,
        date: parseDate(course.date),
    };
};

const transformEnrolment = enrolment => {
    return {
        ...enrolment._doc,
        id: enrolment.id,
        course: transformCourse(enrolment.course),
        createdAt: parseDate(enrolment.createdAt),
        updatedAt: parseDate(enrolment.updatedAt)
    };
};

const transformEnrolments = enrolments => {
    return enrolments.map(enrolment => {
        return transformEnrolment(enrolment);
    });
};

const transformLearner = learner => {
    return {
        ...learner._doc,
        id: learner.id,
        password: null,
        enrolments: transformEnrolments(learner.enrolments)
    };
};

exports.transformCourse = transformCourse;
exports.transformLearner = transformLearner;
exports.transformEnrolment = transformEnrolment;
