import { EquipmentItem, StatusEffect } from '../../domain/models/EquipmentItem';
import { ICharacter } from '../../domain/interfaces/ICharacter';

export type InventoryTab = 'weapons' | 'armors' | 'buffs' | 'debuffs';

export class InventoryView {
  private contentContainer: HTMLElement;
  private chainContainer: HTMLElement;

  constructor(contentId: string, chainId: string) {
    const contentEl = document.getElementById(contentId);
    const chainEl = document.getElementById(chainId);
    if (!contentEl || !chainEl) throw new Error('Inventory containers not found');

    this.contentContainer = contentEl;
    this.chainContainer = chainEl;
  }

  private isItemAllowedForClass(item: EquipmentItem | StatusEffect, selectedClass: string): boolean {
    if (!('rarity' in item)) return true; // Buffs y Debuffs permitidos para todos
    const name = item.name.toLowerCase();
    
    // Regla de negocio por arquetipo de clase (DDD)
    if (selectedClass === 'warrior') {
      return !name.includes('báculo') && !name.includes('túnica') && !name.includes('dagas');
    }
    if (selectedClass === 'mage') {
      return name.includes('báculo') || name.includes('túnica');
    }
    if (selectedClass === 'rogue') {
      return name.includes('dagas') || name.includes('cuero') || name.includes('hierro');
    }
    return true;
  }

  public renderItems(
    _activeTab: InventoryTab,
    items: (EquipmentItem | StatusEffect)[],
    onApply: (item: EquipmentItem | StatusEffect) => void,
    selectedClass: string = 'warrior',
    equippedNames: string[] = []
  ): void {
    this.contentContainer.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'items-grid';

    items.forEach((item) => {
      const card = document.createElement('div');
      const allowed = this.isItemAllowedForClass(item, selectedClass);
      const isEquipped = equippedNames.includes(item.name);

      card.className = `item-card ${!allowed ? 'item-disabled' : ''}`;
      if (!allowed) card.style.opacity = '0.45';

      const isEquipment = 'rarity' in item;
      const rarityClass = isEquipment ? `rarity-${item.rarity}` : 'rarity-Raro';
      const typeLabel = isEquipment ? item.rarity : (item.type === 'buff' ? 'Buff Positivo' : 'Debuff Negativo');

      let btnLabel = 'Aplicar ➕';
      if (!allowed) btnLabel = '🔒 Clase incompatible';
      else if (isEquipped && isEquipment) btnLabel = '✅ Equipado';

      card.innerHTML = `
        <div class="item-info">
          <span class="item-icon">${item.icon}</span>
          <div>
            <div class="item-title">${item.name}</div>
            <div class="item-rarity ${rarityClass}">${typeLabel} - ${item.description}</div>
          </div>
        </div>
        <button class="btn-equip" ${(!allowed || (isEquipped && isEquipment)) ? 'disabled' : ''}>
          ${btnLabel}
        </button>
      `;

      const btn = card.querySelector('.btn-equip') as HTMLButtonElement;
      if (allowed && !(isEquipped && isEquipment)) {
        btn.addEventListener('click', () => onApply(item));
      }

      grid.appendChild(card);
    });

    this.contentContainer.appendChild(grid);
  }

  public renderDecoratorChain(
    _character: ICharacter,
    activeLayers: { label: string; type: 'base' | 'weapon' | 'armor' | 'buff' | 'debuff'; removeAction?: () => void }[]
  ): void {
    this.chainContainer.innerHTML = '';

    activeLayers.forEach((layer, index) => {
      const badge = document.createElement('div');
      badge.className = `decorator-badge ${layer.type}`;
      badge.style.display = 'flex';
      badge.style.justifyContent = 'space-between';
      badge.style.alignItems = 'center';
      badge.style.marginBottom = '6px';

      let html = `<span>Nivel ${index}: ${layer.label}</span>`;
      if (index > 0 && layer.removeAction) {
        html += `<button class="btn-pop-decorator" title="Desequipar esta capa">❌ Quitar</button>`;
      }

      badge.innerHTML = html;

      if (index > 0 && layer.removeAction) {
        const removeBtn = badge.querySelector('.btn-pop-decorator');
        removeBtn?.addEventListener('click', () => layer.removeAction!());
      }

      this.chainContainer.appendChild(badge);
    });
  }
}