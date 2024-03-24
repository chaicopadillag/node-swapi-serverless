import { APIGatewayProxyHandler } from 'aws-lambda';
import { getUserService } from '../services/users.service';

/**
 * Maneja las solicitudes para obtener la lista de usuarios.
 * @param event El evento de la solicitud API Gateway que desencadena la invocación de esta función.
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos de los usuarios, o un mensaje de error en caso de fallo.
 */
export const getUserHandler: APIGatewayProxyHandler = async (event) => {
  return await getUserService();
};
