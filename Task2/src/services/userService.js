const arraySort = require('array-sort');
const uuid = require('uuid');
const bent = require('bent');
const getJson = bent('json');
const storage = new Map();
storage.set('1', { id:'1', login:'admin', password:'admin', groupId:'admin', age:100 });

exports.getUserById =  (id) => {
    const user = storage.get(id);
    if (isUserExist(user)) {
        return user;
    }
    throw new Error(`No user found with id ${id}`);
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

exports.getUserGroupById = async (id) => {
    return await getJson(process.env.ORIGIN + id);
};


exports.storage = storage;

function isUserExist(user) {
    return  user !== undefined
      && (!user.hasOwnProperty('isDeleted') || !user.isDeleted);
}
