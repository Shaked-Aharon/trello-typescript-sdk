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
exports.TrelloIFrame = void 0;
const rest_api_1 = require("./rest-api");
class TrelloIFrame {
    constructor(appKey, appName) {
        this.t = window.TrelloPowerUp.iframe({ appKey, appName });
    }
    getSharedData(key, defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.t.get('board', 'shared', key, defaultValue);
        });
    }
    setSharedData(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.t.set('board', 'shared', key, value);
        });
    }
    getCardData(key, defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this.t.card('id');
            return this.t.get(card.id, 'shared', key, defaultValue);
        });
    }
    setCardData(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this.t.card('id');
            return this.t.set(card.id, 'shared', key, value);
        });
    }
    closePopup() {
        this.t.closePopup();
    }
    getRestApi() {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield this.t.getRestApi();
            return new rest_api_1.TrelloRestApi(api);
        });
    }
}
exports.TrelloIFrame = TrelloIFrame;
