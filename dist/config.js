"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.parentTempVoiceId = exports.tempVoiceName = exports.userChannelPermissions = exports.botActivityType = exports.botActivity = exports.botPrefix = void 0;
exports.botPrefix = process.env.PREFIX || "t/";
exports.botActivity = process.env.ACTIVITY || "TemporaryVoice Channel";
exports.botActivityType = process.env.ACTIVITY_TYPE || "WATCHING";
exports.userChannelPermissions = ["MANAGE_CHANNELS"];
exports.tempVoiceName = "{user.username} Voice";
exports.parentTempVoiceId = process.env.PARENT_CH || "";
exports.port = process.env.PORT || 3000;