"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const node_os_1 = __importDefault(require("node:os"));
// @ts-ignore
const packageJson = __importStar(require("../../../package.json"));
let PingCommand = class PingCommand extends framework_1.Command {
    async messageRun(message) {
        const Embed = new discord_js_1.MessageEmbed()
            .setTitle(`${this.container.client.user?.username} Usage Statistics`)
            .setThumbnail(this.container.client.user?.displayAvatarURL())
            .setColor("AQUA")
            .setDescription(`

\`\`\`asciidoc
• Platform - Arch     :: ${process.platform} - ${process.arch}
• Bot Uptime          :: ${(0, ms_1.default)(this.container.client.uptime ?? 0, { long: true })}
• Memory Usage        :: ${this.formatBytes(process.memoryUsage.rss())}
• Process Uptime      :: ${(0, ms_1.default)(Math.round(process.uptime() * 1000), { long: true })}
• OS Uptime           :: ${(0, ms_1.default)(node_os_1.default.uptime() ?? 0, { long: true })}
• Node.js version     :: ${process.version}
• Discord.js version  :: v${discord_js_1.version}
• Sapphire Version    :: v${framework_1.version}
• Bot Version         :: v${packageJson.version}
\`\`\``);
        await message.channel.send({ embeds: [Embed] });
    }
    formatBytes(bytes) {
        if (bytes === 0)
            return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    }
};
PingCommand = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "stats",
        description: "get bot usage statistics"
    })
], PingCommand);
exports.PingCommand = PingCommand;
