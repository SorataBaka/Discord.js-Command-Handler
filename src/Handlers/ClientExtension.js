"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path = __importStar(require("path"));
const CommandHandler_1 = __importDefault(require("../Utilities/CommandHandler"));
const EventHandler_1 = __importDefault(require("../Utilities/EventHandler"));
const fs = __importStar(require("fs"));
/**
 *
 * Creates a base application that creates a new discord client and pre-sets all needed paths
 */
class ClientExtension extends discord_js_1.Client {
    constructor(clientOption, Parameters) {
        super(clientOption);
        const { Prefix, CommandPath, EventPath, Token } = Parameters;
        this.Prefix = Prefix;
        this.EventPath = EventPath;
        //Handle Commands
        this.Commands = new discord_js_1.Collection();
        this.CommandPath = path.resolve(CommandPath);
        new CommandHandler_1.default({ Commands: this.Commands, CommandDirectory: this.CommandPath });
        console.log(this.Commands);
        //Handle Events
        this.Events = new discord_js_1.Collection();
        this.EventPath = path.resolve(EventPath);
        new EventHandler_1.default({ Events: this.Events, EventDirectory: this.EventPath, Client: this });
        //Handle bot events
        this.on('ready', () => console.log("Bot is now online"));
        this.on('messageCreate', (message) => {
            if (!message.content.toLowerCase().startsWith(this.Prefix.toLowerCase()))
                return;
            const CommandName = message.content.split(" ")[1];
            if (!CommandName)
                return;
            const CommandFile = this.Commands.get(CommandName);
            if (!CommandFile)
                return;
            var args = message.content.split(" ");
            args.splice(0, 2);
            if (CommandFile.args.toLowerCase() == "single") {
                args = args.join(" ");
            }
            else if (CommandFile.args.toLowerCase() == "none" || !CommandFile.args) {
                args = undefined;
            }
            return CommandFile.execute(message, args, this);
        });
        //Logs in the bot
        this.login(Token);
    }
    setDefault() {
        const DefaultCommandList = fs.readdirSync(__dirname + "/../PresetCommands").filter((file) => file.endsWith(".js"));
        for (const DefaultCommand of DefaultCommandList) {
            const DefaultCommandFile = require(__dirname + `/../PresetCommands/${DefaultCommand}`);
            this.Commands.set(DefaultCommandFile.name, DefaultCommandFile);
        }
    }
}
module.exports = ClientExtension;
