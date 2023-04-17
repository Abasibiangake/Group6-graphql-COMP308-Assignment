// schemas.js
const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLDate
} = graphql;

var InfoModel = require('../models/info.server.model');


// Create a graphql Object Type for User model
const InfoType = new GraphQLObjectType({
    name: 'Info',
    fields: () => ({
        patientId: { type: GraphQLString },
        date: { type: GraphQLString },
        pulseRate: { type: GraphQLInt },
        bloodPressure: { type: GraphQLInt },
        weight: {type: GraphQLInt},
        temperature: { type: GraphQLInt },
        respiratoryRate: { type: GraphQLInt }
    })
});

const info ={   
        addInfo: {
        type: InfoType,
        args: {
          patientId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          date: {
            type: new GraphQLNonNull(GraphQLString)
          },
          pulseRate: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          bloodPressure: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          weight: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          temperature: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          respiratoryRate: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          
        },
        resolve: function (root, params) {
          const infoModel = new InfoModel(params);
          const newInfo = infoModel.save();
          if (!newInfo) {
            throw new Error('Error not new Record');
          }
          return newInfo
        }
      }
  };
    
    

module.exports = { info: info };
