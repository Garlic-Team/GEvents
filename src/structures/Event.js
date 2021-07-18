const { resolveString } = require('../util/util');
const Color = require("./Color");

class Event {
    constructor(client, options = {}) {
        this.name = resolveString(options.name);
        this.once = Boolean(options.once) || false;
        this.ws = Boolean(options.ws) || false;
    }

    async run(client, ...args) {
        return console.log(new Color(`&d[GEvents] &cEvent ${this.name} doesn't provide a run method!`).getText())
    }
}

module.exports = Event;