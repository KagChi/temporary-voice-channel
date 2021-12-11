"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static parseChannelName(name, user) {
        return name.replace("{user.username}", user?.username).replace("{user.tag}", user?.tag);
    }
}
exports.Util = Util;
