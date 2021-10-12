import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { Intents } from "discord.js";
import { join } from "path";
import { botPrefix } from "../config";

export class BotClient extends SapphireClient {
    public constructor(clientOptions?: SapphireClientOptions) {
        super({
            allowedMentions: {
                users: [],
                repliedUser: false
            },
            baseUserDirectory: join(__dirname, ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: botPrefix,
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
            ...clientOptions
        });
    }
}
