import { Collection } from 'discord.js';
import { Color } from '../structures/Color'
import * as fs from "fs";
import { Event } from '../structures/Event';
import { Util } from '../util/util';
import * as path from 'path';
import { LoaderOptions, Events } from '../util/Constants'

export class GEvents {
    client;
    eventDir: string;
    constructor(client, options: LoaderOptions) {
        if (typeof client !== 'object') { 
            console.log(new Color('&d[GEvents] &cNo discord.js client provided!',{json:false}).getText());
            return;
        }

        this.client = client;

        this.eventDir = this.client.eventDir ? this.client.eventDir : options?.eventDir;
        this.client.gevents = new Collection();

        if(!this.eventDir) return;
        this.__loadEventFiles();
    }

    async __loadEventFiles() {
        for await(let fsDirent of fs.readdirSync(this.eventDir, { withFileTypes: true })) {
            let file = fsDirent.name;
            const fileType = path.extname(file);
            const fileName = path.basename(file, fileType);

            if (fsDirent.isDirectory()) {
                await this.__loadEventCategoryFiles(file);
                continue;
            } else if (!['.js', '.ts'].includes(fileType)) { continue; }

            let fileClass;
            fileClass = require(`${this.eventDir}/${file}`);
            if (Util.isClass(fileClass)) {
                fileClass = new fileClass(this.client);
                if (!(fileClass instanceof Event)) return console.log(new Color(`&d[GEvents] &cEvent ${fileName} doesnt belong in Events.`).getText());
            }

            fileClass['_path'] = `${this.eventDir}/${fileName}${fileType}`;

            this.client.gevents.set(fileName, fileClass);
            this.client.emit(Events.LOG, new Color('&d[GEvents] &aLoaded (File): &e➜   &3' + fileName, {json:false}).getText());
        }

        await this.__loadEvents()
    }

    async __loadEventCategoryFiles(categoryFolder) {
        for await (let fsDirent of fs.readdirSync(`${this.eventDir}/${categoryFolder}`, { withFileTypes: true })) {
            let file = fsDirent.name;
            const fileType = path.extname(file);
            const fileName = path.basename(file, fileType);

            if (fsDirent.isDirectory()) {
                await this.__loadEventCategoryFiles(`${categoryFolder}/${file}`);
                continue;
            } else if (!['.js', '.ts'].includes(fileType)) { continue; }

            let fileClass;
            fileClass = require(`${this.eventDir}/${categoryFolder}/${file}`);
            if (Util.isClass(fileClass)) {
                fileClass = new fileClass(this.client);
                if (!(fileClass instanceof Event)) return console.log(new Color(`&d[GEvents] &cEvent ${fileName} doesnt belong in Events.`).getText());
            }

            fileClass['_path'] = `${this.eventDir}/${categoryFolder}/${fileName}.${fileType}`;

            this.client.gevents.set(fileName, fileClass);
            this.client.emit(Events.LOG, new Color('&d[GEvents] &aLoaded (File): &e➜   &3' + fileName, {json:false}).getText());
        }
    }

    async __loadEvents() {
        this.client.gevents.forEach(event => {
            if(event.name == 'ready') return event.run(this.client);

            if(event.ws) {
                if(event.once) this.client.ws.once(event.name, (...args) => event.run(this.client, ...args));
                else this.client.ws.on(event.name, (...args) => event.run(this.client, ...args));
            } else {
                if(event.once) this.client.once(event.name, (...args) => event.run(this.client, ...args));
                else this.client.on(event.name, (...args) => event.run(this.client, ...args));
            }
        })
    }
}
