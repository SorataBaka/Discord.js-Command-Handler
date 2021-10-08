import { Client, Collection, ClientOptions, Message } from "discord.js"
import { Parameters, Command, Event, CommandExecuteParameter } from "../../types"
import * as fs from "fs"
import * as path from "path"

/**
 * 
 * Creates a base application that creates a new discord client and pre-sets all needed paths
 */
module.exports = class ClientExtension extends Client {
    public Prefix:string
    private readonly CommandPath:string
    private readonly EventPath:string
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
        const CommandFolder:string[] = fs.readdirSync(this.CommandPath)
        for(const commandDirs of CommandFolder){
            const CommandFiles:string[] = fs.readdirSync(`${this.CommandPath}/${commandDirs}`).filter((file:string):boolean => file.endsWith(".js"))
            for(const CommandFileName of CommandFiles){
                const CommandFile:Command = require(`${CommandPath}/${commandDirs}/${CommandFileName}`)
                console.log(CommandFile)
                this.Commands.set(CommandFile.name, CommandFile)
            }
        }
        console.log(this.Commands)
        //Handle Events
        this.Events = new Collection()
        this.EventPath = path.resolve(EventPath)
        const EventFolder:string[] = fs.readdirSync(this.EventPath).filter((file:string):boolean => file.endsWith("js"))
        for(const EventsFiles of EventFolder){
            const EventsFile = require(`${EventPath}/${EventsFiles}`)
            this.Events.set(EventsFile.name, EventsFile)
            this.on(EventsFile.eventName, (...args) => EventsFile.execute(...args, this))
        }
        console.log(this.Events)

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
}