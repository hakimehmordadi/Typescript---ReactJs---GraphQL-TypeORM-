import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jwtSecret: 'QqhdgK',
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  fixerAPIKey: 'f1a3195dfb1c134443a3636e5c7d87d3',
  restCountriesHost: process.env.REST_COUNTRIES_HOST,
  fixerHost: process.env.FIXER_HOST,
};
