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
- fill `DISCORD_TOKEN`
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
## Running bot
- npm i 
- npm start


###### © KagChi 2021 All rights reserved.
