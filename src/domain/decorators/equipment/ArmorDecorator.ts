import { CharacterDecorator } from '../CharacterDecorator';
import { ICharacter, ActiveDecoratorInfo } from '../../interfaces/ICharacter';
import { Stats } from '../../models/Stats';
import { EquipmentItem } from '../../models/EquipmentItem';

export class ArmorDecorator extends CharacterDecorator {
  private item: EquipmentItem;

  constructor(character: ICharacter, item: EquipmentItem) {
    super(character);
    this.item = item;
  }

  public getItem(): EquipmentItem {
    return this.item;
  }

  public override getDescription(): string {
    return `${super.getDescription()} + Protegido con ${this.item.name}`;
  }

  public override getStats(): Stats {
    const baseStats = super.getStats();
    const bonus = this.item.statBonus;

    return {
      hp: baseStats.hp + (bonus.hp || 0),
      maxHp: baseStats.maxHp + (bonus.maxHp || bonus.hp || 0),
      mp: baseStats.mp + (bonus.mp || 0),
      maxMp: baseStats.maxMp + (bonus.maxMp || bonus.mp || 0),
      attack: baseStats.attack + (bonus.attack || 0),
      defense: baseStats.defense + (bonus.defense || 0),
      speed: baseStats.speed + (bonus.speed || 0),
    };
  }

  public override getActiveDecorators(): ActiveDecoratorInfo[] {
    const list = super.getActiveDecorators();
    list.push({
      id: this.item.id,
      name: this.item.name,
      type: 'armor',
      rarityOrCategory: `Armadura (${this.item.rarity})`,
      icon: this.item.icon,
      description: this.item.description
    });
    return list;
  }

  public override hasItem(itemId: string): boolean {
    return this.item.id === itemId || super.hasItem(itemId);
  }

  public override unequipItem(itemId: string): ICharacter {
    if (this.item.id === itemId) {
      return this.character;
    }
    const innerUnwrapped = this.character.unequipItem(itemId);
    return new ArmorDecorator(innerUnwrapped, this.item);
  }

  protected override rebuildWithNewComponent(newBase: ICharacter): ICharacter {
    return new ArmorDecorator(newBase, this.item);
  }
}
