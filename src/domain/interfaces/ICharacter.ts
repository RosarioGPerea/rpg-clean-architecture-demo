import { Stats } from '../models/Stats';

/**
 * Interfaz Componente Principal (Patrón Decorator).
 * Define el contrato que cumplen tanto los Personajes Base como los Decoradores.
 */
export interface ICharacter {
  /** Obtiene el nombre del personaje */
  getName(): string;

  /** Obtiene la clase o profesión base (Guerrero, Mago, Pícaro) */
  getJob(): string;

  /** Obtiene la descripción detallada del estado actual */
  getDescription(): string;

  /** Obtiene las estadísticas acumuladas finales (calculadas dinámicamente) */
  getStats(): Stats;

  /** Obtiene la lista de capas/decoradores aplicados a este personaje */
  getAppliedDecorators(): string[];

  /** Obtiene el objeto base sin decoradores si fuera necesario */
  getBaseCharacter(): ICharacter;
}
