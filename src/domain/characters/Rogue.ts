import { BaseCharacter } from './BaseCharacter';
import { GenderType } from '../interfaces/ICharacter';

export class Rogue extends BaseCharacter {
  constructor(name: string = 'Shadow', gender: GenderType = 'male') {
    const avatar = gender === 'female' ? '🗡️👩' : gender === 'neutral' ? '🗡️🥷' : '🗡️🥷';
    super(name, 'Pícaro', 'rogue', gender, avatar, {
      hp: 85,
      maxHp: 85,
      mp: 50,
      maxMp: 50,
      attack: 28,
      defense: 12,
      speed: 25
    });
  }
}
