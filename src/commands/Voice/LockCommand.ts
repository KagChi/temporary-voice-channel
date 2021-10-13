import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "lock",
    description: "lock current temporary voice channel"
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

        await memberChannel.edit({
            userLimit: memberChannel.members.size
        }, "Lock voice channel session.");
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription("✅ | Successfully lock current voice channel session.")
                    .setColor("AQUA")
            ]
        });
    }
}
