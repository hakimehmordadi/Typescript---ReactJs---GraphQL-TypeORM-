import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import config from './config';
import { CountryResolver } from './graphql/resolvers/countryResolver';
import routes from './routes/index';
import authorizedRequest from './middleware/checkJwt';

async function main() {
  dotenv.config();

  /** Create apollo schema */
  const schema = await buildSchema({
    resolvers: [CountryResolver],
    emitSchemaFile: true,
  });

  const app = express();
  app.use(express.json());

  app.use('*', cors());

  app.use('/', routes);
  // app.use('/graphql', authorizedRequest);

  /** Create apollo server */
  const server = new ApolloServer({
    schema,
    playground: true,
  });

  server.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(`🚀 Apollo Server on http://localhost:${config.port}/graphql`);
  });
}

main();
function async(arg0: any) {
  throw new Error('Function not implemented.');
}
