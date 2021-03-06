import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { Intents } from "discord.js";
import { join } from "path";
import { botPrefix, port } from "../config";
import { tempVoiceManager } from "../tempVoiceManager";
import "@sapphire/plugin-api/register";
export class BotClient extends SapphireClient {
    public constructor(clientOptions?: SapphireClientOptions) {
        super({
            allowedMentions: {
                users: [],
                repliedUser: false
            },
            api: {
                listenOptions: {
                    port
                }
            },
            baseUserDirectory: join(__dirname, ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: botPrefix,
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
            ...clientOptions
        });
    }

    public tempVoiceManager = new tempVoiceManager();
}

declare module "@sapphire/framework" {
    export interface SapphireClient {
        tempVoiceManager: tempVoiceManager;
    }
}
