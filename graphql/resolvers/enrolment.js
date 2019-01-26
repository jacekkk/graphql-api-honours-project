const Learner = require('../../models/learner');
const Course = require('../../models/course');
const Enrolment = require('../../models/enrolment');
const { transformCourse, transformEnrolment } = require('../resolvers/common')


module.exports = {
    enrolments: async () => {
        try
        {
            const enrolments = await Enrolment.find();
            return enrolments.map(enrolment =>
            {
                console.log(enrolment.course);
                return transformEnrolment(enrolment);
            });
        }
        catch (err)
        {
            throw err;
        }
    },
    enrolLearner: async args => {
        try
        {
            const fetchedCourse = await Course.findById(args.enrolmentInput.courseId);
            const fetchedLearner = await Learner.findById(args.enrolmentInput.learnerId);
    
            const enrolment = new Enrolment({
                course: fetchedCourse,
                learner: fetchedLearner,
                progress: args.enrolmentInput.progress ? args.enrolmentInput.progress : 0
            });
            
            const result = await enrolment.save();
    
            return transformEnrolment(result);
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    },
    cancelEnrolment: async args => {
        try
        {
            const enrolment = await Enrolment.findById(args.enrolmentId).populate('course');
            const course = transformCourse(enrolment.course);
            console.log(enrolment);
            await Enrolment.deleteOne({ _id: args.enrolmentId });
            return course;         
        }
        catch (err)
        {
            throw err;
        }
    }
}