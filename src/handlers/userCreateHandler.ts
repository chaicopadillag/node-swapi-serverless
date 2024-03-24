import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpStatus } from '../common/enums/httpStatus';
import { validateUserReqBody } from '../common/validations/userReqValidation';
import { createUserService } from '../services/users.service';

/**
 * Maneja las solicitudes para crear un nuevo usuario.
 * @param event El evento de la solicitud API Gateway que desencadena la invocación de esta función.
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos del nuevo usuario creado, o un mensaje de error en caso de fallo.
 */
export const userCreateHandler: APIGatewayProxyHandler = async (event) => {
  // Verificar si se proporciona un cuerpo en la solicitud
  if (!event.body) {
    return {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: 'Los datos enviados no son válidos' }, null, 2),
    };
  }

  // Parsear el cuerpo de la solicitud como objeto JSON
  const body = JSON.parse(event.body);

  // Validar el cuerpo de la solicitud
  const hasErrors = validateUserReqBody(body);

  // Verificar si hay errores de validación
  if (hasErrors.length > 0) {
    return {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      body: JSON.stringify(hasErrors, null, 2),
    };
  }
  // Llamar al servicio para crear un nuevo usuario con los datos proporcionados y devolcer.
  return await createUserService(body);
};
