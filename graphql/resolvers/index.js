const learnerResolver = require('./learner');
const courseResolver = require('./course');
const enrolmentResolver = require('./enrolment');

const rootResolver = {
    ...learnerResolver,
    ...courseResolver,
    ...enrolmentResolver
};

module.exports = rootResolver;
