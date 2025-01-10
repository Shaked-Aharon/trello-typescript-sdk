import { CardProperties } from "./types";

export class TrelloRestApi {
    constructor(private api: any) {}
  
    public async updateCard(cardId: string, data: Partial<CardProperties>): Promise<void> {
      await this.api.update(`/cards/${cardId}`, data);
    }
  
    public async getCard(cardId: string): Promise<CardProperties> {
      return this.api.get(`/cards/${cardId}`);
    }
  
    // public async createCard(data: CardCreateData): Promise<CardProperties> {
    //   return this.api.create('/cards', data);
    // }
  }