import { Collection } from "discord.js"
import { Command, CommandHandlerInterface, CommandHandlerParameters } from "../../types"
import * as fs from "fs"

export default class CommandHandler implements CommandHandlerInterface{
    public CommandCollection:Collection<string, Command>
    public CommandPath:string
    constructor(CommandHandlerParameters:CommandHandlerParameters){
        this.CommandCollection = CommandHandlerParameters.Commands
        this.CommandPath = CommandHandlerParameters.CommandDirectory
        const CommandFolder:string[] = fs.readdirSync(this.CommandPath)
        for(const commandDirs of CommandFolder){
            const CommandFiles:string[] = fs.readdirSync(`${this.CommandPath}/${commandDirs}`)
            for(const CommandFileName of CommandFiles){
                const CommandFile:Command = require(`${this.CommandPath}/${commandDirs}/${CommandFileName}`)
                console.log(CommandFile)
                this.CommandCollection.set(CommandFile.name, CommandFile)
            }
        }
    }
}