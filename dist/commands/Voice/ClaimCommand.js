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
const util_1 = require("../../util");
const config_1 = require("../../config");
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
        const userChannel = this.container.client.tempVoiceManager.findChannelId(memberChannel.id).array()[0];
        if (!userChannel) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | Could not find active voice channel session.")
                        .setColor("AQUA")
                ]
            });
        }
        if (memberChannel.members.has(userChannel.ownerId)) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | You cant claim if owner channel still active in current session.")
                        .setColor("AQUA")
                ]
            });
        }
        this.container.client.tempVoiceManager.claimChannel(memberChannel.id, message.author.id);
        await memberChannel.edit({ permissionOverwrites: [] });
        await memberChannel.edit({
            name: util_1.Util.parseChannelName(config_1.tempVoiceName, message.author),
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: config_1.userChannelPermissions
                }
            ]
        });
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setDescription("✅ | Successfully claimed current voice channel session.")
                    .setColor("AQUA")
            ]
        });
    }
};
LockCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "claim",
        description: "claim inactive user voice channel session"
    })
], LockCommand);
exports.LockCommand = LockCommand;
