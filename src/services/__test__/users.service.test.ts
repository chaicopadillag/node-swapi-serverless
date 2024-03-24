import { APIGatewayProxyResult } from 'aws-lambda';
import { dynamodb } from '../../common/database';
import { message } from '../../common/enums';
import { createUserService, getUserService } from '../users.service';

const mockItems = [
  {
    id: '1',
    age: 30,
    email: 'user1@example.com',
    fullName: 'User One',
    password: 'password1',
    userName: 'user1',
  },
  {
    id: '2',
    age: 35,
    email: 'user2@example.com',
    fullName: 'User Two',
    password: 'password2',
    userName: 'user2',
  },
];

jest.mock('../../common/database', () => ({
  dynamodb: {
    put: jest.fn().mockReturnThis(),
    scan: () => ({
      promise: () => ({
        Items: mockItems,
      }),
    }),
    promise: jest.fn(),
  },
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => '8d1b134a-6a85-4c06-b674-91e5c38cbe0f'),
}));

describe('createUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crea un nuevo usuario correctamente', async () => {
    const mockBody = {
      age: 25,
      email: 'test@example.com',
      fullName: 'Test User',
      password: '123456',
      userName: 'testuser',
    };

    const expectedResponse: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        id: '8d1b134a-6a85-4c06-b674-91e5c38cbe0f',
        age: 25,
        email: 'test@example.com',
        fullName: 'Test User',
        password: '123456',
        userName: 'testuser',
      }),
    };

    const result = await createUserService(mockBody);

    expect(result).toEqual(expectedResponse);
  });

  it('prevenir  el error al crea un nuevo nuevo', async () => {
    const mockBody = {
      age: 25,
      email: 'test@example.com',
      fullName: 'Test User',
      password: '123456',
      userName: 'testuser',
    };

    const expectedResponse: APIGatewayProxyResult = {
      statusCode: 500,
      body: JSON.stringify({ message: message.internalServerError }),
    };
    const mockScan = jest.fn().mockImplementation(() => {
      throw new Error('Error Put dynamodb test');
    });
    jest.spyOn(dynamodb, 'put').mockImplementation(mockScan);

    const result = await createUserService(mockBody);

    expect(result).toEqual(expectedResponse);
  });
});

describe('getUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('obtiene la lista de usuarios correctamente', async () => {
    const expectedResponse: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({ ...mockItems }),
    };

    const result = await getUserService();

    expect(result).toEqual(expectedResponse);
  });

  it('debe de prevenir el error al listar users', async () => {
    const mockScan = jest.fn().mockImplementation(() => {
      throw new Error('Error Scan dynamodb test');
    });
    jest.spyOn(dynamodb, 'scan').mockImplementation(mockScan);

    const expectedResponse: APIGatewayProxyResult = {
      statusCode: 500,
      body: JSON.stringify({ message: message.internalServerError }),
    };

    const result = await getUserService();

    expect(result).toEqual(expectedResponse);
  });
});
