import { Collection, Client } from "discord.js"
import { EventHandlerParameters, Event, EventHandlerInterface } from "../../types"
import * as fs from "fs"
export default class EventHandler implements EventHandlerInterface{
    public EventCollection:Collection<string, Event>
    public EventPath:string
    public Client:Client
    constructor(EventHandlerParameters:EventHandlerParameters){
        this.EventCollection = EventHandlerParameters.Events
        this.EventPath = EventHandlerParameters.EventDirectory
        this.Client = EventHandlerParameters.Client

        const EventFolder:string[] = fs.readdirSync(this.EventPath).filter((file:string):boolean => file.endsWith("js"))
        for(const EventsFiles of EventFolder){
            const EventsFile = require(`${this.EventPath}/${EventsFiles}`)
            this.EventCollection.set(EventsFile.name, EventsFile)
            this.Client.on(EventsFile.eventName, (...args) => EventsFile.execute(...args, this))
        }
    }
}