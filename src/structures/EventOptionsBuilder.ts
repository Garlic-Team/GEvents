import { EventOptions } from '../util/Constants';
import { Util } from '../util/util';

export class EventOptionsBuilder {
    name: string;
    once: boolean;
    ws: boolean;
    constructor(data?: EventOptions) {
        this.setup(data);
    }

    setup(data) {
        this.name = 'name' in data ? Util.resolveString(data.name) : null;
        this.once = 'once' in data ? Boolean(data.value) : null;
        this.ws = 'ws' in data ? Boolean(data.ws) : null;

        return this.toJSON();
    }

    setName(name) {
        this.name = Util.resolveString(name);
        return this;
    }

    setOnce(once) {
        this.once = Boolean(once);
        return this;
    }

    setWs(ws) {
        this.ws = Boolean(ws);
        return this;
    }

    toJSON() {
        return {
          name: this.name,
          once: this.once,
          ws: this.ws,
        };
    }
}
