"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientListener = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
let clientListener = class clientListener extends framework_1.Listener {
    run({ context, message: content }, { message }) {
        if (Reflect.get(Object(context), "silent"))
            return;
        return message.channel.send({ embeds: [new discord_js_1.MessageEmbed().setDescription(`An error when running command: ${content}`)], allowedMentions: { users: [message.author.id], roles: [] } });
    }
};
clientListener = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: framework_1.Events.CommandError
    })
], clientListener);
exports.clientListener = clientListener;
