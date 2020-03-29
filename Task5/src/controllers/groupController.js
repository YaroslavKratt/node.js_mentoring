import groupService from '../services/groupService';

exports.getGroupById = (req, res) => {
    const group = groupService.getGroupById(req.params.id);
    if (group !== undefined) {
        res.json(group);
    } else {
        res.status(404).send('No group found');
    }
};

exports.getAllGroups = (req, res) => {
    res.json(groupService.getAllGroups());
};
