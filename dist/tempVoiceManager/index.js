"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempVoiceManager = void 0;
const collection_1 = require("@discordjs/collection");
const enmap_1 = __importDefault(require("enmap"));
class tempVoiceManager {
    constructor() {
        this.timeoutCache = new collection_1.Collection();
        this.database = new enmap_1.default({ name: "tempVoice" });
    }
    getUserChannel(userId, guildId) {
        if (guildId)
            return this.database.filter(x => x.guildId === guildId && x.ownerId === userId).array()[0];
        return this.database.get(userId);
    }
    findChannelId(channelId) {
        return this.database.filter(x => x.channelId === channelId);
    }
    claimChannel(channelId, newOwnerId) {
        const getOldData = this.database.filter(x => x.channelId === channelId).array()[0];
        this.database.delete(getOldData.ownerId);
        getOldData.ownerId = newOwnerId;
        return this.database.set(newOwnerId, getOldData);
    }
    deleteOldUserChannel(userId, channelId) {
        if (channelId)
            this.database.filter(x => x.channelId === channelId && x.ownerId === userId);
        return this.database.delete(userId);
    }
    setUserChannel(userId, data) {
        return this.database.set(userId, data);
    }
}
exports.tempVoiceManager = tempVoiceManager;
