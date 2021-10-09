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
const prefixCommand = {
    name: "setprefix",
    description: "Sets the prefix for the bot",
    args: "multiple",
    group: "Bot Utilities",
    usage: `setprefix {prefix}`,
    execute(message, args, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0])
                return message.reply("Please provide a prefix");
            client.Prefix = args[0];
            if (client.Prefix = args[0])
                return message.reply(`I have set the prefix to ${client.Prefix}`);
            return message.reply("I have failed to set the prefix");
        });
    }
};
module.exports = prefixCommand;
