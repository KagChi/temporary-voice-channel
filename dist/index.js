"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config");
const BotClient_1 = require("./structures/BotClient");
const client = new BotClient_1.BotClient();
client.login(config_1.botToken);
