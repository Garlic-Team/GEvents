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

    export class EventOptionsBuilder {
        constructor(data: EventOptions);
        private setup(data: EventOptions);
    
        public name: String;
        public once: Boolean;
        public ws: Boolean;
    
        public setName(): EventOptionsBuilder;
        public setOnce(): EventOptionsBuilder;
        public setWs(): EventOptionsBuilder;
        public toJSON(): EventOptionsBuilder;
      }

    interface EventOptions {
        name: string;
        once: boolean;
        ws: boolean;
    }
}