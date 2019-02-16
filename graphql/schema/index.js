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

type Course {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
}

input LearnerInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int
}

input CourseInput {
    title: String!
    description: String!
    date: String!
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
    learner(id: ID): Learner!
    learners(filter: FilterInput, sort: SortInput): [Learner!]!
    course(id: ID): Course!
    courses: [Course!]!
    enrolment(id: ID): Enrolment!
    enrolments: [Enrolment!]!
}

type RootMutation {
    createLearner(learnerInput: LearnerInput): Learner!
    createCourse(courseInput: CourseInput): Course!
    enrolLearner(enrolmentInput: EnrolmentInput): Enrolment!
    cancelEnrolment(enrolmentId: ID!): String!
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`)
