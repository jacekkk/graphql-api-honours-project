const bcrypt = require('bcryptjs');
const Learner = require('../../models/learner');
const { transformLearner } = require('../resolvers/common')
const sort = require('../../helpers/sort')
const filter = require('../../helpers/filter')


module.exports = {
    learners: async args => {
        try
        {
            let learners = [];

            args.filter ? learners = await filter(Learner, args.filter) : learners = await Learner.find();

            if(args.sort) sort(learners, args.sort);

            return learners.map(learner => {
                return transformLearner(learner);
            });
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
            if (existingLearner)
            {
                throw new Error('Learner already exists.');
            }

            const hashedPassword = await bcrypt.hash(args.learnerInput.password, 12);
            const learner = new Learner({
                firstName: args.learnerInput.firstName,
                lastName: args.learnerInput.lastName,
                email: args.learnerInput.email,
                password: hashedPassword,
                age: args.learnerInput.age
            });

            const result = await learner.save();
            console.log(result);
            return transformLearner(result);
        }
        catch (err)
        {
            console.log(err);
            throw err;
        }
    }
}