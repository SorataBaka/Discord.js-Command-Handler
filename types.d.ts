import { Client, Message } from "discord.js";

export interface Parameters {
    Prefix:string;
    CommandPath:string;
    EventPath:string;
    Token:string;
}
export interface Command {
    name:string;
    description:string;
    permissions?:string[];
    args:"single" | "multiple" | "none",
    group:string;
    execute:Function;
    usage:string;
}
export interface Event {
    name:string;
    eventName:string;
    once:boolean;
    execute:Function;
}
export interface CommandExecuteParameter {
    message: Message;
    args:string |string[];
    this:Client;
}

export interface CommandHandlerParameters {
    Commands:Collection<string, Command>
    CommandDirectory:string
}
export interface EventHandlerParameters {
    Events:Collection<string, Command>
    EventDirectory:string;
    Client:Client;
}

export interface ClientExtensionInterface extends Client{
    Prefix:string;
    CommandPath:string;
    Commands:Collection<string, Command>,
    Events:Collection<string, Event>,
    setDefault:Function;
}

export interface CommandHandlerInterface {
    CommandCollection:Collection<string, Command>
    CommandPath:string;
}
export interface EventHandlerInterface {
    EventCollection:Collection<string, Event>
    EventPath:string
}