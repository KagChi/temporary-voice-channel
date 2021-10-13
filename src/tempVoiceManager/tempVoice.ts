import { Snowflake } from "discord.js"

export interface tempVoice {
    ownerId: Snowflake;
    channelId: Snowflake;
    parentChannelId: Snowflake;
    guildId: Snowflake;
}