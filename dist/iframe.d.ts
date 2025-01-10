import { TrelloRestApi } from "./rest-api";
export declare class TrelloIFrame {
    private t;
    constructor(appKey: string, appName: string);
    getSharedData<T>(key: string, defaultValue?: T): Promise<T>;
    setSharedData(key: string, value: any): Promise<void>;
    getCardData<T>(key: string, defaultValue?: T): Promise<T>;
    setCardData(key: string, value: any): Promise<void>;
    closePopup(): void;
    getRestApi(): Promise<TrelloRestApi>;
}
