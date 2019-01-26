const Learner = require('../../models/learner');
const Course = require('../../models/course');
const Enrolment = require('../../models/enrolment');
const { parseDate } = require('../../helpers/date');


const singleCourse = async courseId => {
    try
    {
        const course = await Course.findById(courseId);
        return transformCourse(course);
    }
    catch(err)
    {
        throw err;
    }
};

const courses = async courseIds => {
    try 
    {
        const courses = await Course.find({ _id: { $in: courseIds } });
        return courses.map(course => {
            return transformCourse(course);
        });
    }
    catch (err) 
    {
        throw err;
    }
};

const singleLearner = async learnerId => {
    try
    {
        const learner = await Learner.findById(learnerId);
        return transformLearner(learner);
    }
    catch(err)
    {
        throw err;
    }
};

const learners = async learnerIds => {
    try
    {
        const learners = await Learner.find({ _id: { $in: learnerIds } });
        return learners.map(learner => {
            return transformLearner(learner);
        });
    }
    catch (err)
    {
        throw err;
    }
};

const enrolments = async learnerId => {
    try 
    {
        const enrolments = await Enrolment.find({ learner: learnerId });
        return enrolments.map(enrolment => {
            return transformEnrolment(enrolment);
        });
    }
    catch (err) 
    {
        throw err;
    }
};

const transformCourse = course => {
    return {
        ...course._doc,
        _id: course.id,
        date: parseDate(course.date),
    };
};

const transformEnrolment = enrolment => {
    return {
        ...enrolment._doc,
        _id: enrolment.id,
        course: singleCourse.bind(this, enrolment._doc.course),
        learner: singleLearner.bind(this, enrolment._doc.learner),
        createdAt: parseDate(enrolment.createdAt),
        updatedAt: parseDate(enrolment.updatedAt)
    };
};

const transformLearner = learner => {
    return {
        ...learner._doc,
        _id: learner.id,
        password: null,
        enrolments: enrolments.bind(this, learner._id)
    };
};

exports.singleLearner = singleLearner;
exports.singleCourse = singleCourse;
exports.learners = learners;
exports.courses = courses;
exports.transformCourse = transformCourse;
exports.transformLearner = transformLearner;
exports.transformEnrolment = transformEnrolment;
