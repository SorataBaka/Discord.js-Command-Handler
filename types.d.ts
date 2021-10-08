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
    args:"single" | "multiple" | "none"
    execute:Function;
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