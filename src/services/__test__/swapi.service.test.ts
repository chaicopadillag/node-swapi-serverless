import axios from 'axios';
import { HttpStatus, message } from '../../common/enums';
import { getSwapiPeople, getSwapiPlanets } from '../swapi.service';

jest.mock('axios');

describe('getSwapiPeople', () => {
  it('debería devolver los datos mapeados de personas desde SWAPI', async () => {
    const dataMapea = [
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

    const mockData = {
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'Tatooine',
            films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
            species: ['Human'],
            vehicles: [],
            starships: ['X-wing', 'Imperial shuttle'],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockData);

    jest.mock('../utils/mapeoData', () => ({
      mapearData: jest.fn(() => dataMapea),
    }));

    const result = await getSwapiPeople();
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(dataMapea));
  });

  it('debería detectar el error y manejar de SWAPI', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('Error Api Test')
    );

    const result = await getSwapiPeople();
    expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body).toEqual(JSON.stringify({ message: message.internalServerError }));
  });
});

describe('getSwapiPlanets', () => {
  it('debería devolver los datos mapeados de planetas desde SWAPI', async () => {
    const mockData = {
      data: {
        results: [
          {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '1 standard',
            terrain: 'desert',
            surface_water: '1',
            population: '200000',
            residents: ['Luke Skywalker', 'Anakin Skywalker', 'Shmi Skywalker'],
            films: [
              'A New Hope',
              'The Phantom Menace',
              'Attack of the Clones',
              'Revenge of the Sith',
            ],
            created: '2014-12-09T13:50:49.641000Z',
            edited: '2014-12-20T20:58:18.411000Z',
            url: 'https://swapi.dev/api/planets/1/',
          },
        ],
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockData);

    const dataMapea = [
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
        películas: [
          'A New Hope',
          'The Phantom Menace',
          'Attack of the Clones',
          'Revenge of the Sith',
        ],
        creado: '2014-12-09T13:50:49.641000Z',
        editado: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/',
      },
    ];

    jest.mock('../utils/mapeoData', () => ({
      mapearData: jest.fn(() => dataMapea),
    }));

    const result = await getSwapiPlanets();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(dataMapea));
  });

  it('debería prevenir el error generado por SWAPI api', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('Error api test')
    );

    const result = await getSwapiPlanets();

    expect(result.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body).toEqual(JSON.stringify({ message: message.internalServerError }));
  });
});
