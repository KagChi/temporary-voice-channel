import Collection from "@discordjs/collection";
import { Snowflake } from "discord.js";
import Enmap from "enmap";
import { tempVoice } from "./tempVoice";

export class tempVoiceManager {
    public timeoutCache: Collection<Snowflake, NodeJS.Timeout> = new Collection();
    private database: Enmap<Snowflake | number, tempVoice> = new Enmap({ name: "tempVoice" });

    public getUserChannel(userId: string, guildId?: Snowflake) {
        if (guildId) this.database.filter(x => x.guildId === guildId && x.ownerId === userId);
        return this.database.get(userId);
    }

    public deleteOldUserChannel(userId: Snowflake, channelId?: Snowflake) {
        if (channelId) this.database.filter(x => x.channelId === channelId && x.ownerId === userId);
        return this.database.delete(userId);
    }

    public setUserChannel(userId: string, data: tempVoice) {
        return this.database.set(userId, data);
    }
}
