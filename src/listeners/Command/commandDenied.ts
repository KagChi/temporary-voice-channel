import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
    name: Events.CommandDenied
})

export class clientListener extends Listener {
    run({ context, message: content }: UserError, { message }: CommandDeniedPayload) {
        if (Reflect.get(Object(context), "silent")) return;

        return message.channel.send({ embeds: [new MessageEmbed().setDescription(content)], allowedMentions: { users: [message.author.id], roles: [] } });
    }
}
