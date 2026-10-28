import { CharacterDecorator } from '../CharacterDecorator';
import { ICharacter, ActiveDecoratorInfo } from '../../interfaces/ICharacter';
import { Stats } from '../../models/Stats';
import { StatusEffect } from '../../models/EquipmentItem';

export class DebuffDecorator extends CharacterDecorator {
  private debuff: StatusEffect;

  constructor(character: ICharacter, debuff: StatusEffect) {
    super(character);
    this.debuff = debuff;
  }

  public getEffect(): StatusEffect {
    return this.debuff;
  }

  public override getDescription(): string {
    return `${super.getDescription()} [Afectado por ${this.debuff.name}]`;
  }

  public override getStats(): Stats {
    const currentStats = super.getStats();
    const flat = this.debuff.flatBonus || {};
    const mult = this.debuff.multiplierBonus || {};

    const calcStat = (val: number, flatPen: number = 0, multiplier: number = 1) => {
      const result = Math.round((val - flatPen) * multiplier);
      return Math.max(1, result);
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
      id: this.debuff.id,
      name: this.debuff.name,
      type: 'debuff',
      rarityOrCategory: 'Debuff Negativo',
      icon: this.debuff.icon,
      description: this.debuff.description
    });
    return list;
  }

  public override hasStatus(effectId: string): boolean {
    return this.debuff.id === effectId || super.hasStatus(effectId);
  }

  public override removeStatus(effectId: string): ICharacter {
    if (this.debuff.id === effectId) {
      return this.character;
    }
    const innerUnwrapped = this.character.removeStatus(effectId);
    return new DebuffDecorator(innerUnwrapped, this.debuff);
  }

  protected override rebuildWithNewComponent(newBase: ICharacter): ICharacter {
    return new DebuffDecorator(newBase, this.debuff);
  }
}
