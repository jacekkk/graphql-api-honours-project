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
        createdAt: parseDate(enrolment.createdAt),
        updatedAt: parseDate(enrolment.updatedAt)
    };
};

const transformLearner = learner => {
    return {
        ...learner._doc,
        id: learner.id,
        password: null,
    };
};

exports.transformCourse = transformCourse;
exports.transformLearner = transformLearner;
exports.transformEnrolment = transformEnrolment;
