const graphql = require('graphql');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

const {User}= require('./../models/user');
const {Games} = require('../models/Games');
const {Orders} = require('../models/orders');


//********************************* */
//GLOBAL VARIABLES
var pass = '';
//********************************* */

const {
    GraphQLObjectType,
    raphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        name:       { type:  GraphQLString },
        lastname:   { type:  GraphQLString },
        email:      { type:  GraphQLString },
        password:   { type:  GraphQLString },
        city:       { type:  GraphQLString },
        adress:     { type:  GraphQLString },
        postalcode: { type:  GraphQLString },
    })
});

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: ()=>({
        name:   { type: GraphQLString },
        genre:  { type: GraphQLString },
        PS4:    { type: GraphQLString },
        XBOX:   { type: GraphQLString },
        PS3:    { type: GraphQLString },
        price:  { type: GraphQLFloat },
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Orders',
    fields: ()=>({
        user_name:  { type: GraphQLString },
        game_name:  { type: GraphQLString },
        platform: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(){
                return User.find({}, (err, user)=>{
                    if(!user) return console.log('Users are not found');
                    else{
                        console.log('users are found')
                        //console.log(user)
                    }
                    
                }
            )
            }
        },
        user: {
            type: UserType,
            args:{
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, args){
                User.findOne({'email': args.email}, (err, user)=>{
                    if(!user){
                        return null;
                    }
                        pass='';
                        pass=user.password
                    })
                pass_valid = bcrypt.compareSync(args.password, pass);
                console.log(pass_valid)
                if(pass_valid){
                    return User.findOne({'email': args.email})
                }
                else{
                    return null;
                }
            }

        },
        game:{
            type: GameType,
            args:{
                name: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return Games.findOne({'name': args.name})
            }
        },
        games: {
            type: new GraphQLList(GameType),
            resolve(){
                return Games.find({}, (err, game)=>{
                    if(!game) return console.log('Games are not found');
                    else{
                        console.log(game)
                        //console.log(user)
                    }
                });
            }
        },
        gamePS4: {
            type: new GraphQLList(GameType),
            resolve(){
                return Games.find({'PS4': 'ANO'}, (err, game)=>{
                    if(!game) return console.log('PS4 games are not found.');
                    else{
                        console.log(game)
                        //console.log(user)
                    }
                });
            }
        },
        gamePS3: {
            type: new GraphQLList(GameType),
            resolve(){
                return Games.find({'PS3': 'ANO'}, (err, game)=>{
                    if(!game) return console.log('PS3 games are not found.');
                    else{
                        console.log(game)
                        //console.log(user)
                    }
                });
            }
        },
        gameXBOX: {
            type: new GraphQLList(GameType),
            resolve(){
                return Games.find({'XBOX': 'ANO'}, (err, game)=>{
                    if(!game) return console.log('XBOX games are not found.');
                    else{
                        console.log(game)
                        //console.log(user)
                    }
                });
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(){
                return Orders.find({}, (err, order)=>{
                    if(!order) return console.log('Orders are not found');
                    console.log(order);
                })
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                lastname: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                city: {type: GraphQLString},
                adress: {type: GraphQLString},
                postalcode: {type: GraphQLString}
            },
            resolve(parentValue, args){
                const user = new User(args);
                user.password = bcrypt.hashSync(user.password)
                return user.save()
            }
        },
        addGame: {
            type: GameType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                PS4: {type: GraphQLString},
                XBOX: {type: GraphQLString},
                PS3: {type: GraphQLString},
                price: {type: GraphQLFloat}
            },
            resolve(parentValue, args){
                const game = new Games(args);
                return game.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                user_name: {type: GraphQLString},
                game_name: {type: GraphQLString},
                platform: {type: GraphQLString}
            },
            resolve(parentValue, args){
                const order = new Orders(args);
                return order.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
    //mutation
})