import { ActivityType } from "discord.js";
export const botOwners: string[] = JSON.parse(process.env.OWNERS!);
export const botPrefix = process.env.PREFIX || "b!";
export const botActivity = process.env.ACTIVITY || "Sapphire bot template";
export const botActivityType: ActivityType = (process.env.ACTIVITY_TYPE as ActivityType | undefined) || "WATCHING";
