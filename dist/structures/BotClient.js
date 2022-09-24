"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const config_1 = require("../config");
const tempVoiceManager_1 = require("../tempVoiceManager");
require("@sapphire/plugin-api/register");
class BotClient extends framework_1.SapphireClient {
    constructor(clientOptions) {
        super({
            allowedMentions: {
                users: [],
                repliedUser: false
            },
            api: {
                listenOptions: {
                    port: config_1.port
                }
            },
            baseUserDirectory: (0, path_1.join)(__dirname, ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: config_1.botPrefix,
            intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES],
            ...clientOptions
        });
        this.tempVoiceManager = new tempVoiceManager_1.tempVoiceManager();
    }
}
exports.BotClient = BotClient;
