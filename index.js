'use strict'
const express = require('express');
const {graphql, buildSchema} = require('graphql');
const gqlMiddleware = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 3000;
//Definicion del esquema

const schema = buildSchema(`
    type Query {
        hello: String,
        saludo: String
    }
`);

//Config resolvers

const resolvers = {
    hello: () => 'Hola mundo',
    saludo: () => 'Holaaaa'
};

//Ejecucion del Query

graphql(schema, `{hello, saludo}`, resolvers).then(result => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});