const permissions = {
    READ:'READ',
    WRITE: 'WRITE',
    DELETE:'DELETE',
    SHARE:'SHARE',
    UPLOAD_FILES:'UPLOAD_FILES' };
const groups = [
    { id:'admin', name:'admin',
        permissions:[permissions.READ, permissions.WRITE,
            permissions.UPLOAD_FILES, permissions.DELETE, permissions.SHARE] },
    { id:'user', name:'user',
        permissions:[permissions.READ] }];

exports.getGroupById = (id) => {
    return groups.find(group => group.id === id);
};
exports.getAllGroups = () => {
    return groups;
};
