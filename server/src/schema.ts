import { makeExecutableSchema } from '@graphql-tools/schema';


const typeDefs = `
  type Query {
    getUser(id: String!): User
  }

  type Mutation {
    tapCoin(id: String!): User
  }

  type User {
    id: String!
    coins: Int!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs
});
