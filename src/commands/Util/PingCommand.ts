import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";
import timezone from "moment-timezone";

@ApplyOptions<CommandOptions>({
    name: "ping",
    description: "ping pong with the bot"
})

export class PingCommand extends Command {
    async run(msg: Message) {
        try {
            const message = await msg.channel.send({ content : "Getting info..." });
            
            const embed = new MessageEmbed()
                .addField(`⏳ Latency `, `__**${message!.createdTimestamp - msg.createdTimestamp} ms**__`)
                .addField("💓 Websocket", `__**${Math.floor(this.container.client.ws.ping)} ms**__`)
                .setColor("#303136")
                .setFooter(`Requested by ${msg.author.username} | Today at ${timezone.tz("Asia/Jakarta").format("HH:mma") + " "}`, msg.author.displayAvatarURL({
                dynamic: true
            }))
            setTimeout(function() { message!.edit({content: ' ', embeds: [embed] }) }, 5000);
        } catch(e) {
            const embed = new MessageEmbed()
                .setDescription(`${e}`)
            msg.channel.send({ embeds: [embed] })
        }
    }
}
