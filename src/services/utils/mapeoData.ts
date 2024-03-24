export const mapeoPeople = {
  name: 'nombre',
  height: 'altura',
  mass: 'masa',
  hair_color: 'color_de_cabello',
  skin_color: 'color_de_piel',
  eye_color: 'color_de_ojos',
  birth_year: 'año_de_nacimiento',
  gender: 'género',
  homeworld: 'planeta_natal',
  films: 'películas',
  species: 'especies',
  vehicles: 'vehículos',
  starships: 'naves_estelares',
  created: 'creado',
  edited: 'editado',
  url: 'url',
};

export const mapeoPlanet = {
  name: 'nombre',
  rotation_period: 'periodo_de_rotación',
  orbital_period: 'periodo_orbital',
  diameter: 'diámetro',
  climate: 'clima',
  gravity: 'gravedad',
  terrain: 'terreno',
  surface_water: 'agua_superficial',
  population: 'población',
  residents: 'residentes',
  films: 'películas',
  created: 'creado',
  edited: 'editado',
  url: 'url',
};

/**
 * Transforma las claves de un objeto según un mapeo de claves proporcionado.
 * @param data El objeto cuyas claves se van a transformar.
 * @param mapeo Un objeto que define el mapeo de claves, donde las claves representan las claves originales y los valores representan las nuevas claves.
 * @returns Un nuevo objeto con las claves transformadas según el mapeo proporcionado.
 */
const transformarClaves = <T, O>(data: T, mapeo: Record<string, string>): O => {
  return Object.entries(data!).reduce((acc, [clave, valor]) => {
    const claveTraducida = mapeo[clave] || clave;
    return { ...acc, [claveTraducida]: valor };
  }, {} as O);
};

/**
 * Mapea un array de objetos según un mapeo de claves proporcionado.
 * @param data El array de objetos que se va a mapear.
 * @param mapeo Un objeto que define el mapeo de claves, donde las claves representan las claves originales y los valores representan las nuevas claves.
 * @returns Un nuevo array de objetos con las claves transformadas según el mapeo proporcionado.
 */
export const mapearData = <T, O>(data: T[], mapeo: Record<string, string>): O[] => {
  return data.map((item) => transformarClaves(item, mapeo));
};
