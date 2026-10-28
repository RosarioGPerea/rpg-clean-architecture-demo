import { ICharacter } from '../../domain/interfaces/ICharacter';
import { Warrior } from '../../domain/characters/Warrior';
import { Mage } from '../../domain/characters/Mage';
import { Rogue } from '../../domain/characters/Rogue';
import { WeaponDecorator } from '../../domain/decorators/equipment/WeaponDecorator';
import { ArmorDecorator } from '../../domain/decorators/equipment/ArmorDecorator';
import { BuffDecorator } from '../../domain/decorators/status/BuffDecorator';
import { DebuffDecorator } from '../../domain/decorators/status/DebuffDecorator';
import { EquipmentItem, StatusEffect } from '../../domain/models/EquipmentItem';
import { WEAPONS, ARMORS, BUFFS, DEBUFFS } from '../../domain/data/items';
import { CharacterView } from '../components/CharacterView';
import { InventoryView, InventoryTab } from '../components/InventoryView';

export class SimulatorController {
  private currentCharacter!: ICharacter;
  private currentTab: InventoryTab = 'weapons';

  private characterView: CharacterView;
  private inventoryView: InventoryView;

  private selectedClass: string = 'warrior';
  private characterName: string = 'Arthas el Valiente';
  private characterGender: string = 'Masculino';
  private characterAvatar: string = '🧔‍♂️';

  // Estado controlado de Slots Únicos y Efectos
  private equippedWeapon: EquipmentItem | null = null;
  private equippedArmor: EquipmentItem | null = null;
  private activeEffects: StatusEffect[] = [];

  constructor() {
    this.characterView = new CharacterView('character-card-container');
    this.inventoryView = new InventoryView('inventory-content', 'decorator-chain-list');

    this.injectCustomizationSelectors();
    this.rebuildCharacterChain();
    this.setupEventListeners();
    this.updateUI();
  }

  private injectCustomizationSelectors(): void {
    const nameInput = document.getElementById('char-name');
    if (nameInput && !document.getElementById('char-gender')) {
      const wrapper = document.createElement('div');
      wrapper.style.marginTop = '12px';
      wrapper.style.display = 'grid';
      wrapper.style.gridTemplateColumns = '1fr 1fr';
      wrapper.style.gap = '8px';
      wrapper.innerHTML = `
        <div>
          <label style="font-size:0.8rem; color:#aaa;">Género:</label>
          <select id="char-gender" style="width:100%; padding:6px; background:#1a1a24; color:#fff; border:1px solid #444; border-radius:4px;">
            <option value="Masculino">Masculino ♂️</option>
            <option value="Femenino">Femenino ♀️</option>
            <option value="Neutro">Neutro ⚧️</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.8rem; color:#aaa;">Aspecto:</label>
          <select id="char-avatar" style="width:100%; padding:6px; background:#1a1a24; color:#fff; border:1px solid #444; border-radius:4px;">
            <option value="🧔‍♂️">Veterano 🧔‍♂️</option>
            <option value="🧝‍♀️">Élfico 🧝‍♀️</option>
            <option value="🧛">Sombrío 🧛</option>
            <option value="🦊">Místico 🦊</option>
          </select>
        </div>
      `;
      nameInput.parentElement?.appendChild(wrapper);
    }
  }

  private rebuildCharacterChain(): void {
    const displayName = `${this.characterAvatar} ${this.characterName} (${this.characterGender})`;

    // 1. Instanciar Personaje Base
    switch (this.selectedClass) {
      case 'warrior':
        this.currentCharacter = new Warrior(displayName);
        break;
      case 'mage':
        this.currentCharacter = new Mage(displayName);
        break;
      case 'rogue':
        this.currentCharacter = new Rogue(displayName);
        break;
      default:
        this.currentCharacter = new Warrior(displayName);
    }

    // 2. Envolver con Arma (Máximo 1)
    if (this.equippedWeapon) {
      this.currentCharacter = new WeaponDecorator(this.currentCharacter, this.equippedWeapon);
    }

    // 3. Envolver con Armadura (Máximo 1)
    if (this.equippedArmor) {
      this.currentCharacter = new ArmorDecorator(this.currentCharacter, this.equippedArmor);
    }

    // 4. Envolver con Buffs y Debuffs
    this.activeEffects.forEach((effect) => {
      if (effect.type === 'buff') {
        this.currentCharacter = new BuffDecorator(this.currentCharacter, effect);
      } else {
        this.currentCharacter = new DebuffDecorator(this.currentCharacter, effect);
      }
    });
  }

