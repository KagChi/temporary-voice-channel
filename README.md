# temporary-voice-channel
A open source discord bot that handle temporary voice channel.

## Setup
- create .env file with value:
```
DISCORD_TOKEN=
OWNERS= []
PREFIX=b!
ACTIVITY=
ACTIVITY_TYPE=
```
- fill `DISCORD_TOKEN` with your discord bot token
- open `config.ts` file
- fill `parentTempVoiceId` config with voice channel id
- you can change granted permissions to user by changing `userChannelPermissions` config
- some role can be granted some permissions by adding `userChannelRoleIdPermissions`
```ts
[{
    id: "roleId/GuildMemberId",
    allow: userChannelPermissions
}];
```

## Requirements
- NodeJS v16.6 or greater


## Running bot
- npm i 
- npm start

## Replit
You may run this on replit, since replit doesnt have native `NodeJS v16.6`, you may see this [article](https://dev.to/arnavkr/updating-node-js-to-16-in-replit-1ep0) to upgrade replit NodeJS version.

###### © KagChi 2021 All rights reserved.