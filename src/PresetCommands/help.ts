import { Command, ClientExtensionInterface } from "../../types"
import { Message, MessageEmbed } from "discord.js"
const helpCommand:Command = {
    name: "help",
    description: "Basic help command",
    args: "single",
    group: "Bot Utilities",
    usage: `{prefix} help || help {command name}`,
    async execute(message:Message, args:string | undefined, client:ClientExtensionInterface){
        if(!args){
            const helpEmbed = new MessageEmbed()
                .setTitle(`Help module for ${client.user?.username}`)
                .setDescription(`Here is the list of commands for ${client.user?.username}: `)
                .setTimestamp()
                .setFooter("Help Module")
                .setColor("#008BFF")
            const CommandList:Command[][] = client.Commands
            var CommandArray = []
            for(const CommandFile of CommandList){
                console.log(CommandFile)
                const commandName = "`"+CommandFile[1].name+"`"
                CommandArray.push(commandName)
            }
            const CommandString = CommandArray.join(", ")
            helpEmbed.addField("List of Commands", CommandString)
            return message.reply({
                embeds: [helpEmbed]
            })
        }else{
            const commandName = args
            const commandModule:Command = client.Commands.get(commandName)
            if(!commandModule) return message.reply("I can't find that command!")
            const helpEmbed = new MessageEmbed()
                .setTitle(`Help module for ${client.user?.username}`)
                .setDescription(`Guide for  ${commandModule.name} command`)
                .setTimestamp()
                .setFooter("Help Module")
                .setColor("#008BFF")
            const description = commandModule.description
            const name = commandModule.name
            const usage = commandModule.usage
            helpEmbed.addField("Name: ", name)
            helpEmbed.addField("Description: ", description)
            helpEmbed.addField("Usage", usage)
            return message.reply({
                embeds: [helpEmbed]
            })
        }
    }
}
module.exports = helpCommand