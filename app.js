
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/graphql',  
        graphqlHTTP({
            schema: buildSchema(`
                type RootQuery {
                    event: [String!]!
                }
                
                type RootMutation {
                    createEvent(name: String): String
                    deleteEvent(id:Int, name: String): String
                }
                schema {
                    query: RootQuery
                    mutation: RootMutation
                }  
            `), 
            rootValue: {
                event: () => {
                    const data_json = [ { name: "yousef", age: '19', agp: '120' }, { name: "mohammed", age: '22', agp: '60' }, { name: "khalel", age: '24', agp: '88' } ]
                    const names = data_json.map(data => {
                        const alldata = data.name;
                        return alldata;
                    });
                    return names;
                },
                createEvent: (args) => {
                    const eventName = args.name;
                    return eventName;
                }, 
                deleteEvent: (args) =>{
                    const id_user = args.id;
                    const name = args.name;
                    return `delete user Id: ${id_user}>>> Name: ${name}`;
                }
            },
            graphiql: true
        }   
    )
);

app.listen(PORT)
