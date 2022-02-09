# temporary-voice-channel
A open source discord bot that handle temporary voice channel.

## Setup
- create .env file with same as `.env.schema` file
- open `config.ts` file or just edit the `.env` file instead
- fill `DISCORD_TOKEN` or `botToken` (if you use ts file as config.) with your discord bot token
- fill `PARENT_CH` config with parent voice channel id, example: PARENT_CH = ["123123"]
- you can change granted permissions to user by changing `userChannelPermissions` config

## Requirements
- NodeJS v16.6 or greater


## Running bot
- npm i 
- npm start

## Replit
You may run this on replit, since replit doesnt have native `NodeJS v16.6`, you may see this [article](https://dev.to/arnavkr/updating-node-js-to-16-in-replit-1ep0) to upgrade replit NodeJS version.

###### © KagChi 2021 All rights reserved.
