import { Command, ClientExtensionInterface } from "../../types"
import { Message } from "discord.js"
const prefixCommand:Command = {
    name: "setprefix",
    description: "Sets the prefix for the bot",
    args: "multiple",
    group: "Bot Utilities",
    usage: `setprefix {prefix}`,
    async execute<Command>(message:Message, args:string|string[], client:ClientExtensionInterface){
        if(!args[0]) return message.reply("Please provide a prefix")
        client.Prefix = args[0]
        if(client.Prefix = args[0]) return message.reply(`I have set the prefix to ${client.Prefix}`)
        return message.reply("I have failed to set the prefix")
    }
}
module.exports = prefixCommand