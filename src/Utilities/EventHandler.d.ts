import { Collection, Client } from "discord.js";
import { EventHandlerParameters, Event, EventHandlerInterface } from "../../types";
export default class EventHandler implements EventHandlerInterface {
    EventCollection: Collection<string, Event>;
    EventPath: string;
    Client: Client;
    constructor(EventHandlerParameters: EventHandlerParameters);
}
