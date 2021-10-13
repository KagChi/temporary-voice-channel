import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "bitrate",
    description: "change current voice channel session bitrate"
})

export class LockCommand extends Command {
    async run(message: Message, args: Args) {
        const memberChannel = message.member?.voice.channel;
        const voiceBitrate = await args.pickResult("integer");
        if (!memberChannel) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("❌ | You must join channel to do this.")
                        .setColor("AQUA")
                ]
            });
        }
        if (!voiceBitrate.success) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("❌ | You must Input new voice bitrate.")
                        .setColor("AQUA")
                ]
            });
        }
        if (voiceBitrate.value < 8 || voiceBitrate.value > (message.guild?.premiumTier === "TIER_1" ? 128 : message.guild?.premiumTier === "TIER_2" ? 256 : message.guild?.premiumTier === "TIER_3" ? 384 : 96)) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`❌ | You must Input valid bitrate beetween 8-${(message.guild?.premiumTier === "TIER_1" ? 128 : message.guild?.premiumTier === "TIER_2" ? 256 : message.guild?.premiumTier === "TIER_3" ? 384 : 96)} .`)
                        .setColor("AQUA")
                ]
            });
        }
        const userChannel = this.container.client.tempVoiceManager.findChannelId(memberChannel.id).array()[0];
        if (!userChannel) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("❌ | Could not find active voice channel session.")
                        .setColor("AQUA")
                ]
            });
        }

        await memberChannel.edit({
            bitrate: voiceBitrate.value * 1000
        });
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`✅ | Successfully change voice bitrate to ${voiceBitrate.value}kbps`)
                    .setColor("AQUA")
            ]
        });
    }
}
