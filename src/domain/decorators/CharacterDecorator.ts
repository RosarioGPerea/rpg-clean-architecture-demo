import { ICharacter, JobType, GenderType, ActiveDecoratorInfo } from '../interfaces/ICharacter';
import { Stats } from '../models/Stats';
import { EquipmentItem, StatusEffect } from '../models/EquipmentItem';

/**
 * Decorador Base Abstracto (Patrón Decorator).
 */
export abstract class CharacterDecorator implements ICharacter {
  protected character: ICharacter;

  constructor(character: ICharacter) {
    this.character = character;
  }

  public getName(): string {
    return this.character.getName();
  }

  public getJob(): string {
    return this.character.getJob();
  }

  public getJobKey(): JobType {
    return this.character.getJobKey();
  }

  public getGender(): GenderType {
    return this.character.getGender();
  }

  public getAvatar(): string {
    return this.character.getAvatar();
  }

  public getDescription(): string {
    return this.character.getDescription();
  }

  public getStats(): Stats {
    return this.character.getStats();
  }

  public getActiveDecorators(): ActiveDecoratorInfo[] {
    return this.character.getActiveDecorators();
  }

  public getBaseCharacter(): ICharacter {
    return this.character.getBaseCharacter();
  }

  public getWrappedCharacter(): ICharacter {
    return this.character;
  }

  /**
   * Métodos de gestión de equipamiento que delegan o interceptan
   */
  public equipItem(item: EquipmentItem): ICharacter {
    // Delegamos al siguiente decorador o base, el cual reconstruirá según reglas
    const unwrapped = this.character.equipItem(item);
    return this.rebuildWithNewComponent(unwrapped);
  }

  public unequipItem(itemId: string): ICharacter {
    const unwrapped = this.character.unequipItem(itemId);
    return this.rebuildWithNewComponent(unwrapped);
  }

  public addStatus(effect: StatusEffect): ICharacter {
    const unwrapped = this.character.addStatus(effect);
    return this.rebuildWithNewComponent(unwrapped);
  }

  public removeStatus(effectId: string): ICharacter {
    const unwrapped = this.character.removeStatus(effectId);
    return this.rebuildWithNewComponent(unwrapped);
  }

  public hasItem(itemId: string): boolean {
    return this.character.hasItem(itemId);
  }

  public hasStatus(effectId: string): boolean {
    return this.character.hasStatus(effectId);
  }

  protected abstract rebuildWithNewComponent(newBase: ICharacter): ICharacter;
}
