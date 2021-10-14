import { CommandOptions, Command, version as SapphireVersion } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, version } from "discord.js";
import ms from "ms";
import os from "node:os";
// @ts-ignore
import * as packageJson from "../../../package.json";

@ApplyOptions<CommandOptions>({
    name: "stats",
    description: "get bot usage statistics"
})

export class PingCommand extends Command {
    async run(message: Message) {
        const Embed = new MessageEmbed()
            .setTitle(`${this.container.client.user?.username} Usage Statistics`)
            .setThumbnail(this.container.client.user?.displayAvatarURL()!)
            .setColor("AQUA")
            .setDescription(`

\`\`\`asciidoc
• Platform - Arch     :: ${process.platform} - ${process.arch}
• Bot Uptime          :: ${ms(this.container.client.uptime ?? 0, { long: true })}
• Memory Usage        :: ${this.formatBytes(process.memoryUsage.rss())}
• Process Uptime      :: ${ms(Math.round(process.uptime() * 1000), { long: true })}
• OS Uptime           :: ${ms(os.uptime() ?? 0, { long: true })}
• Node.js version     :: ${process.version}
• Discord.js version  :: v${version}
• Sapphire Version    :: v${SapphireVersion}
• Bot Version         :: v${packageJson.version}
\`\`\``);
        await message.channel.send({ embeds: [Embed] });
    }

    public formatBytes(bytes: number) {
        if (bytes === 0) return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }
}
