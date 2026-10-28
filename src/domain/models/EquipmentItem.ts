import { Stats } from './Stats';

export type ItemRarity = 'Común' | 'Raro' | 'Épico' | 'Legendario';

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor';
  rarity: ItemRarity;
  icon: string;
  description: string;
  statBonus: Partial<Stats>;
}

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  icon: string;
  description: string;
  /** Modificadores planos (p.ej +20 ataque) */
  flatBonus?: Partial<Stats>;
  /** Modificadores porcentuales (p.ej 1.25 para +25% de ataque) */
  multiplierBonus?: Partial<Stats>;
}
