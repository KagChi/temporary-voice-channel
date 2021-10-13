import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "unhide",
    description: "unhide current temporary voice channel"
})

export class LockCommand extends Command {
    async run(message: Message) {
        const memberChannel = message.member?.voice.channel;
        if (!memberChannel) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("❌ | You must join channel to do this.")
                        .setColor("AQUA")
                ]
            });
        }
        const userChannel = this.container.client.tempVoiceManager.getUserChannel(message.author.id);
        if (!userChannel) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("❌ | You had no active voice channel session.")
                        .setColor("AQUA")
                ]
            });
        }
        await memberChannel.permissionOverwrites.delete(message.guild?.roles.everyone!);
        await memberChannel.edit({
            permissionOverwrites: [
                ...memberChannel.permissionOverwrites.cache.values()
            ]
        }, "Unhide voice channel session.");
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription("✅ | Successfully unhide current voice channel session.")
                    .setColor("AQUA")
            ]
        });
    }
}
