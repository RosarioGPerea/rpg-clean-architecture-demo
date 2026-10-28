import { Stats } from '../models/Stats';
import { EquipmentItem, StatusEffect } from '../models/EquipmentItem';
import { ICharacter, JobType, GenderType, ActiveDecoratorInfo } from '../interfaces/ICharacter';

/**
 * Clase Base Abstracta para Personajes de Dominio.
 */
export abstract class BaseCharacter implements ICharacter {
  protected name: string;
  protected job: string;
  protected jobKey: JobType;
  protected gender: GenderType;
  protected avatar: string;
  protected baseStats: Stats;

  constructor(name: string, job: string, jobKey: JobType, gender: GenderType, avatar: string, baseStats: Stats) {
    this.name = name;
    this.job = job;
    this.jobKey = jobKey;
    this.gender = gender;
    this.avatar = avatar;
    this.baseStats = baseStats;
  }

  public getName(): string {
    return this.name;
  }

  public getJob(): string {
    return this.job;
  }

  public getJobKey(): JobType {
    return this.jobKey;
  }

  public getGender(): GenderType {
    return this.gender;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getDescription(): string {
    return `Un valeroso ${this.job} llamado ${this.name}`;
  }

  public getStats(): Stats {
    return { ...this.baseStats };
  }

  public getActiveDecorators(): ActiveDecoratorInfo[] {
    return [
      {
        id: 'base_char',
        name: `${this.job} (${this.name})`,
        type: 'weapon',
        rarityOrCategory: 'Clase Base',
        icon: this.avatar,
        description: this.getDescription()
      }
    ];
  }

  public getBaseCharacter(): ICharacter {
    return this;
  }

  public equipItem(_item: EquipmentItem): ICharacter {
    return this;
  }

  public unequipItem(_itemId: string): ICharacter {
    return this;
  }

  public addStatus(_effect: StatusEffect): ICharacter {
    return this;
  }

  public removeStatus(_effectId: string): ICharacter {
    return this;
  }

  public hasItem(_itemId: string): boolean {
    return false;
  }

  public hasStatus(_effectId: string): boolean {
    return false;
  }
}
