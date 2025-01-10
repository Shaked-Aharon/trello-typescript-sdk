"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelloPowerUpBuilder = void 0;
class TrelloPowerUpBuilder {
    constructor(config) {
        this.handlers = {};
        this.config = config;
    }
    loadTrelloScript() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    onBoardButtons(callback) {
        this.handlers['board-buttons'] = callback;
        return this;
    }
    onCardBadges(callback) {
        this.handlers['card-badges'] = callback;
        return this;
    }
    onCardButtons(callback) {
        this.handlers['card-buttons'] = callback;
        return this;
    }
    onCardBackSection(callback) {
        this.handlers['card-back-section'] = callback;
        return this;
    }
    onShowSettings(callback) {
        this.handlers['show-settings'] = callback;
        return this;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadTrelloScript();
                window.TrelloPowerUp.initialize(this.handlers, this.config);
            }
            catch (error) {
                console.error('Failed to initialize Power-Up:', error);
                throw error;
            }
        });
    }
}
exports.TrelloPowerUpBuilder = TrelloPowerUpBuilder;
TrelloPowerUpBuilder.POWERUP_URL = 'https://p.trellocdn.com/power-up.min.js';
