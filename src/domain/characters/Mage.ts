import { BaseCharacter } from './BaseCharacter';
import { GenderType } from '../interfaces/ICharacter';

export class Mage extends BaseCharacter {
  constructor(name: string = 'Merlín', gender: GenderType = 'male') {
    const avatar = gender === 'female' ? '🔮👩' : gender === 'neutral' ? '✨🔮' : '🔮🧙‍♂️';
    super(name, 'Mago', 'mage', gender, avatar, {
      hp: 70,
      maxHp: 70,
      mp: 150,
      maxMp: 150,
      attack: 35,
      defense: 8,
      speed: 12
    });
  }
}
