import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { getUserService } from '../../services/users.service';
import { getUserHandler } from '../getUserHandler';

const mockData = [
  {
    id: '159283af-d0e3-458a-ba63-64068917fd38',
    userName: 'Valerie77',
    fullName: 'Felix Stiedemann',
    email: 'Anahi44@gmail.com',
    age: 20,
    password: '1mgVWsebcgrmLCd',
  },
];

jest.mock('../../services/users.service', () => ({
  getUserService: jest.fn(() => mockData),
}));

describe('getUserHandler', () => {
  it('debe llamar a getUserHandler retornar su resultado', async () => {
    const event: any = {
      body: {},
    };

    const result = await getUserHandler(
      event,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(getUserService).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mockData);
  });
});
