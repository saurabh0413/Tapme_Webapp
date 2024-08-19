import { makeExecutableSchema } from '@graphql-tools/schema';
import userResolvers from './resolvers/userResolvers';


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
  typeDefs,
  resolvers:userResolvers
});
