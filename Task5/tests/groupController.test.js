import groupService from '../src/services/groupService';
import groupController from '../src/controllers/groupController';

jest.mock('../src/services/groupService');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const id = 'id';
const body = 'body';
const req = { params:{ id }, body:{ body } };
const res = mockResponse();


test('should get group by id', () => {
    const group = { group:'group' };
    groupService.getGroupById.mockReturnValue(group);

    groupController.getGroupById(req, res);
    expect(res.json).toHaveBeenCalledWith(group);
});

test('should return error when group with id does not exist', () => {
    groupService.getGroupById.mockReturnValue(undefined);

    groupController.getGroupById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('No group found');
});

test('should get all grousp', () => {
    const groups = [{ group:'group' }];
    groupService.getAllGroups.mockReturnValue(groups);

    groupController.getAllGroups(req, res);
    expect(res.json).toHaveBeenCalledWith(groups);
});
