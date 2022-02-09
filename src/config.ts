import { ActivityType, PermissionResolvable, Snowflake } from "discord.js";
export const botPrefix = process.env.PREFIX || "t/";
export const botActivity = process.env.ACTIVITY || "TemporaryVoice Channel";
export const botActivityType: Exclude<ActivityType, "CUSTOM"> = (process.env.ACTIVITY_TYPE as Exclude<ActivityType, "CUSTOM">)! || "WATCHING";
export const userChannelPermissions: PermissionResolvable[] = ["MANAGE_CHANNELS"];
export const tempVoiceName: string = "{user.username} Voice";
export const parentTempVoiceId: Snowflake[] = JSON.parse(process.env.PARENT_CH ?? "[]");
export const botToken: string = process.env.DISCORD_TOKEN ?? "";