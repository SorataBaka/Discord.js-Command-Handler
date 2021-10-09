import { Client, Collection, ClientOptions, Message } from "discord.js"
import { Parameters, Command, Event, ClientExtensionInterface } from "../../types"
import * as path from "path"
import CommandHandler from "../Utilities/CommandHandler"
import EventHandler from "../Utilities/EventHandler"
import * as fs from "fs"
/**
 * 
 * Creates a base application that creates a new discord client and pre-sets all needed paths
 */
class ClientExtension  extends Client implements ClientExtensionInterface {
    public Prefix:string
    public readonly EventPath:string
    public readonly CommandPath:string
    public readonly Commands:Collection<string, Command>
    public readonly Events:Collection<string, Event>
    constructor(clientOption:ClientOptions, Parameters:Parameters){
        super(clientOption)
        const { Prefix, CommandPath, EventPath, Token } = Parameters
        this.Prefix = Prefix
        this.EventPath = EventPath

        //Handle Commands
        this.Commands = new Collection()
        this.CommandPath = path.resolve(CommandPath)
        new CommandHandler({Commands: this.Commands, CommandDirectory: this.CommandPath})
        
        console.log(this.Commands)
        //Handle Events
        this.Events = new Collection()
        this.EventPath = path.resolve(EventPath)
        new EventHandler({Events: this.Events, EventDirectory: this.EventPath, Client: this})

        //Handle bot events
        this.on('ready', () => console.log("Bot is now online"))
        this.on('messageCreate', (message:Message) => {
            if(!message.content.toLowerCase().startsWith(this.Prefix.toLowerCase()))return
            const CommandName = message.content.split(" ")[1]
            if(!CommandName) return
            const CommandFile = this.Commands.get(CommandName)
            if(!CommandFile) return 
            var args:string[]  |  string  |  undefined = message.content.split(" ")
            args.splice(0, 2)
            if(CommandFile.args.toLowerCase() == "single"){
               args =  args.join(" ")
            }else if(CommandFile.args.toLowerCase() == "none" || !CommandFile.args){
                args = undefined
            }
            return CommandFile.execute(message, args, this)

        })
        //Logs in the bot
        this.login(Token)
    }
    setDefault(){
        const DefaultCommandList = fs.readdirSync(__dirname + "/../PresetCommands").filter((file:string) => file.endsWith(".js"))
        for(const DefaultCommand of DefaultCommandList){
            const DefaultCommandFile:Command = require(__dirname + `/../PresetCommands/${DefaultCommand}`)
            this.Commands.set(DefaultCommandFile.name, DefaultCommandFile)
        }
    }
}
module.exports = ClientExtension