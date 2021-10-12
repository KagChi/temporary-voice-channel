import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "help",
    description: "get bot help command"
})

export class PingCommand extends Command {
    async run(message: Message, args: Args) {
        for (const command of [...this.container.stores.get("commands").values()]) {
            this.parseCategory(command);
        }

        const userArgument = await args.restResult("string");
        if (userArgument.success) {
            const command = this.container.stores.get("commands").get(userArgument.value);
            if (!command) return;
            const embed = new MessageEmbed()
                .addField("Description", `${command.description ? command.description : "No description"}`)
                .addField("Detailed Description", `${command.detailedDescription ? command.detailedDescription : "No detailed description"}`)
                .addField("Aliases", command.aliases.length > 1 ? `\`${command.aliases.join("` `")}\`` : "No aliases", true);
            return message.channel.send({ embeds: [embed] });
        }

        const categories = [...new Set(this.container.stores.get("commands").map(x => x.category))];
        const embed = new MessageEmbed()
            .setAuthor(`❯ ${this.container.client.user?.username} command(s) list`, this.container.client.user?.displayAvatarURL(), "https://nezukochan.tech")
            .setDescription("A list of available commands.");
        for (const category of categories) {
            const commands = this.container.stores.get("commands").filter(x => x.category === category);
            embed.fields.push({
                name: `${(category as string)}`,
                value: commands.map(x => `\`${x.name}\``).join(", "),
                inline: false
            });
        }
        message.channel.send({ embeds: [embed] });
    }

    public parseCategory(command: Command) {
        const path = command.path.split("/");
        // @ts-ignore
        command.category = path[path.length - 2];
        return command;
    }
}

declare module "@sapphire/framework" {
    export interface Command {
        category: string | null;
    }
}
