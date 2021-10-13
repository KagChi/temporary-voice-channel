import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "limit",
    description: "change current voice channel session limit"
})

export class LockCommand extends Command {
    async run(message: Message, args: Args) {
        const memberChannel = message.member?.voice.channel;
        const voiceLimit = await args.pickResult("number");
        if(!memberChannel) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | You must join channel to do this.")
                .setColor("AQUA")
            ]
        })
        if(!voiceLimit.success) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | You must Input new voice limit.")
                .setColor("AQUA")
            ]
        })
        if(voiceLimit.value < 0 || voiceLimit.value > 99) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription("❌ | Voice member limit must be between 0 to 99.")
                    .setColor("AQUA")
                ]
            })
        }
        const userChannel = this.container.client.tempVoiceManager.findChannelId(memberChannel.id).array()[0];
        if(!userChannel) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | Could not find active voice channel session.")
                .setColor("AQUA")
            ]
        })
        else {
            await memberChannel.edit({
                userLimit: voiceLimit.value
            })
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription("✅ | Successfully change voice limit to " + `${voiceLimit.value === 0 ? "no limit" : `${voiceLimit.value} user(s)`}`)
                    .setColor("AQUA")
                ]
            })
        }
    }
}
