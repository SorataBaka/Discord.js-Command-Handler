import { Collection } from "discord.js";
import { Command, CommandHandlerInterface, CommandHandlerParameters } from "../../testtypes";
export default class CommandHandler implements CommandHandlerInterface {
    CommandCollection: Collection<string, Command>;
    CommandPath: string;
    constructor(CommandHandlerParameters: CommandHandlerParameters);
}
