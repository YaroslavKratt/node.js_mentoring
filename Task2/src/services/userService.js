const arraySort = require('array-sort');
const uuid = require('uuid');
const storage = new Map();


exports.getUserById = (id) => {
    const user = storage.get(id);
    if (isUserExist(user)) {
        return user;
    }
    return;
};

exports.createIdForNewUser = (user) => {
    if ('id' in user && storage.has(user.id)) {
        return user.id;
    }
    return uuid.v4();
};

exports.getAutoSuggestUsers = (loginSubstring, limit) => {
    return arraySort(Array.from(storage.values()), 'login')
        .filter(user => {
            return user.login.toUpperCase()
                .includes(loginSubstring.toUpperCase());
        })
        .slice(0, limit + 1);
};

exports.deleteUser = (id) => {
    const  userToDelete = storage.get(id);
    userToDelete.isDeleted = true;
    storage.set(id, userToDelete);
};

exports.storage = storage;

function isUserExist(user) {
    return  user !== undefined
      && (!user.hasOwnProperty('isDeleted') || !user.isDeleted);
}
