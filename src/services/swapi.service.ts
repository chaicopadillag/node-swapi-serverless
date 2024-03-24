import { APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { HttpStatus, message } from '../common/enums';
import {
  PeopleI,
  PersonaI,
  PlanetI,
  PlanetaI,
  SwapiPeopleResponseI,
  SwapiPlantsResponseI,
} from './interfaces';
import { mapearData, mapeoPeople, mapeoPlanet } from './utils';

/**
 * Obtiene la lista de personas desde la API de Star Wars (SWAPI).
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos de las personas mapeadas, o un mensaje de error en caso de fallo.
 */
export const getSwapiPeople = async (): Promise<APIGatewayProxyResult> => {
  try {
    // Construir la URL de la API de SWAPI para obtener la lista de personas
    const swapiApi = `${process.env.SWAPI_API}/people`;

    // Realizar la solicitud GET a la API de SWAPI para obtener los datos de las personas
    const { data } = await axios.get<SwapiPeopleResponseI>(swapiApi);

    const { results } = data;

    const dataMapeada = mapearData<PeopleI, PersonaI>(results, mapeoPeople);

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(dataMapeada, null, 2),
    };
  } catch (error) {
    // Manejo de errores: en caso de error, registra el error y devuelve un mensaje de error interno
    console.log('Errror en::', error);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: message.internalServerError }),
    };
  }
};

/**
 * Obtiene la lista de planetas desde la API de Star Wars (SWAPI).
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos de los planetas mapeados, o un mensaje de error en caso de fallo.
 */
export const getSwapiPlanets = async (): Promise<APIGatewayProxyResult> => {
  try {
    const swapiApi = `${process.env.SWAPI_API}/planets`;
    // Obtiene los datos de la respuesta

    const { data } = await axios.get<SwapiPlantsResponseI>(swapiApi);

    const { results } = data;

    const dataMapeada = mapearData<PlanetI, PlanetaI>(results, mapeoPlanet);

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(dataMapeada, null, 2),
    };
  } catch (error) {
    // Manejo de errores: en caso de error, registra el error y devuelve un mensaje de error interno
    console.log('Errror en::', error);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: message.internalServerError }),
    };
  }
};
