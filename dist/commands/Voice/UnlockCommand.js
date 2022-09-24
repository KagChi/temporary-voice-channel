"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let LockCommand = class LockCommand extends framework_1.Command {
    async messageRun(message) {
        const memberChannel = message.member?.voice.channel;
        if (!memberChannel) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | You must join channel to do this.")
                        .setColor("AQUA")
                ]
            });
        }
        const userChannel = this.container.client.tempVoiceManager.getUserChannel(message.author.id);
        if (!userChannel) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | You had no active voice channel session.")
                        .setColor("AQUA")
                ]
            });
        }
        await memberChannel.edit({
            userLimit: 0
        }, "Lock voice channel session.");
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setDescription("✅ | Successfully unlock current voice channel session.")
                    .setColor("AQUA")
            ]
        });
    }
};
LockCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "unlock",
        description: "unlock current temporary voice channel"
    })
], LockCommand);
exports.LockCommand = LockCommand;
