import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { HttpStatus } from '../../common/enums';
import { createUserService } from '../../services/users.service';
import { userCreateHandler } from '../userCreateHandler';

// Mockear la función createUserService
jest.mock('../../services/users.service', () => ({
  createUserService: jest.fn(),
}));

describe('userCreateHandler', () => {
  it('debe retornar un error si el cuerpo de la solicitud no es válido', async () => {
    const event: any = {
      body: undefined,
    };

    const result = await userCreateHandler(
      event,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );

    expect(result).toStrictEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: 'Los datos enviados no son válidos' }, null, 2),
    });
  });

  it('debe retornar los errores si el body no es válido', async () => {
    const event: any = {
      body: '{}',
    };

    const result = await userCreateHandler(
      event,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(result).toStrictEqual({
      statusCode: 422,
      body:
        '[\n' +
        '  {\n' +
        '    "field": "userName",\n' +
        '    "message": "El nombre de usuario es requerido y debe ser una cadena no vacía."\n' +
        '  },\n' +
        '  {\n' +
        '    "field": "fullName",\n' +
        '    "message": "El nombre completo es requerido y debe ser una cadena no vacía."\n' +
        '  },\n' +
        '  {\n' +
        '    "field": "email",\n' +
        '    "message": "El email es requerido y debe ser una dirección de correo electrónico válida."\n' +
        '  },\n' +
        '  {\n' +
        '    "field": "age",\n' +
        '    "message": "La edad es requerida y debe ser un número mayor que cero."\n' +
        '  },\n' +
        '  {\n' +
        '    "field": "password",\n' +
        '    "message": "La contraseña es requerida y debe tener al menos 6 caracteres."\n' +
        '  }\n' +
        ']',
    });
  });

  it('debe llamar a createUserService con el cuerpo de la solicitud y retornar su resultado', async () => {
    const event: any = {
      body: JSON.stringify({
        userName: 'code',
        fullName: 'Code Codero',
        email: 'code@gmail.com',
        age: 20,
        password: 'aaP6JLv6_4M5qzt',
      }),
    };
    await userCreateHandler(event, {} as Context, {} as Callback<APIGatewayProxyResult>);
    expect(createUserService).toHaveBeenCalledWith(JSON.parse(event.body));
  });
});
