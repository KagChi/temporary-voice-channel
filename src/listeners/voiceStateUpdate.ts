import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { VoiceState } from "discord.js";
import { parentTempVoiceId, tempVoiceName, userChannelPermissions, userChannelRoleIdPermissions } from "../config";
import { Util } from "../util";
@ApplyOptions<ListenerOptions>({
    name: "voiceStateUpdate"
})

export class readyEvent extends Listener {
    async run(oldState: VoiceState, newState: VoiceState) {
        const getUserPreviousChannel = this.container.client.tempVoiceManager.getUserChannel(oldState.member?.id! ?? newState.member?.id!);
        const parentVoiceChannel = this.container.client.channels.resolve(parentTempVoiceId);
        if(parentVoiceChannel && parentVoiceChannel.isVoice()) {
            if (getUserPreviousChannel && newState.channelId === getUserPreviousChannel.channelId) {
                const timeoutCache = this.container.client.tempVoiceManager.timeoutCache.get(newState.channelId);
                if (timeoutCache) clearTimeout(timeoutCache);
            }
            if (newState.channelId && newState.channelId === parentTempVoiceId) {
                const TemporaryChannelDatabase = this.container.client.tempVoiceManager.getUserChannel(newState.member?.id!, newState.guild.id!);
                    if (TemporaryChannelDatabase) {
                        if (!this.container.client.channels.cache.has(TemporaryChannelDatabase.channelId)) {
                            await newState.member?.voice.setChannel(parentTempVoiceId);
                            return this.container.client.tempVoiceManager.deleteOldUserChannel(newState.member?.id!, TemporaryChannelDatabase.channelId);
                        }
                        const timeoutCache = this.container.client.tempVoiceManager.timeoutCache.get(TemporaryChannelDatabase.channelId);
                        if (timeoutCache) clearTimeout(timeoutCache);
                        return newState.member?.voice.setChannel(TemporaryChannelDatabase.channelId).catch(() => null);
                    }
                if (!newState.channel) return;    
                const createdTemporaryChannel = await newState.guild.channels.create(Util.parseChannelName(tempVoiceName, newState.member?.user), {
                    type: "GUILD_VOICE",
                    parent: newState.channel?.parentId!,
                    permissionOverwrites: [
                        {
                            id: newState.member?.id!,
                            allow: userChannelPermissions
                        },
                        ...userChannelRoleIdPermissions
                    ]
                });
                this.container.client.tempVoiceManager.setUserChannel(newState.member?.id!, {
                    ownerId: newState.member?.id!,
                    channelId: createdTemporaryChannel.id!,
                    parentChannelId: parentTempVoiceId,
                    guildId: createdTemporaryChannel.guildId
                });
                newState.member?.voice.setChannel(createdTemporaryChannel).catch(() => null);
            } else if (oldState.channelId === getUserPreviousChannel?.channelId && !oldState.channel?.members.size) {
                const voiceTimeout = setTimeout(async () => {
                    await this.container.client.channels.resolve(oldState.channelId!)?.delete();
                    this.container.client.tempVoiceManager.deleteOldUserChannel(newState.member?.user.id!, oldState.channelId!);
                    this.container.client.tempVoiceManager.timeoutCache.delete(oldState.channelId!);
                }, 5000);
                this.container.client.tempVoiceManager.timeoutCache.set(oldState.channelId, voiceTimeout);
            }
        }
    } 
}
