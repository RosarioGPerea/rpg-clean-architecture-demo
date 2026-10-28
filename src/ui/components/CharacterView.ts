import { ICharacter } from '../../domain/interfaces/ICharacter';

export class CharacterView {
  private container: HTMLElement;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Element #${containerId} not found`);
    this.container = el;
  }

  public render(character: ICharacter): void {
    const stats = character.getStats();
    const job = character.getJob();
    const avatarIcon = this.getAvatarIcon(job);

    // Calcular porcentajes para las barras (referencias máximas dinámicas)
    const hpPercent = Math.min(100, Math.round((stats.hp / Math.max(1, stats.maxHp)) * 100));
    const mpPercent = Math.min(100, Math.round((stats.mp / Math.max(1, stats.maxMp)) * 100));

    this.container.innerHTML = `
      <div class="hero-card">
        <div class="hero-avatar">${avatarIcon}</div>
        <h3 class="hero-name">${character.getName()}</h3>
        <span class="hero-job-badge">${job}</span>

        <div class="stats-container">
          <!-- Salud (HP) -->
          <div class="stat-bar-group">
            <div class="stat-label">
              <span>❤️ Vida (HP)</span>
              <span>${stats.hp} / ${stats.maxHp}</span>
            </div>
            <div class="bar-bg">
              <div class="bar-fill hp" style="width: ${hpPercent}%"></div>
            </div>
          </div>

          <!-- Maná (MP) -->
          <div class="stat-bar-group">
            <div class="stat-label">
              <span>🔷 Maná (MP)</span>
              <span>${stats.mp} / ${stats.maxMp}</span>
            </div>
            <div class="bar-bg">
              <div class="bar-fill mp" style="width: ${mpPercent}%"></div>
            </div>
          </div>
        </div>

        <!-- Atributos Físicos/Mágicos -->
        <div class="stats-grid">
          <div class="stat-box atk">
            <div class="stat-val">${stats.attack}</div>
            <div class="stat-name">Ataque</div>
          </div>
          <div class="stat-box def">
            <div class="stat-val">${stats.defense}</div>
            <div class="stat-name">Defensa</div>
          </div>
          <div class="stat-box spd">
            <div class="stat-val">${stats.speed}</div>
            <div class="stat-name">Velocidad</div>
          </div>
        </div>
      </div>
    `;
  }

  private getAvatarIcon(job: string): string {
    switch (job) {
      case 'Guerrero': return '🛡️';
      case 'Mago': return '🔮';
      case 'Pícaro': return '🗡️';
      default: return '👤';
    }
  }
}
