import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { Intents, LimitedCollection, MessageEmbed, Options } from "discord.js";
import { join } from "path";
import { botPrefix } from "../config";
import { tempVoiceManager } from "../tempVoiceManager";

export class BotClient extends SapphireClient {
    public constructor(clientOptions?: SapphireClientOptions) {
        super({
            restTimeOffset: 0,
            restWsBridgeTimeout: 100,
            allowedMentions: {
                users: [],
                repliedUser: false
            },
            baseUserDirectory: join(__dirname, ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: botPrefix,
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
            makeCache: Options.cacheWithLimits({
                MessageManager: {
                  sweepInterval: 300,
                  sweepFilter: LimitedCollection.filterByLifetime({
                    lifetime: 60,
                    getComparisonTimestamp: e => e.editedTimestamp ?? e.createdTimestamp,
                  })
                }
              }),
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
