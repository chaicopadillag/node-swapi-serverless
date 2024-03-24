export interface SwapiPlantsResponseI {
  count: number;
  next: string;
  previous: null;
  results: PlanetI[];
}

export interface PlanetI {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetaI {
  nombre: string;
  periodo_de_rotación: string;
  periodo_orbital: string;
  diámetro: string;
  clima: string;
  gravedad: string;
  terreno: string;
  agua_superficial: string;
  población: string;
  residentes: string[];
  películas: string[];
  creado: string;
  editado: string;
  url: string;
}
