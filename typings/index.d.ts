import { Client, Collection } from "discord.js";

declare module 'discord.js' {
    export interface Client {
        gevents: Collection<string, File>
    }
}

declare module '@gcommands/events' {
    export class Event {
        constructor(client: Client, options: EventOptions)
    
        public name: string;
        public once: boolean;
        public ws: boolean;
    
        public run(client: Client, ...args): void;
    }

    interface EventOptions {
        name: string;
        once: boolean;
        ws: boolean;
    }
}