import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";
import { Util } from "../../util";
import { tempVoiceName, userChannelPermissions, userChannelRoleIdPermissions } from "../../config";

@ApplyOptions<CommandOptions>({
    name: "claim",
    description: "claim inactive user voice channel session"
})

export class LockCommand extends Command {
    async run(message: Message) {
        const memberChannel = message.member?.voice.channel;
        if(!memberChannel) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | You must join channel to do this.")
                .setColor("AQUA")
            ]
        })
        const userChannel = this.container.client.tempVoiceManager.findChannelId(memberChannel.id).array()[0];
        if(!userChannel) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | Could not find active voice channel session.")
                .setColor("AQUA")
            ]
        })
        if(memberChannel.members.has(userChannel.ownerId)) return message.reply({
            embeds: [
                new MessageEmbed()
                .setDescription("❌ | You cant claim if owner channel still active in current session.")
                .setColor("AQUA")
            ]
        })
        else {
            this.container.client.tempVoiceManager.claimChannel(memberChannel.id, message.author.id);
            await memberChannel.edit({
                name: Util.parseChannelName(tempVoiceName, message.author),
                permissionOverwrites: [
                    {
                        id: message.author.id,
                        allow: userChannelPermissions
                    },
                    ...userChannelRoleIdPermissions
                ]
            })
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription("✅ | Successfully claimed current voice channel session.")
                    .setColor("AQUA")
                ]
            })
        }
    }
}
