const UserModel = require('../repositories/models/userModel');
const LoginService = require('../services/LoginService');
const { createSigner } = require('fast-jwt');

// filepath: c:\Users\Usuario\Documents\ntt\cix\express-be\services\LoginService.test.js

jest.mock('../repositories/models/userModel');
jest.mock('fast-jwt', () => ({
    createSigner: jest.fn()
}));

describe('LoginService', () => {
    let loginService;
    let userModelMock;

    beforeEach(() => {
        userModelMock = new UserModel();
        loginService = new LoginService(userModelMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('should return user when getUserByEmail resolves successfully', async () => {
            const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
            userModelMock.getUserByEmail.mockResolvedValue(mockUser);

            const result = await loginService.getUser('test@example.com');

            expect(result).toEqual(mockUser);
            expect(userModelMock.getUserByEmail).toHaveBeenCalledWith('test@example.com');
        });

        it('should throw an error when getUserByEmail rejects', async () => {
            const mockError = new Error('User not found');
            userModelMock.getUserByEmail.mockRejectedValue(mockError);

            await expect(loginService.getUser('test@example.com')).rejects.toThrow('User not found');
            expect(userModelMock.getUserByEmail).toHaveBeenCalledWith('test@example.com');
        });
    });

    describe('login', () => {
        it('should return token when login is successful', async () => {
            const mockUser = { email: 'test@example.com', password: '$2a$10$xdocJP/cbfJwZJc1Ni8hY.2Ic.mlvWl6JV0r90.0LoZGVNBi45UeC' };
            userModelMock.getUserByEmail.mockResolvedValue(mockUser);
            const mockToken = 'mockToken';
            const mockSigner = jest.fn().mockReturnValue(mockToken);
            createSigner.mockReturnValue(mockSigner);

            const result = await loginService.login('test@example.com', 'password');

            expect(result).toBe(mockToken);
            expect(userModelMock.getUserByEmail).toHaveBeenCalledWith('test@example.com');
            expect(mockSigner).toHaveBeenCalledWith({ user: 'test@example.com', name: undefined });
        });

        it('should return false when password validation fails', async () => {
            const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
            userModelMock.getUserByEmail.mockResolvedValue(mockUser);

            const result = await loginService.login('test@example.com', 'password');

            expect(result).toBe(false);
            expect(userModelMock.getUserByEmail).toHaveBeenCalledWith('test@example.com');
        });
    });
});