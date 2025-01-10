import { CardProperties } from "./types";
export declare class TrelloRestApi {
    private api;
    constructor(api: any);
    updateCard(cardId: string, data: Partial<CardProperties>): Promise<void>;
    getCard(cardId: string): Promise<CardProperties>;
}
