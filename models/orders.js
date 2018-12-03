const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    email: {
        require: true,
        type: String,
        maxlength: 100
    },
    game: {
        require: true,
        type: String,
        maxlength: 100
    },
    price:{
        require: true,
        type: Number
    },
    id: {
        type: String,
        maxlength:100
    }
})

const Orders = mongoose.model('Orders',ordersSchema);
module.exports = { Orders };