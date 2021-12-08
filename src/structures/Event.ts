import { EventOptions } from "../util/Constants";

const { resolveString, isClass } = require('../util/util');
const Color = require("./Color");

export class Event {
    client;
    name: string;
    once: boolean;
    ws: boolean;
    options;

    constructor(client, options: EventOptions) {
        this.client = client;

        this.name = resolveString(options.name);
        this.once = Boolean(options.once) || false;
        this.ws = Boolean(options.ws) || false;

        this.options = options;
    }

    async run(client, ...args) {
        return console.log(new Color(`&d[GEvents] &cEvent ${this.name} doesn't provide a run method!`).getText())
    }

    async reload() {
        let eventPath = this.client.gevents.get(this.name)._path;

        delete require.cache[require.resolve(eventPath)];
        this.client.gevents.delete(this.name);

        let newEvent = await require(eventPath);

        if (!isClass(newEvent)) return console.log(new Color('&d[GEvents] &cThe event must be class!').getText());
        else newEvent = new newEvent(this.client);

        if (!(newEvent instanceof Event)) return console.log(new Color(`&d[GEvents] &cEvent ${newEvent.name} doesnt belong in Event.`).getText());

        newEvent['_path'] = eventPath;
        this.client.gevents.set(newEvent.name, newEvent);
        return true;
	}
}