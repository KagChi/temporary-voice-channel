import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { VoiceState } from "discord.js";
import { parentTempVoiceId, tempVoiceName, userChannelPermissions } from "../config";
import { Util } from "../util";
@ApplyOptions<ListenerOptions>({
    name: "voiceStateUpdate"
})

export class readyEvent extends Listener {
    async run(oldState: VoiceState, newState: VoiceState) {
        const getUserPreviousChannel = this.container.client.tempVoiceManager.getUserChannel(oldState.member?.id! ?? newState.member?.id!, newState.guild.id);
        if (oldState.channelId === getUserPreviousChannel?.channelId && !oldState.channel?.members.size) {
            const voiceTimeout = setTimeout(async () => {
                try {
                    await this.container.client.channels.resolve(oldState.channelId!)?.delete();
                    this.container.client.tempVoiceManager.deleteOldUserChannel(newState.member?.user.id!, oldState.channelId!);
                    this.container.client.tempVoiceManager.timeoutCache.delete(oldState.channelId!);
                } catch(e)  {
                    this.container.client.logger.fatal("Failed to delete createdd temporary voice channel.");
                }
            }, 2000);
            this.container.client.tempVoiceManager.timeoutCache.set(oldState.channelId, voiceTimeout);
        }
        
        const parentVoiceChannel = this.container.client.channels.resolve(newState.channelId!);
        if (parentVoiceChannel && parentVoiceChannel.isVoice() && parentTempVoiceId.includes(newState.channelId!)) {
            if (getUserPreviousChannel && newState.channelId === getUserPreviousChannel.channelId) {
                const timeoutCache = this.container.client.tempVoiceManager.timeoutCache.get(newState.channelId);
                if (timeoutCache) clearTimeout(timeoutCache);
            }
            if (newState.channelId && parentTempVoiceId.includes(newState.channelId)) {
                const TemporaryChannelDatabase = this.container.client.tempVoiceManager.getUserChannel(newState.member?.id!, newState.guild.id!);
                if (TemporaryChannelDatabase) {
                    if (!this.container.client.channels.cache.has(TemporaryChannelDatabase.channelId)) {
                        await newState.member?.voice.setChannel(newState.channelId);
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
                        }
                    ]
                });
                this.container.client.tempVoiceManager.setUserChannel(newState.member?.id!, {
                    ownerId: newState.member?.id!,
                    channelId: createdTemporaryChannel.id!,
                    parentChannelId: createdTemporaryChannel.parentId!,
                    guildId: createdTemporaryChannel.guildId
                });
                newState.member?.voice.setChannel(createdTemporaryChannel).catch(() => null);
            }
        }
    }
}
