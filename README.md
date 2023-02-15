# typescript-typeorm-graphql

This project started to develop `TypeScript` backend with `GraphQL` strongly typed models
`NodeJS`, `GraphQL`, `Apollo`, `Typeorm` and `Express`.

# Summary

For making decision about using each technology we should have good consideration. May be there are some situation that force us to sacrifice one of them to others. For example sacrifice security against performance and so on.

# Server Side

`RestApi`, `qrapgqlapi`, `Apollo Server`
I’m using TypeORM to have possibility to be able easy switch between different databases.
I would like to use HTTP ONLY cookies to have better security.
It’s better having separate layers for Repository and Service so there would be a service for calculating exchange rates.
Using DTO mechanism.
Create modular validation.
Handling security in a better way for example refresh token or storing token in data base.
Using Graphql federation gateway.
Test layer

# Client Side

`Reactjs`, `graphQL`
Test (functional and End-To-End with cypress)
Layering Apollo better (Link, Retry, Auth, Config, URL)
Auth handling in a good way
Create browsing history
Create component for search
Create component for using inside suspence
Logout
Setup nginx, create build
Create installation file to having automation with docker


# In order to run project put in .env file something like:

PORT=4020
TOKEN_EXPIRATION=1
JWT_SECRET: 'qwertyuiopasdfghjklzxcvbnm123456',
REST_COUNTRIES_HOST:
FIXER_HOST:
FIXER_API_KEY:

# Database

Using of typeorm give the ability to set more databases such as
`Mongodb`, `Sqllite`, `Sql`, `postgres` , ...

# Running

- clone the repo
- npm i
- nodemon --exec ts-node src/server.ts
- go to localhost:4020/graphql

# GraphQL Queries:

query getCountries($name: String){
    getCountries(name: Iran){
        name
        population
        currencies{
            name
            code
            symbol
            exchangeRate
        }
    }
}

# Credits

Inital fork of this project came from
