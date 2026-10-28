import { EquipmentItem, StatusEffect } from '../models/EquipmentItem';
import { JobType } from '../interfaces/ICharacter';

export interface ExtendedEquipmentItem extends EquipmentItem {
  allowedJobs: JobType[];
}

export const WEAPONS: ExtendedEquipmentItem[] = [
  {
    id: 'weapon_sword_iron',
    name: 'Espada de Hierro Forjado',
    type: 'weapon',
    rarity: 'Común',
    icon: '🗡️',
    description: 'Espada equilibrada para combate físico.',
    statBonus: { attack: 15, speed: 2 },
    allowedJobs: ['warrior', 'rogue']
  },
  {
    id: 'weapon_excalibur',
    name: 'Excalibur Divina',
    type: 'weapon',
    rarity: 'Legendario',
    icon: '⚔️',
    description: 'Arma legendaria de luz ancestral.',
    statBonus: { attack: 65, hp: 50, speed: 8 },
    allowedJobs: ['warrior']
  },
  {
    id: 'weapon_staff_arcane',
    name: 'Báculo Arcano de las Sombras',
    type: 'weapon',
    rarity: 'Épico',
    icon: '🔮',
    description: 'Canaliza energías místicas y amplifica maná.',
    statBonus: { attack: 40, mp: 80, speed: 5 },
    allowedJobs: ['mage']
  },
  {
    id: 'weapon_daggers_shadow',
    name: 'Dagas Gemelas de la Penumbra',
    type: 'weapon',
    rarity: 'Raro',
    icon: '🗡️',
    description: 'Livianas y mortales para ataques rápidos.',
    statBonus: { attack: 30, speed: 18 },
    allowedJobs: ['rogue', 'warrior']
  }
];

export const ARMORS: ExtendedEquipmentItem[] = [
  {
    id: 'armor_plate_titan',
    name: 'Coraza de Titán',
    type: 'armor',
    rarity: 'Legendario',
    icon: '🛡️',
    description: 'Forjada en el núcleo de la montaña.',
    statBonus: { defense: 45, hp: 100, speed: -5 },
    allowedJobs: ['warrior']
  },
  {
    id: 'armor_robe_mystic',
    name: 'Túnica Astral Mística',
    type: 'armor',
    rarity: 'Épico',
    icon: '🥋',
    description: 'Tejida con hilos estelares y maná puro.',
    statBonus: { defense: 15, mp: 60, speed: 5 },
    allowedJobs: ['mage']
  },
  {
    id: 'armor_leather_shadow',
    name: 'Armadura de Cuero del Sombrío',
    type: 'armor',
    rarity: 'Raro',
    icon: '🧥',
    description: 'Flexible y sigilosa.',
    statBonus: { defense: 22, speed: 12, hp: 30 },
    allowedJobs: ['rogue', 'warrior']
  }
];

export const BUFFS: StatusEffect[] = [
  {
    id: 'buff_fury',
    name: 'Furia de Berserk',
    type: 'buff',
    icon: '🔥',
    description: 'Incrementa el ataque en un +30%.',
    multiplierBonus: { attack: 1.30 }
  },
  {
    id: 'buff_blessing',
    name: 'Bendición Valerosa',
    type: 'buff',
    icon: '✨',
    description: 'Aumenta HP +50 y Defensa +20.',
    flatBonus: { hp: 50, defense: 20 }
  },
  {
    id: 'buff_haste',
    name: 'Celeridad Mística',
    type: 'buff',
    icon: '⚡',
    description: 'Aumenta la velocidad un +50%.',
    multiplierBonus: { speed: 1.50 }
  }
];

export const DEBUFFS: StatusEffect[] = [
  {
    id: 'debuff_poison',
    name: 'Veneno de Serpiente',
    type: 'debuff',
    icon: '🧪',
    description: 'Reduce la salud y la defensa.',
    flatBonus: { hp: 30, defense: 10 }
  },
  {
    id: 'debuff_curse',
    name: 'Maldición de Debilidad',
    type: 'debuff',
    icon: '💀',
    description: 'Reduce el ataque total un -25%.',
    multiplierBonus: { attack: 0.75 }
  },
  {
    id: 'debuff_slow',
    name: 'Ralentización Glacial',
    type: 'debuff',
    icon: '❄️',
    description: 'Reduce la velocidad un -40%.',
    multiplierBonus: { speed: 0.60 }
  }
];

