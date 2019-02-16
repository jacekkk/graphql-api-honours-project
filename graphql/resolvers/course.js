const Course = require('../../models/course');
const { transformCourse } = require('./response-parsers')


module.exports = {
    course: async args => {
        try
        {
            const course = await Course.findById(args.id);
            return transformCourse(course);
        }
        catch (err)
        {
            throw err;
        }
    },
    courses: async () => {
        try
        {
            const courses = await Course.find();
            return courses.map(course => {
                return transformCourse(course);
            });
        }
        catch (err)
        {
            throw err;
        }
    },
    createCourse: async args => {
        try
        {
            const course = new Course({
                title: args.courseInput.title,
                description: args.courseInput.description,
                date: new Date(args.courseInput.date),
                location: args.courseInput.location
            });
            const result = await course.save();

            return transformCourse(result);
        }
        catch (err)
        {
            throw err;
        }
    }
}
