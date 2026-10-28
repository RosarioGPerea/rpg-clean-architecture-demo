import { CharacterDecorator } from '../CharacterDecorator';
import { ICharacter, ActiveDecoratorInfo } from '../../interfaces/ICharacter';
import { Stats } from '../../models/Stats';
import { StatusEffect } from '../../models/EquipmentItem';

export class BuffDecorator extends CharacterDecorator {
  private buff: StatusEffect;

  constructor(character: ICharacter, buff: StatusEffect) {
    super(character);
    this.buff = buff;
  }

  public getEffect(): StatusEffect {
    return this.buff;
  }

  public override getDescription(): string {
    return `${super.getDescription()} [Bajo efecto de ${this.buff.name}]`;
  }

  public override getStats(): Stats {
    const currentStats = super.getStats();
    const flat = this.buff.flatBonus || {};
    const mult = this.buff.multiplierBonus || {};

    const calcStat = (val: number, flatBonus: number = 0, multiplier: number = 1) => {
      return Math.round((val + flatBonus) * multiplier);
    };

    return {
      hp: calcStat(currentStats.hp, flat.hp, mult.hp),
      maxHp: calcStat(currentStats.maxHp, flat.maxHp || flat.hp, mult.maxHp || mult.hp),
      mp: calcStat(currentStats.mp, flat.mp, mult.mp),
      maxMp: calcStat(currentStats.maxMp, flat.maxMp || flat.mp, mult.maxMp || mult.mp),
      attack: calcStat(currentStats.attack, flat.attack, mult.attack),
      defense: calcStat(currentStats.defense, flat.defense, mult.defense),
      speed: calcStat(currentStats.speed, flat.speed, mult.speed),
    };
  }

  public override getActiveDecorators(): ActiveDecoratorInfo[] {
    const list = super.getActiveDecorators();
    list.push({
      id: this.buff.id,
      name: this.buff.name,
      type: 'buff',
      rarityOrCategory: 'Buff Positivo',
      icon: this.buff.icon,
      description: this.buff.description
    });
    return list;
  }

  public override hasStatus(effectId: string): boolean {
    return this.buff.id === effectId || super.hasStatus(effectId);
  }

  public override removeStatus(effectId: string): ICharacter {
    if (this.buff.id === effectId) {
      return this.character;
    }
    const innerUnwrapped = this.character.removeStatus(effectId);
    return new BuffDecorator(innerUnwrapped, this.buff);
  }

  protected override rebuildWithNewComponent(newBase: ICharacter): ICharacter {
    return new BuffDecorator(newBase, this.buff);
  }
}
