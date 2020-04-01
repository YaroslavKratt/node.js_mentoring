import userController from '../src/controllers/userController';
import userService from '../src/services/userService';

jest.mock('../src/services/userService');

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
const message = 'message';


test('should get user by id', () => {
    const user = { login:'login' };
    userService.getUserById.mockReturnValue(user);

    userController.getUserById(req, res);
    expect(res.json).toHaveBeenCalledWith(user);
});

test('should return error message if there is no user with requierd id', () => {
    userService.getUserById = jest.fn().mockImplementation(() => {
        throw new Error(message);
    });

    userController.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(message);
});

test('should get group by id',   async () => {
    const group = { group:'admin' };
    userService.getUserGroupById.mockReturnValue(group);

    await userController.getUserGroupById(req, res);
    expect(res.json).toHaveBeenCalledWith(group);
});

test('should return error message if there is no userGroup with requierd id', async () => {
    userService.getUserGroupById = jest.fn().mockImplementation(() => {
        throw new Error(message);
    });

    await userController.getUserGroupById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(`No group found with id id. Error: ${message}`);
});

test('should create or update user', () => {
    const expectedStorage =  new Map([['1', { id: '1',
        login: 'admin',
        password: 'admin',
        groupId: 'admin',
        age: 100 }], ['id', { body: 'body', id: 'id' }]]);
    userService.createIdForNewUser.mockReturnValue(id);

    userController.createOrUpdateUser(req, res);

    expect(userService.storage).toEqual(expectedStorage);
});
