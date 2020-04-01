const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    login: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required:false
    }

});

module.exports = mongoose.model('User', userSchema);
