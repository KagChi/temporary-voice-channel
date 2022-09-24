"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readyEvent = void 0;
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("../config");
let readyEvent = class readyEvent extends framework_1.Listener {
    run() {
        this.container.client.user?.setActivity({
            name: config_1.botActivity,
            type: config_1.botActivityType
        });
        return this.container.logger.info(chalk_1.default.green(`[CLIENT]: ${this.container.client.user?.username.toUpperCase()} CONNECTED TO DISCORD`));
    }
};
readyEvent = __decorate([
    (0, decorators_1.ApplyOptions)({
        name: "ready",
        once: true
    })
], readyEvent);
exports.readyEvent = readyEvent;
