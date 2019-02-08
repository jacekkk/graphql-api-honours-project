const Learner = require('../../models/learner');
const Course = require('../../models/course');
const Enrolment = require('../../models/enrolment');
const { transformEnrolment } = require('./response-parsers')


module.exports = {
    enrolment: async args => {
        try
        {
            enrolment = await Enrolment.findById(args.id).populate([{path: 'learner'}, {path: 'course'}]);
            return transformEnrolment(enrolment);     
        }
        catch (err)
        {
            throw err;
        }
    },
    enrolments: async () => {
        try
        {
            const enrolments = await Enrolment.find().populate([{path: 'learner'}, {path: 'course'}]).exec().then(docs => {
                return docs.map(enrolment => {
                    return transformEnrolment(enrolment);
                });
            });
            return enrolments;
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
    
            if(fetchedCourse && fetchedLearner) {
                const enrolment = new Enrolment({
                    course: fetchedCourse,
                    learner: fetchedLearner,
                    progress: args.enrolmentInput.progress
                });
                
                const result = await enrolment.save();
                await Learner.update({ _id: fetchedLearner._id }, { $push: { enrolments: result._id } });        
                return transformEnrolment(result);
            }
            else {
                throw new Error('Course and/or Learner not found');
            }

        }
        catch(err)
        {
            throw err;
        }
    },
    cancelEnrolment: async args => {
        try
        {
            const enrolment = await Enrolment.findById(args.enrolmentId);
            await Enrolment.deleteOne({ _id: args.enrolmentId });
            await Learner.update({ _id: enrolment.learner }, { $pull: { enrolments: enrolment._id } });
            return "Enrolment cancelled successfuly.";         
        }
        catch (err)
        {
            throw err;
        }
    }
}
