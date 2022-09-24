"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readyEvent = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const config_1 = require("../config");
const util_1 = require("../util");
let readyEvent = class readyEvent extends framework_1.Listener {
    async run(oldState, newState) {
        const getUserPreviousChannel = this.container.client.tempVoiceManager.getUserChannel(oldState.member?.id ?? newState.member?.id, newState.guild.id);
        if (oldState.channelId === getUserPreviousChannel?.channelId && !oldState.channel?.members.size) {
            const voiceTimeout = setTimeout(async () => {
                try {
                    await this.container.client.channels.resolve(oldState.channelId)?.delete();
                    this.container.client.tempVoiceManager.deleteOldUserChannel(newState.member?.user.id, oldState.channelId);
                    this.container.client.tempVoiceManager.timeoutCache.delete(oldState.channelId);
                }
                catch (e) {
                    this.container.client.logger.fatal("Failed to delete createdd temporary voice channel.");
                }
            }, 2000);
            this.container.client.tempVoiceManager.timeoutCache.set(oldState.channelId, voiceTimeout);
        }
        const parentVoiceChannel = this.container.client.channels.resolve(newState.channelId);
        if (parentVoiceChannel && parentVoiceChannel.isVoice() && config_1.parentTempVoiceId.includes(newState.channelId)) {
            if (getUserPreviousChannel && newState.channelId === getUserPreviousChannel.channelId) {
                const timeoutCache = this.container.client.tempVoiceManager.timeoutCache.get(newState.channelId);
                if (timeoutCache)
                    clearTimeout(timeoutCache);
            }
            if (newState.channelId && config_1.parentTempVoiceId.includes(newState.channelId)) {
                const TemporaryChannelDatabase = this.container.client.tempVoiceManager.getUserChannel(newState.member?.id, newState.guild.id);
                if (TemporaryChannelDatabase) {
                    if (!this.container.client.channels.cache.has(TemporaryChannelDatabase.channelId)) {
                        await newState.member?.voice.setChannel(newState.channelId);
                        return this.container.client.tempVoiceManager.deleteOldUserChannel(newState.member?.id, TemporaryChannelDatabase.channelId);
                    }
                    const timeoutCache = this.container.client.tempVoiceManager.timeoutCache.get(TemporaryChannelDatabase.channelId);
                    if (timeoutCache)
                        clearTimeout(timeoutCache);
                    return newState.member?.voice.setChannel(TemporaryChannelDatabase.channelId).catch(() => null);
                }
                if (!newState.channel)
                    return;
                const createdTemporaryChannel = await newState.guild.channels.create(util_1.Util.parseChannelName(config_1.tempVoiceName, newState.member?.user), {
                    type: "GUILD_VOICE",
                    parent: newState.channel?.parentId,
                    permissionOverwrites: [
                        {
                            id: newState.member?.id,
                            allow: config_1.userChannelPermissions
                        }
                    ]
                });
                this.container.client.tempVoiceManager.setUserChannel(newState.member?.id, {
                    ownerId: newState.member?.id,
                    channelId: createdTemporaryChannel.id,
                    parentChannelId: createdTemporaryChannel.parentId,
                    guildId: createdTemporaryChannel.guildId
                });
                newState.member?.voice.setChannel(createdTemporaryChannel).catch(() => null);
            }
        }
    }
};
readyEvent = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "voiceStateUpdate"
    })
], readyEvent);
exports.readyEvent = readyEvent;
