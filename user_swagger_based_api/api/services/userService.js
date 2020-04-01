// const arraySort = require('array-sort');
// const uuid = require('uuid');
const User = require('../models/user');

exports.getAllUsers =  () => {
    return User.find();
};
exports.getUserById =  (id) => {
    return User.findById(id);
};

exports.createOrUpdateUser =   (user) => {
    return User.findOneAndUpdate({ login:user.login }, user, { upsert:true, new:true });
};

exports.getAutoSuggestUsers = (loginSubstring, limit) => {
    return User.find({ login: { '$regex': `${loginSubstring}`, '$options': 'i' } })
        .limit(parseInt(limit, 10));
};

exports.deleteUser = (id) => {
    return User.deleteOne({ _id: id });
};
