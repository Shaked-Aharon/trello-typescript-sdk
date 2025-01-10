import { TrelloRestApi } from "./rest-api";
import { PowerUp } from "./types";

export class TrelloIFrame {
    private t: PowerUp.IFrame;
  
    constructor(appKey: string, appName: string) {
      this.t = window.TrelloPowerUp.iframe({ appKey, appName });
    }
  
    public async getSharedData<T>(key: string, defaultValue?: T): Promise<T> {
      return this.t.get('board', 'shared', key, defaultValue);
    }
  
    public async setSharedData(key: string, value: any): Promise<void> {
      return this.t.set('board', 'shared', key, value);
    }
  
    public async getCardData<T>(key: string, defaultValue?: T): Promise<T> {
      const card = await this.t.card('id');
      return this.t.get(card.id, 'shared', key, defaultValue);
    }
  
    public async setCardData(key: string, value: any): Promise<void> {
      const card = await this.t.card('id');
      return this.t.set(card.id, 'shared', key, value);
    }
  
    public closePopup(): void {
      this.t.closePopup();
    }
  
    public async getRestApi(): Promise<TrelloRestApi> {
      const api = await this.t.getRestApi();
      return new TrelloRestApi(api);
    }
  }