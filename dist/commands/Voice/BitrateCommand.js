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
    async messageRun(message, args) {
        const memberChannel = message.member?.voice.channel;
        const voiceBitrate = await args.pickResult("integer");
        if (!memberChannel) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | You must join channel to do this.")
                        .setColor("AQUA")
                ]
            });
        }
        if (!voiceBitrate.success) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription("❌ | You must Input new voice bitrate.")
                        .setColor("AQUA")
                ]
            });
        }
        if (voiceBitrate.value < 8 || voiceBitrate.value > (message.guild?.premiumTier === "TIER_1" ? 128 : message.guild?.premiumTier === "TIER_2" ? 256 : message.guild?.premiumTier === "TIER_3" ? 384 : 96)) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setDescription(`❌ | You must Input valid bitrate beetween 8-${(message.guild?.premiumTier === "TIER_1" ? 128 : message.guild?.premiumTier === "TIER_2" ? 256 : message.guild?.premiumTier === "TIER_3" ? 384 : 96)} .`)
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
        await memberChannel.edit({
            bitrate: voiceBitrate.value * 1000
        });
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setDescription(`✅ | Successfully change voice bitrate to ${voiceBitrate.value}kbps`)
                    .setColor("AQUA")
            ]
        });
    }
};
LockCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "bitrate",
        description: "change current voice channel session bitrate"
    })
], LockCommand);
exports.LockCommand = LockCommand;
