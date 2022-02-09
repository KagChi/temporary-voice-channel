import "dotenv/config";
import { botToken } from "./config";
import { BotClient } from "./structures/BotClient";
const client = new BotClient();
client.login(botToken);
