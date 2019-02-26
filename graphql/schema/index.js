const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type Enrolment {
    id: ID!
    course: Course!
    learner: Learner!
    progress: Int
    createdAt: String!
    updatedAt: String!
}

type Learner {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    age: Int
    enrolments: [Enrolment!]
}

"""Course that Learners can be enrolled on"""
type Course {
    """Unique identifier of a Course"""
    id: ID!
    """Title of a Course"""
    title: String!
    """Description of a Course"""
    description: String!
    """Start date of a Course"""
    date: String!
    """Location of a Course"""
    location: String!
}

input LearnerInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int
}

"""An input for creating a Course"""
input CourseInput {
    """Title of a Course being created"""
    title: String!
    """Description of a Course being created"""
    description: String!
    """Start date of a Course being created"""
    date: String!
    """Location of a Course being created"""
    location: String!
}


input EnrolmentInput {
    courseId: ID!
    learnerId: ID!
    progress: Int
}

input FilterInput {
    field: String!
    operator: Operators!
    value: String!
}

input SortInput {
    field: String!
    direction: Direction!
}

enum Operators {
    EQUALS
    CONTAINS
}

enum Direction {
    ASC
    DESC
}

type RootQuery {
    """Fetches an individual Learner by the ID"""
    learner(id: ID): Learner!
    """Fetches a list of Learners with optional Filter and Sort arguments"""
    learners(filter: FilterInput, sort: SortInput): [Learner!]!
    """Fetches an individual Course by its ID"""
    course(id: ID): Course!
    """Fetches a list of Courses"""
    courses: [Course!]!
    """Fetches an individual Enrolment by its ID"""
    enrolment(id: ID): Enrolment!
    """Fetches a list of Enrolments"""
    enrolments: [Enrolment!]!
}

type RootMutation {
    """Creates a new Learner"""
    createLearner(learnerInput: LearnerInput): Learner!
    """Creates a new Course"""
    createCourse(courseInput: CourseInput): Course!
    """Enrols existing Learner on a Course"""
    enrolLearner(enrolmentInput: EnrolmentInput): Enrolment!
    """Cancels Enrolments of a Learner on a Course"""
    cancelEnrolment(enrolmentId: ID!): String!
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`)
