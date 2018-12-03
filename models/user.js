const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        require: true,
        minlength: 5
    },
    name: {
        type: String,
        require: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        require: true,
        maxlength: 100
    },
    card:{
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token:{
        type: String
    },
    city:{
        type: String,
        require: true,
        maxlength: 100
    },
    adress:{
        type: String,
        require: true,
        maxlength: 100
    },
    postalcode:{
        type: String,
        require: true,
        maxlength: 20
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }