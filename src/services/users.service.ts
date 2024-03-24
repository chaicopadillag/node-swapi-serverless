import { APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { dynamodb } from '../common/database';
import { HttpStatus, message } from '../common/enums';
import { UserReqBody } from '../common/interfaces/user.interface';

/**
 * Crea un nuevo usuario en la base de datos.
 * @param body El cuerpo de la solicitud que contiene los datos del usuario a crear.
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos del nuevo usuario, o un mensaje de error en caso de fallo.
 */
export const createUserService = async (body: UserReqBody): Promise<APIGatewayProxyResult> => {
  try {
    // Generar un nuevo ID único para el usuario
    const newUser: UserReqBody = {
      id: uuid(),
      age: body.age,
      email: body.email,
      fullName: body.fullName,
      password: body.password,
      userName: body.userName,
    };

    // Insertar el nuevo usuario en la base de datos
    await dynamodb
      .put({
        TableName: 'usersTable',
        Item: newUser,
      })
      .promise();

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify(newUser, null, 2),
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
 * Obtiene la lista de usuarios desde la base de datos.
 * @returns Un objeto `APIGatewayProxyResult` que contiene el estado de la solicitud y los datos de los usuarios, o un mensaje de error en caso de fallo.
 */
export const getUserService = async (): Promise<APIGatewayProxyResult> => {
  try {
    // Escanear la tabla de usuarios en la base de datos para obtener todos los registros
    const { Items } = await dynamodb.scan({ TableName: 'usersTable' }).promise();

    return {
      statusCode: HttpStatus.OK,
      body: JSON.stringify({ ...Items }, null, 2),
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
