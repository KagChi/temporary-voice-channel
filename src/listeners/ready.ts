import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import chalk from "chalk";
import { botActivity, botActivityType } from "../config";

@ApplyOptions<ListenerOptions>({
    name: "ready",
    once: true
})

export class readyEvent extends Listener {
    run() {
        this.container.client.user?.setActivity({
            name: botActivity,
            type: botActivityType
        });
        return this.container.logger.info(chalk.green(`[CLIENT]: ${this.container.client.user?.username.toUpperCase()} CONNECTED TO DISCORD`));
    }
}
