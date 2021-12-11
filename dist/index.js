"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const BotClient_1 = require("./structures/BotClient");
const client = new BotClient_1.BotClient();
client.login();
