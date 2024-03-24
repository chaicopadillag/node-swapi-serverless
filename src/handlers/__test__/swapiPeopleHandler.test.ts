import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { getSwapiPeople } from '../../services/swapi.service';
import { getSwapiPeopleHandler } from '../swapiPeopleHandler';
const mockData = [
  {
    nombre: 'Luke Skywalker',
    altura: '172',
    masa: '77',
    color_de_cabello: 'blond',
    color_de_piel: 'fair',
    color_de_ojos: 'blue',
    año_de_nacimiento: '19BBY',
    género: 'male',
    planeta_natal: 'Tatooine',
    películas: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    especies: ['Human'],
    vehículos: [],
    naves_estelares: ['X-wing', 'Imperial shuttle'],
    creado: '2014-12-09T13:50:51.644000Z',
    editado: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
];

jest.mock('../../services/swapi.service', () => ({
  getSwapiPeople: jest.fn(() => mockData),
}));

describe('getSwapiPeopleHandler', () => {
  it('debe llamar a getSwapiPeopleHandler retornar su resultado', async () => {
    const event: any = {
      body: {},
    };

    const result = await getSwapiPeopleHandler(
      event,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(getSwapiPeople).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mockData);
  });
});
