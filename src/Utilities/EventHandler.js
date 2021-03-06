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
const fs = __importStar(require("fs"));
class EventHandler {
    constructor(EventHandlerParameters) {
        this.EventCollection = EventHandlerParameters.Events;
        this.EventPath = EventHandlerParameters.EventDirectory;
        this.Client = EventHandlerParameters.Client;
        const EventFolder = fs.readdirSync(this.EventPath).filter((file) => file.endsWith("js"));
        for (const EventsFiles of EventFolder) {
            const EventsFile = require(`${this.EventPath}/${EventsFiles}`);
            this.EventCollection.set(EventsFile.name, EventsFile);
            this.Client.on(EventsFile.eventName, (...args) => EventsFile.execute(...args, this));
        }
    }
}
exports.default = EventHandler;
