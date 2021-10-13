import { User } from "discord.js";

export class Util {
    static parseChannelName(name: string, user?: User) {
        return name.replace("{user.username}", user?.username!).replace("{user.tag}", user?.tag!);
    }
}
