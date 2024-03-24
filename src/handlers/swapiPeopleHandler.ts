import { APIGatewayProxyHandler } from 'aws-lambda';
import { getSwapiPeople } from '../services/swapi.service';

/**
 * Maneja las solicitudes para obtener la lista de personas desde la API de Star Wars (SWAPI).
 * @param event El evento de la solicitud API Gateway que desencadena la invocación de esta función.
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos de las personas obtenidos de la API de Star Wars, o un mensaje de error en caso de fallo.
 */
export const getSwapiPeopleHandler: APIGatewayProxyHandler = async (event) => {
  return await getSwapiPeople();
};
