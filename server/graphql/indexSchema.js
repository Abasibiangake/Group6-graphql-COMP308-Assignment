var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;


var {userquery, usermutation} = require("./schemas");
var {alertquery, alertmutation} = require("./alertGraphQLSchema");
const { motivationalVideoQuery , motivationalVideoMutation} = require("./motivationalGraphQLSchema");
const {recordQuery, recordMutation} = require("./recordSchema");

const RootQuery  = new GraphQLObjectType({
    name: "RootQuery",
    fields: function () {
      return {
        ...userquery,
        ...alertquery,
        ...motivationalVideoQuery ,
        ...recordQuery      
      };
    },
  });

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: function () {
      return {
        ...usermutation,
        ...alertmutation,
        ...motivationalVideoMutation,
        ...recordMutation   
      };
    },
  });

module.exports = new GraphQLSchema({ query: RootQuery, mutation: RootMutation });
