'use strict'
const express = require('express');
const { buildSchema } = require('graphql');
const gqlMiddleware = require('express-graphql'); //Middleware de graphql, para usarse en express
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');
const app = express();
const PORT = process.env.PORT || 3000;

//Definicion del esquema
const schema = buildSchema(readFileSync(join(__dirname,'lib', 'schema.gql'), 'utf-8')); //Importacion del Schema

app.use('/api', gqlMiddleware({
    schema: schema, //Invocamos Schema 
    rootValue: resolvers, //Invocamos metodos 
    graphiql: true
}));


app.listen(PORT, console.log(`Escuchando en el puerto ${PORT}.
http://localhost:${PORT}/api`));