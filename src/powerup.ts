import { PowerUpHandlers, BoardButtonCallback, CardBadgesCallback, CardButtonCallback, CardBackSectionCallback, ShowSettingsCallback, TrelloPowerUpConfig } from "./types";

export class TrelloPowerUpBuilder {
  private handlers: Partial<PowerUpHandlers> = {};
  private config: TrelloPowerUpConfig;
  private static POWERUP_URL = 'https://p.trellocdn.com/power-up.min.js';

  constructor(config: TrelloPowerUpConfig) {
    this.config = config;
  }

  private async loadTrelloScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // If script is already loaded, resolve immediately
      if (window.TrelloPowerUp) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = TrelloPowerUpBuilder.POWERUP_URL;
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Trello Power-Up client'));

      document.head.appendChild(script);
    });
  }

  public onBoardButtons(callback: BoardButtonCallback): this {
    this.handlers['board-buttons'] = callback;
    return this;
  }

  public onCardBadges(callback: CardBadgesCallback): this {
    this.handlers['card-badges'] = callback;
    return this;
  }

  public onCardButtons(callback: CardButtonCallback): this {
    this.handlers['card-buttons'] = callback;
    return this;
  }

  public onCardBackSection(callback: CardBackSectionCallback): this {
    this.handlers['card-back-section'] = callback;
    return this;
  }

  public onShowSettings(callback: ShowSettingsCallback): this {
    this.handlers['show-settings'] = callback;
    return this;
  }

  public async initialize(): Promise<void> {
    try {
      await this.loadTrelloScript();
      window.TrelloPowerUp.initialize(this.handlers, this.config);
    } catch (error) {
      console.error('Failed to initialize Power-Up:', error);
      throw error;
    }
  }
}
