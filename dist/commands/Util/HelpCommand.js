"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let clientCommand = class clientCommand extends framework_1.Command {
    async messageRun(message, args) {
        const userArgument = await args.restResult("string");
        if (userArgument.success) {
            const command = this.container.stores.get("commands").get(userArgument.value);
            if (!command)
                return;
            const embed = new discord_js_1.MessageEmbed()
                .addField("Description", `${command.description ? command.description : "No description"}`)
                .addField("Detailed Description", `${command.detailedDescription ? command.detailedDescription : "No detailed description"}`)
                .addField("Aliases", command.aliases.length > 1 ? `\`${command.aliases.join("` `")}\`` : "No aliases", true)
                .setColor("AQUA");
            return message.channel.send({ embeds: [embed] });
        }
        const categories = [...new Set(this.container.stores.get("commands").map(x => x.fullCategory[x.fullCategory.length - 1]))];
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`❯ ${this.container.client.user?.username} command(s) list`, this.container.client.user?.displayAvatarURL(), "https://nezukochan.tech")
            .setDescription("A list of available commands.")
            .setColor("AQUA");
        for (const category of categories) {
            const commands = this.container.stores.get("commands").filter(x => x.category === category);
            embed.fields.push({
                name: `${category}`,
                value: commands.map(x => `\`${x.name}\``).join(", "),
                inline: false
            });
        }
        message.channel.send({ embeds: [embed] });
    }
};
clientCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "help",
        description: "get bot help command",
        requiredClientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"]
    })
], clientCommand);
exports.clientCommand = clientCommand;
