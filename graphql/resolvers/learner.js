const bcrypt = require('bcryptjs');
const Learner = require('../../models/learner');
const sort = require('../../helpers/sort');


module.exports = {
    learner: async args => {
        try
        {
            learner = await Learner.findById(args.id).populate({
                        path: 'enrolments',
                        populate: {
                          path: 'course',
                          model: 'Course'
                        }
                    });
            return learner;
        }
        catch (err)
        {
            throw err;
        }
    },
    learners: async args => {
        try
        {
            let learners = [];

            if (args.filter && args.operator === "EQUALS") {
                learners = await Learner.find({ [args.field]:[args.value] }).populate({
                    path: 'enrolments',
                    populate: {
                      path: 'course',
                      model: 'Course'
                    }
                });
            }
            else if (args.filter && args.operator === "CONTAINS") {
                learners = await Learner.find({ [args.field]:{$regex:[args.value], $options: "i"} }).populate({
                    path: 'enrolments',
                    populate: {
                      path: 'course',
                      model: 'Course'
                    }
                });
            }
            else {
                learners = await Learner.find().populate({
                    path: 'enrolments',
                    populate: {
                      path: 'course',
                      model: 'Course'
                    }
                });
            }

            if(args.sort) sort(learners, args.sort);

            return learners;
        }
        catch (err)
        {
            throw err;
        }
    },
    createLearner: async args => {
        try
        {
            const existingLearner = await Learner.findOne({ email: args.learnerInput.email });
            if (existingLearner) throw new Error('Learner already exists.');

            const hashedPassword = await bcrypt.hash(args.learnerInput.password, 12);
            const learner = new Learner({
                firstName: args.learnerInput.firstName,
                lastName: args.learnerInput.lastName,
                email: args.learnerInput.email,
                password: hashedPassword,
                age: args.learnerInput.age
            });

            const result = await learner.save();
            return result;
        }
        catch (err)
        {
            throw err;
        }
    }
}
