import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { getSwapiPlanets } from '../../services/swapi.service';
import { getSwapiPlanetHandler } from '../swapiPlanetsHandler';

const mockData = [
  {
    nombre: 'Tatooine',
    periodo_de_rotación: '23',
    periodo_orbital: '304',
    diámetro: '10465',
    clima: 'arid',
    gravedad: '1 standard',
    terreno: 'desert',
    agua_superficial: '1',
    población: '200000',
    residentes: ['Luke Skywalker', 'Anakin Skywalker', 'Shmi Skywalker'],
    películas: ['A New Hope', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith'],
    creado: '2014-12-09T13:50:49.641000Z',
    editado: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.dev/api/planets/1/',
  },
];

jest.mock('../../services/swapi.service', () => ({
  getSwapiPlanets: jest.fn(() => mockData),
}));

describe('getSwapiPlanetHandler', () => {
  it('debe llamar a getSwapiPlanetHandler retornar su resultado', async () => {
    const event: any = {
      body: {},
    };

    const result = await getSwapiPlanetHandler(
      event,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(getSwapiPlanets).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(mockData);
  });
});
