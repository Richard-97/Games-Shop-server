const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    genre: {
        require: true,
        type: String,
        maxlength: 100
    },
    PS4: {
        type: String,
        require: true
    },
    XBOX: {
        type: String,
        require: true
    },
    PS3: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

const Games = mongoose.model('Games',gamesSchema);
module.exports = { Games };