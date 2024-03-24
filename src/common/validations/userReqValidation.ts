import { UserReqBody } from '../interfaces/user.interface';

type ErrorField = { field: string; message: string };

/**
 * Función para validar un objeto UserReqBody.
 * @param user El objeto UserReqBody que se va a validar.
 * @returns Devuelve un array de errores con los mensajes si el campo no cumple con los criterios de validación, de lo contrario devuelve array[].
 */
export const validateUserReqBody = (user: UserReqBody): ErrorField[] => {
  const errors: ErrorField[] = [];

  // Verificar si todos los campos requeridos están presentes y tienen valores válidos
  if (!user.userName || typeof user.userName !== 'string' || user.userName.trim() === '') {
    errors.push({
      field: 'userName',
      message: 'El nombre de usuario es requerido y debe ser una cadena no vacía.',
    });
  }

  if (!user.fullName || typeof user.fullName !== 'string' || user.fullName.trim() === '') {
    errors.push({
      field: 'fullName',
      message: 'El nombre completo es requerido y debe ser una cadena no vacía.',
    });
  }

  if (!user.email || typeof user.email !== 'string' || !isValidEmail(user.email)) {
    errors.push({
      field: 'email',
      message: 'El email es requerido y debe ser una dirección de correo electrónico válida.',
    });
  }

  if (!user.age || typeof user.age !== 'number' || user.age <= 0) {
    errors.push({
      field: 'age',
      message: 'La edad es requerida y debe ser un número mayor que cero.',
    });
  }

  if (!user.password || typeof user.password !== 'string' || user.password.length < 6) {
    errors.push({
      field: 'password',
      message: 'La contraseña es requerida y debe tener al menos 6 caracteres.',
    });
  }
  return errors;
};

/**
 * Función para validar un email.
 * @param email La cadena que representa la dirección de correo electrónico a validar.
 * @returns Devuelve true si el formato del email es válido, de lo contrario devuelve false.
 */
const isValidEmail = (email: string): boolean => {
  // Utilizamos una expresión regular simple para verificar si el formato del email es válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
