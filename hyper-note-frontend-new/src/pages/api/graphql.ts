import { ApolloServer, gql } from "apollo-server-micro"
import { send } from "micro";
import Cors from 'micro-cors';

const cors = Cors();

const typeDefs = gql`
    type Query{
        hello: String
    }

`
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World"
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startserver = server.start()

export default cors(async (req, res) => {
    await startserver
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    return await server.createHandler({
        path: '/api/graphql',
    })(req, res);
});


export const config = {
    api: {
        bodyParser: false,
    },
};