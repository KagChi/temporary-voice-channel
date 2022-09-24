"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
let PingCommand = class PingCommand extends framework_1.Command {
    async messageRun(message) {
        const msg = await message.channel.send("Pong");
        await msg.edit(`:ping_pong: | ${msg.createdTimestamp - message.createdTimestamp} ms, ${this.container.client.ws.ping} ms`);
    }
};
PingCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "ping",
        description: "ping pong with the bot"
    })
], PingCommand);
exports.PingCommand = PingCommand;
