import { BaseCharacter } from './BaseCharacter';
import { GenderType } from '../interfaces/ICharacter';

export class Warrior extends BaseCharacter {
  constructor(name: string = 'Lancelot', gender: GenderType = 'male') {
    const avatar = gender === 'female' ? '🛡️👩' : gender === 'neutral' ? '⚔️🛡️' : '🛡️👨';
    super(name, 'Guerrero', 'warrior', gender, avatar, {
      hp: 120,
      maxHp: 120,
      mp: 30,
      maxMp: 30,
      attack: 25,
      defense: 20,
      speed: 10
    });
  }
}
