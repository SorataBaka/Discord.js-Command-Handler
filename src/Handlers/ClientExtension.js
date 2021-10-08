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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 *
 * Creates a base application that creates a new discord client and pre-sets all needed paths
 */
module.exports = class ClientExtension extends discord_js_1.Client {
    constructor(clientOption, Parameters) {
        super(clientOption);
        const { Prefix, CommandPath, EventPath, Token } = Parameters;
        this.Prefix = Prefix;
        this.EventPath = EventPath;
        //Handle Commands
        this.Commands = new discord_js_1.Collection();
        this.CommandPath = path.resolve(CommandPath);
        const CommandFolder = fs.readdirSync(this.CommandPath);
        for (const commandDirs of CommandFolder) {
            const CommandFiles = fs.readdirSync(`${this.CommandPath}/${commandDirs}`).filter((file) => file.endsWith(".js"));
            for (const CommandFileName of CommandFiles) {
                const CommandFile = require(`${CommandPath}/${commandDirs}/${CommandFileName}`);
                console.log(CommandFile);
                this.Commands.set(CommandFile.name, CommandFile);
            }
        }
        console.log(this.Commands);
        //Handle Events
        this.Events = new discord_js_1.Collection();
        this.EventPath = path.resolve(EventPath);
        const EventFolder = fs.readdirSync(this.EventPath).filter((file) => file.endsWith("js"));
        for (const EventsFiles of EventFolder) {
            const EventsFile = require(`${EventPath}/${EventsFiles}`);
            this.Events.set(EventsFile.name, EventsFile);
            this.on(EventsFile.eventName, (...args) => EventsFile.execute(...args, this));
        }
        console.log(this.Events);
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
            var args = message.content.split(" ").splice(0, 2);
            if (CommandFile.args.toLowerCase() == "single") {
                args.join(" ");
            }
            else if (CommandFile.args.toLowerCase() == "none" || !CommandFile.args) {
                args = undefined;
            }
            return CommandFile.execute(message, args, this);
        });
        //Logs in the bot
        this.login(Token);
    }
};