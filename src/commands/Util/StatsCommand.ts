import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, version } from "discord.js";
import moment from "moment";
import "moment-duration-format";
import timezone from "moment-timezone";

@ApplyOptions<CommandOptions>({
    name: "stats",
    description: "bot's status"
})

export class StatsCommand extends Command {
    async run(msg: Message) {

        try {
            const duration = moment.duration(this.container.client.uptime).format("**D [D], H [H], m [M], s [S]**");

            const embed = new MessageEmbed()
                .setAuthor("⚙ ・ Status Bot")
                .setColor("#303136")
                .setDescription(`
\`\`\`asciidoc
Platform - Arch     :: ${process.platform} - ${process.arch}
Bot Uptime          :: ${duration}
Node.js version     :: ${process.version}
Discord.js version  :: v${version}
\`\`\`
            `)
                .setFooter(`Requested by ${msg.author.username} | Today at ${timezone.tz("Asia/Jakarta").format("HH:mma") + " "}`, msg.author.displayAvatarURL({
                dynamic: true
            }))
            msg.channel.send({ embeds: [embed] })
        } catch(e) {
            const embed = new MessageEmbed()
                .setDescription(`${e}`)
            msg.channel.send({ embeds: [embed] })
        }
    }
}
