export default `
    type User{
        _id: ID!
        userName: String!
        password: String!
    }

    type Query {
        allUsers: [User]!
        getUser(_id: ID!): User!
    }

    type Mutation {
    createUser(userName: String!, password: String!): User!
    }
`;
