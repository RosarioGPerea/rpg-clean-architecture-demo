/**
 * Interfaz que representa las estadísticas numéricas puras de un personaje RPG.
 */
export interface Stats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  speed: number;
}

/**
 * Función utilitaria de dominio para clonar un objeto de estadísticas.
 */
export function cloneStats(stats: Stats): Stats {
  return { ...stats };
}
