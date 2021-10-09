"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const helpCommand = {
    name: "help",
    description: "Basic help command",
    args: "single",
    group: "Bot Utilities",
    usage: `{prefix} help || help {command name}`,
    execute(message, args, client) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!args) {
                const helpEmbed = new discord_js_1.MessageEmbed()
                    .setTitle(`Help module for ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username}`)
                    .setDescription(`Here is the list of commands for ${(_b = client.user) === null || _b === void 0 ? void 0 : _b.username}: `)
                    .setTimestamp()
                    .setFooter("Help Module")
                    .setColor("#008BFF");
                const CommandList = client.Commands;
                var CommandArray = [];
                for (const CommandFile of CommandList) {
                    console.log(CommandFile);
                    const commandName = "`" + CommandFile[1].name + "`";
                    CommandArray.push(commandName);
                }
                const CommandString = CommandArray.join(", ");
                helpEmbed.addField("List of Commands", CommandString);
                return message.reply({
                    embeds: [helpEmbed]
                });
            }
            else {
                const commandName = args;
                const commandModule = client.Commands.get(commandName);
                if (!commandModule)
                    return message.reply("I can't find that command!");
                const helpEmbed = new discord_js_1.MessageEmbed()
                    .setTitle(`Help module for ${(_c = client.user) === null || _c === void 0 ? void 0 : _c.username}`)
                    .setDescription(`Guide for  ${commandModule.name} command`)
                    .setTimestamp()
                    .setFooter("Help Module")
                    .setColor("#008BFF");
                const description = commandModule.description;
                const name = commandModule.name;
                const usage = commandModule.usage;
                helpEmbed.addField("Name: ", name);
                helpEmbed.addField("Description: ", description);
                helpEmbed.addField("Usage", usage);
                return message.reply({
                    embeds: [helpEmbed]
                });
            }
        });
    }
};
module.exports = helpCommand;
