import { BoardButtonCallback, CardBadgesCallback, CardButtonCallback, CardBackSectionCallback, ShowSettingsCallback, TrelloPowerUpConfig } from "./types";
export declare class TrelloPowerUpBuilder {
    private handlers;
    private config;
    private static POWERUP_URL;
    constructor(config: TrelloPowerUpConfig);
    private loadTrelloScript;
    onBoardButtons(callback: BoardButtonCallback): this;
    onCardBadges(callback: CardBadgesCallback): this;
    onCardButtons(callback: CardButtonCallback): this;
    onCardBackSection(callback: CardBackSectionCallback): this;
    onShowSettings(callback: ShowSettingsCallback): this;
    initialize(): Promise<void>;
}