  private setupEventListeners(): void {
    const nameInput = document.getElementById('char-name') as HTMLInputElement;
    nameInput?.addEventListener('input', (e) => {
      this.characterName = (e.target as HTMLInputElement).value || 'Héroe Anónimo';
      this.rebuildCharacterChain();
      this.updateUI();
    });

    const genderSelect = document.getElementById('char-gender') as HTMLSelectElement;
    genderSelect?.addEventListener('change', (e) => {
      this.characterGender = (e.target as HTMLSelectElement).value;
      this.rebuildCharacterChain();
      this.updateUI();
    });

    const avatarSelect = document.getElementById('char-avatar') as HTMLSelectElement;
    avatarSelect?.addEventListener('change', (e) => {
      this.characterAvatar = (e.target as HTMLSelectElement).value;
      this.rebuildCharacterChain();
      this.updateUI();
    });

    const classButtons = document.querySelectorAll('.class-btn');
    classButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const jobClass = target.getAttribute('data-class');
        if (!jobClass) return;

        classButtons.forEach((b) => b.classList.remove('active'));
        target.classList.add('active');

        this.selectedClass = jobClass;
        // Limpiar equipo al cambiar de clase para evitar armas incompatibles
        this.equippedWeapon = null;
        this.equippedArmor = null;
        this.rebuildCharacterChain();
        this.updateUI();
      });
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((tabBtn) => {
      tabBtn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const tab = target.getAttribute('data-tab') as InventoryTab;
        if (!tab) return;

        tabButtons.forEach((t) => t.classList.remove('active'));
        target.classList.add('active');

        this.currentTab = tab;
        this.renderTabItems();
      });
    });
  }

  public applyModifier(item: EquipmentItem | StatusEffect): void {
    if ('type' in item && (item.type === 'weapon' || item.type === 'armor')) {
      const equipItem = item as EquipmentItem;
      if (equipItem.type === 'weapon') {
        this.equippedWeapon = equipItem; // Reemplaza el arma anterior (Slot único)
      } else {
        this.equippedArmor = equipItem; // Reemplaza la armadura anterior (Slot único)
      }
    } else {
      const status = item as StatusEffect;
      // Evitar duplicar exactamente el mismo buff/debuff
      if (!this.activeEffects.some((e) => e.name === status.name)) {
        this.activeEffects.push(status);
      }
    }

    this.rebuildCharacterChain();
    this.updateUI();
  }

  private renderTabItems(): void {
    let itemsToRender: (EquipmentItem | StatusEffect)[] = [];

    switch (this.currentTab) {
      case 'weapons':
        itemsToRender = WEAPONS;
        break;
      case 'armors':
        itemsToRender = ARMORS;
        break;
      case 'buffs':
        itemsToRender = BUFFS;
        break;
      case 'debuffs':
        itemsToRender = DEBUFFS;
        break;
    }

    const equippedNames: string[] = [];
    if (this.equippedWeapon) equippedNames.push(this.equippedWeapon.name);
    if (this.equippedArmor) equippedNames.push(this.equippedArmor.name);

    this.inventoryView.renderItems(
      this.currentTab,
      itemsToRender,
      (item) => this.applyModifier(item),
      this.selectedClass,
      equippedNames
    );
  }

  private updateUI(): void {
    this.characterView.render(this.currentCharacter);
    this.renderTabItems();

    // Construir vista de la cadena con desequipado independiente por capa
    const layers: { label: string; type: 'base' | 'weapon' | 'armor' | 'buff' | 'debuff'; removeAction?: () => void }[] = [
      { label: `Base: ${this.currentCharacter.getJob()} (${this.characterGender})`, type: 'base' }
    ];

    if (this.equippedWeapon) {
      layers.push({
        label: `⚔️ Arma: ${this.equippedWeapon.name}`,
        type: 'weapon',
        removeAction: () => {
          this.equippedWeapon = null;
          this.rebuildCharacterChain();
          this.updateUI();
        }
      });
    }

    if (this.equippedArmor) {
      layers.push({
        label: `🛡️ Armadura: ${this.equippedArmor.name}`,
        type: 'armor',
        removeAction: () => {
          this.equippedArmor = null;
          this.rebuildCharacterChain();
          this.updateUI();
        }
      });
    }

    this.activeEffects.forEach((effect, idx) => {
      layers.push({
        label: `${effect.type === 'buff' ? '✨ Buff' : '☠️ Debuff'}: ${effect.name}`,
        type: effect.type,
        removeAction: () => {
          this.activeEffects.splice(idx, 1);
          this.rebuildCharacterChain();
          this.updateUI();
        }
      });
    });

    this.inventoryView.renderDecoratorChain(this.currentCharacter, layers);
  }
}